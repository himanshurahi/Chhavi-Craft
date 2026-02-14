"use client";

import { useEffect, useState } from "react";
import { RiQrCodeLine, RiBox3Line, RiHeartLine, RiGiftLine } from "react-icons/ri";

const icons = [
  { Icon: RiQrCodeLine, label: "QR" },
  { Icon: RiBox3Line, label: "Product" },
  { Icon: RiHeartLine, label: "Heart" },
  { Icon: RiGiftLine, label: "Gift" },
];

export default function FullScreenLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const minTime = 1500;
    const start = performance.now();
    let done = false;
    let fallback: ReturnType<typeof setTimeout>;
    const hide = () => {
      if (done) return;
      done = true;
      clearTimeout(fallback);
      setVisible(false);
      setTimeout(() => setMounted(false), 400);
    };
    const onLoad = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minTime - elapsed);
      setTimeout(hide, remaining);
    };
    fallback = setTimeout(hide, 4000);
    if (document.readyState === "complete") {
      setTimeout(onLoad, minTime);
    } else {
      window.addEventListener("load", onLoad);
    }
    return () => {
      clearTimeout(fallback);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[var(--background)] transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
      aria-busy={visible}
    >
      <div className="flex items-center justify-center gap-4">
        {icons.map(({ Icon }, i) => (
          <span
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] loader-icon"
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            <Icon className="h-7 w-7" />
          </span>
        ))}
      </div>
      <p className="font-display text-lg text-[var(--muted)]">Chhavi Craft</p>
    </div>
  );
}
