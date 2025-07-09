import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Download, X, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";

export default function PDFViewer({ pdfUrl, title, isOpen, onClose }) {
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const openInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl h-[95vh] flex flex-col bg-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b bg-white">
          <CardTitle className="text-xl font-semibold text-black">
            {title}
          </CardTitle>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={openInNewTab}
              className="bg-white border-gray-300 text-black hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-white border-gray-300 text-black hover:bg-gray-50"
            >
              <a href={pdfUrl} download>
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="bg-white border-gray-300 text-black hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 relative bg-white">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-3"></div>
                <p className="text-black font-medium">Loading PDF...</p>
              </div>
            </div>
          )}

          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
            className="w-full h-full border-0 bg-white"
            title={title}
            onLoad={handleIframeLoad}
            style={{ minHeight: "600px" }}
          />

          {/* Fallback for browsers that don't support PDF viewing */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-sm shadow-lg">
              <p className="text-black">
                <strong className="text-black">Can't see the PDF?</strong>{" "}
                <button
                  onClick={openInNewTab}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  Click here to open in a new tab
                </button>{" "}
                or{" "}
                <a
                  href={pdfUrl}
                  download
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  download the file
                </a>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
