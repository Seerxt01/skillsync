import PageContainer from '../components/PageContainer';
import api from '../services/api';

const categories = {
  'Green Skills': ['Wind Energy Systems', 'Electric Vehicle Repair', 'Hydroponic Farming', 'Renewable Energy Consulting', 'Sustainable Architecture'],
  'Popular Skills': ['JavaScript', 'React', 'Node.js', 'Graphic Design', 'Photography', 'Video Editing', 'Digital Marketing', 'Spanish']
};

const AddSkillsPage = () => {
  const add = (skillName, category) => api.post('/skills/mine', { skillName, category, type: 'learn', proficiencyLevel: 'Beginner' });

  return (
    <PageContainer>
      {Object.entries(categories).map(([category, list]) => (
        <section key={category} className="card">
          <h2 className="mb-3 text-xl font-bold">{category}</h2>
          <div className="flex flex-wrap gap-2">
            {list.map((skill) => (
              <button key={skill} onClick={() => add(skill, category)} className="rounded-full border px-3 py-1 text-sm hover:bg-muted">+ {skill}</button>
            ))}
          </div>
        </section>
      ))}
    </PageContainer>
  );
};

export default AddSkillsPage;
