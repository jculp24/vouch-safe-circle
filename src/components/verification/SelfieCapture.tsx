import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CheckCircle, RotateCcw } from "lucide-react";

interface SelfieCaptureProps {
  onCaptureComplete: (imageData: string) => void;
  isCaptured?: boolean;
}

const SelfieCapture = ({ onCaptureComplete, isCaptured = false }: SelfieCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      setIsCapturing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // In a real app, we'd show an error message
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/png');
    onCaptureComplete(imageData);
    stopCamera();
  };

  const mockCapture = () => {
    // Mock capture for demo purposes
    onCaptureComplete('mock-selfie-data');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Live Selfie Capture</span>
          {isCaptured && (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>Take a clear selfie to verify your identity matches your driver's license.</p>
          <ul className="mt-2 space-y-1">
            <li>• Look directly at the camera</li>
            <li>• Ensure good lighting on your face</li>
            <li>• Remove sunglasses or hats</li>
            <li>• Keep a neutral expression</li>
          </ul>
        </div>

        <div className="border rounded-lg p-4 text-center space-y-4">
          {isCaptured ? (
            <div className="text-green-600">
              <CheckCircle className="h-12 w-12 mx-auto mb-2" />
              <p className="font-medium">Selfie Captured Successfully</p>
            </div>
          ) : isCapturing ? (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-sm mx-auto rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="space-x-2">
                <Button onClick={capturePhoto}>
                  <Camera className="h-4 w-4 mr-2" />
                  Capture
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <Button onClick={startCamera}>
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
                
                <p className="text-sm text-muted-foreground">or</p>
                
                <Button variant="outline" onClick={mockCapture}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Mock Capture (Demo)
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfieCapture;