CREATE OR REPLACE FUNCTION public.validate_waitlist_entry()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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

CREATE TRIGGER validate_waitlist_before_insert
BEFORE INSERT ON public.waitlist
FOR EACH ROW EXECUTE FUNCTION public.validate_waitlist_entry();
