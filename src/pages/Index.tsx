import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-center p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Good Company</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Find Trusted People
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Discover verified individuals through social endorsements and build safer connections.
          </p>
        </div>

        {/* Action Cards */}
        <div className="w-full max-w-sm space-y-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/search")}
          >
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Search People</h3>
              <p className="text-sm text-muted-foreground">
                Find and verify people in Philadelphia
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">My Profile</h3>
              <p className="text-sm text-muted-foreground">
                View your endorsements and score
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Safety Center</h3>
              <p className="text-sm text-muted-foreground">
                Resources and reporting tools
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sign In/Up Button */}
        <div className="w-full max-w-sm mt-8">
          <Button className="w-full" size="lg">
            Sign In / Create Account
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          Philadelphia Beta • Verified identities only
        </p>
      </div>
    </div>
  );
};

export default Index;
