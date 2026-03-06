import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, LayoutDashboard, Search, Shuffle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/my-skills', label: 'My Skills', icon: Sparkles },
  { to: '/find-skills', label: 'Find Skills', icon: Search },
  { to: '/exchanges', label: 'Exchanges', icon: Shuffle },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 }
];

const AppLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary">SkillSync</h1>
          <div className="text-sm font-medium text-slate-600">Level {user?.level} • {user?.points} XP</div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[220px_1fr]">
        <nav className="card h-fit">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `mb-2 flex items-center gap-2 rounded-xl px-3 py-2 ${isActive ? 'bg-muted text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
          <button onClick={logout} className="mt-2 w-full rounded-xl bg-slate-100 px-3 py-2 text-sm">Logout</button>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
