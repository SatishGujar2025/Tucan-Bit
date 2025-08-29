import React, { useRef, useEffect } from 'react';

export type SoundKey = 'background' | 'win';

enum SoundKeys {
  BACKGROUND = 'background',
  WIN = 'win',
}

export interface SoundManagerProps {
  /** Map of sound keys to imported URLs */
  sounds: Record<SoundKey, string>;
  /** Current active background key to loop (or null to stop) */
  backgroundKey?: SoundKey | null;
  /** One-off event sound key to play when this prop changes */
  playKey?: SoundKey;
  /** Volume settings per sound key (0.0 to 1.0) */
  volumes?: Partial<Record<SoundKey, number>>;
}

const SoundManager: React.FC<SoundManagerProps> = ({
  sounds,
  backgroundKey = null,
  playKey,
  volumes = {},
}) => {
  const audioRefs = useRef({} as Record<SoundKey, HTMLAudioElement>);

  useEffect(() => {
    Object.entries(sounds).forEach(([key, url]) => {
      const audio = new Audio(url);
      // loop only for background
      audio.loop = key === SoundKeys.BACKGROUND;
      audio.volume = volumes[key as SoundKey] ?? 1;
      audioRefs.current[key as SoundKey] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => audio.pause());
    };
  }, []);

  // Handle background loop start/stop
  useEffect(() => {
    const audio = audioRefs.current[SoundKeys.BACKGROUND];
    if (backgroundKey === SoundKeys.BACKGROUND) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
    }
  }, [backgroundKey]);

  // Handle one-off win sound
  useEffect(() => {
    if (playKey === SoundKeys.WIN) {
      const audio = audioRefs.current[SoundKeys.WIN];
      audio.currentTime = 0;
      audio.play();
    }
  }, [playKey]);

  // Adjust volumes on change
  useEffect(() => {
    Object.entries(volumes).forEach(([key, vol]) => {
      const audio = audioRefs.current[key as SoundKey];
      if (audio) audio.volume = vol!;
    });
  }, [volumes]);

  return null;
};

export default SoundManager;
