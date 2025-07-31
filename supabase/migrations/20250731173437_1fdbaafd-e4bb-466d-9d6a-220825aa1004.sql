-- Fix security warnings by setting search_path on functions

-- Update handle_new_user function with secure search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, auth
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, age, location)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'age' IS NOT NULL 
      THEN (NEW.raw_user_meta_data ->> 'age')::INTEGER 
      ELSE NULL 
    END,
    NEW.raw_user_meta_data ->> 'location'
  );
  RETURN NEW;
END;
$$;

-- Update update_endorsement_count function with secure search_path
CREATE OR REPLACE FUNCTION public.update_endorsement_count()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.profiles 
    SET endorsement_count = endorsement_count + 1
    WHERE user_id = NEW.endorsed_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.profiles 
    SET endorsement_count = GREATEST(endorsement_count - 1, 0)
    WHERE user_id = OLD.endorsed_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Update update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;