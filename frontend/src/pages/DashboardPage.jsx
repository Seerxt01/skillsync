import { useEffect, useState } from 'react';
import api from '../services/api';
import PageContainer from '../components/PageContainer';
import StatCard from '../components/StatCard';
import { SkeletonCard } from '../components/Loader';

const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then(({ data: payload }) => setData(payload));
  }, []);

  if (!data) return <div className="grid gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}</div>;

  return (
    <PageContainer>
      <section className="card">
        <h2 className="text-2xl font-bold">Welcome back, {data.user.name}</h2>
        <p className="text-slate-500">Level {data.user.level} learner • {data.user.points} XP</p>
        <div className="mt-3 h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-primary" style={{ width: `${data.progress}%` }} /></div>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Experience Points" value={data.stats.points} />
        <StatCard label="Completed Exchanges" value={data.stats.completed} />
        <StatCard label="Active Exchanges" value={data.stats.active} />
        <StatCard label="Pending Requests" value={data.stats.pending} />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="card"><h3 className="mb-2 font-semibold">Skills I Offer</h3>{data.skillsOffer.map((entry) => <span key={entry._id} className="mr-2 inline-block rounded-full bg-muted px-3 py-1 text-sm">{entry.skill.skillName}</span>)}</div>
        <div className="card"><h3 className="mb-2 font-semibold">Skills I Want To Learn</h3>{data.skillsLearn.map((entry) => <span key={entry._id} className="mr-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm">{entry.skill.skillName}</span>)}</div>
      </section>
      <section className="card">
        <h3 className="font-semibold">Recent Activity</h3>
        {data.activities.map((activity) => <p key={activity._id} className="mt-2 text-sm text-slate-600">{activity.skillTaught} ↔ {activity.skillLearned} • {activity.status}</p>)}
      </section>
    </PageContainer>
  );
};

export default DashboardPage;
