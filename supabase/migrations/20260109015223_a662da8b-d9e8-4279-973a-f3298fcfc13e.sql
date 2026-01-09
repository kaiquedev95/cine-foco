-- Adicionar coluna external_links para armazenar links de redes sociais
ALTER TABLE public.news 
ADD COLUMN external_links jsonb DEFAULT '[]'::jsonb;