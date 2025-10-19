

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import MeetKeriPage from './components/pages/MeetKeriPage';
import TopHorsesPage from './components/pages/TopHorsesPage';
import MeetTheTeamPage from './components/pages/MeetTheTeamPage';
import TrainingPage from './components/pages/TrainingPage';
import PartnershipsPage from './components/pages/PartnershipsPage';
import BloodstockPage from './components/pages/BloodstockPage';
import FacilitiesPage from './components/pages/FacilitiesPage';
import ContactPage from './components/pages/ContactPage';
import { ContentProvider } from './context/ContentContext';
import NewsPage from './components/pages/NewsPage';
import NewsPostPage from './components/pages/NewsPostPage';
import LoginPage from './components/pages/admin/LoginPage';
import AdminLayout from './components/pages/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import ManageHorsesPage from './components/pages/admin/ManageHorsesPage';
import ManageTeamPage from './components/pages/admin/ManageTeamPage';
import ManageNewsPage from './components/pages/admin/ManageNewsPage';
import ManageStatsPage from './components/pages/admin/ManageStatsPage';
import ManageHomepagePage from './components/pages/admin/ManageHomepagePage';
import ManageBrandingPage from './components/pages/admin/ManageBrandingPage';
import ManageMeetKeriPage from './components/pages/admin/ManageMeetKeriPage';
import ManageTrainingPage from './components/pages/admin/ManageTrainingPage';
import ManageFacilitiesPage from './components/pages/admin/ManageFacilitiesPage';
import ManagePartnershipsPage from './components/pages/admin/ManagePartnershipsPage';
import ManageBloodstockPage from './components/pages/admin/ManageBloodstockPage';
import ManageDataPage from './components/pages/admin/ManageDataPage';
import InquiryPage from './components/pages/InquiryPage';
import PartnershipInquiryPage from './components/pages/PartnershipInquiryPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
  return (
    <ContentProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/homepage" element={<ManageHomepagePage />} />
                    <Route path="/branding" element={<ManageBrandingPage />} />
                    <Route path="/stats" element={<ManageStatsPage />} />
                    <Route path="/meet-keri" element={<ManageMeetKeriPage />} />
                    <Route path="/training" element={<ManageTrainingPage />} />
                    <Route path="/facilities" element={<ManageFacilitiesPage />} />
                    <Route path="/partnerships" element={<ManagePartnershipsPage />} />
                    <Route path="/bloodstock" element={<ManageBloodstockPage />} />
                    <Route path="/horses" element={<ManageHorsesPage />} />
                    <Route path="/team" element={<ManageTeamPage />} />
                    <Route path="/news" element={<ManageNewsPage />} />
                    <Route path="/data" element={<ManageDataPage />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/*" element={<MainApp />} />
          </Routes>
        </div>
      </HashRouter>
    </ContentProvider>
  );
};

const MainApp = () => (
  <>
    <Header />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meet-keri" element={<MeetKeriPage />} />
        <Route path="/horses" element={<TopHorsesPage />} />
        <Route path="/team" element={<MeetTheTeamPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:postId" element={<NewsPostPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/partnerships" element={<PartnershipsPage />} />
        <Route path="/bloodstock" element={<BloodstockPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/inquire" element={<InquiryPage />} />
        <Route path="/ownership-inquiry" element={<PartnershipInquiryPage />} />
      </Routes>
    </main>
    <Footer />
  </>
);


export default App;