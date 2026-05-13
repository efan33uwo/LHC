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
          <div className="absolute inset-0 bg-[#07120e]/22" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07120e]/12 via-transparent to-[#07120e]/48" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#07120e]/82 via-[#07120e]/50 to-[#07120e]/8" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07120e]/66 via-transparent to-transparent" />

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`transition-all duration-300 ${
              index === current
                ? "h-2 w-8 rounded-[1px] bg-white"
                : "h-2 w-2 rounded-[1px] bg-white/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
