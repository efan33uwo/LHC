"use client";

import { useEffect, useState } from "react";

const images = [
  "/clinic-1.jpg",
  "/clinic-2.jpg",
  "/clinic-3.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== current}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] ease-out ${
              index === current ? "scale-105" : "scale-100"
            }`}
            style={{ backgroundImage: `url('${src}')` }}
          />
          <div className="absolute inset-0 bg-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/35" />
        </div>
      ))}

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`transition-all duration-300 ${
              index === current
                ? "h-2.5 w-8 rounded-full bg-white"
                : "h-2.5 w-2.5 rounded-full bg-white/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}