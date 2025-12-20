import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import GroupCompanies from '@/pages/GroupCompanies';
import Contact from '@/pages/Contact';
import MediaKit from '@/pages/MediaKit';
import VentureProfile from '@/pages/VentureProfile';

// Admin Routes
import Login from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';
import Leads from '@/pages/admin/Leads';
import Content from '@/pages/admin/Content';
import Ventures from '@/pages/admin/Ventures';
import SEO from '@/pages/admin/SEO';
import Timeline from '@/pages/admin/Timeline'; // We need to create this one too based on plan

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - No Layout wrap here, they have their own AdminLayout */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/leads" element={<Leads />} />
        <Route path="/admin/content" element={<Content />} />
        <Route path="/admin/ventures" element={<Ventures />} />
        <Route path="/admin/seo" element={<SEO />} />
        <Route path="/admin/timeline" element={<Timeline />} />

        {/* Public Routes - Wrapped in Main Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/group-companies" element={<GroupCompanies />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/media-kit" element={<MediaKit />} />
              <Route path="/ventures/:ventureId" element={<VentureProfile />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;