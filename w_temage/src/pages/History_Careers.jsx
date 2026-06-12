import React, { useState, useEffect } from 'react';
import { SignedIn, useAuth,SignedOut, useUser } from '@clerk/clerk-react';
import Show_Login from '@/componet/careers/Show_Login';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { url } from '@/componet/unity/Part';

const History_Careers = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
useEffect(() => {
  const fetchApplicants = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const token = await getToken({ template: 'default' });
      const response = await axios.get(`${url.base_url}/api/applicants`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { login_email: email },
      });

      // ✅ เรียงข้อมูลใหม่สุดอยู่บน
      const sortedApplicants = (response.data.applicants || []).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setApplicants(sortedApplicants);
    } catch (err) {
      console.error('❌ Error fetching applicants:', err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to load application history';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  fetchApplicants();
}, [user, getToken]);

  const getStatusBadge = (status) => {
    const baseStyle = 'px-2 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'Pending':
        return `${baseStyle} bg-yellow-100 text-yellow-800`;
      case 'Approved':
        return `${baseStyle} bg-green-100 text-green-800`;
      case 'Rejected':
        return `${baseStyle} bg-red-100 text-red-800`;
      default:
        return `${baseStyle} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <>
      <SignedIn>
        <div className="">
          {/* Logo */}
          <div className="flex justify-start mb-6">
            <img src="/fina-logo-color.png" alt="FINA Logo" className="w-28 h-auto" />
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-orange-500" size={32} />
            </div>
          )}

          {/* No data / error */}
          {!loading && error &&(
            <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-6 text-center animate-fade-in">
              No application history found. Please submit an application!
            </div>
          )}

          {/* Application history table */}
          {!loading && !error && applicants.length > 0 && (
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 animate-fade-in">
              <div className="px-6 py-4 bg-orange-50 border-b border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Application History
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documents
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {applicants.map((applicant) => (
                      <tr
                        key={applicant.applicant_id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {`Position: ${applicant.position_title}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={getStatusBadge(applicant.application_status)}>
                            {applicant.application_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {applicant.created_at
                            ? new Date(applicant.created_at).toLocaleDateString('en-US')
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-3">
                            {applicant.cv_path && (
                              <a
                                href={`${url.base_url}${applicant.cv_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-600 underline"
                              >
                                CV
                              </a>
                            )}
                            {applicant.photo_path && (
                              <a
                                href={`${url.base_url}${applicant.photo_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:text-orange-600 underline"
                              >
                                Photo
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <Show_Login />
      </SignedOut>
    </>
  );
};

export default History_Careers;
