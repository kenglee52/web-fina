import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Briefcase,
  XCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { url } from '@/componet/unity/Part';

const Post_Careers = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [positions, setPositions] = useState([]);
  const [form, setForm] = useState({
    position_id: '',
    title: '',
    description: '',
    quantity: 1,
    status: 'open',
    start_date: '',
    end_date: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch job posts and positions on mount
  useEffect(() => {
    fetchPositions();
    fetchJobPosts();
  }, []);

  const fetchPositions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url.base_url}/api/position`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPositions(response.data.positions);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch positions');
    }
  };

  const fetchJobPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url.base_url}/api/jobpost`);
      
      setJobPosts(response.data.job_posts);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch job posts');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.start_date || !form.end_date) {
      setError('Title, start date, and end date are required');
      return;
    }
    if (form.title.length > 255) {
      setError('Title cannot exceed 255 characters');
      return;
    }
    if (form.quantity < 1) {
      setError('Quantity must be a positive integer');
      return;
    }
    if (new Date(form.end_date) < new Date(form.start_date)) {
      setError('End date cannot be before start date');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        position_id: form.position_id || null,
        title: form.title.trim(),
        description: form.description?.trim() || null,
        quantity: parseInt(form.quantity),
        status: form.status,
        start_date: form.start_date,
        end_date: form.end_date,
      };
      if (editId) {
        // Update job post
        const response = await axios.put(
          `${url.base_url}/api/jobpost/${editId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess(response.data.message || 'Job post updated successfully!');
        fetchJobPosts();
        setJobPosts(
          jobPosts.map((post) =>
            post.post_id === editId ? response.data.job_post : post
          )
        );
      } else {
        // Create job post
        const response = await axios.post(
          `${url.base_url}/api/jobpost`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess(response.data.message || 'New job post added successfully!');
         fetchJobPosts();
        setJobPosts([...jobPosts, response.data.job_post]);
      }
      setForm({
        position_id: '',
        title: '',
        description: '',
        quantity: 1,
        status: 'open',
        start_date: '',
        end_date: '',
      });
      setEditId(null);
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (post) => {
    setForm({
      position_id: post.position_id || '',
      title: post.title,
      description: post.description || '',
      quantity: post.quantity,
      status: post.status,
      start_date: post.start_date.split('T')[0],
      end_date: post.end_date.split('T')[0],
    });
    setEditId(post.post_id);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  // Handle delete button click
  const handleDelete = async (post_id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${url.base_url}/api/jobpost/${post_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message || 'Job post deleted successfully.');
      setJobPosts(jobPosts.filter((post) => post.post_id !== post_id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job post');
      setDeleteConfirm(null);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for add/edit
  const openModal = () => {
    setForm({
      position_id: '',
      title: '',
      description: '',
      quantity: 1,
      status: 'open',
      start_date: '',
      end_date: '',
    });
    setEditId(null);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-blue-100">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-blue-900">
            Manage Job Posts
          </h1>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 flex items-center p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            <XCircle className="w-5 h-5 mr-3" />
            <span className="font-medium">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-center p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
            <CheckCircle className="w-5 h-5 mr-3" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Add Job Post Button */}
        <button
          onClick={openModal}
          className="mb-6 flex items-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200"
          disabled={loading}
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add New Job Post</span>
        </button>

        {/* Job Posts Table */}
        {loading && !jobPosts.length ? (
          <div className="text-center py-10 text-gray-600 flex justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin mr-2 text-blue-500" />
            Loading data...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white shadow-inner">
                  <th className="p-4 text-left font-semibold rounded-tl-xl">
                    Post ID
                  </th>
                  <th className="p-4 text-left font-semibold">Position</th>
                  <th className="p-4 text-left font-semibold">Department</th>
                  <th className="p-4 text-left font-semibold">Salary Range</th>
                  <th className="p-4 text-left font-semibold">Quantity</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Start Date</th>
                  <th className="p-4 text-left font-semibold">End Date</th>
                  <th className="p-4 text-left font-semibold rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobPosts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="p-4 text-center text-gray-500 bg-gray-50"
                    >
                      <AlertTriangle className="w-5 h-5 inline mr-2 text-yellow-500" />
                      No job posts found.
                    </td>
                  </tr>
                ) : (
                  jobPosts.map((post) => (
                    <tr
                      key={post.post_id}
                      className="border-b last:border-b-0 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="p-4 font-medium text-gray-700">
                        {post.post_id}
                      </td>
                      <td className="p-4 text-gray-800">
                        {post.position_title || 'N/A'}
                      </td>
                      <td className="p-4 text-gray-800">
                        {post.dept_name || 'N/A'}
                      </td>
                      <td className="p-4 text-gray-800">{post.title}</td>
                      <td className="p-4 text-gray-800">{post.quantity}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.status === 'open'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-800">
                        {post.start_date.split('T')[0]}
                      </td>
                      <td className="p-4 text-gray-800">
                        {post.end_date.split('T')[0]}
                      </td>
                      <td className="p-4 flex space-x-3">
                        <button
                          onClick={() => handleEdit(post)}
                          className="flex items-center space-x-1 text-sm bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md"
                          disabled={loading}
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(post.post_id)}
                          className="flex items-center space-x-1 text-sm bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Add/Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-2xl font-bold text-blue-800">
                  {editId ? 'Edit Job Post' : 'Add New Job Post'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  disabled={loading}
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="position_id"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Position (Optional)
                  </label>
                  <select
                    id="position_id"
                    name="position_id"
                    value={form.position_id}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    disabled={loading}
                  >
                    <option value="">Select Position (Optional)</option>
                    {positions.map((pos) => (
                      <option key={pos.position_id} value={pos.position_id}>
                        {pos.position_title} ({pos.dept_name})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Salary Range <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Example: 10.000 - 15.000 USD or Can negotiate  "
                    maxLength={255}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Enter job description"
                    rows={4}
                    disabled={loading}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="quantity"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    min={1}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="status"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    required
                    disabled={loading}
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="start_date"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="end_date"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex items-center bg-gray-200 text-gray-700 py-3 px-5 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex items-center space-x-2 text-white py-3 px-5 rounded-xl transition-all duration-300 font-semibold shadow-lg ${
                      loading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-300/50'
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : editId ? (
                      <>
                        <Pencil className="w-5 h-5" />
                        <span>Update</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              <div className="flex items-center text-red-600 mb-4">
                <AlertTriangle className="w-7 h-7 mr-3" />
                <h2 className="text-xl font-bold text-gray-800">
                  Confirm Data Deletion
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this job post? This will also
                delete any associated applicants and cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="bg-gray-200 text-gray-700 py-3 px-5 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className={`flex items-center space-x-2 text-white py-3 px-5 rounded-xl font-semibold shadow-lg ${
                    loading
                      ? 'bg-red-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 shadow-red-300/50'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post_Careers;