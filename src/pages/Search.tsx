import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for Philadelphia users
const mockUsers = [
  { id: 1, name: "Sarah Johnson", age: 28, endorsements: 5, verified: true, avatar: "/placeholder.svg" },
  { id: 2, name: "Mike Chen", age: 32, endorsements: 8, verified: true, avatar: "/placeholder.svg" },
  { id: 3, name: "Emily Davis", age: 26, endorsements: 3, verified: true, avatar: "/placeholder.svg" },
  { id: 4, name: "James Wilson", age: 30, endorsements: 12, verified: true, avatar: "/placeholder.svg" },
  { id: 5, name: "Lisa Martinez", age: 29, endorsements: 7, verified: true, avatar: "/placeholder.svg" },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(mockUsers);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleUserSelect = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">Search People</h1>
        <div className="w-10" />
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="px-6">
            Search
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 space-y-3">
        {searchResults.map((user) => (
          <Card
            key={user.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleUserSelect(user.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground truncate">
                      {user.name}
                    </h3>
                    {user.verified && (
                      <div className="h-2 w-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Age {user.age} • {user.endorsements} endorsements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Search;