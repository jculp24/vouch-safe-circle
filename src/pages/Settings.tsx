import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut, 
  Trash2,
  Eye,
  Phone,
  Lock
} from "lucide-react";
import Header from "@/components/shared/Header";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  
  const subscriptionTier = "Free"; // This would come from subscription state

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Subscription</div>
                <div className="text-sm text-muted-foreground">Current plan</div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{subscriptionTier}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/subscription")}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Upgrade
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Identity Verification</div>
                <div className="text-sm text-muted-foreground">Driver's license & selfie</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/verification")}
              >
                <Shield className="h-4 w-4 mr-2" />
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Safety</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Profile Visibility</div>
                <div className="text-sm text-muted-foreground">Show your profile in search results</div>
              </div>
              <Switch
                checked={profileVisibility}
                onCheckedChange={setProfileVisibility}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notifications</div>
                <div className="text-sm text-muted-foreground">Endorsement requests and updates</div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/safety")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Safety Center
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            
            <Button variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            
            <Button variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;