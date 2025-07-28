import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, CheckCircle, AlertCircle } from "lucide-react";

interface DLUploadProps {
  onUploadComplete: (file: File) => void;
  isUploaded?: boolean;
}

const DLUpload = ({ onUploadComplete, isUploaded = false }: DLUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    // Mock upload process
    setTimeout(() => {
      setIsUploading(false);
      onUploadComplete(file);
    }, 1500);
  };

  const handleCameraCapture = () => {
    // Mock camera capture - in real app would open camera
    console.log('Opening camera for DL capture...');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Driver's License Upload</span>
          {isUploaded && (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Upload a clear photo of the front of your driver's license.</p>
          <ul className="mt-2 space-y-1">
            <li>• All text must be clearly readable</li>
            <li>• Photo must be in good lighting</li>
            <li>• No reflections or glare</li>
            <li>• Accepted formats: JPG, PNG, HEIC</li>
          </ul>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center space-y-4">
          {isUploaded ? (
            <div className="text-green-600">
              <CheckCircle className="h-12 w-12 mx-auto mb-2" />
              <p className="font-medium">Driver's License Uploaded</p>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="dl-upload"
                  disabled={isUploading}
                />
                <label htmlFor="dl-upload">
                  <Button 
                    asChild 
                    disabled={isUploading}
                    className="cursor-pointer"
                  >
                    <span>
                      {isUploading ? "Uploading..." : "Choose File"}
                    </span>
                  </Button>
                </label>
                
                <p className="text-sm text-muted-foreground">or</p>
                
                <Button
                  variant="outline"
                  onClick={handleCameraCapture}
                  disabled={isUploading}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DLUpload;