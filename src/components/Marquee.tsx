import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AWARENESS_QUOTES = [
  "Two brothers, one fight. Caryer & Carney need our help.",
  "Every donation brings us closer to saving two precious lives.",
  "Hope is stronger than pain. Together we can make a difference.",
  "A Bone Marrow Transplant is a second chance at life for both brothers.",
  "Sickle Cell affects millions. Your support can change their story.",
  "March 2026: The deadline to save Caryer & Carney.",
  "Small acts of kindness can save lives. Donate today.",
  "Raising awareness saves lives. Share their story.",
  "Join us in the fight against Sickle Cell Disease.",
  "Your generosity fuels their journey to health and happiness.",
  "Together, we can give Caryer & Carney a future free from pain.",
  "Every KES counts. Help us reach our goal of KES 12,000,000.",
  "From Kenya to India: A journey of hope for Caryer & Carney.",
  "Be a hero in Caryer & Carney's story. Donate now.",
  "Love knows no bounds. Support Caryer & Carney today."
];

export const Marquee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === AWARENESS_QUOTES.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? AWARENESS_QUOTES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === AWARENESS_QUOTES.length - 1 ? 0 : prev + 1));
  };

  return (
    <footer className="fixed bottom-0 w-full z-50 bg-white border-t-4 border-coco-melon py-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="bg-coco-melon/10 hover:bg-coco-melon/20 text-coco-melon p-2 rounded-full transition-colors flex-shrink-0"
          aria-label="Previous quote"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Quote Display */}
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-coco-melon font-black text-xl">✦</span>
            <p className="text-gray-800 font-bold text-sm md:text-base uppercase tracking-wide">
              {AWARENESS_QUOTES[currentIndex]}
            </p>
            <span className="text-coco-melon font-black text-xl">✦</span>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="bg-coco-melon/10 hover:bg-coco-melon/20 text-coco-melon p-2 rounded-full transition-colors flex-shrink-0"
          aria-label="Next quote"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Quote Progress Indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {AWARENESS_QUOTES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-coco-melon'
                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>
    </footer>
  );
};