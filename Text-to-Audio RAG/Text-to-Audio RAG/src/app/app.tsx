// Text-to-Audio Web Application with RAG System - Main Entry Point

import { TextToAudioGenerator } from './components/TextToAudioGenerator';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-900">Text-to-Audio RAG System</h1>
          <p className="text-sm text-slate-600">Enhanced content generation with knowledge retrieval</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <TextToAudioGenerator />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
