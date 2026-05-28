import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import './Masonry.css';

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setValue(get);
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls: string[]) => {
  if (typeof window === 'undefined') return;
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export type MasonryItem = {
  id: string | number;
  img: string;
  height: number;
  url: string;
};

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

export function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.06,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = false,
  colorShiftOnHover = false
}: MasonryProps) {
  const columns = useMedia(
    ['(min-width:900px)', '(min-width:600px)', '(min-width:450px)'],
    [3, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const getInitialPosition = (item: { x: number; y: number; w: number; h: number }) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect || typeof window === 'undefined') return { x: item.x, y: item.y };

    let direction: string = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => {
      // background preload complete
    });
  }, [items]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady || !isVisible || grid.length === 0 || typeof window === 'undefined') return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;

      // Always set width/height instantly — no layout animation, no reflow
      gsap.set(selector, { width: item.w, height: item.h });

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);

        // Only animate transform (x/y) + opacity — both GPU-composited, zero reflow
        gsap.fromTo(
          selector,
          { opacity: 0, x: initialPos.x, y: initialPos.y },
          {
            opacity: 1,
            x: item.x,
            y: item.y,
            duration: 0.96,
            ease: 'power3.out',
            delay: index * stagger,
            force3D: true,
            overwrite: true,
          }
        );
      } else {
        // On resize: snap width/height, smoothly tween position only
        gsap.to(selector, {
          x: item.x,
          y: item.y,
          duration: duration,
          ease: ease,
          force3D: true,
          overwrite: 'auto',
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, isVisible, stagger, animateFrom, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, item: typeof grid[0]) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, item: typeof grid[0]) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(prev => (prev === 0 ? items.length - 1 : prev! - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex(prev => (prev === items.length - 1 ? 0 : prev! + 1));
  };

  const handleClose = () => {
    setActiveImageIndex(null);
  };

  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeImageIndex]);

  // Dynamic height calculation to prevent relative-container collapse
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    return Math.max(...grid.map(item => item.y + item.h)) + 12;
  }, [grid]);

  return (
    <>
      <div ref={containerRef} className="list" style={{ height: containerHeight }}>
        {grid.map(item => {
          return (
            <div
              key={item.id}
              data-key={item.id}
              className="item-wrapper"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: item.w,
                height: item.h,
                opacity: 0,
              }}
              onClick={() => {
                const idx = items.findIndex(i => i.id === item.id);
                if (idx !== -1) {
                  setActiveImageIndex(idx);
                }
              }}
              onMouseEnter={e => handleMouseEnter(e, item)}
              onMouseLeave={e => handleMouseLeave(e, item)}
            >
              <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
                {colorShiftOnHover && (
                  <div
                    className="color-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                      opacity: 0,
                      pointerEvents: 'none',
                      borderRadius: '8px'
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-4 right-4 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white lightbox-btn transition-colors active:scale-95"
            onClick={handleClose}
            aria-label="Close gallery"
          >
            <X className="size-6 sm:size-7" />
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white lightbox-btn transition-all active:scale-95 hover:translate-x-[-2px] disabled:opacity-50"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6 sm:size-8" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white lightbox-btn transition-all active:scale-95 hover:translate-x-[2px] disabled:opacity-50"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="size-6 sm:size-8" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] sm:max-w-[85vw] sm:max-h-[80vh] flex flex-col items-center animate-in zoom-in-95 duration-300 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[activeImageIndex].img}
              alt={`Project Gallery Image ${activeImageIndex + 1}`}
              className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain lightbox-img border border-white/10 shadow-2xl select-none"
            />
            {/* Image counter */}
            <div className="mt-4 px-4 py-1.5 bg-white/10 backdrop-blur-md lightbox-badge text-white text-xs sm:text-sm font-bold tracking-widest border border-white/5">
              {activeImageIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Masonry;
