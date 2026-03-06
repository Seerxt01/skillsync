import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import api from '../services/api';

const ExchangesPage = () => {
  const [tab, setTab] = useState('Pending');
  const [exchanges, setExchanges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');

  const load = () => api.get('/exchanges').then(({ data }) => setExchanges(data));
  useEffect(() => { load(); }, []);

  const openChat = async (exchange) => {
    setSelected(exchange);
    const { data } = await api.get(`/exchanges/${exchange._id}/messages`);
    setMessages(data);
  };

  const send = async () => {
    if (!draft.trim() || !selected) return;
    await api.post(`/exchanges/${selected._id}/messages`, { message: draft });
    setDraft('');
    openChat(selected);
  };

  return (
    <PageContainer>
      <div className="flex gap-2">{['Pending', 'Active', 'Completed'].map((name) => <button key={name} className={`rounded-xl px-3 py-1 ${tab === name ? 'bg-primary text-white' : 'bg-white'}`} onClick={() => setTab(name)}>{name}</button>)}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {exchanges.filter((exchange) => exchange.status === tab).map((exchange) => (
            <div key={exchange._id} className="card">
              <p className="font-medium">{exchange.teacher?.name} ↔ {exchange.learner?.name}</p>
              <p className="text-sm">{exchange.skillTaught} / {exchange.skillLearned}</p>
              <p className="text-xs text-slate-500">Started: {new Date(exchange.startDate).toLocaleDateString()}</p>
              <div className="mt-2 flex gap-2">
                <button className="rounded-lg border px-2 py-1 text-xs" onClick={() => openChat(exchange)}>Open Chat</button>
                {exchange.status !== 'Completed' && <button className="rounded-lg bg-primary px-2 py-1 text-xs text-white" onClick={() => api.patch(`/exchanges/${exchange._id}/status`, { status: 'Completed' }).then(load)}>Mark Completed</button>}
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 className="font-semibold">Chat</h3>
          <div className="mt-3 h-64 space-y-2 overflow-auto rounded-xl bg-slate-50 p-3">
            {messages.map((msg) => <p key={msg._id} className="rounded-lg bg-white p-2 text-sm"><b>{msg.sender.name}:</b> {msg.message}</p>)}
          </div>
          <div className="mt-2 flex gap-2"><input value={draft} onChange={(e) => setDraft(e.target.value)} className="w-full rounded-xl border p-2" /><button className="rounded-xl bg-primary px-3 text-white" onClick={send}>Send</button></div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ExchangesPage;
