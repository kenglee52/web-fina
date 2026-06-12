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
import { Loader2, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@headlessui/react";

const Promotion_manage = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "active",
    image: null,
    image_url: null,
  });

  // Get token from localStorage
  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token); // Debug token
    return token;
  };

  // Fetch all promotions
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      console.log("Fetching promotions with headers:", { Authorization: `Bearer ${token}` });
      const res = await axios.get(`${url.base_url}/api/promotion`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetch response:", res.data);
      setPromotions(res.data.data || []);
      setError(null);
    } catch (err) {
      const message = err.response?.status === 401
        ? "Unauthorized: Please log in again"
        : err.response?.data?.message || "Failed to load promotions.";
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
    fetchPromotions();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData((prev) => ({ ...prev, image: selectedFile }));
    }
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("Title is required", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }

    const token = getToken();
    if (!token) {
      toast.error("Please log in to save promotion", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      navigate("/login_admin");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("start_date", formData.start_date || "");
    form.append("end_date", formData.end_date || "");
    form.append("status", formData.status);
    if (formData.image) {
      form.append("promotion", formData.image);
    }

    try {
      console.log("Submitting with headers:", { Authorization: `Bearer ${token}` });
      if (isEdit) {
        const res = await axios.put(`${url.base_url}/api/promotion/${formData.id}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Update response:", res.data);
        toast.success("Promotion updated successfully!", {
          style: { background: "#dcfce7", color: "#15803d" },
        });
      } else {
        const res = await axios.post(`${url.base_url}/api/promotion`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Create response:", res.data);
        toast.success("Promotion created successfully!", {
          style: { background: "#dcfce7", color: "#15803d" },
        });
      }
      setOpenDialog(false);
      setOpenConfirmDialog(false);
      setFormData({ id: null, title: "", description: "", start_date: "", end_date: "", status: "active", image: null, image_url: null });
      fetchPromotions();
    } catch (err) {
      const message = err.response?.status === 401
        ? "Unauthorized: Please log in again"
        : err.response?.data?.message || "Failed to save promotion.";
      console.error("Submit error:", err);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      if (err.response?.status === 401) {
        navigate("/login_admin");
      }
    }
  };

  // Handle edit button click
  const handleEdit = (promotion) => {
    setIsEdit(true);
    setFormData({
      id: promotion.id,
      title: promotion.title,
      description: promotion.description || "",
      start_date: promotion.start_date ? promotion.start_date.split("T")[0] : "",
      end_date: promotion.end_date ? promotion.end_date.split("T")[0] : "",
      status: promotion.status,
      image: null,
      image_url: promotion.image_url,
    });
    setOpenDialog(true);
  };

  // Handle delete button click
  const handleDelete = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Please log in to delete promotion", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      navigate("/login_admin");
      return;
    }

    try {
      console.log("Deleting with headers:", { Authorization: `Bearer ${token}` });
      const res = await axios.delete(`${url.base_url}/api/promotion/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete response:", res.data);
      toast.success("Promotion deleted successfully!", {
        style: { background: "#dcfce7", color: "#15803d" },
      });
      setOpenDeleteConfirmDialog(false);
      setDeleteId(null);
      fetchPromotions();
    } catch (err) {
      const message = err.response?.status === 401
        ? "Unauthorized: Please log in again"
        : err.response?.data?.message || "Failed to delete promotion.";
      console.error("Delete error:", err);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  // Open create dialog
  const handleOpenCreate = () => {
    setIsEdit(false);
    setFormData({ id: null, title: "", description: "", start_date: "", end_date: "", status: "active", image: null, image_url: null });
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
        Manage Promotions
      </h2>

      {/* Create Button */}
      <div className="mb-6 text-right">
        <Button onClick={handleOpenCreate} className="bg-blue-500 hover:bg-blue-600 text-white">
          Add Promotion
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
      ) : promotions.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
          No promotions available
        </div>
      ) : (
        <div className="border rounded-lg shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>{promotion.id}</TableCell>
                  <TableCell className="max-w-xs truncate">{promotion.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{promotion.description || "-"}</TableCell>
                  <TableCell>
                    {promotion.start_date
                      ? new Date(promotion.start_date).toLocaleDateString("en-US")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {promotion.end_date
                      ? new Date(promotion.end_date).toLocaleDateString("en-US")
                      : "-"}
                  </TableCell>
                  <TableCell>{promotion.status}</TableCell>
                  <TableCell>
                    {promotion.image_url ? (
                      <img
                        src={`${url.base_url}${promotion.image_url}`}
                        alt={promotion.title}
                        className="h-12 w-12 object-cover rounded"
                        onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(promotion.created_at).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(promotion)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={openDeleteConfirmDialog && deleteId === promotion.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDeleteConfirm(promotion.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Delete Promotion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this promotion? This action cannot be undone.
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
            <DialogTitle>{isEdit ? "Edit Promotion" : "Add Promotion"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter title"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="description"
                className="absolute -top-3 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="mt-4 w-full h-60 resize-none rounded-xl border border-gray-300 p-3"
              />
            </div>

            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileChange}
              />
              {isEdit && formData.image_url && (
                <div className="mt-2">
                  <Label>Current Image</Label>
                  <img
                    src={`${url.base_url}${formData.image_url}`}
                    alt="Current promotion"
                    className="h-20 w-20 object-cover rounded"
                    onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
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
                    <AlertDialogTitle>Confirm {isEdit ? "Update" : "Create"} Promotion</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to {isEdit ? "update" : "create"} this promotion? This action cannot be undone.
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

export default Promotion_manage;