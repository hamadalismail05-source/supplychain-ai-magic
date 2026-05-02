CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp_number TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
ON public.waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
