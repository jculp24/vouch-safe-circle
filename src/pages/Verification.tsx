import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  IdCard,
  Shield
} from "lucide-react";
import Header from "@/components/shared/Header";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dlUploaded, setDlUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleDLUpload = () => {
    // Mock upload
    setDlUploaded(true);
    if (selfieUploaded) setStep(3);
  };

  const handleSelfieUpload = () => {
    // Mock upload
    setSelfieUploaded(true);
    if (dlUploaded) setStep(3);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Mock verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setStep(4);
    }, 3000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Identity Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To ensure trust and safety, we need to verify your identity using your driver's license and a selfie.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <IdCard className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Driver's License Photo</div>
                    <div className="text-sm text-muted-foreground">Clear photo of your ID</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Camera className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Live Selfie</div>
                    <div className="text-sm text-muted-foreground">Verify it's really you</div>
                  </div>
                </div>
              </div>
              
              <Button onClick={() => setStep(2)} className="w-full">
                Start Verification
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <IdCard className="h-5 w-5" />
                    <span>Upload Driver's License</span>
                  </span>
                  {dlUploaded && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Take a clear photo of the front of your driver's license. Make sure all text is readable.
                </p>
                
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <Button onClick={handleDLUpload} disabled={dlUploaded}>
                    {dlUploaded ? "Driver's License Uploaded" : "Upload Driver's License"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>Take Live Selfie</span>
                  </span>
                  {selfieUploaded && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Captured
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Take a clear selfie to verify you match your driver's license photo.
                </p>
                
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <Button onClick={handleSelfieUpload} disabled={selfieUploaded}>
                    {selfieUploaded ? "Selfie Captured" : "Take Selfie"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Ready to Verify</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Great! We have your driver's license and selfie. Click below to start the verification process.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Driver's license uploaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Live selfie captured</span>
                </div>
              </div>
              
              <Button 
                onClick={handleVerify} 
                className="w-full"
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Identity"}
              </Button>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <Shield className="h-5 w-5" />
                <span>Verification Complete!</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your identity has been successfully verified. You can now endorse others and receive endorsements.
              </p>
              
              <Button 
                onClick={() => navigate("/my-profile")} 
                className="w-full"
              >
                Go to My Profile
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                stepNum <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {stepNum < step ? <CheckCircle className="h-4 w-4" /> : stepNum}
            </div>
          ))}
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default Verification;