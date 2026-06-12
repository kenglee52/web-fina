
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import User_view from '../pages/home/User_view';
import Main_layout from '../LayOut/Main_layout';
import About from '@/pages/About';
import Faq from '@/pages/Support/Faq';
import ContackUs from '@/pages/Support/ContackUs';

import New_event from '@/pages/news/New_event';
import Careers from '@/pages/Careers';
import Career_Layout from '@/LayOut/Career_Layout';
import History_Careers from '@/pages/History_Careers';
import Login from '@/amdin/Login';
import Dashboard_HR from '@/amdin/hr/Dashboard_HR';
import Dashboard_Marketing from '@/amdin/marketing/Dashboard_Marketing';
import Dashboard_Manager from '@/amdin/manager/Dashboard_Manager';
import ProtectedRoute from '@/amdin/componet/ProtectedRoute';
import Department from '@/amdin/hr/Department';
import Posmition from '@/amdin/hr/Posmition';
import Post_Careers from '@/amdin/hr/Post_Careers';
import Layout_Post_careers from '@/amdin/componet/layout/Layout_Post_careers';
import ComingSoonPage from '@/pages/ComingSoonPage';
import Saving_account from '@/pages/production_fina/Saving_account';
import Fixed_deposits from '@/pages/production_fina/Fixed_deposits';
import Services from '@/pages/production_fina/Services';
import Personal_loan from '@/pages/Personal_loan';
import { Fina_Agent } from '@/pages/payment_tranfer/Fina_Agent';
import Fund_tarnsfer from '@/pages/payment_tranfer/Fund_tarnsfer';
import Payment from '@/pages/payment_tranfer/Payment';
import Layout_marketing from '@/amdin/marketing/Layout_marketing';
import Slider_Manage from '@/amdin/marketing/page/Slider_Manage';
import Manage_showporp from '@/amdin/marketing/page/Manage_showporp';
import Promotion_manage from '@/amdin/marketing/page/Promotion_manage';
import Event_New_Mange from '@/amdin/marketing/page/Event_New_Mange';
import Ditail_New from '@/pages/news/Ditail_New';
import Show_envet_news from '@/pages/news/Show_envet_news';
import Promotion_M from '@/pages/news/Promotion_M';
import Promotion_ditail from '@/pages/news/Promotion_ditail';
import Faq_manage from '@/amdin/marketing/page/Faq_manage';
import Careers_show from '@/componet/careers/Careers_show';


const router = createBrowserRouter([
  {
    path: '/',
    element: < Main_layout/>,
    children:[
       { index: true, element: <User_view /> },
       {path: 'about', element: <About />},
       {path: 'support/faq', element: <Faq />},
       {path: 'support/contactus', element: <ContackUs />},

   
       {path: 'news/event', element: <Show_envet_news />},
       {path: 'news/event/:id', element: <Ditail_New />},

       {path: '/comingsoon', element: <ComingSoonPage />,},


       {path: '/saving_account', element: <Saving_account />,},

       {path: '/fixed_deposits', element: <Fixed_deposits />,},

       {path: '/services', element: <Services />,},



       {path: '/personal_loan', element: <Personal_loan />,},

       {path: '/fina_agent', element: <Fina_Agent />,},

       {path: '/fund_tarnsfer', element: <Fund_tarnsfer />,},

       {path: '/payment', element: <Payment />,},

       {path: '/promotion', element: <Promotion_M />,},
       {path: '/promotion/:id', element: <Promotion_ditail />,},




      
    ]
  },



   {
    path: '/careers/',
    element: < Career_Layout/>,
    children:[
       { index: true, element: <Careers /> },
          {path: 'history_careers', element: <History_Careers />},
          {path: 'view_careers', element: <Careers_show />},


      
      
    ]
  },
 {
    path: '/hr-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['hr']}>
        <Dashboard_HR />
      </ProtectedRoute>
    ),
  },

  {
  path: '/admin/jobs/new',
  element: (
    <ProtectedRoute allowedRoles={['hr']}>
      <Layout_Post_careers />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Post_Careers /> },       // default
    { path: 'department', element: <Department /> },
    { path: 'position', element: <Posmition /> },
  ],
},

  {
    path: '/manager-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['manager']}>
        <Dashboard_Manager />
      </ProtectedRoute>
    ),
  },
  {
    path: '/marketing-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['marketing']}>
        <Layout_marketing />
      </ProtectedRoute>
    ),
     children: [
    { index: true, element: <Slider_Manage /> },       // default
    { path: 'manage_showporp', element: <Manage_showporp /> },
    { path: 'promotion_manage', element: <Promotion_manage /> },
    { path: 'event_new_mange', element: <Event_New_Mange /> },
    { path: 'faq_manage', element: <Faq_manage /> },


  ],
  },


  {path:'login_admin', element:<Login />},
  //  {
  //       path: 'authPage',
  //       element: (
  //         <SignedIn>
  //           <AuthPage />
  //         </SignedIn>
  //       ),
  //     },
  //     {
  //       path: 'authPage',
  //       element: (
  //         <SignedOut>
  //           <AuthPage />
  //         </SignedOut>
  //       ),
  //     },

  // {
  //   path: '/home',
  //   element: <Dasboard />,
  // },
  // {
  //   path: '/expen',
  //   element: <Expen />,
  // },
  
 
 
  // {
  //   path: '/report',
  //   element: <Reports />, // Layout หลักของ report
  //   children: [
  //     { index: true, element: <Report_user /> },
  //     { path: 'expenditure', element: <Expenditure_report /> },
  //     {
  //       path: 'income',
        
  //     },
     
  //   ],
  // },
]);

const AppRoute = () => {
  return <RouterProvider router={router} />;
};

export default AppRoute;