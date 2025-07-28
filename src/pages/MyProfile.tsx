import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Edit, Camera, IdCard } from "lucide-react";
import Header from "@/components/shared/Header";

const MyProfile = () => {
  const [isVerified, setIsVerified] = useState(false);
  
  // Mock user data
  const userProfile = {
    name: "John Doe",
    age: 28,
    location: "Philadelphia, PA",
    goodCompanyScore: 8.5,
    endorsementCount: 12,
    isVerified: isVerified
  };

  const mockEndorsements = [
    { name: "Sarah Johnson", relationship: "Friend", duration: "2 years", avatar: "SJ" },
    { name: "Mike Chen", relationship: "Coworker", duration: "1 year", avatar: "MC" },
    { name: "Emily Davis", relationship: "Friend", duration: "3 years", avatar: "ED" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <span>My Profile</span>
                {userProfile.isVerified && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
                <p className="text-muted-foreground">{userProfile.age} • {userProfile.location}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userProfile.goodCompanyScore}</div>
                <div className="text-sm text-muted-foreground">Good Company Score</div>
              </div>
              <div className="text-center p-4 bg-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userProfile.endorsementCount}</div>
                <div className="text-sm text-muted-foreground">Endorsements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        {!userProfile.isVerified && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <IdCard className="h-5 w-5" />
                <span>Identity Verification Required</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete identity verification to start endorsing others and build trust.
              </p>
              <Button onClick={() => setIsVerified(true)} className="w-full">
                Start Verification Process
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Endorsements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>My Endorsements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockEndorsements.map((endorsement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {endorsement.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{endorsement.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {endorsement.relationship} for {endorsement.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;