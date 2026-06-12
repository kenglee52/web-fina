import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  Briefcase, // Changed from Building2 to Briefcase for Positions
  XCircle, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { url } from '@/componet/unity/Part';

const Position = () => {
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ dept_id: '', position_title: '', is_open: true });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch positions and departments on mount
  useEffect(() => {
    fetchDepartments();
    fetchPositions();
  }, []);

  const fetchDepartments = async () => {
    try {
      // NOTE: localStorage.getItem('token') is assumed to work in your environment
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url.base_url}/api/department`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(response.data.departments);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch departments');
    }
  };

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${url.base_url}/api/position`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPositions(response.data.positions);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch positions');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
    setSuccess('');
  };
// Handle form submission (Add/Edit)
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.dept_id || !form.position_title.trim()) {
    setError('Department and position title are required');
    return;
  }
  if (form.position_title.length > 100) {
    setError('Position title cannot exceed 100 characters');
    return;
  }

  setLoading(true);
  try {
    const token = localStorage.getItem('token');

    if (editId) {
      // Update position
      const response = await axios.put(
        `${url.base_url}/api/position/${editId}`,
        {
          dept_id: form.dept_id,
          position_title: form.position_title.trim(),
          is_open: form.is_open,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(response.data.message || 'Position updated successfully!');

      // Merge dept_name จาก state departments
      const updatedPosition = response.data.position;
      const dept = departments.find(d => d.dept_id === Number(updatedPosition.dept_id));
      updatedPosition.dept_name = dept ? dept.dept_name : '';

      // Update positions state
      setPositions(positions.map(pos =>
        pos.position_id === editId ? updatedPosition : pos
      ));

    } else {
      // Create position
      const response = await axios.post(
        `${url.base_url}/api/position`,
        {
          dept_id: form.dept_id,
          position_title: form.position_title.trim(),
          is_open: form.is_open,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newPosition = response.data.position;
      const dept = departments.find(d => d.dept_id === Number(newPosition.dept_id));
      newPosition.dept_name = dept ? dept.dept_name : '';

      setPositions([...positions, newPosition]);
      setSuccess(response.data.message || 'New position added successfully!');
    }

    // Reset form & modal
    setForm({ dept_id: '', position_title: '', is_open: true });
    setEditId(null);
    setShowModal(false);

  } catch (err) {
    setError(err.response?.data?.message || 'Operation failed');
  } finally {
    setLoading(false);
  }
};

  // Handle edit button click
  const handleEdit = (pos) => {
    setForm({
      dept_id:  String(pos.dept_id),
      position_title: pos.position_title,
      is_open: pos.is_open,
    });
    setEditId(pos.position_id);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  // Handle delete button click
  const handleDelete = async (position_id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${url.base_url}/api/position/${position_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(response.data.message || 'Position deleted successfully.');
      setPositions(positions.filter((pos) => pos.position_id !== position_id));
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete position');
      setDeleteConfirm(null);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for add/edit
  const openModal = () => {
    setForm({ dept_id: '', position_title: '', is_open: true });
    setEditId(null);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  return (
    // Updated overall container style
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        
        {/* Header - Styled with icon */}
        <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-blue-100">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-blue-900">
            Manage Positions
          </h1>
        </div>

        {/* Error/Success Messages - Styled with icons */}
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

        {/* Add Position Button - Styled with icon */}
        <button
          onClick={openModal}
          className="mb-6 flex items-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200"
          disabled={loading}
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add New Position</span>
        </button>

        {/* Positions Table - Improved styling */}
        {loading && !positions.length ? (
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
                    Position ID
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Department
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Position Title
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Open
                  </th>
                  <th className="p-4 text-left font-semibold rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {positions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500 bg-gray-50">
                      <AlertTriangle className="w-5 h-5 inline mr-2 text-yellow-500" />
                      No positions found.
                    </td>
                  </tr>
                ) : (
                  positions.map((pos) => (
                    <tr
                      key={pos.position_id}
                      className="border-b last:border-b-0 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="p-4 font-medium text-gray-700">{pos.position_id}</td>
                      <td className="p-4 text-gray-800">{pos.dept_name}</td>
                      <td className="p-4 text-gray-800">{pos.position_title}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          pos.is_open 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {pos.is_open ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="p-4 flex space-x-3">
                        {/* Edit Button with Icon */}
                        <button
                          onClick={() => handleEdit(pos)}
                          className="flex items-center space-x-1 text-sm bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md"
                          disabled={loading}
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        {/* Delete Button with Icon */}
                        <button
                          onClick={() => setDeleteConfirm(pos.position_id)}
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

        {/* Modal for Add/Edit - Improved styling and icons */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-2xl font-bold text-blue-800">
                  {editId ? 'Edit Position' : 'Add New Position'}
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
                    htmlFor="dept_id"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="dept_id"
                    name="dept_id"
                    value={form.dept_id}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    required
                    disabled={loading}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.dept_id} value={dept.dept_id}>
                        {dept.dept_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="position_title"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Position Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="position_title"
                    name="position_title"
                    value={form.position_title}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-300"
                    placeholder="Example: Software Engineer I"
                    maxLength={100}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_open"
                      checked={form.is_open}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all duration-300"
                      disabled={loading}
                    />
                    <span className="ml-3 text-gray-700 font-semibold">Is Open (Currently accepting applications)</span>
                  </label>
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

        {/* Delete Confirmation Modal - Improved styling and icons */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
              <div className="flex items-center text-red-600 mb-4">
                  <AlertTriangle className="w-7 h-7 mr-3" />
                  <h2 className="text-xl font-bold text-gray-800">Confirm Data Deletion</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this position? This action cannot be undone if no applicants are linked.
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

export default Position;
