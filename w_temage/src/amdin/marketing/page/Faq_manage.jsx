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

const Faq_manage = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    question: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url.base_url}/api/faqs`);
      setFaqs(res.data.data || []);
      setError(null);
    } catch (err) {
      const message = err.response?.data?.error || "Failed to fetch FAQs.";
      console.error("Fetch error:", err);
      setError(message);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: null, question: "", answer: "" });
    setOpenDialog(false);
    setOpenConfirmDialog(false);
  };

  // Handle FAQ creation or update
  const handleSubmit = async () => {
    if (!formData.question) {
      toast.error("Question is required", {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      return;
    }
    if (!formData.answer) {
      toast.error("Answer is required", {
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
      if (formData.id) {
        // Update FAQ
        await axios.put(
          `${url.base_url}/api/faqs/${formData.id}`,
          { question: formData.question, answer: formData.answer },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("FAQ updated successfully!", {
          style: { background: "#dcfce7", color: "#15803d" },
        });
      } else {
        // Create FAQ
        await axios.post(
          `${url.base_url}/api/faqs`,
          { question: formData.question, answer: formData.answer },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("FAQ created successfully!", {
          style: { background: "#dcfce7", color: "#15803d" },
        });
      }
      resetForm();
      fetchFaqs();
    } catch (err) {
      const message =
        err.response?.status === 401
          ? "Unauthorized: Please log in again"
          : err.response?.data?.error || "Failed to save FAQ.";
      console.error("Submit error:", err);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      if (err.response?.status === 401) {
        navigate("/login_admin");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle FAQ deletion
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
      await axios.delete(`${url.base_url}/api/faqs/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("FAQ deleted successfully!", {
        style: { background: "#dcfce7", color: "#15803d" },
      });
      setFaqs((prev) => prev.filter((faq) => faq.id !== deleteId));
    } catch (err) {
      const message =
        err.response?.status === 404
          ? "FAQ not found"
          : err.response?.data?.error || "Failed to delete FAQ.";
      console.error("Delete error:", err);
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c" },
      });
      if (err.response?.status === 401) {
        navigate("/login_admin");
      }
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  // Handle edit button click
  const handleEdit = (faq) => {
    setFormData({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    });
    setOpenDialog(true);
  };

  // Handle open create dialog
  const handleOpenCreate = () => {
    resetForm();
    setOpenDialog(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
        Manage Frequently Asked Questions (FAQs)
      </h2>

      {/* Create Button */}
      <div className="mb-6 text-right">
        <Button
          onClick={handleOpenCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add New FAQ
        </Button>
      </div>

      {/* Loading/Error/Empty States */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[50vh] text-red-500 text-lg">
          {error}
        </div>
      ) : faqs.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] text-gray-500 text-lg">
          No FAQs available
        </div>
      ) : (
        <div className="border rounded-lg shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>{faq.id}</TableCell>
                  <TableCell className="max-w-xs truncate">{faq.question}</TableCell>
                  <TableCell className="max-w-xs truncate">{faq.answer}</TableCell>
                  <TableCell>{formatDate(faq.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(faq)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(faq.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm FAQ Deletion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this FAQ? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              disabled={loading}
                              className={`${
                                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                              }`}
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
            <DialogTitle>{formData.id ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter question"
              />
            </div>
            <div>
              <Label htmlFor="answer">Answer</Label>
              <textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                placeholder="Enter answer"
                className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => setOpenConfirmDialog(true)}
              disabled={loading || !formData.question || !formData.answer}
              className={`${
                loading || !formData.question || !formData.answer
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Save */}
      <AlertDialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm {formData.id ? "Edit" : "Create"} FAQ
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {formData.id ? "edit" : "create"} this FAQ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              disabled={loading}
              className={`${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Faq_manage;