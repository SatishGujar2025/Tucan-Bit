import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import logo from '../../assets/TB.png';

const TOP_BAR = 70;

type Props = { src: string; onClose: () => void };

export default function GameLaunchModal({ src, onClose }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const ui = (
    <div
      className="fixed inset-0 z-[10000000] bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      {/* Top bar (70px) */}
      <div
        className="w-full flex items-center justify-between px-4 md:px-6 border-b border-white/10"
        style={{ height: TOP_BAR }}
      >
        <div className="flex items-center gap-3">
          <img src={logo} alt="TucanBit" className="h-8 w-8 rounded-md object-contain" />
          <span className="text-white/90 font-semibold hidden sm:inline">
            Playing in TucanBit
          </span>
        </div>

        <button
          aria-label="Close game"
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-white/10 text-white focus:outline-none focus:ring focus:ring-white/30"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className="w-full relative"
        style={{
          height: `calc(100dvh - ${TOP_BAR}px)`,
          minHeight: `calc(100vh - ${TOP_BAR}px)`,
        }}
      >
        {loading && (
          <div className="absolute inset-0 grid place-items-center text-white/80">
            <div className="animate-spin h-8 w-8 border-2 border-white/30 border-t-white rounded-full" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          title="Game"
          src={src}
          className="w-full h-full border-0"
          onLoad={() => setLoading(false)}
          allow="autoplay; fullscreen; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );

  return createPortal(ui, document.body);
}
