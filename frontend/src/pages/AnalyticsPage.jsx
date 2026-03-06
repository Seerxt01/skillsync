import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from 'recharts';
import PageContainer from '../components/PageContainer';

const data = [
  { month: 'Jan', exchanges: 4, taught: 3, learned: 2, points: 160, success: 80 },
  { month: 'Feb', exchanges: 7, taught: 5, learned: 4, points: 240, success: 85 },
  { month: 'Mar', exchanges: 10, taught: 6, learned: 6, points: 310, success: 91 },
  { month: 'Apr', exchanges: 8, taught: 4, learned: 5, points: 260, success: 88 }
];

const AnalyticsPage = () => (
  <PageContainer>
    <div className="card h-72">
      <h2 className="mb-3 text-lg font-semibold">Points Earned Over Time</h2>
      <ResponsiveContainer width="100%" height="85%"><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area dataKey="points" stroke="#2E8B57" fill="#dff5e5" /></AreaChart></ResponsiveContainer>
    </div>
    <div className="card h-72">
      <h2 className="mb-3 text-lg font-semibold">Exchanges, Skills Taught & Learned</h2>
      <ResponsiveContainer width="100%" height="85%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="exchanges" fill="#2E8B57" /><Bar dataKey="taught" fill="#4CAF50" /><Bar dataKey="learned" fill="#9ad3a7" /></BarChart></ResponsiveContainer>
    </div>
  </PageContainer>
);

export default AnalyticsPage;
