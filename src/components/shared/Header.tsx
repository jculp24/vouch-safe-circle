import { useState } from "react";
import { Search, Settings, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 
          className="text-xl font-bold text-primary cursor-pointer"
          onClick={() => navigate("/")}
        >
          Good Company
        </h1>

        {/* Search Bar - Only show on non-home pages */}
        {!isHomePage && (
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search people in Philadelphia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
        )}

        {/* Navigation */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/my-profile")}
              >
                <User className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;