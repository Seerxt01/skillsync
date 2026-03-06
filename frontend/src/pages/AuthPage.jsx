import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonSpinner } from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', location: '' });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === 'login') await login({ email: form.email, password: form.password });
      else await signup(form);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex rounded-xl bg-slate-100 p-1">
          {['login', 'signup'].map((name) => (
            <button type="button" key={name} onClick={() => setTab(name)} className={`w-1/2 rounded-lg py-2 capitalize ${tab === name ? 'bg-white shadow-sm' : ''}`}>{name}</button>
          ))}
        </div>
        {tab === 'signup' && <input required placeholder="Name" className="mb-3 w-full rounded-xl border p-3" onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <input required type="email" placeholder="Email" className="mb-3 w-full rounded-xl border p-3" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required type="password" placeholder="Password" className="mb-3 w-full rounded-xl border p-3" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {tab === 'signup' && (
          <>
            <input required type="password" placeholder="Confirm Password" className="mb-3 w-full rounded-xl border p-3" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
            <input required placeholder="Location" className="mb-3 w-full rounded-xl border p-3" onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </>
        )}
        <button className="flex w-full items-center justify-center rounded-xl bg-primary py-3 text-white">{loading ? <ButtonSpinner /> : tab === 'login' ? 'Login' : 'Create Account'}</button>
      </form>
    </div>
  );
};

export default AuthPage;
