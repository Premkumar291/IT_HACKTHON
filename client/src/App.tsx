import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loading pages for performance optimization
const HomePage = lazy(() => import('./pages/HomePage'));
const ProblemsPage = lazy(() => import('./pages/ProblemsPage'));
const GitGuidePage = lazy(() => import('./pages/GitGuidePage'));
const RegisterFormPage = lazy(() => import('./pages/RegisterFormPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// A sleek loading indicator for page transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-neutral-800 font-plus-jakarta">
      <Navbar />
      <main className="flex-grow pt-20">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/git-guide" element={<GitGuidePage />} />
            <Route path="/register" element={<RegisterFormPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-7xl font-black text-white font-outfit mb-4">404</h1>
                <p className="text-neutral-500 text-lg mb-8">This page doesn't exist.</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;

