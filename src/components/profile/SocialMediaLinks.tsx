import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, CheckCircle, AlertTriangle } from "lucide-react";
import AddSocialMediaModal from "./AddSocialMediaModal";

interface SocialMediaLink {
  id: string;
  platform: 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'linkedin' | 'snapchat';
  url: string;
  addedBy: string;
  addedByName: string;
  addedAt: string;
  verified: boolean;
  reportCount: number;
}

interface SocialMediaLinksProps {
  links: SocialMediaLink[];
  isOwnProfile?: boolean;
}

const platformIcons = {
  instagram: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg",
  facebook: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg", 
  tiktok: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg",
  twitter: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg",
  linkedin: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg",
  snapchat: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/snapchat.svg"
};

const platformNames = {
  instagram: "Instagram",
  facebook: "Facebook", 
  tiktok: "TikTok",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  snapchat: "Snapchat"
};

const SocialMediaLinks = ({ links, isOwnProfile = false }: SocialMediaLinksProps) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Social Media</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Link
        </Button>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No social media links added yet. Be the first to add one!
        </p>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div 
              key={link.id} 
              className="flex items-center justify-between p-3 bg-accent rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={platformIcons[link.platform]} 
                  alt={platformNames[link.platform]}
                  className="h-6 w-6"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {platformNames[link.platform]}
                    </span>
                    {link.verified && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {link.reportCount > 0 && (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Added by {link.addedByName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {link.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleLinkClick(link.url)}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddSocialMediaModal 
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
};

export default SocialMediaLinks;