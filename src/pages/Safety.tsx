import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  ExternalLink, 
  AlertTriangle, 
  Shield,
  MapPin,
  FileText
} from "lucide-react";
import Header from "@/components/shared/Header";

const Safety = () => {
  const handleReportClick = () => {
    // Mock Philadelphia police reporting - would be location-based
    window.open("https://www.phillypolice.com/forms/index.html", "_blank");
  };

  const emergencyResources = [
    {
      title: "Emergency Services",
      number: "911",
      description: "Immediate danger or emergency",
      urgent: true
    },
    {
      title: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "24/7 confidential support",
      urgent: false
    },
    {
      title: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text",
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold flex items-center justify-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span>Safety Center</span>
          </h1>
          <p className="text-muted-foreground">
            Resources and tools to keep you safe
          </p>
        </div>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Emergency Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyResources.map((resource, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-lg ${
                  resource.urgent ? 'border-destructive bg-destructive/5' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium flex items-center space-x-2">
                      {resource.urgent && <AlertTriangle className="h-4 w-4 text-destructive" />}
                      <span>{resource.title}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{resource.description}</div>
                  </div>
                  <Button
                    variant={resource.urgent ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => window.open(`tel:${resource.number.replace(/[^\d]/g, '')}`)}
                  >
                    {resource.number}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Report to Police */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Report to Law Enforcement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              File a report with your local police department for illegal behavior or criminal activity.
            </p>
            <Button 
              onClick={handleReportClick}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              File Report - Philadelphia Police
            </Button>
            <p className="text-xs text-muted-foreground">
              This will open your local police department's online reporting system.
            </p>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Safety Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">Meeting Someone New</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Meet in public places for first encounters</li>
                <li>• Tell a friend or family member your plans</li>
                <li>• Trust your instincts</li>
                <li>• Have your own transportation</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Using Good Company</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Only endorse people you actually know</li>
                <li>• Report any suspicious or illegal behavior</li>
                <li>• Keep your profile information current</li>
                <li>• Use verified profiles when possible</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Safety;