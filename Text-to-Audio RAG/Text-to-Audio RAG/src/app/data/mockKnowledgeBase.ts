// Mock knowledge base with sample documents and embeddings

import type { KnowledgeEntry } from '../types/knowledge';

export const mockKnowledgeBase: KnowledgeEntry[] = [
  {
    id: '1',
    title: 'Introduction to Artificial Intelligence',
    content: 'Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction. AI applications include expert systems, natural language processing, speech recognition, and machine vision.',
    category: 'Technology',
    embedding: [0.8, 0.6, 0.9, 0.7, 0.5],
    dateAdded: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    content: 'Machine learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. It focuses on the development of computer programs that can access data and use it to learn for themselves.',
    category: 'Technology',
    embedding: [0.9, 0.7, 0.8, 0.6, 0.4],
    dateAdded: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Neural Networks Explained',
    content: 'Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) that work together to process complex data inputs. Deep learning uses multiple layers of neural networks to progressively extract higher-level features from raw input.',
    category: 'Technology',
    embedding: [0.85, 0.75, 0.88, 0.65, 0.45],
    dateAdded: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Quantum Computing Basics',
    content: 'Quantum computing harnesses quantum mechanical phenomena like superposition and entanglement to perform computations. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or qubits that can exist in multiple states simultaneously, enabling exponentially faster processing for certain problems.',
    category: 'Science',
    embedding: [0.7, 0.5, 0.6, 0.8, 0.9],
    dateAdded: new Date('2024-02-10'),
  },
  {
    id: '5',
    title: 'History of Computing',
    content: 'The history of computing dates back to ancient times with devices like the abacus. Modern computing began in the 1940s with electronic computers like ENIAC. The invention of the transistor, integrated circuits, and microprocessors revolutionized computing, leading to personal computers, the internet, and mobile devices.',
    category: 'History',
    embedding: [0.6, 0.4, 0.5, 0.7, 0.8],
    dateAdded: new Date('2024-02-15'),
  },
  {
    id: '6',
    title: 'Natural Language Processing',
    content: 'Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and manipulate human language. NLP combines computational linguistics with statistical, machine learning, and deep learning models. Applications include chatbots, translation services, sentiment analysis, and text summarization.',
    category: 'Technology',
    embedding: [0.88, 0.68, 0.82, 0.72, 0.52],
    dateAdded: new Date('2024-03-01'),
  },
  {
    id: '7',
    title: 'Climate Change Science',
    content: 'Climate change refers to long-term shifts in temperatures and weather patterns. Human activities, particularly burning fossil fuels, have been the main driver since the 1800s. This releases greenhouse gases like carbon dioxide and methane, which trap heat in the atmosphere, leading to global warming and environmental changes.',
    category: 'Science',
    embedding: [0.3, 0.4, 0.2, 0.5, 0.6],
    dateAdded: new Date('2024-03-10'),
  },
  {
    id: '8',
    title: 'Renewable Energy Technologies',
    content: 'Renewable energy comes from natural sources that are constantly replenished, including solar, wind, hydroelectric, geothermal, and biomass. These technologies are crucial for reducing carbon emissions and combating climate change. Solar panels convert sunlight to electricity, while wind turbines harness wind energy.',
    category: 'Science',
    embedding: [0.4, 0.5, 0.3, 0.6, 0.7],
    dateAdded: new Date('2024-03-15'),
  },
];
