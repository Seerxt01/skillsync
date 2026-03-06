import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StatCard from '../components/StatCard';

const LandingPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
    <PageContainer>
      <section className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-extrabold text-slate-800">Exchange Skills, Not Money.</h1>
        <p className="mt-4 text-slate-600">Join SkillSync to teach what you know and learn what you love through points-powered collaboration.</p>
        <div className="mt-6 flex gap-4">
          <Link to="/auth" className="rounded-xl bg-primary px-5 py-3 text-white">Start Skill Exchange</Link>
          <button className="rounded-xl border px-5 py-3">Watch Demo</button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        <StatCard label="Total Users" value="12,400+" />
        <StatCard label="Total Exchanges" value="37,900+" />
        <StatCard label="Success Rate" value="92%" />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {['AI-assisted skill matching', 'Community-first learning circles', 'Sustainable access to education'].map((feature) => (
          <div key={feature} className="card">
            <h3 className="font-semibold text-slate-800">{feature}</h3>
            <p className="text-sm text-slate-500">Built for students, creators, and changemakers.</p>
          </div>
        ))}
      </section>
    </PageContainer>
  </div>
);

export default LandingPage;
