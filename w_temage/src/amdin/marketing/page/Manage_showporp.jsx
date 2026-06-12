import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Manage_showpopup = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch current popup
  const fetchPopup = async () => {
    try {
      const res = await axios.get(`${url.base_url}/api/getpopups`);
      if (res.data?.data?.length > 0) {
        const latest = res.data.data[0]; // Latest first (ORDER BY created_at DESC)
        setCurrentPopup(`${url.base_url}${latest.filepath}`);
      } else {
        setCurrentPopup(null);
      }
    } catch (err) {
      console.error("Error fetching popup:", err);
      setError("Failed to fetch popup image");
    }
  };

  useEffect(() => {
    fetchPopup();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError(null);
  };

  // Upload new image (replaces old one if exists)
  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image to upload");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to upload");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Attempt to delete old popup (404 is okay if no image exists)
      try {
        await axios.delete(`${url.base_url}/api/deletepopup`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (deleteErr) {
        if (deleteErr.response?.status !== 404) {
          throw deleteErr; // Rethrow non-404 errors
        }
        console.log("No popup to delete, proceeding with upload");
      }

      // Upload new image
      const formData = new FormData();
      formData.append("popup", file);

      const response = await axios.post(`${url.base_url}/api/uploadpopup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setFile(null);
      setPreview(null);
      fetchPopup(); // Refresh current popup
      console.log("Upload response:", response.data);
    } catch (err) {
      console.error("Upload error:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized: Please log in again");
      } else if (err.response?.status === 400) {
        setError(err.response.data.error || "No file uploaded");
      } else {
        setError("Failed to upload image. Please try again.");
      }
    } finally {
      setLoading(false);
      setOpenDialog(false); // Close dialog after upload
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Manage Main Popup Image</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current popup image */}
        {currentPopup ? (
          <div className="text-center mb-4">
            <Label className="text-gray-700 font-medium">Current Popup Image:</Label>
            <img
              src={currentPopup}
              alt="Popup"
              className="mt-2 max-w-[300px] mx-auto rounded-lg border shadow-md"
              onError={() => setCurrentPopup(null)}
            />
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-4">No popup image available</p>
        )}

        {/* Upload new image */}
        <div className="text-center">
          <Label htmlFor="file-upload" className="text-gray-700 font-medium">
            Select New Image:
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 mb-4"
          />

          {preview && (
            <div className="mt-4">
              <Label className="text-gray-700 font-medium">Preview (New Image):</Label>
              <img
                src={preview}
                alt="Preview"
                className="mt-2 max-w-[300px] mx-auto rounded-lg border shadow-md"
              />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogTrigger asChild>
            <Button disabled={loading} className={loading ? "bg-gray-400 cursor-not-allowed" : ""}>
              {loading ? "Uploading..." : "Upload New Image"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Upload</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to upload this new image? This will replace the current popup
                image.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpload}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default Manage_showpopup;