import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AddSocialMediaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const platforms = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'snapchat', label: 'Snapchat' }
];

const AddSocialMediaModal = ({ open, onOpenChange }: AddSocialMediaModalProps) => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateUrl = (url: string, platform: string) => {
    const platformDomains: Record<string, string[]> = {
      instagram: ['instagram.com', 'www.instagram.com'],
      facebook: ['facebook.com', 'www.facebook.com', 'fb.com'],
      tiktok: ['tiktok.com', 'www.tiktok.com'],
      twitter: ['twitter.com', 'www.twitter.com', 'x.com', 'www.x.com'],
      linkedin: ['linkedin.com', 'www.linkedin.com'],
      snapchat: ['snapchat.com', 'www.snapchat.com']
    };

    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.toLowerCase();
      return platformDomains[platform]?.includes(domain) || false;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!platform || !url) {
      toast({
        title: "Error",
        description: "Please select a platform and enter a URL",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(url, platform)) {
      toast({
        title: "Invalid URL",
        description: `Please enter a valid ${platforms.find(p => p.value === platform)?.label} URL`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Link Added!",
        description: "Social media link has been submitted for review",
      });
      
      // Reset form
      setPlatform("");
      setUrl("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  const handleClose = () => {
    setPlatform("");
    setUrl("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Social Media Link</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Profile URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter the full URL to the profile page
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSocialMediaModal;