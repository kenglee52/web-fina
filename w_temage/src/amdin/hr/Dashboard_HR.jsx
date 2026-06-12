import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, ChevronDown, ChevronUp, LogOut, Bell, User, CheckCircle, Calendar, Plus } from 'lucide-react';
import { url } from '@/componet/unity/Part';
import { useAdmin } from '@/context/AdminContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Tooltip } from 'react-tooltip';

const Dashboard_HR = () => {
  const { admin, setAdmin, loadingAdmin } = useAdmin();
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState({});
  const [updateStatus, setUpdateStatus] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');
  const [photoErrors, setPhotoErrors] = useState({});
  const navigate = useNavigate();
const handleApiError = (err) => {
  console.error("API Error:", err);

  // ข้อความ toast
  const message = err.response?.status === 401
    ? "Unauthorized: Please log in again"
    : err.message || "Something went wrong";

  toast.error(message);

  // ถ้า token หมดอายุ / ไม่มี token ให้ redirect
  if (!localStorage.getItem('token') || err.response?.status === 401 || err.message === "No authentication token available") {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/login_admin", { replace: true });
  }
};


  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token available');
        }

        console.log('Fetching all applicants for HR with token:', token);
        const applicantsResponse = await axios.get(`${url.base_url}/api/applicants_hr`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response (Applicants):', applicantsResponse.data);
        const applicantsData = applicantsResponse.data.applicants || [];
        const parsedApplicants = applicantsData.map((applicant) => ({
          ...applicant,
          educations: typeof applicant.educations === 'string' ? JSON.parse(applicant.educations) : applicant.educations,
        }));
        console.log('Parsed Applicants with Educations:', parsedApplicants);
        setApplicants(parsedApplicants);
        setFilteredApplicants(parsedApplicants);

        const unreadResponse = await axios.get(`${url.base_url}/api/applicants/unreadbyhr`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response (Unread Count):', unreadResponse.data);
        setUnreadCount(unreadResponse.data.unreadCount || 0);

        setError(null);
      } catch (err) {
         handleApiError(err);
        console.error('Error fetching data:', err);
        setError(
          err.response?.data?.error || 'Unable to load data. Please check authentication and try again.'
        );
       
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  useEffect(() => {
    if (filterStatus === 'All') {
      setFilteredApplicants(applicants);
    } else {
      setFilteredApplicants(
        applicants.filter((applicant) => (applicant.application_status || 'Pending') === filterStatus)
      );
    }
  }, [filterStatus, applicants]);

  const statusCounts = {
    Pending: applicants.filter((a) => (a.application_status || 'Pending') === 'Pending').length,
    Approved: applicants.filter((a) => a.application_status === 'Approved').length,
    Invited_for_Interview: applicants.filter((a) => a.application_status === 'Invited_for_Interview').length,
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setAdmin(null);
    navigate('/login_admin');
  };

  const openConfirmDialog = (applicantId, status) => {
    setSelectedApplicantId(applicantId);
    setSelectedStatus(status);
    setIsDialogOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedApplicantId || !selectedStatus) return;

    setUpdateLoading((prev) => ({ ...prev, [selectedApplicantId]: true }));
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token available');
      }

      await axios.put(
        `${url.base_url}/api/applicants/statusbyhr`,
        { applicant_id: selectedApplicantId, application_status: selectedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplicants((prev) =>
        prev.map((a) =>
          a.applicant_id === selectedApplicantId
            ? { ...a, application_status: selectedStatus }
            : a
        )
      );

      setUpdateStatus({ type: 'success', message: `Status updated to ${selectedStatus} successfully` });
    } catch (err) {
      navigate('/login_admin');
        handleApiError(err);
      console.error('Error updating status:', err);
      setUpdateStatus({
        type: 'error',
        message: err.response?.data?.error || `Failed to update status to ${selectedStatus} `,
      });
     
    } finally {
      setUpdateLoading((prev) => ({ ...prev, [selectedApplicantId]: false }));
      setIsDialogOpen(false);
      setSelectedApplicantId(null);
      setSelectedStatus(null);
    }
  };

  const toggleRow = async (applicantId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [applicantId]: !prev[applicantId],
    }));

    const applicant = applicants.find((a) => a.applicant_id === applicantId);
    if (!applicant.hr_read && !expandedRows[applicantId]) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token available');
        }

        await axios.put(
          `${url.base_url}/api/applicants/${applicantId}/readbyhr`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setApplicants((prev) =>
          prev.map((a) =>
            a.applicant_id === applicantId ? { ...a, hr_read: true } : a
          )
        );

        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        navigate('/login_admin');
         handleApiError(err);
        console.error('Error marking applicant as read:', err);
        setError(
          err.response?.data?.error || 'Failed to mark as read'
        );
      }
    }
  };

  const isStatusFinal = (status) => status === 'Invited_for_Interview';

  const getEducationSummary = (educations) => {
    if (!educations || educations.length === 0) return 'None';
    const highestEdu = educations.reduce((prev, curr) => {
      const levels = ['High School', 'Diploma', 'Bachelor', 'Master', 'PhD'];
      return levels.indexOf(curr.qualification) > levels.indexOf(prev.qualification) ? curr : prev;
    }, educations[0]);
    return highestEdu.qualification || 'Not specified';
  };

  // Format number with thousands separator
  const formatNumber = (number) => {
    if (!number) return 'Not specified';
    return Number(number).toLocaleString('en-US', { minimumFractionDigits: 0 });
  };

  // Handle image load error
  const handleImageError = (applicantId) => {
    setPhotoErrors((prev) => ({ ...prev, [applicantId]: 'Unable to load image' }));
  };

  // Placeholder for remove photo (not functional in view-only dashboard)
  const handleRemovePhoto = (applicantId) => {
    console.log(`Remove photo for applicant ${applicantId}`);
    // Implement actual remove logic if needed (e.g., API call)
  };

  if (loadingAdmin) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!admin || admin.role_name !== 'hr') {
    return <Navigate to="/login_admin" replace />;
  }

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-white min-h-screen font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;500;700&display=swap');
          body {
            font-family: 'Noto Sans Lao', sans-serif;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          thead {
            position: sticky;
            top: 0;
            z-index: 10;
            background: #2563eb;
          }
          @media (max-width: 640px) {
            table {
              min-width: 1000px;
            }
          }
        `}
      </style>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-900">
          <span className="text-orange-600">HR</span> Recruitment Overview
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/admin/jobs/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            aria-label="Manage New Job"
            data-tooltip-id="new-job-tooltip"
            data-tooltip-content="Manage New Job"
          >
            <Plus size={20} />
            Manage New Job
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            aria-label="Log Out"
            data-tooltip-id="logout-tooltip"
            data-tooltip-content="Log Out"
          >
            <LogOut size={20} />
            Log Out
          </button>
          <Tooltip id="new-job-tooltip" />
          <Tooltip id="logout-tooltip" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <User size={32} className="text-yellow-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Pending Review</h3>
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.Pending}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <CheckCircle size={32} className="text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{statusCounts.Approved}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Calendar size={32} className="text-orange-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Invited for Interview</h3>
            <p className="text-2xl font-bold text-orange-600">{statusCounts.Invited_for_Interview}</p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="relative flex items-center gap-3 px-6 py-3 bg-orange-50 text-orange-900 rounded-xl shadow-lg hover:bg-orange-100 transition-all duration-300 transform hover:scale-105">
          <Bell size={24} className="text-orange-600" />
          <span className="text-lg font-semibold">Unread Applicants</span>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Filter by Status"
        >
          <option value="All">All</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Invited_for_Interview">Invited for Interview</option>
        </select>
      </div>

      {error && (
        <div className="p-4 mb-8 rounded-xl text-center bg-red-50 text-red-700 shadow-md border border-red-200 animate-pulse">
          {error}
        </div>
      )}
      {updateStatus && (
        <div
          className={`p-4 mb-8 rounded-xl text-center shadow-md border ${
            updateStatus.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
          } animate-fade-in`}
        >
          {updateStatus.message}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-orange-600" size={48} />
        </div>
      ) : filteredApplicants.length === 0 ? (
        <div className="text-center text-gray-600 text-lg font-medium bg-white p-6 rounded-xl shadow-md">
          No applicants found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white sticky top-0">
                <th className="p-4 text-left text-sm font-semibold">Application Date</th>
                <th className="p-4 text-left text-sm font-semibold">Full Name</th>
                <th className="p-4 text-left text-sm font-semibold">Email</th>
                <th className="p-4 text-left text-sm font-semibold">Phone Number</th>
                <th className="p-4 text-left text-sm font-semibold">Position</th>
                <th className="p-4 text-left text-sm font-semibold">Department</th>
                <th className="p-4 text-left text-sm font-semibold">Education</th>
                <th className="p-4 text-left text-sm font-semibold">Status</th>
                <th className="p-4 text-left text-sm font-semibold">Read Status</th>
                <th className="p-4 text-left text-sm font-semibold">Action</th>
                <th className="p-4 text-left text-sm font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => {
                const currentStatus = applicant.application_status || 'Pending';
                const isFinalStatus = isStatusFinal(currentStatus);

                return (
                  <React.Fragment key={applicant.applicant_id}>
                    <tr
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
                        !applicant.hr_read ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                      }`}
                    >
                      <td className="p-4 text-gray-800">
                        {applicant.created_at
                          ? new Date(applicant.created_at).toLocaleDateString('en-US')
                          : 'Not specified'}
                      </td>
                      <td className="p-4 text-gray-800">{applicant.fullname || 'Not specified'}</td>
                      <td className="p-4 text-gray-800">{applicant.email || applicant.login_email || 'Not specified'}</td>
                      <td className="p-4 text-gray-800">{applicant.phone_number || 'Not specified'}</td>
                      <td className="p-4 text-gray-800">{applicant.position_title || 'Not specified'}</td>
                      <td className="p-4 text-gray-800">{applicant.dept_name || 'Not specified'}</td>
                      <td className="p-4 text-gray-800">{getEducationSummary(applicant.educations)}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            currentStatus === 'Invited_for_Interview'
                              ? 'bg-orange-100 text-orange-800'
                              : currentStatus === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : currentStatus === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                          data-tooltip-id={`status-tooltip-${applicant.applicant_id}`}
                          data-tooltip-content={currentStatus}
                        >
                          {currentStatus === 'Invited_for_Interview'
                            ? 'Invited for Interview'
                            : currentStatus === 'Approved'
                            ? 'Approved'
                            : currentStatus === 'Rejected'
                            ? 'Rejected'
                            : 'Pending Review'}
                        </span>
                        <Tooltip id={`status-tooltip-${applicant.applicant_id}`} />
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            applicant.hr_read
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {applicant.hr_read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td className="p-4">
                        {isFinalStatus ? (
                          <span className="text-gray-500 text-sm font-medium">Status Finalized</span>
                        ) : (
                          <button
                            onClick={() => openConfirmDialog(applicant.applicant_id, 'Invited_for_Interview')}
                            disabled={updateLoading[applicant.applicant_id]}
                            className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 shadow-sm hover:shadow-md ${
                              updateLoading[applicant.applicant_id]
                                ? 'bg-orange-400 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600'
                            }`}
                            data-tooltip-id={`action-tooltip-${applicant.applicant_id}`}
                            data-tooltip-content="Invite Applicant for Interview"
                            aria-label="Invite for Interview"
                          >
                            {updateLoading[applicant.applicant_id] ? (
                              <Loader2 className="animate-spin w-4 h-4 mx-auto" />
                            ) : (
                              'Invite for Interview'
                            )}
                          </button>
                        )}
                        <Tooltip id={`action-tooltip-${applicant.applicant_id}`} />
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleRow(applicant.applicant_id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          aria-label={`Toggle details for ${applicant.fullname || 'Applicant'}`}
                          data-tooltip-id={`details-tooltip-${applicant.applicant_id}`}
                          data-tooltip-content={expandedRows[applicant.applicant_id] ? 'Hide Details' : 'View Details'}
                        >
                          {expandedRows[applicant.applicant_id] ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                        <Tooltip id={`details-tooltip-${applicant.applicant_id}`} />
                      </td>
                    </tr>
                    {expandedRows[applicant.applicant_id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="11" className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <p>
                                <strong className="text-gray-700">Expected Salary:</strong>{' '}
                                {formatNumber(applicant.expected_salary)}
                              </p>
                              <p><strong className="text-gray-700">Date of Birth:</strong> {applicant.date_of_birth || 'Not specified'}</p>
                              <p><strong className="text-gray-700">Nationality:</strong> {applicant.nationality || 'Not specified'}</p>
                              <p><strong className="text-gray-700">Marital Status:</strong> {applicant.marital_status || 'Not specified'}</p>
                              {applicant.marital_status === 'Married' && (
                                <>
                                  <p><strong className="text-gray-700">Spouse Name:</strong> {applicant.spouse_name || 'Not specified'}</p>
                                  <p><strong className="text-gray-700">Spouse Occupation:</strong> {applicant.spouse_occupation || 'Not specified'}</p>
                                  <p><strong className="text-gray-700">Spouse Workplace:</strong> {applicant.spouse_workplace || 'Not specified'}</p>
                                  <p><strong className="text-gray-700">Number of Children:</strong> {applicant.number_of_children || '0'}</p>
                                </>
                              )}
                              <p><strong className="text-gray-700">Current Address:</strong> {applicant.current_address || 'Not specified'}</p>
                              <p><strong className="text-gray-700">Language Skills:</strong> {applicant.language_skills || 'Not specified'}</p>
                              <p><strong className="text-gray-700">Computer Skills:</strong> {applicant.computer_skills || 'Not specified'}</p>
                            </div>
                            <div className="space-y-3">
                              <p><strong className="text-gray-700">Emergency Contact:</strong> {applicant.emergency_name || 'Not specified'}</p>
                              <p><strong className="text-gray-700">Relationship:</strong> {applicant.emergency_relationship || 'Not specified'}</p>
                              <p><strong className="text-gray-700">Emergency Phone:</strong> {applicant.emergency_phone || 'Not specified'}</p>
                              <p><strong className="text-gray-700">Emergency Address:</strong> {applicant.emergency_address || 'Not specified'}</p>
                              <p>
                                <strong className="text-gray-700">CV:</strong>{' '}
                                {applicant.cv_path ? (
                                  <a
                                    href={`${url.base_url}${applicant.cv_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                    aria-label={`View CV for ${applicant.fullname || 'Applicant'}`}
                                  >
                                    View CV
                                  </a>
                                ) : (
                                  'None'
                                )}
                              </p>
                              <p><strong className="text-gray-700">Photo:</strong></p>
                              {photoErrors[applicant.applicant_id] && (
                                <p className="text-red-500 text-xs mt-1">{photoErrors[applicant.applicant_id]}</p>
                              )}
                              {applicant.photo_path && (
                                <div className="mt-4 relative">
                                  <img
                                    src={`${url.base_url}${applicant.photo_path}`}
                                    alt={`Photo of ${applicant.fullname || 'Applicant'}`}
                                    className="max-w-full h-auto rounded-lg border border-gray-300"
                                    style={{ maxHeight: '200px' }}
                                    onError={() => handleImageError(applicant.applicant_id)}
                                  />
                                </div>
                              )}
                              <p><strong className="text-gray-700">Education:</strong></p>
                              {applicant.educations && applicant.educations.length > 0 ? (
                                <ul className="list-disc pl-5 text-gray-800">
                                  {applicant.educations.map((edu, index) => (
                                    <li key={index}>
                                      {edu.qualification || 'Not specified'} in {edu.major || 'Not specified'}, {edu.institution_name || 'Not specified'} (
                                      {edu.graduation_year || 'Not specified'}, GPA: {edu.gpa || 'Not specified'})
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>None</p>
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
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-blue-900">
                    Confirm Status Update
                  </Dialog.Title>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      Are you sure you want to{' '}
                      <span className="font-medium text-orange-600">invite for interview</span>{' '}
                      this applicant? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium shadow-sm"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium shadow-sm"
                      onClick={handleStatusUpdate}
                    >
                      Invite for Interview
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

export default Dashboard_HR;