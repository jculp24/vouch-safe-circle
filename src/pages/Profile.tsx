import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Users } from "lucide-react";
import Header from "@/components/shared/Header";

// Mock data
const mockUser = {
  id: 1,
  name: "Sarah Johnson",
  age: 28,
  location: "Philadelphia, PA",
  verified: true,
  goodCompanyScore: 8.5,
  avatar: "/placeholder.svg",
  endorsements: [
    { id: 1, name: "Alex Smith", relationship: "Friend", duration: "2 years", avatar: "/placeholder.svg" },
    { id: 2, name: "Maria Garcia", relationship: "Coworker", duration: "1 year", avatar: "/placeholder.svg" },
    { id: 3, name: "Tom Brown", relationship: "Family", duration: "5+ years", avatar: "/placeholder.svg" },
    { id: 4, name: "Lisa Park", relationship: "Friend", duration: "3 years", avatar: "/placeholder.svg" },
    { id: 5, name: "John Davis", relationship: "Acquaintance", duration: "6 months", avatar: "/placeholder.svg" },
  ]
};

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEndorseModal, setShowEndorseModal] = useState(false);

  const handleEndorse = () => {
    setShowEndorseModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Profile Info */}
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-lg">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h2 className="text-xl font-semibold text-foreground">
                    {mockUser.name}
                  </h2>
                  {mockUser.verified && (
                    <Shield className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-muted-foreground">
                  {mockUser.age} • {mockUser.location}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="text-sm">
                    Score: {mockUser.goodCompanyScore}/10
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {mockUser.endorsements.length} endorsements
                  </Badge>
                </div>
              </div>
            </div>

            <Button onClick={handleEndorse} className="w-full">
              Endorse This Person
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Endorsements */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Endorsements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUser.endorsements.map((endorsement) => (
              <div key={endorsement.id} className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={endorsement.avatar} alt={endorsement.name} />
                  <AvatarFallback>
                    {endorsement.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{endorsement.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {endorsement.relationship} • {endorsement.duration}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Safety Notice */}
      <div className="p-4 mt-4">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              Report illegal behavior to local authorities.{" "}
              <Button variant="link" className="p-0 h-auto text-primary">
                Safety Resources
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;