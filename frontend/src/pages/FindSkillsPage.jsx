import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import api from '../services/api';

const FindSkillsPage = () => {
  const [filters, setFilters] = useState({ search: '', location: '', level: '' });
  const [matches, setMatches] = useState([]);

  const loadMatches = () => api.get('/matches', { params: filters }).then(({ data }) => setMatches(data));
  useEffect(() => { loadMatches(); }, []);

  const startExchange = async (partner) => {
    await api.post('/exchanges', { partnerId: partner.id, skillTaught: partner.skillsWanted[0], skillLearned: partner.skillsOffered[0] });
    loadMatches();
  };

  return (
    <PageContainer>
      <div className="card grid gap-2 md:grid-cols-4">
        <input className="rounded-xl border p-2" placeholder="Search skills" onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <input className="rounded-xl border p-2" placeholder="Location" onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <select className="rounded-xl border p-2" onChange={(e) => setFilters({ ...filters, level: e.target.value })}><option value="">Any Level</option><option value="1">Level 1</option><option value="2">Level 2</option><option value="3">Level 3</option></select>
        <button className="rounded-xl bg-primary text-white" onClick={loadMatches}>Search</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {matches.map((match) => (
          <div key={match.id} className="card transition hover:-translate-y-1">
            <h3 className="font-semibold">{match.name}</h3>
            <p className="text-sm text-slate-500">{match.location} • Rating {match.rating}</p>
            <p className="mt-2 text-sm">Offers: {match.skillsOffered.join(', ')}</p>
            <p className="text-sm">Wants: {match.skillsWanted.join(', ')}</p>
            <p className="mt-2 text-primary">{match.matchPercentage}% match</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border px-3 py-1">View Profile</button>
              <button className="rounded-lg bg-primary px-3 py-1 text-white" onClick={() => startExchange(match)}>Start Exchange</button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default FindSkillsPage;
