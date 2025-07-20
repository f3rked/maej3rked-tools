/* global Module */         // provided by whisper.js
importScripts(
  'https://cdn.jsdelivr.net/npm/@ggerganov/whisper.cpp@1.5.0/whisper.js'
);

let ready   = false;
let pcmRing = new Int16Array(0);

self.onmessage = async ({ data }) => {
  switch (data.cmd) {
    case 'load': {
      // one‑time model fetch
      if (ready) break;
      await Module.init(
        { modelPath: data.modelUrl, threads: navigator.hardwareConcurrency }
      );
      ready = true;
      break;
    }
    case 'audio': {
      // append new 128‑frame slice to a sliding 20 s buffer
      const next = new Int16Array(pcmRing.length + data.pcm.length);
      next.set(pcmRing);
      next.set(data.pcm, pcmRing.length);
      pcmRing = next.slice(-32000 * 20);        // 16 kHz × 20 s
      break;
    }
    case 'tick': {
      if (!ready || pcmRing.length === 0) break;
      const text = Module.full({ pcm: pcmRing, sampleRate: 16000, lang: 'en' });
      self.postMessage({ text });
      break;
    }
  }
};
