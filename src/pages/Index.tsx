import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Header from "@/components/shared/Header";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

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

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              name="search"
              type="text"
              placeholder="Search people in Philadelphia..."
              className="pl-10 h-12"
            />
          </div>
        </form>

        {/* Action Cards */}
        <div className="w-full max-w-sm space-y-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/my-profile")}
          >
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">My Profile</h3>
              <p className="text-sm text-muted-foreground">
                View your endorsements and score
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/safety")}
          >
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
