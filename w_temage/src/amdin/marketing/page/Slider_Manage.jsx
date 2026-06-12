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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Textarea } from "@headlessui/react";

const Slider_Manage = () => {
  const [sliders, setSliders] = useState([]);
  const [formData, setFormData] = useState({ id: null, title: "", description: "", file: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState({ type: null, id: null });

  // Fetch sliders
  const fetchSliders = async () => {
    try {
      const res = await axios.get(`${url.base_url}/api/sliders`);
      setSliders(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch sliders");
      console.error("Error fetching sliders:", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFormData((prev) => ({ ...prev, file: selectedFile }));
    setPreview(URL.createObjectURL(selectedFile));
    setError(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: null, title: "", description: "", file: null });
    setPreview(null);
    setError(null);
  };

  // Handle slider creation or update
  const handleSubmit = async () => {
    if (!formData.title) {
      setError("Title is required");
      return;
    }
    if (!formData.id && !formData.file) {
      setError("Please select an image for a new slider");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to perform this action");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description || "");
      if (formData.file) {
        formDataToSend.append("slider", formData.file);
      }

      if (formData.id) {
        // Update existing slider
        await axios.put(`${url.base_url}/api/sliders/${formData.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new slider
        await axios.post(`${url.base_url}/api/sliders`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      resetForm();
      fetchSliders();
    } catch (err) {
      console.error("Submit error:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized: Please log in again");
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || "Invalid input");
      } else {
        setError("Failed to save slider. Please try again.");
      }
    } finally {
      setLoading(false);
      setOpenDialog({ type: null, id: null });
    }
  };

  // Handle slider deletion
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to perform this action");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${url.base_url}/api/sliders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSliders();
    } catch (err) {
      console.error("Delete error:", err);
      if (err.response?.status === 404) {
        setError("Slider not found");
      } else {
        setError("Failed to delete slider. Please try again.");
      }
    } finally {
      setLoading(false);
      setOpenDialog({ type: null, id: null });
    }
  };

  // Handle edit button click
  const handleEdit = (slider) => {
    setFormData({
      id: slider.id,
      title: slider.title,
      description: slider.description || "",
      file: null,
    });
    setPreview(slider.image_url ? `${url.base_url}${slider.image_url}` : null);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {formData.id ? "Edit Slider" : "Add New Slider"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-700 font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter slider title"
                className="mt-1"
              />
            </div>
            <div className="relative w-full mb-4">
              {/* Floating Rounded Label */}
              <label className="absolute -top-3 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                Description (Optional)
              </label>

              {/* Textarea */}
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter slider description"
                className="h-40 w-full resize-none rounded-xl border border-gray-300 p-3"
              />
            </div>


            <div>
              <Label htmlFor="file-upload" className="text-gray-700 font-medium">
                {formData.id ? "New Image (Optional)" : "Select Image"}
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
            {preview && (
              <div className="mt-4">
                <Label className="text-gray-700 font-medium">Image Preview</Label>
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
          <AlertDialog
            open={openDialog.type === "submit"}
            onOpenChange={(open) => setOpenDialog({ type: open ? "submit" : null, id: null })}
          >
            <AlertDialogTrigger asChild>
              <Button disabled={loading} className={loading ? "bg-gray-400 cursor-not-allowed" : ""}>
                {loading ? "Saving..." : formData.id ? "Update Slider" : "Add Slider"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {formData.id ? "Confirm Update" : "Confirm Add"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to {formData.id ? "update this slider" : "add this new slider"}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {formData.id && (
            <Button variant="outline" onClick={resetForm} className="ml-4">
              Cancel Edit
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Existing Sliders</CardTitle>
        </CardHeader>
        <CardContent>
          {sliders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sliders.map((slider) => (
                  <TableRow key={slider.id}>
                    <TableCell>
                      <img
                        src={`${url.base_url}${slider.image_url}`}
                        alt={slider.title}
                        className="h-16 w-16 object-cover rounded"
                        onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback image
                      />
                    </TableCell>
                    <TableCell>{slider.title}</TableCell>
                    <TableCell>{slider.description || "N/A"}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(slider)}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog
                        open={openDialog.type === "delete" && openDialog.id === slider.id}
                        onOpenChange={(open) =>
                          setOpenDialog({ type: open ? "delete" : null, id: open ? slider.id : null })
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this slider? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(slider.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500">No sliders available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Slider_Manage;