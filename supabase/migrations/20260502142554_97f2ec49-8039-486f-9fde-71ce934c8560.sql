ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS hospital text;

CREATE OR REPLACE FUNCTION public.validate_waitlist_entry()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.whatsapp_number IS NULL OR length(trim(NEW.whatsapp_number)) < 6 OR length(NEW.whatsapp_number) > 20 THEN
    RAISE EXCEPTION 'Invalid WhatsApp number';
  END IF;
  IF NEW.full_name IS NOT NULL AND length(NEW.full_name) > 120 THEN
    RAISE EXCEPTION 'Name too long';
  END IF;
  IF NEW.hospital IS NOT NULL AND length(NEW.hospital) > 160 THEN
    RAISE EXCEPTION 'Hospital too long';
  END IF;
  IF NEW.locale NOT IN ('en', 'ar') THEN
    NEW.locale := 'en';
  END IF;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS validate_waitlist_entry_trigger ON public.waitlist;
CREATE TRIGGER validate_waitlist_entry_trigger
BEFORE INSERT OR UPDATE ON public.waitlist
FOR EACH ROW EXECUTE FUNCTION public.validate_waitlist_entry();