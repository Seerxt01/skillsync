import { useEffect, useState } from 'react';
import api from '../services/api';
import PageContainer from '../components/PageContainer';

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const MySkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ skillName: '', category: 'Popular Skills', type: 'teach', proficiencyLevel: 'Beginner' });

  const load = () => api.get('/skills/mine').then(({ data }) => setSkills(data));
  useEffect(() => { load(); }, []);

  const addSkill = async (e) => {
    e.preventDefault();
    await api.post('/skills/mine', form);
    setForm({ ...form, skillName: '' });
    load();
  };

  return (
    <PageContainer>
      <form onSubmit={addSkill} className="card grid gap-3 md:grid-cols-4">
        <input required value={form.skillName} placeholder="Skill name" className="rounded-xl border p-2" onChange={(e) => setForm({ ...form, skillName: e.target.value })} />
        <select className="rounded-xl border p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="teach">Teach</option><option value="learn">Learn</option></select>
        <select className="rounded-xl border p-2" value={form.proficiencyLevel} onChange={(e) => setForm({ ...form, proficiencyLevel: e.target.value })}>{levels.map((level) => <option key={level}>{level}</option>)}</select>
        <button className="rounded-xl bg-primary text-white">Add Skill</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2">
        {['teach', 'learn'].map((kind) => (
          <div className="card" key={kind}>
            <h3 className="font-semibold">Skills I {kind === 'teach' ? 'Offer' : 'Want to Learn'}</h3>
            {skills.filter((skill) => skill.type === kind).map((skill) => (
              <div key={skill._id} className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 p-2">
                <span>{skill.skill.skillName} • {skill.proficiencyLevel}</span>
                <div className="flex gap-2">
                  <select className="rounded border p-1 text-xs" value={skill.proficiencyLevel} onChange={(e) => api.patch(`/skills/mine/${skill._id}`, { proficiencyLevel: e.target.value }).then(load)}>{levels.map((level) => <option key={level}>{level}</option>)}</select>
                  <button className="text-xs text-red-500" onClick={() => api.delete(`/skills/mine/${skill._id}`).then(load)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default MySkillsPage;
