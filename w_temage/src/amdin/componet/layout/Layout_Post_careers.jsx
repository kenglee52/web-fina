import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Layout_Post_Careers = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Post Careers', path: '' },
    { name: 'Position', path: 'position' },
    { name: 'Department', path: 'department', disabled: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr-dashboard')}
            className="flex items-center gap-2 bg-blue-900 text-white px-3 py-1 rounded-lg hover:bg-slate-300 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h2 className="text-2xl font-bold text-orange-400">HR Manage DATA</h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {navItems.map((item) => {
            if (item.disabled) {
              return (
                <button
                  key={item.name}
                  disabled
                  className="px-4 py-2 rounded-lg font-semibold text-gray-400 cursor-not-allowed"
                >
                  {item.name}
                </button>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition-colors ${isActive ? 'bg-white text-orange-500' : 'hover:bg-blue-500'
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}

        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout_Post_Careers;
