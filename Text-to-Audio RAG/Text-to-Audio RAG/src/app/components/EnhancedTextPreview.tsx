// Component to display enhanced text with source attribution

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Sparkles } from 'lucide-react';
import type { EnhancedContent } from '../types/knowledge';

interface EnhancedTextPreviewProps {
  enhancedContent: EnhancedContent;
}

export function EnhancedTextPreview({ enhancedContent }: EnhancedTextPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Enhanced Content Preview
        </CardTitle>
        <CardDescription>
          Compare original input with AI-enhanced content using retrieved context
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enhanced" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="space-y-4">
            <div className="rounded-lg border bg-slate-50 p-4">
              <p className="text-sm text-slate-700">{enhancedContent.originalText}</p>
            </div>
          </TabsContent>

          <TabsContent value="enhanced" className="space-y-4">
            <div className="rounded-lg border bg-gradient-to-br from-amber-50 to-orange-50 p-4">
              <p className="text-sm text-slate-700">{enhancedContent.enhancedText}</p>
            </div>

            {enhancedContent.retrievedSources.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Retrieved Sources</span>
                </div>
                <div className="space-y-2">
                  {enhancedContent.retrievedSources.map((source, index) => (
                    <div
                      key={source.entry.id}
                      className="rounded-lg border bg-white p-3 text-sm"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-medium text-slate-900">{source.entry.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {(source.similarity * 100).toFixed(0)}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {source.entry.content}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {source.entry.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
