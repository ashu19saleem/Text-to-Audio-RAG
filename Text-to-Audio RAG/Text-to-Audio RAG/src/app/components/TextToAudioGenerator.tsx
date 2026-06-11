// Main component for Text-to-Audio generation with RAG

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Volume2, Download, Pause, Play, StopCircle } from 'lucide-react';
import { mockKnowledgeBase } from '../data/mockKnowledgeBase';
import { retrieveRelevantKnowledge, enhanceContent } from '../utils/ragEngine';
import { TextToSpeechService } from '../utils/textToSpeech';
import type { EnhancedContent } from '../types/knowledge';
import { EnhancedTextPreview } from './EnhancedTextPreview';
import { AudioPlayer } from './AudioPlayer';

export function TextToAudioGenerator() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [enhancedContent, setEnhancedContent] = useState<EnhancedContent | null>(null);
  const [ttsService] = useState(() => new TextToSpeechService());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      ttsService.getAvailableVoices();
    };
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, [ttsService]);

  const handleEnhanceText = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some text or topic to enhance.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Step 1: Retrieve relevant knowledge
      setProgress(25);
      await new Promise(resolve => setTimeout(resolve, 500));
      const retrievedResults = retrieveRelevantKnowledge(inputText, mockKnowledgeBase, 3);

      // Step 2: Enhance content
      setProgress(50);
      await new Promise(resolve => setTimeout(resolve, 500));
      const enhanced = enhanceContent(inputText, retrievedResults);

      // Step 3: Complete
      setProgress(100);
      setEnhancedContent(enhanced);

      toast({
        title: 'Content Enhanced',
        description: `Retrieved ${retrievedResults.length} relevant sources to enhance your text.`,
      });
    } catch (error) {
      toast({
        title: 'Enhancement Failed',
        description: 'An error occurred while enhancing the content.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateAudio = async () => {
    if (!enhancedContent) return;

    try {
      setIsPlaying(true);
      setIsPaused(false);
      await ttsService.speak(enhancedContent.enhancedText);
      setIsPlaying(false);
      setIsPaused(false);
    } catch (error) {
      toast({
        title: 'Audio Generation Failed',
        description: 'Failed to generate audio from text.',
        variant: 'destructive',
      });
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      ttsService.resume();
      setIsPaused(false);
    } else {
      ttsService.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    ttsService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleDownload = () => {
    if (!enhancedContent) return;

    toast({
      title: 'Download Feature',
      description: 'Audio download functionality requires a backend service. Currently using Web Speech API for playback only.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Text Input & Enhancement
          </CardTitle>
          <CardDescription>
            Enter your text or topic. We'll retrieve relevant information and enhance your content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              placeholder="Enter your text or topic here... (e.g., 'Explain artificial intelligence and machine learning')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Processing...</span>
                <span className="text-slate-600">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button
            onClick={handleEnhanceText}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Enhance with RAG
          </Button>
        </CardContent>
      </Card>

      {enhancedContent && (
        <>
          <EnhancedTextPreview enhancedContent={enhancedContent} />

          <AudioPlayer
            isPlaying={isPlaying}
            isPaused={isPaused}
            onPlay={handleGenerateAudio}
            onPauseResume={handlePauseResume}
            onStop={handleStop}
            onDownload={handleDownload}
            hasContent={!!enhancedContent}
          />
        </>
      )}
    </div>
  );
}
