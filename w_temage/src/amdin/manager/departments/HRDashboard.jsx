import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, ChevronDown, ChevronUp, LogOut, Bell } from 'lucide-react';
import { url } from '@/componet/unity/Part';
import { useAdmin } from '@/context/AdminContext';
import { Navigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

const HRDashboard = () => {
  const { admin, setAdmin } = useAdmin();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState({});
  const [updateStatus, setUpdateStatus] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Redirect if not a Marketing manager or no admin data
  if (!admin || admin.department_name !== 'People Ogranization') {
    return <Navigate to="/login_admin" replace />;
  }

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token available');
        }

        // Fetch applicants for Marketing department
        console.log('Fetching HR applicants with token:', token);
        const applicantsResponse = await axios.get(`${url.base_url}/api/applicants_manager?department=People Ogranization`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response (Applicants):', applicantsResponse.data);
        setApplicants(applicantsResponse.data.applicants || []);

        // Fetch unread count for Marketing department
        const unreadResponse = await axios.put(`${url.base_url}/api/applicants/unread?department=People Ogranization`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response (Unread Count):', unreadResponse.data);
        setUnreadCount(unreadResponse.data.unreadCount || 0);

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err.response?.data?.error || 'Failed to load data. Please check your authentication and try again.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAdmin(null);
    window.location.href = '/login_admin';
  };

  // Open Dialog for Confirmation
  const openConfirmDialog = (applicantId, status) => {
    setSelectedApplicantId(applicantId);
    setSelectedStatus(status);
    setIsDialogOpen(true);
  };

  // Handle Status Update
  const handleStatusUpdate = async () => {
    if (!selectedApplicantId || !selectedStatus) return;

    setUpdateLoading((prev) => ({ ...prev, [selectedApplicantId]: true }));
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axios.put(
        `${url.base_url}/api/applicants/status`,
        { applicant_id: selectedApplicantId, application_status: selectedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setApplicants((prev) =>
        prev.map((a) =>
          a.applicant_id === selectedApplicantId
            ? { ...a, application_status: selectedStatus }
            : a
        )
      );

      setUpdateStatus({ type: 'success', message: `Status updated to ${selectedStatus} successfully` });
    } catch (err) {
      console.error('Error updating status:', err);
      setUpdateStatus({
        type: 'error',
        message: err.response?.data?.error || `Pls login again.`,
      });
    } finally {
      setUpdateLoading((prev) => ({ ...prev, [selectedApplicantId]: false }));
      setIsDialogOpen(false);
      setSelectedApplicantId(null);
      setSelectedStatus(null);
    }
  };

  const toggleRow = async (applicantId) => {
    // Toggle the row
    setExpandedRows((prev) => ({
      ...prev,
      [applicantId]: !prev[applicantId],
    }));

    // Only mark as read if the row is being expanded and manager_read is false
    const applicant = applicants.find((a) => a.applicant_id === applicantId);
    if (!applicant.manager_read && !expandedRows[applicantId]) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token available');
        }

        // Call the API to mark applicant as read
        await axios.put(
          `${url.base_url}/api/applicants/${applicantId}/read`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update local state to reflect manager_read: true
        setApplicants((prev) =>
          prev.map((a) =>
            a.applicant_id === applicantId ? { ...a, manager_read: true } : a
          )
        );

        // Update unread count
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error('Error marking applicant as read:', err);
        setError(
          err.response?.data?.error || 'Pls login again.'
        );
      }
    }
  };

  // Check if applicant status is already final (Approved/Rejected)
  const isStatusFinal = (status) => {
    return status === 'Approved' || status === 'Rejected';
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            People Ogranization
          </span>{' '}
          <span className="text-gray-900">Department Dashboard</span>
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold shadow-md"
          aria-label="Logout"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Unread Applicants Notification */}
      <div className="mb-6 flex items-center justify-center">
        <div className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 rounded-xl shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-purple-200 hover:to-pink-200 transition-all duration-300">
          <Bell size={24} className="text-purple-500" />
          <span className="text-lg font-semibold">Unread Applicants</span>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-xl text-center bg-red-100 text-red-700 shadow-md">
          {error}
        </div>
      )}
      {updateStatus && (
        <div
          className={`p-4 mb-6 rounded-xl text-center shadow-md ${updateStatus.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            }`}
        >
          {updateStatus.message}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin text-purple-500" size={40} />
        </div>
      ) : applicants.length === 0 ? (
        <div className="text-center text-gray-600">No applicants found for People Ogranization department.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-2xl">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <th className="p-4 text-left">Full Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Position</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
                <th className="p-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => {
                const currentStatus = applicant.application_status || 'Pending';
                const isFinalStatus = isStatusFinal(currentStatus);

                return (
                  <React.Fragment key={applicant.applicant_id}>
                    <tr
                      className={`border-b border-gray-200 hover:bg-gray-50 ${!applicant.manager_read ? 'bg-purple-200 border-l-4 border-purple-500' : ''
                        }`}
                    >
                      <td className="p-4">{applicant.fullname}</td>
                      <td className="p-4">{applicant.email}</td>
                      <td className="p-4">{applicant.phone_number}</td>
                      <td className="p-4">{applicant.position_title}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${currentStatus === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : currentStatus === 'Rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {currentStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        {isFinalStatus ? (
                          <span className="text-gray-500 text-sm font-medium">
                            Status Finalized
                          </span>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => openConfirmDialog(applicant.applicant_id, 'Approved')}
                              disabled={
                                updateLoading[applicant.applicant_id] ||
                                applicant.application_status === 'Invited_for_Interview'
                              }
                              className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${updateLoading[applicant.applicant_id] ||
                                applicant.application_status === 'Invited_for_Interview'
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                                }`}
                            >
                              {updateLoading[applicant.applicant_id] ? (
                                <Loader2 className="animate-spin w-4 h-4 mx-auto" />
                              ) : (
                                'Approve'
                              )}
                            </button>

                            <button
                              onClick={() => openConfirmDialog(applicant.applicant_id, 'Rejected')}
                              disabled={
                                updateLoading[applicant.applicant_id] ||
                                applicant.application_status === 'Invited_for_Interview'
                              }
                              className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${updateLoading[applicant.applicant_id] ||
                                applicant.application_status === 'Invited_for_Interview'
                                ? 'bg-red-400 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600'
                                }`}
                            >
                              {updateLoading[applicant.applicant_id] ? (
                                <Loader2 className="animate-spin w-4 h-4 mx-auto" />
                              ) : (
                                'Reject'
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleRow(applicant.applicant_id)}
                          className="text-purple-500 hover:text-purple-600"
                          aria-label={`Toggle details for ${applicant.fullname}`}
                        >
                          {expandedRows[applicant.applicant_id] ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[applicant.applicant_id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="7" className="p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p><strong>Expected Salary:</strong> {applicant.expected_salary || 'N/A'}</p>
                              <p><strong>Date of Birth:</strong> {applicant.date_of_birth || 'N/A'}</p>
                              <p><strong>Nationality:</strong> {applicant.nationality || 'N/A'}</p>
                              <p><strong>Marital Status:</strong> {applicant.marital_status || 'N/A'}</p>
                              {applicant.marital_status === 'Married' && (
                                <>
                                  <p><strong>Spouse Name:</strong> {applicant.spouse_name || 'N/A'}</p>
                                  <p><strong>Spouse Occupation:</strong> {applicant.spouse_occupation || 'N/A'}</p>
                                  <p><strong>Spouse Workplace:</strong> {applicant.spouse_workplace || 'N/A'}</p>
                                  <p><strong>Number of Children:</strong> {applicant.number_of_children || '0'}</p>
                                </>
                              )}
                              <p><strong>Current Address:</strong> {applicant.current_address || 'N/A'}</p>
                              <p><strong>Language Skills:</strong> {applicant.language_skills || 'N/A'}</p>
                              <p><strong>Computer Skills:</strong> {applicant.computer_skills || 'N/A'}</p>
                            </div>
                            <div>
                              <p><strong>Emergency Contact:</strong> {applicant.emergency_name || 'N/A'}</p>
                              <p><strong>Relationship:</strong> {applicant.emergency_relationship || 'N/A'}</p>
                              <p><strong>Emergency Phone:</strong> {applicant.emergency_phone || 'N/A'}</p>
                              <p><strong>Emergency Address:</strong> {applicant.emergency_address || 'N/A'}</p>
                              <p>
                                <strong>CV:</strong>{' '}
                                {applicant.cv_path ? (
                                  <a
                                    href={`${url.base_url}${applicant.cv_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-500 hover:underline"
                                    aria-label={`View CV for ${applicant.fullname}`}
                                  >
                                    View CV
                                  </a>
                                ) : (
                                  'N/A'
                                )}
                              </p>
                              <p>
                                <strong>Photo:</strong>{' '}
                                {applicant.photo_path ? (
                                  <a
                                    href={`${url.base_url}${applicant.photo_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-500 hover:underline"
                                    aria-label={`View photo for ${applicant.fullname}`}
                                  >
                                    View Photo
                                  </a>
                                ) : (
                                  'N/A'
                                )}
                              </p>
                              <p><strong>Education:</strong></p>
                              {applicant.educations.length > 0 ? (
                                <ul className="list-disc pl-5">
                                  {applicant.educations.map((edu, index) => (
                                    <li key={index}>
                                      {edu.qualification} in {edu.major || 'N/A'}, {edu.institution_name} (
                                      {edu.graduation_year || 'N/A'}, GPA: {edu.gpa || 'N/A'})
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>N/A</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Custom Confirmation Dialog */}
      <Transition appear show={isDialogOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsDialogOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Confirm Status Update
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Are you sure you want to{' '}
                      <span className="font-medium text-purple-500">
                        {selectedStatus?.toLowerCase()}
                      </span>{' '}
                      this application? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 ${selectedStatus === 'Approved'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                        }`}
                      onClick={handleStatusUpdate}
                    >
                      {selectedStatus === 'Approved' ? 'Approve' : 'Reject'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default HRDashboard;