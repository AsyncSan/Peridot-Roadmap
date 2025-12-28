import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Audio helpers
function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  
  let binary = '';
  const bytes = new Uint8Array(int16.buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);

  return {
    data: base64,
    mimeType: 'audio/pcm;rate=16000',
  };
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class LiveClient {
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private sessionPromise: Promise<any> | null = null;
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();

  constructor() {
    // Client is instantiated in connect()
  }

  async connect(onStatusChange: (status: string) => void) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Ensure AudioContext is active (browsers often suspend it)
      if (this.inputAudioContext.state === 'suspended') {
        await this.inputAudioContext.resume();
      }
      if (this.outputAudioContext.state === 'suspended') {
        await this.outputAudioContext.resume();
      }

      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      onStatusChange('connected');

      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      };

      this.sessionPromise = ai.live.connect({
        ...config,
        callbacks: {
          onopen: () => {
            console.log("Live Session Opened");
            this.startAudioInput();
          },
          onmessage: async (message: LiveServerMessage) => {
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && this.outputAudioContext) {
               await this.playAudio(base64Audio);
             }
             
             const interrupted = message.serverContent?.interrupted;
             if (interrupted) {
               this.stopAllAudio();
             }
          },
          onclose: () => {
            console.log("Live Session Closed");
            onStatusChange('disconnected');
          },
          onerror: (err) => {
            console.error("Live Session Error", err);
            onStatusChange('error');
          }
        }
      });
      
    } catch (error) {
      console.error("Failed to connect live client", error);
      onStatusChange('error');
    }
  }

  private startAudioInput() {
    if (!this.inputAudioContext || !this.stream || !this.sessionPromise) return;

    const source = this.inputAudioContext.createMediaStreamSource(this.stream);
    const scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

    scriptProcessor.onaudioprocess = (e) => {
      if (!this.sessionPromise) return;
      
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmBlob = createBlob(inputData);
      
      this.sessionPromise.then(session => {
        try {
          session.sendRealtimeInput({ media: pcmBlob });
        } catch (e) {
          console.error("Error sending audio frame", e);
        }
      }).catch(err => {
        // Session initialization failed, stop sending
        console.error("Session not ready", err);
      });
    };

    source.connect(scriptProcessor);
    scriptProcessor.connect(this.inputAudioContext.destination);
  }

  private async playAudio(base64: string) {
    if (!this.outputAudioContext) return;

    // Ensure start time is in the future
    this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);

    const audioBuffer = await decodeAudioData(
      decode(base64),
      this.outputAudioContext,
      24000,
      1
    );

    const source = this.outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.outputAudioContext.destination);
    
    source.addEventListener('ended', () => {
      this.sources.delete(source);
    });

    source.start(this.nextStartTime);
    this.nextStartTime += audioBuffer.duration;
    this.sources.add(source);
  }

  private stopAllAudio() {
    this.sources.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    this.sources.clear();
    this.nextStartTime = 0;
  }

  async disconnect() {
    // Clean up streams and contexts
    if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop());
    }
    
    if (this.inputAudioContext) {
        this.inputAudioContext.close();
    }
    
    if (this.outputAudioContext) {
        this.outputAudioContext.close();
    }
    
    this.stream = null;
    this.inputAudioContext = null;
    this.outputAudioContext = null;
    this.sessionPromise = null;
  }
}

export const liveClient = new LiveClient();