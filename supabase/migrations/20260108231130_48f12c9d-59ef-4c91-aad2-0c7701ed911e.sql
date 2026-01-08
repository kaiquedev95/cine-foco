-- 1. Criar função para buscar user_id pelo email
CREATE OR REPLACE FUNCTION public.get_user_id_by_email(email_param text)
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM auth.users WHERE email = email_param LIMIT 1;
$$;

-- 2. Inserir o role de admin para contatonoticiacine@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT public.get_user_id_by_email('contatonoticiacine@gmail.com'), 'admin'
WHERE public.get_user_id_by_email('contatonoticiacine@gmail.com') IS NOT NULL;