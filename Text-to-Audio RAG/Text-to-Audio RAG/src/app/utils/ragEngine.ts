// RAG (Retrieval-Augmented Generation) engine with embedding similarity search

import type { KnowledgeEntry, RetrievalResult, EnhancedContent } from '../types/knowledge';

// Simulate text-to-embedding conversion (in production, use actual embedding model)
export function generateEmbedding(text: string): number[] {
  const normalized = text.toLowerCase();
  const features = [
    normalized.includes('ai') || normalized.includes('artificial intelligence') ? 0.9 : 0.1,
    normalized.includes('machine learning') || normalized.includes('neural') ? 0.8 : 0.1,
    normalized.includes('compute') || normalized.includes('technology') ? 0.7 : 0.1,
    normalized.includes('quantum') || normalized.includes('science') ? 0.6 : 0.1,
    normalized.includes('history') || normalized.includes('past') ? 0.5 : 0.1,
  ];
  return features;
}

// Calculate cosine similarity between two embeddings
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Retrieve top K most similar knowledge entries
export function retrieveRelevantKnowledge(
  queryText: string,
  knowledgeBase: KnowledgeEntry[],
  topK: number = 3
): RetrievalResult[] {
  const queryEmbedding = generateEmbedding(queryText);
  
  const results = knowledgeBase.map(entry => ({
    entry,
    similarity: cosineSimilarity(queryEmbedding, entry.embedding),
  }));
  
  return results
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

// Enhance user input with retrieved context
export function enhanceContent(
  userInput: string,
  retrievedResults: RetrievalResult[]
): EnhancedContent {
  if (retrievedResults.length === 0) {
    return {
      originalText: userInput,
      enhancedText: userInput,
      retrievedSources: [],
    };
  }
  
  const contextSnippets = retrievedResults
    .filter(r => r.similarity > 0.3)
    .map(r => r.entry.content)
    .join(' ');
  
  const enhancedText = `${userInput}. ${contextSnippets.substring(0, 300)}`;
  
  return {
    originalText: userInput,
    enhancedText,
    retrievedSources: retrievedResults,
  };
}
