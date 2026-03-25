import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ScoresPage from './pages/ScoresPage';
import CharityPage from './pages/CharityPage';
import DrawPage from './pages/DrawPage';
import AdminPage from './pages/AdminPage';

function AppInner() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
        <Route path="/scores" element={<ProtectedRoute><MainLayout><ScoresPage /></MainLayout></ProtectedRoute>} />
        <Route path="/charity" element={<ProtectedRoute><MainLayout><CharityPage /></MainLayout></ProtectedRoute>} />
        <Route path="/draw" element={<ProtectedRoute><MainLayout><DrawPage /></MainLayout></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><MainLayout><AdminPage /></MainLayout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

