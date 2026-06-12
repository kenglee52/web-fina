import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SignedOut,SignedIn, SignIn, SignInButton } from '@clerk/clerk-react';
import {
  Briefcase,
  Loader2,
  CheckCircle,
  XCircle,
  Building,
  Users,
  Calendar,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { url } from '@/componet/unity/Part';
import Show_Login from './Show_Login';

const icons = [
  <img src="/fina-logo-color.png" alt="Job Icon 1" className="w-10 h-auto" />,
  <img src="/fina-logo-color.png" alt="Job Icon 1" className="w-14 h-auto" />,
];

const Careers_show = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const currentDate = new Date('2025-10-10');

  // Format date to a readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Check if job post is closed or expired
  const isPostClosedOrExpired = (post) => post.status === 'closed' || isExpired(post.end_date);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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
    fetchJobPosts();
  }, []);

  

  const isExpired = (endDate) => new Date(endDate) <= currentDate;

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  // Mobile Layout
  const MobileLayout = () => (
    <div className="max-w-4xl w-full text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Our company is hiring for various positions
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-center">
          <XCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      ) : jobPosts.length === 0 ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl flex items-center justify-center">
          <XCircle className="w-5 h-5 mr-2" />
          <span>No open positions available at this time</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mb-6">
          {jobPosts.map((post, index) => (
            <div
              key={post.post_id}
              className="flex items-start p-3 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="mr-3 mt-1">{icons[0]}</div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-gray-800 text-base">
                    <span className="font-medium">Positon: </span>
                  {post.position_title || 'Not specified'}
                </h3>
                <p className="text-gray-600 text-xs">
                  <span className="font-medium">Salary Range: </span>
                  {post.title}
                </p>
                <p className="text-gray-600 text-xs">
                  <span className="font-medium">Department: </span>
                  {post.dept_name || 'Not specified'}
                </p>
                <p className="text-gray-600 text-sm font-bold">
                  <span className="font-medium">Quantity: </span>
                  {post.quantity} {post.quantity === 1 ? 'position' : 'positions'}
                </p>
                <p className="text-gray-600 text-xs">
                  <span className="font-medium">Status: </span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      post.status === 'open'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {post.status === 'open' ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    {post.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                </p>
                <p className="text-gray-600 text-xs">
                  <span className="font-medium">Closes: </span>
                  {new Date(post.end_date).toLocaleDateString('en-GB')}
                </p>

                <button
                  className={`mt-2 px-2 py-1 rounded-lg text-white font-semibold text-xs transition-all duration-300 ${
                    isExpired(post.end_date)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                  disabled={isExpired(post.end_date)}
                  onClick={() => openModal(post)}
                >
                 More...
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-gray-500 mb-4">
        Click the button below to sign in and apply for a job!
      </p>

      
      {/* Mobile Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full p-4 shadow-2xl relative transform scale-100 transition-all duration-300 overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all duration-200 p-2 rounded-full hover:bg-red-50"
              aria-label="Close"
            >
              <XCircle size={28} strokeWidth={1.5} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-extrabold text-blue-800 mb-2 leading-tight flex items-center justify-center gap-3">
                <Briefcase className="text-blue-500" size={24} />
                  <span className="font-medium">Positon: </span>
                <span>{selectedPost.position_title || "Job Title"}</span>
              </h2>
               <span className="font-medium">Salary Range: </span>
              <p className="text-gray-600 text-base font-medium">{selectedPost.title}</p>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 mb-8 text-gray-700">
              {/* Department */}
              <div className="flex items-center space-x-3">
                <Building className="text-purple-500 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-xs text-gray-500">Department</p>
                  <p className="text-sm font-medium">{selectedPost.dept_name || 'N/A'}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-3">
                <Users className="text-green-500 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-xs text-gray-500">Openings</p>
                  <p className="text-sm font-medium">{selectedPost.quantity || 1} Positions</p>
                </div>
              </div>

              {/* Application Closes */}
              <div className="flex items-center space-x-3">
                <Calendar className="text-orange-500 flex-shrink-0" size={18} />
                <div>
                  <p className="font-semibold text-xs text-gray-500">Closes On</p>
                  <p className="text-sm font-medium">{formatDate(selectedPost.end_date)}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                <span>Job Description</span>
              </h3>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-gray-700 leading-relaxed text-sm">
                {selectedPost.description ? (
                  <p>{selectedPost.description}</p>
                ) : (
                  <p className="italic text-gray-500">No detailed description provided for this job post.</p>
                )}
              </div>
            </div>

           
            </div>
          </div>
       
      )}
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className=" text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Our company is hiring for various positions
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-center">
          <XCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      ) : jobPosts.length === 0 ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl flex items-center justify-center">
          <XCircle className="w-5 h-5 mr-2" />
          <span>No open positions available at this time</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {jobPosts.map((post, index) => (
            <div
              key={post.post_id}
              className="flex items-start p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="mr-4 mt-1">{icons[1]}</div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">
                    <span className="font-medium">Position: </span>
                    
                  {post.position_title || 'Not specified'}
                </h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Salary Range: </span>
                  {post.title}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Department: </span>
                  {post.dept_name || 'Not specified'}
                </p>
                <p className="text-gray-600 text-base font-bold">
                  <span className="font-medium">Quantity: </span>
                  {post.quantity} {post.quantity === 1 ? 'position' : 'positions'}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Status: </span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      post.status === 'open'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {post.status === 'open' ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    {post.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Closes: </span>
                  {new Date(post.end_date).toLocaleDateString('en-GB')}
                </p>

                <button
                  className={`mt-2 px-2 py-1 rounded-lg text-white font-semibold text-sm transition-all duration-300 ${
                    isExpired(post.end_date)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                  disabled={isExpired(post.end_date)}
                  onClick={() => openModal(post)}
                >
                 More...
                </button>
              </div>
            </div>
          ))}
        </div>
      )}



      {/* Desktop Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative transform scale-100 transition-all duration-300 overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all duration-200 p-2 rounded-full hover:bg-red-50"
              aria-label="Close"
            >
              <XCircle size={28} strokeWidth={1.5} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-3xl font-extrabold text-blue-800 mb-2 leading-tight flex items-center justify-center gap-3">
                <Briefcase className="text-blue-500" size={30} />
                  <span className="font-medium">Positon: </span>
                <span>{selectedPost.position_title || "Job Title"}</span>
              </h2>
               <span className="font-medium">Salary Range: </span>
              <p className="text-gray-600 text-lg font-medium">{selectedPost.title}</p>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 mb-8 text-gray-700">
              {/* Department */}
              <div className="flex items-center space-x-3">
                <Building className="text-purple-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-sm text-gray-500">Department</p>
                  <p className="text-base font-medium">{selectedPost.dept_name || 'N/A'}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-3">
                <Users className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-sm text-gray-500">Openings</p>
                  <p className="text-base font-medium">{selectedPost.quantity || 1} Positions</p>
                </div>
              </div>

              {/* Application Closes */}
              <div className="flex items-center space-x-3">
                <Calendar className="text-orange-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-sm text-gray-500">Closes On</p>
                  <p className="text-base font-medium">{formatDate(selectedPost.end_date)}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="text-blue-600" size={22} />
                <span>Job Description</span>
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 leading-relaxed text-base">
                {selectedPost.description ? (
                  <p>{selectedPost.description}</p>
                ) : (
                  <p className="italic text-gray-500">No detailed description provided for this job post.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-6 bg-white">
      <SignedIn>{isMobile ? <MobileLayout /> : <DesktopLayout />}</SignedIn>

      <SignedOut>
        <Show_Login />
      </SignedOut>
    </div>
    
  );
};

export default Careers_show;