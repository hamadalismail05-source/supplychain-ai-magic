CREATE OR REPLACE FUNCTION public.validate_waitlist_entry()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.whatsapp_number IS NULL OR length(trim(NEW.whatsapp_number)) < 6 OR length(NEW.whatsapp_number) > 20 THEN
    RAISE EXCEPTION 'Invalid WhatsApp number';
  END IF;
  IF NEW.locale NOT IN ('en', 'ar') THEN
    NEW.locale := 'en';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.validate_waitlist_entry() FROM PUBLIC, anon, authenticated;
