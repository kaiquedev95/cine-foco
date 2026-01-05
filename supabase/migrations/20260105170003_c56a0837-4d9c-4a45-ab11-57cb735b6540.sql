-- Criar enum para categorias de notícias
CREATE TYPE public.news_category AS ENUM ('filme', 'serie', 'streaming', 'review');

-- Criar enum para roles de usuário
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Criar tabela de notícias
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category news_category NOT NULL,
    author TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Criar tabela de roles de usuários
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Habilitar RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Função para verificar role do usuário (security definer para evitar recursão)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON public.news
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Políticas RLS para news
-- Leitura pública
CREATE POLICY "Qualquer pessoa pode ler notícias"
ON public.news
FOR SELECT
USING (true);

-- Admins podem inserir
CREATE POLICY "Admins podem criar notícias"
ON public.news
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins podem atualizar
CREATE POLICY "Admins podem atualizar notícias"
ON public.news
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins podem deletar
CREATE POLICY "Admins podem deletar notícias"
ON public.news
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para user_roles
-- Usuários podem ver suas próprias roles
CREATE POLICY "Usuários podem ver suas próprias roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins podem ver todas as roles
CREATE POLICY "Admins podem ver todas as roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins podem inserir roles
CREATE POLICY "Admins podem inserir roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins podem deletar roles
CREATE POLICY "Admins podem deletar roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Criar bucket para imagens de notícias
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Políticas de storage
-- Qualquer pessoa pode ver imagens
CREATE POLICY "Imagens públicas"
ON storage.objects
FOR SELECT
USING (bucket_id = 'news-images');

-- Admins podem fazer upload
CREATE POLICY "Admins podem fazer upload de imagens"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins podem atualizar imagens
CREATE POLICY "Admins podem atualizar imagens"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins podem deletar imagens
CREATE POLICY "Admins podem deletar imagens"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'news-images' AND public.has_role(auth.uid(), 'admin'));