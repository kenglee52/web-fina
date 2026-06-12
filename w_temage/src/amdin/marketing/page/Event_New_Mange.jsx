import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/componet/unity/Part";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Loader2, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Event_New_Mange = () => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
    summary: "",
    type: "news",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch news/events
  const fetchNews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      const res = await axios.get(`${url.base_url}/api/news`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewsItems(res.data.data || []);
      setError(null);
    } catch (err) {
      const message = err.response?.status === 401
        ? "Unauthorized: Please log in again"
        : err.response?.data?.message || "Failed to fetch news/events.";
      console.error("Fetch error:", err);
      setError(message);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      if (err.message === "No authentication token found. Please log in." || err.response?.status === 401) {
        navigate("/login_admin");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle type selection
  const handleTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
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
    setFormData({ id: null, title: "", content: "", summary: "", type: "news", file: null });
    setPreview(null);
    setError(null);
    setOpenDialog(false);
  };

  // Handle news/event creation or update
  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("Title is required", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    if (!formData.content) {
      toast.error("Content is required", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    if (!['news', 'event'].includes(formData.type)) {
      toast.error("Type must be either 'news' or 'event'", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    if (!formData.id && !formData.file) {
      toast.error("Please select an image for a new news/event", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to perform this action", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      navigate("/login_admin");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("summary", formData.summary || "");
      formDataToSend.append("type", formData.type);
      if (formData.file) {
        formDataToSend.append("news", formData.file);
      }

      if (formData.id) {
        await axios.put(`${url.base_url}/api/news/${formData.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("News/event updated successfully!", {
          style: { background: "#dcfce7", color: "#15803d" },
        });
      } else {
        await axios.post(`${url.base_url}/api/news`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("News/event created successfully!", {
          style: { background: "#dcfce7", color: "#15803d" },
        });
      }

      resetForm();
      fetchNews();
    } catch (err) {
      const message = err.response?.status === 401
        ? "Unauthorized: Please log in again"
        : err.response?.data?.message || "Failed to save news/event.";
      console.error("Submit error:", err);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      if (err.response?.status === 401) {
        navigate("/login_admin");
      }
    } finally {
      setLoading(false);
      setOpenConfirmDialog(false);
    }
  };

  // Handle news/event deletion
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to perform this action", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      navigate("/login_admin");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${url.base_url}/api/news/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("News/event deleted successfully!", {
        style: { background: "#dcfce7", color: "#15803d" },
      });
      fetchNews();
    } catch (err) {
      const message = err.response?.status === 401
        ? "Unauthorized: Please log in again"
        : err.response?.data?.message || "Failed to delete news/event.";
      console.error("Delete error:", err);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      if (err.response?.status === 401) {
        navigate("/login_admin");
      }
    } finally {
      setLoading(false);
      setOpenDeleteConfirmDialog(false);
      setDeleteId(null);
    }
  };

  // Handle edit button click
  const handleEdit = (newsItem) => {
    setFormData({
      id: newsItem.id,
      title: newsItem.title,
      content: newsItem.content,
      summary: newsItem.summary || "",
      type: newsItem.type,
      file: null,
    });
    setPreview(newsItem.image_url ? `${url.base_url}${newsItem.image_url}` : null);
    setOpenDialog(true);
  };

  // Handle open create dialog
  const handleOpenCreate = () => {
    resetForm();
    setOpenDialog(true);
  };

  // Handle save button click to open confirmation dialog
  const handleSave = () => {
    if (!formData.title) {
      toast.error("Title is required", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    if (!formData.content) {
      toast.error("Content is required", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    if (!['news', 'event'].includes(formData.type)) {
      toast.error("Type must be either 'news' or 'event'", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    if (!formData.id && !formData.file) {
      toast.error("Please select an image for a new news/event", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    setOpenConfirmDialog(true);
  };

  // Handle delete button click to open confirmation dialog
  const handleOpenDeleteConfirm = (id) => {
    setDeleteId(id);
    setOpenDeleteConfirmDialog(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
        Manage News/Events
      </h2>

      {/* Create Button */}
      <div className="mb-6 text-right">
        <Button onClick={handleOpenCreate} className="bg-blue-500 hover:bg-blue-600 text-white">
          Add News/Event
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[50vh] text-red-500 text-lg">
          {error}
        </div>
      ) : newsItems.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
          No news or events available
        </div>
      ) : (
        <div className="border rounded-lg shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.image_url ? (
                      <img
                        src={`${url.base_url}${item.image_url}`}
                        alt={item.title}
                        className="h-12 w-12 object-cover rounded"
                        onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{item.title}</TableCell>
                  <TableCell>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.summary || "-"}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString("en-US")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={openDeleteConfirmDialog && deleteId === item.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDeleteConfirm(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Delete News/Event</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this news/event? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              disabled={loading}
                              className={loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog for Create/Edit Form */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? "Edit News/Event" : "Add News/Event"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
           <div className="w-full max-w-[700px]">
  <Label htmlFor="title">Title</Label>

  <textarea
    id="title"
    name="title"
    value={formData.title}
    onChange={handleInputChange}
    placeholder="Enter title"
    rows={3}
    className="
      mt-1 w-full rounded-md border border-input bg-background 
      px-3 py-2 text-sm 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      resize-none
    "
  />
</div>

            <div>
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter content"
                className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                rows={10}
              />
            </div>
            <div>
              <Label htmlFor="summary">Summary (Optional)</Label>
              <Input
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                placeholder="Enter summary"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={handleTypeChange} value={formData.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file-upload">{formData.id ? "New Image (Optional)" : "Image"}</Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
              />
              {preview && (
                <div className="mt-2">
                  <Label>Current Image</Label>
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                    onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <AlertDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    disabled={loading}
                    className={loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm {formData.id ? "Update" : "Create"} News/Event</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to {formData.id ? "update" : "create"} this news/event? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSubmit}
                      disabled={loading}
                      className={loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Event_New_Mange;