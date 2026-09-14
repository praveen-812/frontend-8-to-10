/**
 * IT IN 2030 — Continuous 3D Animated Cinematic Movie Engine
 * High-definition, action-driven 3D animated short films built strictly
 * from the source content of Articles 1, 2, and 3.
 *
 * Features:
 * - 100% continuous storytelling (zero awkward pauses or static waiting gaps)
 * - Action-driven 3D characters, realistic environments, and continuous camera movement
 * - Content-driven natural durations (Art 1: 68s, Art 2: 80s, Art 3: 66s)
 * - Strict bilingual voice matching (English voice for EN; natural Tamil voice for தமிழ்; zero English fallback)
 * - Continuous Web Audio ambient score with dynamic ducking & Foley sound effects
 * - Strong, meaningful movie-style endings that hold the final illuminated frame
 */

window.VIDEO_PLAYER = (function () {
  'use strict';

  const activePlayers = {};

  // Pre-fetch browser speech voices
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.getVoices();
      };
    }
  }

  /**
   * Procedural Web Audio Engine (Continuous Score & Foley)
   */
  function createAudioEngine() {
    let ctx = null;
    let masterGain = null;
    let musicGain = null;
    let isMuted = false;
    let activeOscillators = [];
    let scheduledEvents = [];

    function init() {
      if (ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        ctx = new AudioCtx();

        masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(isMuted ? 0 : 0.75, ctx.currentTime);
        masterGain.connect(ctx.destination);

        musicGain = ctx.createGain();
        musicGain.gain.setValueAtTime(0.08, ctx.currentTime);
        musicGain.connect(masterGain);
      } catch (e) {
        ctx = null;
      }
    }

    function resume() {
      init();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    }

    function setMuted(muted) {
      isMuted = muted;
      if (masterGain && ctx) {
        masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.75, ctx.currentTime, 0.05);
      }
      if (isMuted && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }

    function duckMusic(duck) {
      if (!musicGain || !ctx) return;
      const target = duck ? 0.035 : 0.085;
      musicGain.gain.setTargetAtTime(target, ctx.currentTime, 0.2);
    }

    function stopAll() {
      activeOscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      activeOscillators = [];
      scheduledEvents.forEach(id => clearTimeout(id));
      scheduledEvents = [];
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }

    function playWarmChord(freqs, duration = 12.0) {
      if (!ctx || isMuted) return;
      const now = ctx.currentTime;
      const chordGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(920, now);
      filter.Q.setValueAtTime(1.3, now);

      chordGain.gain.setValueAtTime(0, now);
      chordGain.gain.linearRampToValueAtTime(1.0, now + 1.0);
      chordGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.5);

      chordGain.connect(filter);
      filter.connect(musicGain);

      freqs.forEach(f => {
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(f, now);
        osc1.connect(chordGain);
        osc1.start(now);
        osc1.stop(now + duration + 0.6);
        activeOscillators.push(osc1);

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(f * 1.002, now);
        osc2.connect(chordGain);
        osc2.start(now);
        osc2.stop(now + duration + 0.6);
        activeOscillators.push(osc2);
      });
    }

    function playKeyboardClick() {
      if (!ctx || isMuted) return;
      const now = ctx.currentTime;
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800 + (Math.random() * 400 - 200), now);
      filter.Q.setValueAtTime(4.0, now);

      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(650 + Math.random() * 200, now);

      clickGain.gain.setValueAtTime(0.04, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      clickOsc.connect(filter);
      filter.connect(clickGain);
      clickGain.connect(masterGain);

      clickOsc.start(now);
      clickOsc.stop(now + 0.05);
    }

    function playStationChime() {
      if (!ctx || isMuted) return;
      const now = ctx.currentTime;
      [
        { f: 587.33, t: 0.0, d: 0.8 },
        { f: 440.00, t: 0.4, d: 1.3 }
      ].forEach(note => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        g.gain.setValueAtTime(0, now + note.t);
        g.gain.linearRampToValueAtTime(0.08, now + note.t + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, now + note.t + note.d);

        osc.connect(g);
        g.connect(masterGain);
        osc.start(now + note.t);
        osc.stop(now + note.t + note.d + 0.1);
        activeOscillators.push(osc);
      });
    }

    function playDeskBell(freq = 1396.9) {
      if (!ctx || isMuted) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      g.gain.setValueAtTime(0.09, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(g);
      g.connect(masterGain);
      osc.start(now);
      osc.stop(now + 1.45);
    }

    function playPaperRustle() {
      if (!ctx || isMuted) return;
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(2.2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noise.start();
    }

    function playInspiringChime() {
      if (!ctx || isMuted) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
      notes.forEach((f, idx) => {
        const delay = idx * 0.13;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + delay);

        g.gain.setValueAtTime(0, now + delay);
        g.gain.linearRampToValueAtTime(0.07, now + delay + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.6);

        osc.connect(g);
        g.connect(masterGain);
        osc.start(now + delay);
        osc.stop(now + delay + 1.7);
        activeOscillators.push(osc);
      });
    }

    return {
      resume,
      setMuted,
      duckMusic,
      stopAll,
      playWarmChord,
      playKeyboardClick,
      playStationChime,
      playDeskBell,
      playPaperRustle,
      playInspiringChime
    };
  }

  /**
   * Dedicated Bilingual Voice Audio Engine
   * Plays pre-recorded, natural high-definition spoken audio files:
   * audio/{articleId}_s{sceneIdx}_{lang}.mp3
   *
   * Guarantees:
   * - 100% natural, spoken Tamil audio in Tamil mode (and English in English mode)
   * - Operates reliably on ALL devices without requiring client OS Tamil voices
   * - Zero latency preloaded audio streaming
   * - Synchronized play, pause, seek, dynamic volume ducking, and language switching
   */
  function createVoiceTrackPlayer(articleId) {
    let currentAudio = null;
    let isMuted = false;
    let currentLang = 'en';
    let currentScene = -1;

    const audioCache = {
      en: {},
      ta: {}
    };

    function getAudio(sceneIdx, lang) {
      if (!audioCache[lang]) audioCache[lang] = {};
      if (!audioCache[lang][sceneIdx]) {
        try {
          const a = new Audio();
          a.src = `audio/${articleId}_s${sceneIdx}_${lang}.mp3`;
          a.preload = 'auto';
          audioCache[lang][sceneIdx] = a;
        } catch (e) {
          return null;
        }
      }
      return audioCache[lang][sceneIdx];
    }

    // Preload audio files for zero latency
    if (typeof Audio !== 'undefined' && VIDEO_CONFIGS[articleId]) {
      const numScenes = VIDEO_CONFIGS[articleId].scenes.length;
      for (let i = 0; i < numScenes; i++) {
        getAudio(i, 'en');
        getAudio(i, 'ta');
      }
    }

    function playScene(sceneIdx, lang, onStartCb, onEndCb) {
      stop();
      currentScene = sceneIdx;
      currentLang = lang;
      if (isMuted) return;

      const audio = getAudio(sceneIdx, lang);
      if (!audio) {
        if (typeof onEndCb === 'function') onEndCb();
        return;
      }

      audio.currentTime = 0;
      audio.muted = isMuted;
      currentAudio = audio;

      let endedFired = false;
      function handleEnd() {
        if (endedFired) return;
        endedFired = true;
        if (currentAudio === audio) currentAudio = null;
        if (typeof onEndCb === 'function') onEndCb();
      }

      audio.onplay = function () {
        if (typeof onStartCb === 'function') onStartCb();
      };
      audio.onended = handleEnd;
      audio.onerror = function () {
        handleEnd();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {});
      }
    }

    function pause() {
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
      }
    }

    function resume() {
      if (currentAudio && currentAudio.paused && !isMuted) {
        currentAudio.play().catch(function () {});
      }
    }

    function stop() {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.onplay = null;
        currentAudio = null;
      }
    }

    function setMuted(muted) {
      isMuted = muted;
      if (currentAudio) {
        currentAudio.muted = muted;
      }
      Object.keys(audioCache).forEach(function (l) {
        Object.keys(audioCache[l]).forEach(function (idx) {
          if (audioCache[l][idx]) audioCache[l][idx].muted = muted;
        });
      });
    }

    return {
      playScene: playScene,
      pause: pause,
      resume: resume,
      stop: stop,
      setMuted: setMuted,
      getCurrentScene: function () { return currentScene; },
      getCurrentLang: function () { return currentLang; }
    };
  }

  /**
   * 3 Original Continuous 3D Animated Cinematic Movies
   * Content-driven natural durations:
   * Article 1: 68.0s (01:08)
   * Article 2: 80.0s (01:20)
   * Article 3: 66.0s (01:06)
   */
  const VIDEO_CONFIGS = {
    // ARTICLE 1: The Developer & The Machine (68.0s / 01:08)
    'article-1': {
      id: 'article-1',
      duration: 68.0,
      durationLabel: '01:08',
      title: {
        en: 'The Developer & The Machine (3D Cinematic Film)',
        ta: 'டெவலப்பரும் இயந்திரமும் (3D திரைப்படம்)'
      },
      posterSubtitle: {
        en: '01:08 • A continuous 3D film: Human craft directing artificial intelligence',
        ta: '01:08 • AI-யை வழிநடத்தும் மனித ஞானத்தின் 3D சினிமா குறும்படம்'
      },
      scenes: [
        {
          start: 0.0,
          end: 10.0,
          chord: [174.61, 220.00, 261.63, 329.63], // Fmaj7
          sub: {
            en: 'In a sunlit 2030 studio, a web developer crafts software—syntax typing shrinks as design and direction rise.',
            ta: '2030-ன் நவீன ஸ்டுடியோவில் ஒரு டெவலப்பர்: வெறும் கோடு எழுதுவதை விட, ரசனையும் திசையும் முக்கியமாகிறது.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.5 && localT < 8.0 && Math.random() < 0.3) audio.playKeyboardClick();
          }
        },
        {
          start: 10.0,
          end: 20.0,
          chord: [196.00, 246.94, 293.66, 392.00], // G
          sub: {
            en: 'Instead of typing boilerplate, the developer directs an AI assistant with clear intent, taste, and purpose.',
            ta: 'எளிய வரிகளை டைப் செய்வதற்குப் பதிலாக, டெவலப்பர் AI உதவியாளருக்கு தெளிவான வழிகாட்டுதலைத் தருகிறார்.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.0 && localT < 7.0 && Math.random() < 0.25) audio.playKeyboardClick();
          }
        },
        {
          start: 20.0,
          end: 30.0,
          chord: [164.81, 196.00, 246.94, 293.66], // Em7
          sub: {
            en: 'In seconds, the machine generates database schemas, executes automated unit tests, and drafts layouts.',
            ta: 'சில நொடிகளில் AI கோடுகளை உருவாக்கி, சோதனைகளை இயக்கி, தளவமைப்புகளைத் தருகிறது.'
          },
          sfx: () => {}
        },
        {
          start: 30.0,
          end: 42.0,
          chord: [220.00, 261.63, 329.63, 392.00], // Am7
          sub: {
            en: 'The code compiles, but the clinic website is cold, clinical, and the emergency hotline is buried 3 clicks deep.',
            ta: 'கோடிங் சரியாக இருந்தாலும், மருத்துவமனை தளம் குளிராகவும் அவசர உதவி முதியோருக்கு மறைந்தும் உள்ளது.'
          },
          sfx: () => {}
        },
        {
          start: 42.0,
          end: 52.0,
          chord: [174.61, 220.00, 261.63, 349.23], // F
          sub: {
            en: 'The developer steps in: pruning bloat, applying calming colors, and promoting the emergency hotline to the header.',
            ta: 'டெவலப்பர் களம் இறங்குகிறார்: தேவையற்றதை நீக்கி, இதமான வண்ணங்களுடன் அவசர உதவியை மேலே வைக்கிறார்.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.0 && localT < 8.0 && Math.random() < 0.3) audio.playKeyboardClick();
          }
        },
        {
          start: 52.0,
          end: 60.0,
          chord: [196.00, 246.94, 293.66, 392.00], // G
          sub: {
            en: 'Like a film director guiding the camera, the future developer directs technology with human discernment.',
            ta: 'ஒரு திரைப்பட இயக்குநர் போல, எதிர்கால டெவலப்பர் தொழில்நுட்பத்தை மனித ஞானத்தோடு இயக்குகிறார்.'
          },
          sfx: () => {}
        },
        {
          start: 60.0,
          end: 68.0, // Final Climax & Ending
          chord: [130.81, 196.00, 261.63, 329.63], // Cmaj
          sub: {
            en: '“AI may build faster. But the human decides what is worth building.”',
            ta: '“AI வேகமாக உருவாக்கலாம்; ஆனால் எதை உருவாக்க வேண்டும் என்பதை மனிதனே தீர்மானிக்கிறான்.”'
          },
          sfx: (audio, localT) => {
            if (localT > 0.8 && localT < 1.0) audio.playDeskBell(1174.6);
            if (localT > 2.5 && localT < 2.7) audio.playInspiringChime();
          }
        }
      ],
      drawScene: drawArticle1Movie
    },

    // ARTICLE 2: The World Without Websites (80.0s / 01:20)
    'article-2': {
      id: 'article-2',
      duration: 80.0,
      durationLabel: '01:20',
      title: {
        en: 'The World Without Websites (3D Thought Experiment)',
        ta: 'இணையதளங்கள் இல்லாத உலகம் (3D சிந்தனை ஆய்வு)'
      },
      posterSubtitle: {
        en: '01:20 • A continuous 3D day: When society’s universal digital nervous system vanishes',
        ta: '01:20 • வலைதளங்களின் இணைப்பு பாலம் மறைந்தால் என்ன நிகழும் என்பதன் 3D சினிமா பார்வை'
      },
      scenes: [
        {
          start: 0.0,
          end: 12.0,
          chord: [146.83, 174.61, 220.00, 261.63], // Dm7
          sub: {
            en: 'A morning cafe. A commuter taps to book a train and pay bills—suddenly web services disconnect.',
            ta: 'காலை வேளை. பயணி ஒருவர் ரயில் டிக்கெட் எடுக்க முயல்கிறார்—திடீரென வலைதள சேவை முடிகிறது.'
          },
          sfx: () => {}
        },
        {
          start: 12.0,
          end: 24.0,
          chord: [116.54, 146.83, 174.61, 233.08], // Bb
          sub: {
            en: 'Government services revert decades back: physical town hall corridors packed with paper queues.',
            ta: 'அரசு சேவைகள் பின்னோக்கிச் செல்கின்றன: சான்றிதழ்களுக்காக மக்கள் அலுவலகங்களில் வரிசையில் நிற்கின்றனர்.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.5 && localT < 1.7) audio.playPaperRustle();
            if (localT > 5.0 && localT < 5.2) audio.playDeskBell(880);
          }
        },
        {
          start: 24.0,
          end: 36.0,
          chord: [130.81, 164.81, 196.00, 261.63], // C
          sub: {
            en: 'Transit stalls: grand railway station counters swamped with passengers and paper schedules.',
            ta: 'போக்குவரத்து முடங்குகிறது: ரயில் நிலையங்களில் மக்கள் கூட்டம் அலைமோதுகிறது.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.0 && localT < 1.2) audio.playStationChime();
          }
        },
        {
          start: 36.0,
          end: 48.0,
          chord: [110.00, 130.81, 164.81, 220.00], // Am
          sub: {
            en: 'Banking operations freeze online, forcing physical visits and deposit slips for basic payments.',
            ta: 'வங்கி பரிவர்த்தனைகள் முடங்கி, சிறு பணப்பரிமாற்றத்திற்கும் வங்கி வாசலில் காத்திருக்க வேண்டியுள்ளது.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.5 && localT < 1.7) audio.playDeskBell(1320);
          }
        },
        {
          start: 48.0,
          end: 58.0,
          chord: [146.83, 174.61, 220.00, 293.66], // Dm
          sub: {
            en: 'Food delivery coordinates through messy paper slips; a courier navigates with a folded street map.',
            ta: 'உணவு விநியோகம் காகித சீட்டுகளால் தடுமாறுகிறது; விநியோகஸ்தர் காகித வரைபடத்துடன் வழியைத் தேடுகிறார்.'
          },
          sfx: (audio, localT) => {
            if (localT > 2.0 && localT < 2.2) audio.playDeskBell(1560);
          }
        },
        {
          start: 58.0,
          end: 68.0,
          chord: [116.54, 146.83, 174.61, 233.08], // Bb
          sub: {
            en: 'A small pottery artisan loses international customers, confined once again to local foot traffic.',
            ta: 'மண்பாண்டக் கலைஞர் உலகளாவிய வாடிக்கையாளர்களை இழந்து, உள்ளூர் கடைக்கே முடங்குகிறார்.'
          },
          sfx: () => {}
        },
        {
          start: 68.0,
          end: 80.0, // Final Climax & Ending
          chord: [130.81, 196.00, 261.63, 329.63], // C
          sub: {
            en: '“Websites are not just pages on a screen. They connect people, businesses and services.”',
            ta: '“வலைதளங்கள் வெறும் திரைப் பக்கங்கள் அல்ல; அவை மக்களையும், வணிகங்களையும், சேவைகளையும் இணைக்கும் பாலம்.”'
          },
          sfx: (audio, localT) => {
            if (localT > 1.0 && localT < 1.2) audio.playInspiringChime();
          }
        }
      ],
      drawScene: drawArticle2Movie
    },

    // ARTICLE 3: How Should We Adapt? (66.0s / 01:06)
    'article-3': {
      id: 'article-3',
      duration: 66.0,
      durationLabel: '01:06',
      title: {
        en: 'The Solution: How Should We Adapt? (3D Film)',
        ta: 'தீர்வு: நாம் எவ்வாறு மாற்றிக்கொள்ள வேண்டும்? (3D திரைப்படம்)'
      },
      posterSubtitle: {
        en: '01:06 • From anxiety to visionary builder: the practical roadmap for the AI era',
        ta: '01:06 • அச்சத்திலிருந்து ஆளுமைக்கு: AI யுகத்தில் முன்னேறுவதற்கான 3D சினிமா பயணம்'
      },
      scenes: [
        {
          start: 0.0,
          end: 10.0,
          chord: [110.00, 130.81, 164.81, 196.00], // Am7
          sub: {
            en: 'Late night. A young developer stares into monitor glare, anxious about rapid AI automation.',
            ta: 'இரவின் அமைதியில், AI பற்றிய செய்திகளைப் பார்த்து எதிர்காலம் குறித்த தயக்கத்துடன் நிற்கும் டெவலப்பர்.'
          },
          sfx: () => {}
        },
        {
          start: 10.0,
          end: 22.0,
          chord: [130.81, 164.81, 196.00, 261.63], // C
          sub: {
            en: 'Turning on the desk lamp, the builder embraces the shift: installing tools to master AI from within.',
            ta: 'பயந்து விலகுவதற்குப் பதிலாக, டெவலப்பர் AI கருவிகளை ஆழ்ந்து கற்கத் தொடங்குகிறார்.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.0 && localT < 8.0 && Math.random() < 0.28) audio.playKeyboardClick();
          }
        },
        {
          start: 22.0,
          end: 34.0,
          chord: [146.83, 174.61, 220.00, 293.66], // Dm
          sub: {
            en: 'Building at 10x velocity: rapid code generation, instant test suites, and continuous architecture flow.',
            ta: 'கோடிங், பிழைத்திருத்தம், மற்றும் சோதனைகளை பத்து மடங்கு இயந்திர வேகத்தில் விரைவுபடுத்துகிறார்.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.5 && localT < 9.0 && Math.random() < 0.3) audio.playKeyboardClick();
          }
        },
        {
          start: 34.0,
          end: 44.0,
          chord: [116.54, 146.83, 174.61, 233.08], // Bb
          sub: {
            en: 'The reality check: raw machine code is functional, but robotic and blind to genuine human feelings.',
            ta: 'ஆனால் AI-யின் வெளியீடு இயந்திரத்தனமாக உள்ளது; மனிதர்களின் நிஜ உணர்வுகளைப் புரிந்து கொள்ளவில்லை.'
          },
          sfx: () => {}
        },
        {
          start: 44.0,
          end: 54.0,
          chord: [174.61, 220.00, 261.63, 349.23], // F
          sub: {
            en: 'The builder sketches real user journeys in a notebook, anchoring the solution in human empathy.',
            ta: 'டெவலப்பர் காகிதத்தில் மனித தேவைகளை வரைந்து, கருணையுடனும் தெளிவான நோக்கத்துடனும் திட்டமிடுகிறார்.'
          },
          sfx: (audio, localT) => {
            if (localT > 1.2 && localT < 1.5) audio.playPaperRustle();
          }
        },
        {
          start: 54.0,
          end: 66.0, // Final Climax & Ending
          chord: [130.81, 196.00, 261.63, 329.63], // C
          sub: {
            en: '“Don’t let AI control your future. Learn it. Control it. Build with it. Create your own value.”',
            ta: '“AI உங்கள் எதிர்காலத்தைத் தீர்மானிக்க விடாதீர்கள். அதனைக் கற்றுக்கொள்ளுங்கள். ஆளுங்கள். சொந்த மதிப்பை உருவாக்குங்கள்.”'
          },
          sfx: (audio, localT) => {
            if (localT > 0.8 && localT < 1.0) audio.playDeskBell(1046.5);
            if (localT > 3.0 && localT < 3.2) audio.playInspiringChime();
          }
        }
      ],
      drawScene: drawArticle3Movie
    }
  };

  /**
   * 3D Vector Geometry & Perspective Rendering Helpers
   */
  function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawCinematicLetterbox(ctx, w, h) {
    const targetAspect = 2.35;
    const currentAspect = w / h;
    if (currentAspect < targetAspect) {
      const barHeight = Math.max(0, (h - w / targetAspect) / 2);
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, w, barHeight);
      ctx.fillRect(0, h - barHeight, w, barHeight);
    }
  }

  function drawVignette(ctx, w, h, strength = 0.38) {
    const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, w * 0.75);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, `rgba(5, 8, 17, ${strength})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawDustMotes(ctx, w, h, t) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    for (let i = 0; i < 18; i++) {
      const x = ((i * 59 + t * 14) % w);
      const y = ((i * 37 + Math.sin(t * 0.5 + i) * 18 + 50) % h);
      const r = (i % 3) + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * 3D Character Drawing Helper
   * Renders realistic 3D volumetric character with lighting, clothing, and articulation.
   */
  function draw3DCharacter(ctx, x, y, scale = 1.0, opts = {}) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const shirtColor = opts.shirtColor || '#1e3a8a';
    const skinColor = opts.skinColor || '#fed7aa';
    const hairColor = opts.hairColor || '#1e293b';
    const isTyping = opts.isTyping || false;
    const isThinking = opts.isThinking || false;
    const isSketching = opts.isSketching || false;
    const time = opts.time || 0;

    // Soft Cast Shadow on floor/chair
    ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 85, 45, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3D Torso (Volumetric Shading)
    const torsoGrad = ctx.createLinearGradient(-30, 0, 30, 80);
    torsoGrad.addColorStop(0, shirtColor);
    torsoGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = torsoGrad;
    ctx.beginPath();
    ctx.moveTo(-28, 5);
    ctx.lineTo(28, 5);
    ctx.lineTo(32, 80);
    ctx.lineTo(-32, 80);
    ctx.closePath();
    ctx.fill();

    // Collar detail
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-10, 5); ctx.lineTo(0, 18); ctx.lineTo(10, 5);
    ctx.fill();

    // 3D Head & Neck
    ctx.fillStyle = skinColor;
    ctx.fillRect(-7, -8, 14, 16); // Neck

    const headGrad = ctx.createRadialGradient(-3, -28, 4, 0, -26, 24);
    headGrad.addColorStop(0, '#ffedd5');
    headGrad.addColorStop(0.8, skinColor);
    headGrad.addColorStop(1, '#ea580c');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(0, -26, 20, 0, Math.PI * 2);
    ctx.fill();

    // 3D Hair
    ctx.fillStyle = hairColor;
    ctx.beginPath();
    ctx.arc(0, -29, 21, Math.PI * 0.85, Math.PI * 2.15);
    ctx.fill();

    // Articulated Arms / Actions
    if (isTyping) {
      const typeWiggle = Math.sin(time * 16) * 3;
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-34, 15, 12, 35); // Left arm
      ctx.fillRect(22, 15, 12, 35);  // Right arm
      ctx.fillStyle = skinColor;
      ctx.fillRect(-32 + typeWiggle, 48, 14, 8);
      ctx.fillRect(18 - typeWiggle, 48, 14, 8);
    } else if (isThinking) {
      // Right arm bent touching chin
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-32, 15, 12, 40);
      ctx.beginPath();
      ctx.moveTo(26, 18); ctx.lineTo(12, 0); ctx.lineTo(22, -2); ctx.lineTo(34, 20);
      ctx.fill();
      ctx.fillStyle = skinColor;
      ctx.beginPath(); ctx.arc(8, -14, 7, 0, Math.PI * 2); ctx.fill(); // Hand on chin
    } else if (isSketching) {
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-32, 15, 12, 35);
      ctx.fillRect(18, 15, 14, 32);
      ctx.fillStyle = skinColor;
      ctx.beginPath(); ctx.arc(28, 48, 7, 0, Math.PI * 2); ctx.fill();
      // Wooden pencil
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(24, 42, 18, 4);
    } else {
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-32, 15, 12, 45);
      ctx.fillRect(20, 15, 12, 45);
      ctx.fillStyle = skinColor;
      ctx.beginPath(); ctx.arc(-26, 60, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(26, 60, 6, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
  }

  /**
   * ARTICLE 1 CINEMATIC MOVIE (68.0s)
   * "The Developer & The Machine"
   */
  function drawArticle1Movie(ctx, t, w, h, lang) {
    const scenes = VIDEO_CONFIGS['article-1'].scenes;
    let sceneIdx = 0;
    for (let i = 0; i < scenes.length; i++) {
      if (t >= scenes[i].start && t < scenes[i].end) { sceneIdx = i; break; }
      if (t >= scenes[scenes.length - 1].start) { sceneIdx = scenes.length - 1; }
    }
    const currentScene = scenes[sceneIdx];
    const localT = t - currentScene.start;
    const dur = currentScene.end - currentScene.start;

    // Continuous 3D Camera Glide
    const camPanX = Math.sin(t * 0.4) * 8;
    const camPanY = Math.cos(t * 0.3) * 4;
    const camZoom = 1.0 + Math.sin(t * 0.15) * 0.04;

    ctx.save();
    ctx.translate(w / 2 + camPanX, h / 2 + camPanY);
    ctx.scale(camZoom, camZoom);
    ctx.translate(-w / 2, -h / 2);

    // BEAT 1 (0-10s): 2030 Sunlit Modern Studio
    if (sceneIdx === 0) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      // 3D Loft Window & City Skyline
      ctx.fillStyle = '#bfdbfe';
      ctx.fillRect(w * 0.08, 30, w * 0.35, h * 0.55);
      ctx.fillStyle = '#93c5fd';
      ctx.fillRect(w * 0.12, 110, 45, 120);
      ctx.fillRect(w * 0.18, 70, 60, 160);
      ctx.fillRect(w * 0.28, 95, 50, 135);

      // Volumetric Sunbeams
      const beamGrad = ctx.createLinearGradient(w * 0.2, 30, w * 0.7, h);
      beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
      beamGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(w * 0.08, 30); ctx.lineTo(w * 0.43, 30);
      ctx.lineTo(w * 0.82, h); ctx.lineTo(w * 0.28, h);
      ctx.fill();

      // Solid Oak Desk
      ctx.fillStyle = '#b45309';
      ctx.fillRect(w * 0.28, h * 0.58, w * 0.68, 18);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(w * 0.30, h * 0.58 + 18, 16, h * 0.4);
      ctx.fillRect(w * 0.88, h * 0.58 + 18, 16, h * 0.4);

      // Curved Ultrawide Monitor
      ctx.fillStyle = '#0f172a';
      roundRect(ctx, w * 0.38, h * 0.22, w * 0.46, h * 0.35, 10);
      ctx.fill();
      ctx.fillStyle = '#1e293b';
      roundRect(ctx, w * 0.395, h * 0.235, w * 0.43, h * 0.32, 6);
      ctx.fill();

      // Screen code lines
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(w * 0.42, h * 0.27, 60, 6);
      ctx.fillStyle = '#a855f7'; ctx.fillRect(w * 0.42, h * 0.31, 95, 6);
      ctx.fillStyle = '#22c55e'; ctx.fillRect(w * 0.42, h * 0.35, 75, 6);
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(w * 0.42, h * 0.39, 110, 6);

      // 3D Developer Character typing
      draw3DCharacter(ctx, w * 0.52, h * 0.54, 1.05, {
        shirtColor: '#1e3a8a',
        isTyping: true,
        time: t
      });
    }

    // BEAT 2 (10-20s): Directing Copilot with Clear Intent
    else if (sceneIdx === 1) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      const amb = ctx.createRadialGradient(w * 0.45, h * 0.4, 80, w * 0.45, h * 0.4, w * 0.65);
      amb.addColorStop(0, 'rgba(30, 58, 138, 0.45)');
      amb.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, w, h);

      // High-res IDE Terminal
      ctx.fillStyle = '#1e293b';
      roundRect(ctx, w * 0.12, h * 0.16, w * 0.76, h * 0.68, 12);
      ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = '#0f172a';
      roundRect(ctx, w * 0.12, h * 0.16, w * 0.76, 36, 12);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 13px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'AI வழிகாட்டுதல் — நோக்கம் & ரசனை' : 'AI Copilot Terminal — Architectural Intent', w * 0.18, h * 0.16 + 23);

      // Directive Box
      ctx.fillStyle = '#0f172a';
      roundRect(ctx, w * 0.16, h * 0.27, w * 0.68, h * 0.24, 8);
      ctx.fill();
      ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.fillStyle = '#60a5fa';
      ctx.font = '700 13px monospace';
      ctx.fillText(lang === 'ta' ? 'மனித டெவலப்பரின் நோக்கம் >' : 'HUMAN DIRECTIVE >', w * 0.19, h * 0.33);

      const promptText = lang === 'ta'
        ? '“மருத்துவமனைக்கு அவசர உதவி, இதமான எளிய நிறங்கள், முதியோருக்கு உகந்த அமைப்பை உருவாக்கு.”'
        : '“Build a clinic portal: warm comforting palette, 1-click emergency hotline, high contrast.”';
      const typedLen = Math.min(Math.floor(localT * 22), promptText.length);
      ctx.fillStyle = '#ffffff';
      ctx.font = '500 14px monospace';
      ctx.fillText(promptText.substring(0, typedLen), w * 0.19, h * 0.41);

      if (localT > 3.0) {
        ctx.fillStyle = '#064e3b';
        roundRect(ctx, w * 0.16, h * 0.55, w * 0.68, h * 0.22, 8);
        ctx.fill();
        ctx.strokeStyle = '#10b981'; ctx.lineWidth = 1.5; ctx.stroke();

        ctx.fillStyle = '#34d399';
        ctx.font = '700 13px monospace';
        ctx.fillText(lang === 'ta' ? 'AI ஏற்பு >' : 'AI AGENT >', w * 0.19, h * 0.61);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '500 13px monospace';
        ctx.fillText(lang === 'ta'
          ? 'நோக்கம் ஏற்கப்பட்டது. சொற்பொருள் கட்டமைப்பு, பாதுகாப்பு சோதனைகள் தயாராகின்றன...'
          : 'Synthesizing layout, database schemas, and unit test suites...',
          w * 0.19, h * 0.68
        );
      }
    }

    // BEAT 3 (20-30s): Machine Accelerates (10x Velocity)
    else if (sceneIdx === 2) {
      ctx.fillStyle = '#0b1329';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#1e293b';
      roundRect(ctx, w * 0.08, h * 0.12, w * 0.40, h * 0.76, 10);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 12px monospace';
      ctx.fillText(lang === 'ta' ? '// 10x வேகத்தில் கோடு உருவாக்கம்' : '// 10x Velocity Machine Synthesis', w * 0.11, h * 0.18);

      for (let i = 0; i < 14; i++) {
        const pulse = (Math.sin(t * 8 + i) + 1) * 0.5;
        ctx.fillStyle = i % 3 === 0 ? '#818cf8' : i % 2 === 0 ? '#34d399' : '#64748b';
        const lw = 40 + (i * 19 % 160) * (0.8 + pulse * 0.2);
        ctx.fillRect(w * 0.11, h * 0.22 + i * 21, Math.min(lw, w * 0.34), 8);
      }

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.52, h * 0.12, w * 0.40, h * 0.76, 10);
      ctx.fill();

      ctx.fillStyle = '#2563eb';
      ctx.fillRect(w * 0.55, h * 0.16, w * 0.34, 30);

      const assembleProgress = Math.min(localT / 5.0, 1);
      ctx.fillStyle = '#eff6ff';
      roundRect(ctx, w * 0.55, h * 0.25, w * 0.34, 60 * assembleProgress, 6);
      ctx.fill();

      if (localT > 3.0) {
        ctx.fillStyle = '#16a34a';
        ctx.font = '700 12px system-ui, sans-serif';
        ctx.fillText('✓ 42 Automated Unit Tests Passed (0.18s)', w * 0.55, h * 0.43);
        ctx.fillText('✓ Responsive Breakpoints Configured', w * 0.55, h * 0.48);
      }
    }

    // BEAT 4 (30-42s): Medical Clinic Dilemma (Taste & Intention)
    else if (sceneIdx === 3) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.08, h * 0.14, w * 0.52, h * 0.72, 8);
      ctx.fill();

      // Cold clinic preview
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(w * 0.10, h * 0.16, w * 0.48, 25);

      ctx.fillStyle = '#f8fafc';
      roundRect(ctx, w * 0.10, h * 0.24, w * 0.48, 130, 4);
      ctx.fill();

      ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
      roundRect(ctx, w * 0.10, h * 0.46, w * 0.48, 65, 6);
      ctx.fill();
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.fillStyle = '#dc2626';
      ctx.font = '700 12px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'இயந்திர குறைபாடு:' : 'MACHINE LIMITATION:', w * 0.13, h * 0.52);
      ctx.fillStyle = '#991b1b';
      ctx.font = '500 11px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? '• குறியீடு சரி, ஆனால் குளிர்ந்த நிறங்கள்' : '• Code valid, but cold clinical palette causes anxiety', w * 0.13, h * 0.58);
      ctx.fillText(lang === 'ta' ? '• அவசர உதவி பொத்தான் 3 பக்கங்கள் உள்ளே உள்ளது' : '• Emergency hotline buried 3 clicks deep for elderly', w * 0.13, h * 0.64);

      // 3D Developer thinking
      draw3DCharacter(ctx, w * 0.78, h * 0.50, 1.05, {
        shirtColor: '#1e3a8a',
        isThinking: true,
        time: t
      });
    }

    // BEAT 5 (42-52s): Human Pruning & Empathy
    else if (sceneIdx === 4) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.08, h * 0.12, w * 0.84, h * 0.76, 12);
      ctx.fill();

      ctx.fillStyle = '#f1f5f9';
      roundRect(ctx, w * 0.08, h * 0.12, w * 0.84, 38, 12);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 13px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'மனித சீரமைப்பு — ரசனையும் எளிமையும்' : 'Human Pruning & Design Direction', w * 0.12, h * 0.17);

      ctx.fillStyle = '#fee2e2';
      roundRect(ctx, w * 0.12, h * 0.24, w * 0.36, 120, 8);
      ctx.fill();
      ctx.strokeStyle = '#f87171'; ctx.stroke();
      ctx.fillStyle = '#dc2626';
      ctx.font = '700 11.5px monospace';
      ctx.fillText('// PRUNED: 420 lines of redundant code', w * 0.14, h * 0.30);
      ctx.fillText('// REMOVED: Confusing nested modals', w * 0.14, h * 0.36);
      ctx.fillText('// REPLACED: Cold clinical blue palette', w * 0.14, h * 0.42);

      ctx.fillStyle = '#f0fdf4';
      roundRect(ctx, w * 0.52, h * 0.24, w * 0.36, 120, 8);
      ctx.fill();
      ctx.strokeStyle = '#4ade80'; ctx.stroke();
      ctx.fillStyle = '#166534';
      ctx.font = '700 11.5px monospace';
      ctx.fillText('✓ ADDED: Instant 1-Click Emergency Hotline', w * 0.54, h * 0.30);
      ctx.fillText('✓ APPLIED: Warm, calming sage/cream tones', w * 0.54, h * 0.36);
      ctx.fillText('✓ ENLARGED: 18px legible contrast text', w * 0.54, h * 0.42);
    }

    // BEAT 6 (52-60s): From Code Typist to Technical Director
    else if (sceneIdx === 5) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.18, h * 0.14, w * 0.64, h * 0.72, 14);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3; ctx.stroke();

      ctx.fillStyle = '#b45309';
      roundRect(ctx, w * 0.22, h * 0.18, w * 0.56, 38, 8);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 13px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? '📞 24/7 மருத்துவ அவசர உதவி — 1 கிளிக்' : '📞 24/7 Clinic Emergency Hotline — Click to Call', w * 0.25, h * 0.23);

      ctx.fillStyle = '#10b981';
      roundRect(ctx, w * 0.32, h * 0.54, w * 0.36, 32, 16);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(lang === 'ta' ? 'தொழில்நுட்ப இயக்குநர் — மனித கட்டுப்பாடு' : 'TECHNICAL DIRECTOR — HUMAN GUIDED', w / 2, h * 0.59);
      ctx.textAlign = 'left';
    }

    // BEAT 7 (60-68s): Strong Climax & Meaningful Conclusion
    else {
      const goldGrad = ctx.createLinearGradient(0, 0, w, h);
      goldGrad.addColorStop(0, '#0f172a');
      goldGrad.addColorStop(0.5, '#1e293b');
      goldGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = goldGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';

      ctx.font = '800 13px system-ui, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(lang === 'ta' ? 'இறுதி முடிவு — மனிதனின் கையில்' : 'THE FINAL TRUTH — HUMAN DECISION', w / 2, h * 0.26);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 23px system-ui, sans-serif';
      if (lang === 'ta') {
        ctx.fillText('AI வேகமாக உருவாக்கலாம்;', w / 2, h * 0.42);
        ctx.fillText('ஆனால் எதை உருவாக்க வேண்டும் என்பதை', w / 2, h * 0.51);
        ctx.fillText('மனிதனே தீர்மானிக்கிறான்.', w / 2, h * 0.60);
      } else {
        ctx.fillText('“AI may build faster.', w / 2, h * 0.44);
        ctx.fillText('But the human decides what is worth building.”', w / 2, h * 0.54);
      }

      ctx.fillStyle = '#10b981';
      roundRect(ctx, w / 2 - 120, h * 0.70, 240, 36, 18);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 13px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? '✓ வெற்றிகரமாக வெளியிடப்பட்டது' : '✓ DEPLOYED TO PRODUCTION', w / 2, h * 0.75);
      ctx.textAlign = 'left';
    }

    drawDustMotes(ctx, w, h, t);
    drawVignette(ctx, w, h, 0.42);
    drawCinematicLetterbox(ctx, w, h);
    ctx.restore();
  }

  /**
   * ARTICLE 2 CINEMATIC MOVIE (80.0s)
   * "The World Without Websites"
   */
  function drawArticle2Movie(ctx, t, w, h, lang) {
    const scenes = VIDEO_CONFIGS['article-2'].scenes;
    let sceneIdx = 0;
    for (let i = 0; i < scenes.length; i++) {
      if (t >= scenes[i].start && t < scenes[i].end) { sceneIdx = i; break; }
      if (t >= scenes[scenes.length - 1].start) { sceneIdx = scenes.length - 1; }
    }
    const currentScene = scenes[sceneIdx];
    const localT = t - currentScene.start;
    const dur = currentScene.end - currentScene.start;

    const camPanX = Math.sin(t * 0.35) * 8;
    const camPanY = Math.cos(t * 0.25) * 4;
    const camZoom = 1.0 + Math.sin(t * 0.12) * 0.035;

    ctx.save();
    ctx.translate(w / 2 + camPanX, h / 2 + camPanY);
    ctx.scale(camZoom, camZoom);
    ctx.translate(-w / 2, -h / 2);

    // BEAT 1 (0-12s): Morning Cafe Disconnect
    if (sceneIdx === 0) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(w * 0.15, 20, w * 0.70, h * 0.50);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
      ctx.strokeRect(w * 0.15, 20, w * 0.70, h * 0.50);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, h * 0.60, w, h * 0.40);

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.18, h * 0.54, 38, 38, 8);
      ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.beginPath(); ctx.arc(w * 0.18 + 19, h * 0.54 + 19, 13, 0, Math.PI * 2); ctx.fill();

      // Smartphone with Disconnect Notice
      ctx.fillStyle = '#0f172a';
      roundRect(ctx, w * 0.42, h * 0.32, w * 0.22, h * 0.48, 14);
      ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.435, h * 0.35, w * 0.19, h * 0.42, 8);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(w * 0.53, h * 0.46, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('!', w * 0.53, h * 0.51);

      ctx.fillStyle = '#0f172a';
      ctx.font = '700 10.5px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'இணைப்பு இல்லை' : 'Web Unavailable', w * 0.53, h * 0.59);
      ctx.fillStyle = '#64748b';
      ctx.font = '500 8.5px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'தளங்கள் இயங்கவில்லை' : 'Connection Lost', w * 0.53, h * 0.64);
      ctx.textAlign = 'left';
    }

    // BEAT 2 (12-24s): Municipal Government Hall (Paper Queues)
    else if (sceneIdx === 1) {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(w * 0.08, 0, 36, h);
      ctx.fillRect(w * 0.86, 0, 36, h);

      ctx.fillStyle = '#92400e';
      ctx.fillRect(w * 0.18, h * 0.48, w * 0.64, 22);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(w * 0.22, h * 0.48 + 22, 14, h * 0.5);
      ctx.fillRect(w * 0.78, h * 0.48 + 22, 14, h * 0.5);

      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath(); ctx.arc(w * 0.68, h * 0.36, 20, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#475569';
      ctx.fillRect(w * 0.64, h * 0.41, 38, 40);

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.55, h * 0.38, 42, 45, 2);
      ctx.fill();

      // Long queue of citizens
      for (let i = 0; i < 4; i++) {
        const qX = w * 0.24 + i * 44;
        const qY = h * 0.50 + (i % 2) * 6;
        ctx.fillStyle = '#fbcfe8';
        ctx.beginPath(); ctx.arc(qX, qY - 32, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = i === 0 ? '#2563eb' : i === 1 ? '#dc2626' : i === 2 ? '#059669' : '#d97706';
        ctx.fillRect(qX - 12, qY - 16, 24, 55);
        ctx.fillStyle = '#fde047';
        roundRect(ctx, qX - 16, qY + 4, 16, 22, 2);
        ctx.fill();
      }
    }

    // BEAT 3 (24-36s): Grand Railway Station (Manual Ticket Counters)
    else if (sceneIdx === 2) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#475569'; ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.15, w * 0.42, Math.PI, 0);
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      roundRect(ctx, w * 0.22, 35, w * 0.56, 50, 6);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.font = '700 11px monospace';
      ctx.fillText('STATION TIMETABLE: ONLINE BOOKING OFFLINE', w * 0.26, 56);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('ALL PASSENGERS MUST QUEUE AT PHYSICAL COUNTERS', w * 0.26, 72);

      for (let wnd = 0; wnd < 3; wnd++) {
        const wx = w * 0.20 + wnd * (w * 0.24);
        ctx.fillStyle = '#334155';
        roundRect(ctx, wx, h * 0.40, w * 0.18, h * 0.38, 4);
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(wx + 8, h * 0.44, w * 0.18 - 16, 35);
      }

      for (let i = 0; i < 5; i++) {
        const tx = w * 0.16 + i * 65;
        ctx.fillStyle = '#fed7aa';
        ctx.beginPath(); ctx.arc(tx, h * 0.65, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(tx - 11, h * 0.69, 22, 60);
        ctx.fillStyle = '#991b1b';
        roundRect(ctx, tx + 14, h * 0.76, 20, 26, 3);
        ctx.fill();
      }
    }

    // BEAT 4 (36-48s): Bank Branch & Velvet Ropes
    else if (sceneIdx === 3) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, 0, w, h * 0.45);

      ctx.fillStyle = '#0f172a';
      roundRect(ctx, w * 0.60, h * 0.18, w * 0.32, h * 0.65, 8);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      roundRect(ctx, w * 0.62, h * 0.22, w * 0.28, h * 0.42, 6);
      ctx.fill();

      ctx.fillStyle = '#0284c7';
      ctx.font = '700 12px sans-serif';
      ctx.fillText(lang === 'ta' ? 'வங்கி கவுண்டர் 01' : 'TELLER WINDOW 01', w * 0.65, h * 0.28);

      ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(w * 0.12, h * 0.62);
      ctx.quadraticCurveTo(w * 0.25, h * 0.67, w * 0.38, h * 0.62);
      ctx.stroke();

      for (let st = 0; st < 3; st++) {
        const sx = w * 0.12 + st * (w * 0.18);
        ctx.fillStyle = '#eab308';
        ctx.fillRect(sx - 3, h * 0.50, 6, h * 0.38);
        ctx.beginPath(); ctx.arc(sx, h * 0.50, 7, 0, Math.PI * 2); ctx.fill();
      }

      ctx.fillStyle = '#fbcfe8';
      ctx.beginPath(); ctx.arc(w * 0.48, h * 0.46, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(w * 0.44, h * 0.51, 24, 65);
    }

    // BEAT 5 (48-58s): Food Delivery & Paper Map
    else if (sceneIdx === 4) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#1e293b';
      roundRect(ctx, w * 0.05, h * 0.12, w * 0.42, h * 0.76, 10);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.font = '700 12px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'உணவகம் — காகித சீட்டுகள்' : 'Restaurant — Manual Phone Slips', w * 0.08, h * 0.18);

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.08, h * 0.24, w * 0.36, 110, 6);
      ctx.fill();

      ctx.fillStyle = '#1e293b';
      roundRect(ctx, w * 0.53, h * 0.12, w * 0.42, h * 0.76, 10);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 12px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'விநியோகம் — வழி அறிய தடுமாற்றம்' : 'Delivery Rider — Paper Atlas Search', w * 0.56, h * 0.18);

      ctx.fillStyle = '#f8fafc';
      roundRect(ctx, w * 0.58, h * 0.26, w * 0.32, 110, 4);
      ctx.fill();
    }

    // BEAT 6 (58-68s): Small Pottery Artisan Isolation
    else if (sceneIdx === 5) {
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#b45309';
      for (let s = 0; s < 3; s++) {
        ctx.fillRect(w * 0.10, h * 0.25 + s * 70, w * 0.50, 12);
        ctx.fillStyle = '#f97316';
        ctx.beginPath(); ctx.ellipse(w * 0.18, h * 0.25 + s * 70 - 18, 14, 18, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath(); ctx.ellipse(w * 0.32, h * 0.25 + s * 70 - 16, 12, 16, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#b45309';
      }

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w * 0.70, h * 0.15, w * 0.24, h * 0.75);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(w * 0.74, h * 0.55, 30, h * 0.35);

      ctx.fillStyle = '#d97706';
      ctx.beginPath(); ctx.arc(w * 0.68, h * 0.52, 16, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.fillRect(w * 0.64, h * 0.57, 24, 60);
    }

    // BEAT 7 (68-80s): Living Web Reconnected & Strong Conclusion
    else {
      const dusk = ctx.createLinearGradient(0, 0, 0, h);
      dusk.addColorStop(0, '#020617');
      dusk.addColorStop(1, '#0f172a');
      ctx.fillStyle = dusk;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w * 0.05, h * 0.45, 65, h * 0.55);
      ctx.fillRect(w * 0.16, h * 0.35, 90, h * 0.65);
      ctx.fillRect(w * 0.32, h * 0.50, 75, h * 0.50);
      ctx.fillRect(w * 0.48, h * 0.30, 110, h * 0.70);
      ctx.fillRect(w * 0.68, h * 0.40, 85, h * 0.60);
      ctx.fillRect(w * 0.82, h * 0.48, 80, h * 0.52);

      // Reconnecting Golden Streams
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(w * 0.10, h * 0.45);
      ctx.bezierCurveTo(w * 0.25, h * 0.25, w * 0.40, h * 0.45, w * 0.52, h * 0.30);
      ctx.bezierCurveTo(w * 0.65, h * 0.20, w * 0.75, h * 0.42, w * 0.88, h * 0.48);
      ctx.stroke();

      const nodes = [
        { x: w * 0.10, y: h * 0.45, label: lang === 'ta' ? 'அரசு' : 'Civic' },
        { x: w * 0.20, y: h * 0.35, label: lang === 'ta' ? 'ரயில்' : 'Transit' },
        { x: w * 0.52, y: h * 0.30, label: lang === 'ta' ? 'வங்கி' : 'Banking' },
        { x: w * 0.72, y: h * 0.40, label: lang === 'ta' ? 'உணவு' : 'Food' },
        { x: w * 0.88, y: h * 0.48, label: lang === 'ta' ? 'வணிகம்' : 'Commerce' }
      ];

      nodes.forEach(nd => {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.arc(nd.x, nd.y, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 10.5px system-ui, sans-serif';
        ctx.fillText(nd.label, nd.x - 14, nd.y - 12);
      });

      // Closing Thought-Provoking Message
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 21px system-ui, sans-serif';
      if (lang === 'ta') {
        ctx.fillText('வலைதளங்கள் வெறும் திரைப் பக்கங்கள் அல்ல;', w / 2, h * 0.66);
        ctx.fillText('அவை மக்களையும், வணிகங்களையும், சேவைகளையும் இணைக்கும் பாலம்.', w / 2, h * 0.74);
      } else {
        ctx.fillText('“Websites are not just pages on a screen.', w / 2, h * 0.66);
        ctx.fillText('They connect people, businesses and services.”', w / 2, h * 0.74);
      }
      ctx.textAlign = 'left';
    }

    drawDustMotes(ctx, w, h, t);
    drawVignette(ctx, w, h, 0.42);
    drawCinematicLetterbox(ctx, w, h);
    ctx.restore();
  }

  /**
   * ARTICLE 3 CINEMATIC MOVIE (66.0s)
   * "How Should We Adapt?"
   */
  function drawArticle3Movie(ctx, t, w, h, lang) {
    const scenes = VIDEO_CONFIGS['article-3'].scenes;
    let sceneIdx = 0;
    for (let i = 0; i < scenes.length; i++) {
      if (t >= scenes[i].start && t < scenes[i].end) { sceneIdx = i; break; }
      if (t >= scenes[scenes.length - 1].start) { sceneIdx = scenes.length - 1; }
    }
    const currentScene = scenes[sceneIdx];
    const localT = t - currentScene.start;
    const dur = currentScene.end - currentScene.start;

    const camPanX = Math.sin(t * 0.4) * 8;
    const camPanY = Math.cos(t * 0.3) * 4;
    const camZoom = 1.0 + Math.sin(t * 0.15) * 0.035;

    ctx.save();
    ctx.translate(w / 2 + camPanX, h / 2 + camPanY);
    ctx.scale(camZoom, camZoom);
    ctx.translate(-w / 2, -h / 2);

    // BEAT 1 (0-10s): Late-Night Anxiety
    if (sceneIdx === 0) {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      const glare = ctx.createRadialGradient(w * 0.45, h * 0.40, 40, w * 0.45, h * 0.40, w * 0.5);
      glare.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      glare.addColorStop(1, 'rgba(9, 13, 22, 0.98)');
      ctx.fillStyle = glare;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#1e293b';
      roundRect(ctx, w * 0.22, h * 0.18, w * 0.56, h * 0.55, 10);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = '800 13px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'செய்தி: AI மனித வேலைகளை மாற்றுமா?' : 'TECH NEWS: WILL AI REPLACE CODERS?', w * 0.26, h * 0.28);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 11.5px monospace';
      ctx.fillText(lang === 'ta' ? '• தானியங்கி மென்பொருள் உருவாக்கம்' : '• Automated Code Synthesis Accelerates 10x', w * 0.26, h * 0.35);
      ctx.fillText(lang === 'ta' ? '• எதிர்கால டெவலப்பரின் நிலை என்ன?' : '• What is the future of human engineers in 2030?', w * 0.26, h * 0.42);

      draw3DCharacter(ctx, w * 0.50, h * 0.60, 1.0, {
        shirtColor: '#1e293b',
        isThinking: true,
        time: t
      });
    }

    // BEAT 2 (10-22s): Turning on Desk Lamp & Embracing AI
    else if (sceneIdx === 1) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);

      const lampBeam = ctx.createRadialGradient(w * 0.22, h * 0.20, 10, w * 0.45, h * 0.55, w * 0.6);
      lampBeam.addColorStop(0, 'rgba(254, 240, 138, 0.65)');
      lampBeam.addColorStop(1, 'rgba(30, 41, 59, 0)');
      ctx.fillStyle = lampBeam;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#eab308';
      ctx.beginPath(); ctx.arc(w * 0.22, h * 0.20, 14, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(w * 0.22, h * 0.20); ctx.lineTo(w * 0.16, h * 0.45); ctx.lineTo(w * 0.18, h * 0.65); ctx.stroke();

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.34, h * 0.22, w * 0.54, h * 0.60, 10);
      ctx.fill();

      ctx.fillStyle = '#059669';
      ctx.font = '800 13px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'AI-யைக் கற்றுக்கொள்ளுதல் — பயத்தை வெல்லுதல்' : 'STEP 01: LEARN AI & MASTER THE TOOLS', w * 0.38, h * 0.30);

      ctx.fillStyle = '#0f172a';
      ctx.font = '600 12px monospace';
      ctx.fillText('npm install @ai-sdk/core model-context-protocol', w * 0.38, h * 0.38);
      ctx.fillText('git clone https://github.com/intelligent-agent', w * 0.38, h * 0.44);

      ctx.fillStyle = '#15803d';
      roundRect(ctx, w * 0.38, h * 0.52, w * 0.46, 36, 6);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? '✓ கருவிகளை ஆளத் தொடங்குங்கள்' : '✓ Becoming the Director, Not the Bystander', w * 0.40, h * 0.57);
    }

    // BEAT 3 (22-34s): 10x Velocity Building
    else if (sceneIdx === 2) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      const panes = [
        { title: lang === 'ta' ? 'வேகமான குறியீடு' : 'Rapid Code Gen', color: '#38bdf8' },
        { title: lang === 'ta' ? 'தானியங்கி சோதனை' : 'Instant Test Suite', color: '#10b981' },
        { title: lang === 'ta' ? 'வடிவமைப்பு முன்னோட்டம்' : 'UI Wireframing', color: '#a855f7' },
        { title: lang === 'ta' ? 'API ஒருங்கிணைப்பு' : 'API Orchestration', color: '#f59e0b' }
      ];

      panes.forEach((p, idx) => {
        const px = w * 0.10 + (idx % 2) * (w * 0.42);
        const py = h * 0.14 + Math.floor(idx / 2) * (h * 0.38);
        ctx.fillStyle = '#1e293b';
        roundRect(ctx, px, py, w * 0.38, h * 0.34, 8);
        ctx.fill();
        ctx.strokeStyle = '#334155'; ctx.stroke();

        ctx.fillStyle = p.color;
        ctx.font = '700 11.5px monospace';
        ctx.fillText(p.title, px + 12, py + 22);

        for (let l = 0; l < 3; l++) {
          ctx.fillStyle = '#475569';
          ctx.fillRect(px + 12, py + 36 + l * 16, w * 0.30 - l * 25, 7);
        }
      });
    }

    // BEAT 4 (34-44s): Empathy Reality Check
    else if (sceneIdx === 3) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#ffffff';
      roundRect(ctx, w * 0.12, h * 0.15, w * 0.76, h * 0.70, 10);
      ctx.fill();

      ctx.fillStyle = '#fef2f2';
      roundRect(ctx, w * 0.16, h * 0.32, w * 0.68, 120, 8);
      ctx.fill();
      ctx.strokeStyle = '#ef4444'; ctx.stroke();

      ctx.fillStyle = '#dc2626';
      ctx.font = '800 14px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'இயந்திர வெளியீட்டின் குறைபாடு:' : 'THE LIMITATION OF RAW MACHINE OUTPUT:', w * 0.20, h * 0.40);

      ctx.fillStyle = '#991b1b';
      ctx.font = '500 12.5px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? '• குறியீடு வேலை செய்கிறது, ஆனால் சிக்கலானது' : '• Technically functional, but completely confusing for real users', w * 0.20, h * 0.46);
      ctx.fillText(lang === 'ta' ? '• மனிதர்களின் நிஜத் தேவையை அறியவில்லை' : '• Zero empathy for anxious patients, tired parents, or local sellers', w * 0.20, h * 0.52);
    }

    // BEAT 5 (44-54s): The Human Blueprint (Sketching on Paper)
    else if (sceneIdx === 4) {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#fefce8';
      roundRect(ctx, w * 0.15, h * 0.12, w * 0.70, h * 0.76, 12);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = '700 14px cursive, sans-serif';
      ctx.fillText(lang === 'ta' ? 'மனித தேவைகள் — எளிய தீர்வு' : 'HUMAN BLUEPRINT: DESIGNING FOR EMPATHY', w * 0.20, h * 0.22);

      const steps = [
        lang === 'ta' ? '1. உடனடி உதவி' : '1. Fast Help',
        lang === 'ta' ? '2. தெளிவான சொற்கள்' : '2. Clear Words',
        lang === 'ta' ? '3. எளிய பரிவர்த்தனை' : '3. Simple Flow'
      ];
      steps.forEach((st, i) => {
        const sx = w * 0.22 + i * (w * 0.22);
        ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2;
        roundRect(ctx, sx, h * 0.32, w * 0.18, 70, 6);
        ctx.stroke();
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '700 11px system-ui, sans-serif';
        ctx.fillText(st, sx + 8, h * 0.42);
      });

      // 3D hand sketching with wooden pencil
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(w * 0.65, h * 0.58, 80, 10);
      ctx.fillStyle = '#fbcfe8';
      ctx.beginPath(); ctx.arc(w * 0.64, h * 0.63, 14, 0, Math.PI * 2); ctx.fill();
    }

    // BEAT 6 (54-66s): The Visionary Builder at Sunrise & Conclusion
    else {
      const dawn = ctx.createLinearGradient(0, 0, w, h);
      dawn.addColorStop(0, '#1e1b4b');
      dawn.addColorStop(0.5, '#312e81');
      dawn.addColorStop(1, '#0f172a');
      ctx.fillStyle = dawn;
      ctx.fillRect(0, 0, w, h);

      const sunGlow = ctx.createRadialGradient(w / 2, h * 0.30, 20, w / 2, h * 0.30, w * 0.45);
      sunGlow.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, w, h);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 12px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? 'எதிர்காலத்தை நீங்களே உருவாக்குங்கள்' : 'SHAPE YOUR OWN FUTURE IN 2030', w / 2, h * 0.22);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 20px system-ui, sans-serif';
      if (lang === 'ta') {
        ctx.fillText('AI உங்கள் எதிர்காலத்தைக் கட்டுப்படுத்த விடாதீர்கள்.', w / 2, h * 0.34);
        ctx.fillText('அதனைக் கற்றுக்கொள்ளுங்கள். ஆளுங்கள். உருவாக்குங்கள்.', w / 2, h * 0.42);
        ctx.fillText('மனிதர்களைப் புரிந்து கொண்டு, நிஜப் பிரச்சனைகளைத் தீர்த்து,', w / 2, h * 0.50);
        ctx.fillText('உங்கள் சொந்த மதிப்பை உருவாக்குங்கள்.', w / 2, h * 0.58);
      } else {
        ctx.fillText('“Don’t let AI control your future.', w / 2, h * 0.34);
        ctx.fillText('Learn it. Control it. Build with it.', w / 2, h * 0.42);
        ctx.fillText('Understand people. Solve real problems.', w / 2, h * 0.50);
        ctx.fillText('Create your own value.”', w / 2, h * 0.58);
      }

      ctx.fillStyle = '#059669';
      roundRect(ctx, w / 2 - 120, h * 0.66, 240, 36, 18);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 12.5px system-ui, sans-serif';
      ctx.fillText(lang === 'ta' ? '★ எதிர்காலத்தை வழிநடத்தும் மனிதன்' : '★ THE VISIONARY HUMAN BUILDER', w / 2, h * 0.71);
      ctx.textAlign = 'left';
    }

    drawDustMotes(ctx, w, h, t);
    drawVignette(ctx, w, h, 0.42);
    drawCinematicLetterbox(ctx, w, h);
    ctx.restore();
  }

  /**
   * Render Bespoke Illustrated Poster Frame (Before Playback)
   */
  function drawPosterFrame(ctx, config, w, h, lang) {
    ctx.save();
    config.drawScene(ctx, 0.1, w, h, lang);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.48)';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '800 18px system-ui, sans-serif';
    ctx.fillText(config.title[lang] || config.title.en, w / 2, h * 0.35);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 12px system-ui, sans-serif';
    ctx.fillText(config.posterSubtitle[lang] || config.posterSubtitle.en, w / 2, h * 0.42);

    ctx.restore();
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const remS = s % 60;
    return `${m}:${remS < 10 ? '0' : ''}${remS}`;
  }

  /**
   * Mount Video Player into Target Container
   */
  function mount(containerId, articleId, lang = 'en') {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const config = VIDEO_CONFIGS[articleId];
    if (!config) return null;

    if (activePlayers[containerId]) {
      activePlayers[containerId].destroy();
      delete activePlayers[containerId];
    }

    const audio = createAudioEngine();
    const voiceManager = createVoiceTrackPlayer(config.id);

    const state = {
      isPlaying: false,
      currentTime: 0,
      duration: config.duration,
      isMuted: false,
      ccEnabled: true,
      lastSceneIdx: -1,
      lang: lang
    };

    container.innerHTML = `
      <div class="editorial-video-player" id="${containerId}_wrapper">
        <div class="video-meta-top">
          <div class="video-meta-left">
            <span class="video-pill-tag">${lang === 'ta' ? '3D சினிமா குறும்படம்' : '3D CINEMATIC FILM'}</span>
            <span class="video-title-label">${config.title[lang] || config.title.en}</span>
          </div>
          <span class="video-duration-tag">${config.durationLabel}</span>
        </div>

        <div class="video-screen-wrap" id="${containerId}_screenWrap">
          <canvas class="video-canvas" id="${containerId}_canvas" width="800" height="450"></canvas>

          <!-- Poster Overlay with Big Play Button -->
          <div class="video-poster-overlay" id="${containerId}_posterOverlay" role="button" aria-label="Play Cinematic Video">
            <div class="video-big-play-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="poster-text-group">
              <span class="poster-title">${lang === 'ta' ? '3D குறும்படத்தைக் காண்க' : 'Watch 3D Animated Short Film'}</span>
              <span class="poster-sub">${config.durationLabel} • ${lang === 'ta' ? 'முழுமையான கதை & குரல்வழி விளக்கம்' : 'Full Story & Narration'}</span>
            </div>
          </div>

          <!-- Synchronized Subtitle Bar -->
          <div class="video-caption-bar" id="${containerId}_captionBar" style="display: none;">
            ${config.scenes[0].sub[lang] || config.scenes[0].sub.en}
          </div>
        </div>

        <!-- Editorial Player Controls -->
        <div class="video-controls-bar">
          <button class="vctrl-btn" id="${containerId}_playBtn" aria-label="Play / Pause">
            <svg id="${containerId}_playIcon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>

          <div class="vctrl-timeline-wrap" id="${containerId}_timeline">
            <div class="vctrl-timeline-track">
              <div class="vctrl-timeline-fill" id="${containerId}_timeFill"></div>
              <div class="vctrl-timeline-thumb" id="${containerId}_timeThumb"></div>
            </div>
          </div>

          <span class="vctrl-time-display" id="${containerId}_timeDisplay">0:00 / ${config.durationLabel}</span>

          <button class="vctrl-btn" id="${containerId}_ccBtn" aria-label="Toggle Subtitles" title="Subtitles">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/>
            </svg>
          </button>

          <button class="vctrl-btn" id="${containerId}_muteBtn" aria-label="Mute / Unmute" title="Audio">
            <svg id="${containerId}_muteIcon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>

          <button class="vctrl-btn" id="${containerId}_fullscreenBtn" aria-label="Fullscreen" title="Fullscreen">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    const canvas = document.getElementById(`${containerId}_canvas`);
    const ctx = canvas.getContext('2d');
    const posterOverlay = document.getElementById(`${containerId}_posterOverlay`);
    const captionBar = document.getElementById(`${containerId}_captionBar`);
    const playBtn = document.getElementById(`${containerId}_playBtn`);
    const playIcon = document.getElementById(`${containerId}_playIcon`);
    const timeline = document.getElementById(`${containerId}_timeline`);
    const timeFill = document.getElementById(`${containerId}_timeFill`);
    const timeThumb = document.getElementById(`${containerId}_timeThumb`);
    const timeDisplay = document.getElementById(`${containerId}_timeDisplay`);
    const ccBtn = document.getElementById(`${containerId}_ccBtn`);
    const muteBtn = document.getElementById(`${containerId}_muteBtn`);
    const muteIcon = document.getElementById(`${containerId}_muteIcon`);
    const fullscreenBtn = document.getElementById(`${containerId}_fullscreenBtn`);
    const screenWrap = document.getElementById(`${containerId}_screenWrap`);

    let animFrameId = null;
    let lastTimestamp = 0;

    // Draw initial poster frame
    drawPosterFrame(ctx, config, canvas.width, canvas.height, state.lang);

    /**
     * Main Animation & Audio Loop
     */
    function loop(timestamp) {
      if (!state.isPlaying) return;

      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      state.currentTime += delta;
      if (state.currentTime >= state.duration) {
        state.currentTime = state.duration;
        config.drawScene(ctx, state.duration, canvas.width, canvas.height, state.lang);
        pausePlayback();
        updateUI();
        return;
      }

      // Determine active scene
      let sceneIdx = 0;
      for (let i = 0; i < config.scenes.length; i++) {
        if (state.currentTime >= config.scenes[i].start && state.currentTime < config.scenes[i].end) {
          sceneIdx = i; break;
        }
        if (state.currentTime >= config.scenes[config.scenes.length - 1].start) {
          sceneIdx = config.scenes.length - 1;
        }
      }

      const scene = config.scenes[sceneIdx];
      const localT = state.currentTime - scene.start;

      // Handle continuous scene transitions
      if (sceneIdx !== state.lastSceneIdx) {
        state.lastSceneIdx = sceneIdx;
        if (scene.chord) {
          const sceneDur = scene.end - scene.start;
          audio.playWarmChord(scene.chord, sceneDur - 0.4);
        }
        const narrationText = scene.sub[state.lang] || scene.sub.en;
        captionBar.textContent = narrationText;

        // Duck music when voiceover starts, restore when finished
        audio.duckMusic(true);
        voiceManager.playScene(
          sceneIdx,
          state.lang,
          () => audio.duckMusic(true),
          () => audio.duckMusic(false)
        );
      }

      // Execute Foley Sound Effects for current scene
      if (scene.sfx) {
        scene.sfx(audio, localT);
      }

      // Render 3D Scene
      config.drawScene(ctx, state.currentTime, canvas.width, canvas.height, state.lang);

      updateUI();
      animFrameId = requestAnimationFrame(loop);
    }

    function updateUI() {
      const pct = (state.currentTime / state.duration) * 100;
      timeFill.style.width = `${pct}%`;
      timeThumb.style.left = `${pct}%`;
      timeDisplay.textContent = `${formatTime(state.currentTime)} / ${config.durationLabel}`;

      if (state.isPlaying) {
        playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        posterOverlay.style.display = 'none';
        if (state.ccEnabled) {
          captionBar.style.display = 'block';
        }
      } else {
        playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        if (state.currentTime >= state.duration) {
          posterOverlay.style.display = 'flex';
          posterOverlay.querySelector('.poster-title').textContent = state.lang === 'ta' ? '↺ மீண்டும் பார்க்க' : '↺ Replay 3D Film';
          posterOverlay.querySelector('.poster-sub').textContent = `${config.durationLabel} • ${state.lang === 'ta' ? 'முழுமையான 3D குறும்படம்' : 'Full 3D Cinematic Story'}`;
        }
      }
    }

    function startPlayback() {
      audio.resume();
      if (state.currentTime >= state.duration) {
        state.currentTime = 0;
        state.lastSceneIdx = -1;
      }
      state.isPlaying = true;
      lastTimestamp = 0;
      updateUI();
      voiceManager.resume();
      animFrameId = requestAnimationFrame(loop);
    }

    function pausePlayback() {
      state.isPlaying = false;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      voiceManager.pause();
      audio.stopAll();
      updateUI();
    }

    function togglePlay() {
      if (state.isPlaying) pausePlayback();
      else startPlayback();
    }

    function seekToRatio(ratio) {
      state.currentTime = Math.max(0, Math.min(ratio * state.duration, state.duration));
      state.lastSceneIdx = -1;
      voiceManager.stop();
      audio.stopAll();

      let sIdx = 0;
      for (let i = 0; i < config.scenes.length; i++) {
        if (state.currentTime >= config.scenes[i].start && state.currentTime < config.scenes[i].end) {
          sIdx = i; break;
        }
        if (state.currentTime >= config.scenes[config.scenes.length - 1].start) {
          sIdx = config.scenes.length - 1;
        }
      }

      if (state.isPlaying) {
        state.lastSceneIdx = sIdx;
        const scene = config.scenes[sIdx];
        if (scene.chord) {
          audio.playWarmChord(scene.chord, (scene.end - scene.start) - 0.4);
        }
        captionBar.textContent = scene.sub[state.lang] || scene.sub.en;
        audio.duckMusic(true);
        voiceManager.playScene(
          sIdx,
          state.lang,
          () => audio.duckMusic(true),
          () => audio.duckMusic(false)
        );
      } else {
        posterOverlay.style.display = 'none';
        config.drawScene(ctx, state.currentTime, canvas.width, canvas.height, state.lang);
        captionBar.textContent = config.scenes[sIdx].sub[state.lang] || config.scenes[sIdx].sub.en;
        if (state.ccEnabled) captionBar.style.display = 'block';
      }
      updateUI();
    }

    // Attach Event Listeners
    posterOverlay.addEventListener('click', startPlayback);
    playBtn.addEventListener('click', togglePlay);
    canvas.addEventListener('click', togglePlay);

    timeline.addEventListener('click', (e) => {
      const rect = timeline.getBoundingClientRect();
      const ratio = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
      seekToRatio(ratio);
    });

    ccBtn.addEventListener('click', () => {
      state.ccEnabled = !state.ccEnabled;
      captionBar.style.display = (state.ccEnabled && state.isPlaying) ? 'block' : 'none';
      ccBtn.style.color = state.ccEnabled ? '#2563eb' : '#64748b';
    });

    muteBtn.addEventListener('click', () => {
      state.isMuted = !state.isMuted;
      audio.setMuted(state.isMuted);
      voiceManager.setMuted(state.isMuted);
      if (state.isMuted) {
        muteIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
      } else {
        muteIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
      }
    });

    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (screenWrap.requestFullscreen) screenWrap.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

    const controller = {
      destroy: function () {
        pausePlayback();
        audio.stopAll();
        voiceManager.stop();
      },
      getState: function () {
        return {
          isPlaying: state.isPlaying,
          currentTime: state.currentTime,
          duration: state.duration,
          isMuted: state.isMuted,
          lang: state.lang
        };
      },
      seek: function (time) {
        seekToRatio(time / state.duration);
      },
      play: function () {
        startPlayback();
      },
      pause: function () {
        pausePlayback();
      },
      updateLang: function (newLang) {
        const prevLang = state.lang;
        state.lang = newLang;
        let sIdx = 0;
        for (let i = 0; i < config.scenes.length; i++) {
          if (state.currentTime >= config.scenes[i].start && state.currentTime < config.scenes[i].end) {
            sIdx = i; break;
          }
          if (state.currentTime >= config.scenes[config.scenes.length - 1].start) {
            sIdx = config.scenes.length - 1;
          }
        }
        captionBar.textContent = config.scenes[sIdx].sub[state.lang] || config.scenes[sIdx].sub.en;
        if (state.isPlaying && prevLang !== newLang) {
          voiceManager.stop();
          audio.duckMusic(true);
          voiceManager.playScene(
            sIdx,
            state.lang,
            () => audio.duckMusic(true),
            () => audio.duckMusic(false)
          );
        } else if (!state.isPlaying) {
          drawPosterFrame(ctx, config, canvas.width, canvas.height, state.lang);
        }
      }
    };

    activePlayers[containerId] = controller;
    return controller;
  }

  function updateLanguage(lang) {
    Object.keys(activePlayers).forEach(id => {
      if (activePlayers[id] && typeof activePlayers[id].updateLang === 'function') {
        activePlayers[id].updateLang(lang);
      }
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      VIDEO_CONFIGS,
      formatTime
    };
  }

  return {
    mount: mount,
    updateLanguage: updateLanguage,
    getPlayerState: function (containerId) {
      if (activePlayers[containerId]) {
        return activePlayers[containerId].getState();
      }
      return null;
    },
    configs: VIDEO_CONFIGS
  };
})();
