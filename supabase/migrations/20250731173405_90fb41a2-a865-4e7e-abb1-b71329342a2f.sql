-- Create profiles table extending auth.users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  location TEXT,
  bio TEXT,
  good_company_score INTEGER DEFAULT 0,
  endorsement_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create endorsements table
CREATE TABLE public.endorsements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endorser_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  endorsed_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  duration TEXT,
  endorsement_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT no_self_endorsement CHECK (endorser_id != endorsed_id),
  CONSTRAINT unique_endorsement UNIQUE (endorser_id, endorsed_id)
);

-- Create social media links table
CREATE TABLE public.social_media_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  added_by_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  report_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create verification records table
CREATE TABLE public.verification_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  dl_photo_url TEXT,
  selfie_photo_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user searches table
CREATE TABLE public.user_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  search_query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for endorsements
CREATE POLICY "Endorsements are viewable by everyone" 
ON public.endorsements FOR SELECT 
USING (true);

CREATE POLICY "Users can create endorsements for others" 
ON public.endorsements FOR INSERT 
WITH CHECK (auth.uid() = endorser_id AND auth.uid() != endorsed_id);

CREATE POLICY "Users can update their own endorsements" 
ON public.endorsements FOR UPDATE 
USING (auth.uid() = endorser_id);

CREATE POLICY "Users can delete their own endorsements" 
ON public.endorsements FOR DELETE 
USING (auth.uid() = endorser_id);

-- Create RLS policies for social media links
CREATE POLICY "Social media links are viewable by everyone" 
ON public.social_media_links FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can add social media links" 
ON public.social_media_links FOR INSERT 
WITH CHECK (auth.uid() = added_by_user_id);

CREATE POLICY "Users can update links they added" 
ON public.social_media_links FOR UPDATE 
USING (auth.uid() = added_by_user_id);

-- Create RLS policies for verification records
CREATE POLICY "Users can view their own verification records" 
ON public.verification_records FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own verification records" 
ON public.verification_records FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verification records" 
ON public.verification_records FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for user searches
CREATE POLICY "Users can view their own search history" 
ON public.user_searches FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own search records" 
ON public.user_searches FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Create function to update endorsement count
CREATE OR REPLACE FUNCTION public.update_endorsement_count()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update endorsement count
CREATE TRIGGER update_endorsement_count_trigger
AFTER INSERT OR DELETE ON public.endorsements
FOR EACH ROW
EXECUTE FUNCTION public.update_endorsement_count();

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('verification-docs', 'verification-docs', false);

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for verification documents
CREATE POLICY "Users can view their own verification docs" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own verification docs" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own verification docs" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);