import React, { useState, useEffect } from 'react';
import axios from 'axios';


// 1. IMPORT LUCIDE ICONS
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Building2, 
  XCircle, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { url } from '@/componet/unity/Part';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ dept_name: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch departments on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      // NOTE: localStorage.getItem('token') is assumed to work in your environment
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url.base_url}/api/department`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(response.data.departments);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch departments');
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
    if (!form.dept_name.trim()) {
      setError('Please enter the department name.');
      return;
    }
    if (form.dept_name.length > 100) {
      setError('Department name cannot exceed 100 characters.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (editId) {
        // Update department
        const response = await axios.put(
          `${url.base_url}/api/department/${editId}`,
          { dept_name: form.dept_name.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess(response.data.message || 'Department updated successfully!');
        setDepartments(
          departments.map((dept) =>
            dept.dept_id === editId ? response.data.department : dept
          )
        );
      } else {
        // Create department
        const response = await axios.post(
          `${url.base_url}/api/department`,
          { dept_name: form.dept_name.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess(response.data.message || 'New department added successfully!');
        setDepartments([...departments, response.data.department]);
      }
      setForm({ dept_name: '' });
      setEditId(null);
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (dept) => {
    setForm({ dept_name: dept.dept_name });
    setEditId(dept.dept_id);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  // Handle delete button click
  const handleDelete = async (dept_id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${url.base_url}/api/department/${dept_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message || 'Department deleted successfully.');
      setDepartments(departments.filter((dept) => dept.dept_id !== dept_id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete department.');
      setDeleteConfirm(null);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for add/edit
  const openModal = () => {
    setForm({ dept_name: '' });
    setEditId(null);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-blue-100">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-blue-900">
            Manage Department Data
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

        {/* Add Department Button */}
        <button
          onClick={openModal}
          className="mb-6 flex items-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200"
          disabled={loading}
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add New Department</span>
        </button>

        {/* Departments Table */}
        {loading && !departments.length ? (
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
                    ID
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Department Name
                  </th>
                  <th className="p-4 text-left font-semibold rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {departments.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500 bg-gray-50">
                      <AlertTriangle className="w-5 h-5 inline mr-2 text-yellow-500" />
                      No department data available.
                    </td>
                  </tr>
                ) : (
                  departments.map((dept) => (
                    <tr
                      key={dept.dept_id}
                      className="border-b last:border-b-0 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="p-4 font-medium text-gray-700">{dept.dept_id}</td>
                      <td className="p-4 text-gray-800">{dept.dept_name}</td>
                      <td className="p-4 flex space-x-3">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(dept)}
                          className="flex items-center space-x-1 text-sm bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md"
                          disabled={loading}
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteConfirm(dept.dept_id)}
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
                  {editId ? 'Edit Department' : 'Add New Department'}
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
                    htmlFor="dept_name"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="dept_name"
                    name="dept_name"
                    value={form.dept_name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Example: Credit Department"
                    maxLength={100}
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
                  <h2 className="text-xl font-bold text-gray-800">Confirm Data Deletion</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this department? This action cannot be undone if no positions are linked.
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

export default Department;
