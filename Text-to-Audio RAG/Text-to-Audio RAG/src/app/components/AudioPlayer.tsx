// Audio player component with play/pause/stop/download controls

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Play, Pause, StopCircle, Download } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPauseResume: () => void;
  onStop: () => void;
  onDownload: () => void;
  hasContent: boolean;
}

export function AudioPlayer({
  isPlaying,
  isPaused,
  onPlay,
  onPauseResume,
  onStop,
  onDownload,
  hasContent,
}: AudioPlayerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-500" />
          Audio Generation
        </CardTitle>
        <CardDescription>
          Convert enhanced text to natural speech and download the audio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {!isPlaying ? (
            <Button onClick={onPlay} disabled={!hasContent}>
              <Play className="mr-2 h-4 w-4" />
              Generate & Play Audio
            </Button>
          ) : (
            <>
              <Button onClick={onPauseResume} variant="secondary">
                {isPaused ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                )}
              </Button>
              <Button onClick={onStop} variant="destructive">
                <StopCircle className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </>
          )}
          <Button onClick={onDownload} variant="outline" disabled={!hasContent}>
            <Download className="mr-2 h-4 w-4" />
            Download Audio
          </Button>
        </div>
        
        {isPlaying && (
          <div className="mt-4 rounded-lg border bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-blue-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 24 + 8}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-blue-700">
                {isPaused ? 'Audio Paused' : 'Playing Audio...'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
