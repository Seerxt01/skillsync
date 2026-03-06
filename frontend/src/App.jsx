import { Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import MySkillsPage from './pages/MySkillsPage';
import FindSkillsPage from './pages/FindSkillsPage';
import ExchangesPage from './pages/ExchangesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AddSkillsPage from './pages/AddSkillsPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return children;
};

const App = () => (
  <AnimatePresence mode="wait">
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="my-skills" element={<MySkillsPage />} />
        <Route path="add-skills" element={<AddSkillsPage />} />
        <Route path="find-skills" element={<FindSkillsPage />} />
        <Route path="exchanges" element={<ExchangesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AnimatePresence>
);

export default App;
