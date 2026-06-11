// Type definitions for knowledge base and RAG system

export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  embedding: number[];
  dateAdded: Date;
}

export interface RetrievalResult {
  entry: KnowledgeEntry;
  similarity: number;
}

export interface EnhancedContent {
  originalText: string;
  enhancedText: string;
  retrievedSources: RetrievalResult[];
}
