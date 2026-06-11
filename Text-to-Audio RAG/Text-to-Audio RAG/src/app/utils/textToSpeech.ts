// Text-to-Speech utility using Web Speech API

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

export class TextToSpeechService {
  private synthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }

  speak(text: string, options: TTSOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.synthesis.speaking) {
        this.synthesis.cancel();
      }

      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.rate = options.rate ?? 1;
      this.utterance.pitch = options.pitch ?? 1;
      this.utterance.volume = options.volume ?? 1;

      if (options.voice) {
        this.utterance.voice = options.voice;
      }

      this.utterance.onend = () => resolve();
      this.utterance.onerror = (error) => reject(error);

      this.synthesis.speak(this.utterance);
    });
  }

  pause(): void {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
    }
  }

  resume(): void {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  stop(): void {
    this.synthesis.cancel();
  }

  isSpeaking(): boolean {
    return this.synthesis.speaking;
  }

  isPaused(): boolean {
    return this.synthesis.paused;
  }
}
