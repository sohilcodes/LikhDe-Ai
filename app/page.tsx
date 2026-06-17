'use client';
import { useState } from 'react';

const BACKEND = 'https://likhde-ai-backend.onrender.com';

const features = [
  { id: 'instagram', label: '📸 Instagram Caption', prompt: (t: string) => `Write 3 viral Instagram captions in Hinglish for: ${t}. Add relevant emojis and hashtags.` },
  { id: 'youtube', label: '🎬 YouTube Title/Hook', prompt: (t: string) => `Write 3 catchy YouTube titles and hooks in Hinglish for: ${t}. Make them clickbait but genuine.` },
  { id: 'telegram', label: '📢 Telegram Post', prompt: (t: string) => `Write a Telegram channel post in Hinglish for: ${t}. Make it engaging with emojis.` },
  { id: 'viral', label: '🔥 Viral Hook', prompt: (t: string) => `Write 3 viral social media hooks in Hinglish for: ${t}. First line should stop the scroll.` },
];

export default function Home() {
  const [topic, setTopic] = useState('');
  const [selected, setSelected] = useState('instagram');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const feature = features.find(f => f.id === selected)!;
      const res = await fetch(`${BACKEND}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: feature.prompt(topic) }),
      });
      const data = await res.json();
      setResult(data.content || data.error);
    } catch (e) {
      setResult('Error aa gaya bhai, backend check karo!');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-2 text-purple-400">✍️ LikhDe AI</h1>
      <p className="text-gray-400 mb-8">Viral content generator — Hinglish mein!</p>

      <div className="w-full max-w-xl bg-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {features.map(f => (
            <button
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`p-3 rounded-xl text-sm font-medium transition ${selected === f.id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <textarea
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="Topic likho... (e.g. Phone review, Gym tips)"
          className="w-full bg-gray-800 rounded-xl p-4 text-white placeholder-gray-500 resize-none h-28 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={generate}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white font-bold py-3 rounded-xl transition"
        >
          {loading ? '⏳ Likh raha hoon...' : '🚀 Generate Karo'}
        </button>

        {result && (
          <div className="mt-4 bg-gray-800 rounded-xl p-4 text-gray-200 whitespace-pre-wrap text-sm">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
