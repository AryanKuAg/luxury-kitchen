'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.esm.jsx';

const heroVideo =
  'https://sites.framerate.space/template-assets/luxury-kitchen/hero.mp4';

const heroHeadings = [
  ['DESIGNED AROUND', 'THE WAY YOU LIVE'],
  ['BUILT FOR', 'EVERYDAY RITUALS'],
  ['MADE TO LAST', 'A LIFETIME'],
];

const menuItems = [
  {
    label: 'CRAFTED TO FIT',
    openDelay: 'delay-[180ms]',
    closeDelay: 'delay-[255ms]',
  },
  {
    label: 'MATERIALS THAT LAST',
    openDelay: 'delay-[265ms]',
    closeDelay: 'delay-[170ms]',
  },
  {
    label: 'SPACES WORTH LIVING IN',
    openDelay: 'delay-[350ms]',
    closeDelay: 'delay-[85ms]',
  },
  {
    label: 'START YOUR PROJECT',
    openDelay: 'delay-[435ms]',
    closeDelay: 'delay-0',
  },
];

const wordmarkClasses =
  'whitespace-nowrap font-display text-[15px] font-extrabold tracking-[-0.05em]';

const headingBaseClasses =
  'pointer-events-none absolute inset-0 m-0 max-w-full font-display text-[clamp(46px,5.8vw,96px)] font-bold leading-[0.9] tracking-[-0.075em] uppercase [font-stretch:condensed] will-change-[opacity,translate,scale,clip-path,filter] transition-[opacity,translate,scale,clip-path,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-sm:text-[clamp(42px,11.5vw,72px)]';

function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  // onReady is the only signal that clears the intro overlay, and ScrollyVideo's
  // HTML5 path never fires it, so fall back to a timer.
  useEffect(() => {
    const watchdog = window.setTimeout(() => setVideoReady(true), Math.max(0, 4000 - performance.now()));
    return () => window.clearTimeout(watchdog);
  }, []);
  const [activeHeading, setActiveHeading] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeHeadingRef = useRef(0);
  const targetHeadingRef = useRef(0);
  const headingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (headingTimerRef.current) clearTimeout(headingTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    document.body.classList.toggle('overflow-hidden', menuOpen);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  const advanceHeading = () => {
    headingTimerRef.current = null;

    if (activeHeadingRef.current === targetHeadingRef.current) return;

    const direction =
      targetHeadingRef.current > activeHeadingRef.current ? 1 : -1;
    const nextHeading = activeHeadingRef.current + direction;

    activeHeadingRef.current = nextHeading;
    setActiveHeading(nextHeading);
    headingTimerRef.current = setTimeout(advanceHeading, 900);
  };

  const handleVideoChange = (percentage: number = 0) => {
    const clampedPercentage = Math.max(0, Math.min(0.999999, percentage));
    const nextHeading = Math.floor(clampedPercentage * heroHeadings.length);

    targetHeadingRef.current = nextHeading;

    if (
      nextHeading !== activeHeadingRef.current &&
      headingTimerRef.current === null
    ) {
      advanceHeading();
    }
  };

  const handleVideoReady = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVideoReady(true));
    });
  };

  return (
    <section
      className="relative h-[220vh] bg-[#20221f] max-sm:h-[190vh] [&>[data-scrolly-container]]:sticky [&>[data-scrolly-container]]:top-0 [&>[data-scrolly-container]]:z-0 [&>[data-scrolly-container]]:block [&>[data-scrolly-container]]:h-screen [&>[data-scrolly-container]]:w-full [&>[data-scrolly-container]]:overflow-hidden [&>[data-scrolly-container]]:bg-[#292a26] [&>[data-scrolly-container]_canvas]:absolute! [&>[data-scrolly-container]_canvas]:inset-0! [&>[data-scrolly-container]_canvas]:h-full! [&>[data-scrolly-container]_canvas]:min-h-0! [&>[data-scrolly-container]_canvas]:w-full! [&>[data-scrolly-container]_canvas]:min-w-0! [&>[data-scrolly-container]_canvas]:object-cover [&>[data-scrolly-container]_canvas]:outline-none! [&>[data-scrolly-container]_canvas]:backface-hidden [&>[data-scrolly-container]_canvas]:[filter:saturate(0.78)_contrast(1.02)] [&>[data-scrolly-container]_canvas]:[transform:none]! [&>[data-scrolly-container]_video]:absolute! [&>[data-scrolly-container]_video]:inset-0! [&>[data-scrolly-container]_video]:h-full! [&>[data-scrolly-container]_video]:min-h-0! [&>[data-scrolly-container]_video]:w-full! [&>[data-scrolly-container]_video]:min-w-0! [&>[data-scrolly-container]_video]:object-cover [&>[data-scrolly-container]_video]:outline-none! [&>[data-scrolly-container]_video]:backface-hidden [&>[data-scrolly-container]_video]:[filter:saturate(0.78)_contrast(1.02)] [&>[data-scrolly-container]_video]:[transform:none]!"
      aria-label="Form Matter hero"
    >
      <ScrollyVideo
        src={heroVideo}
        cover
        sticky
        full
        trackScroll
        lockScroll={false}
        transitionSpeed={8}
        frameThreshold={0.06}
        useWebCodecs
        onReady={handleVideoReady}
        onChange={handleVideoChange}
      />

      <div
        className={`fixed inset-0 z-10 flex flex-col justify-between bg-[#20221f] px-[42px] pt-7 pb-[34px] text-[#f1eee8] transition-opacity duration-[800ms] ease-out motion-reduce:transition-none max-sm:px-5 max-sm:pt-5 max-sm:pb-6 ${
          videoReady ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        aria-hidden={videoReady}
      >
        <span className={wordmarkClasses}>
          FORM <i className="font-normal text-[#8b735e] not-italic">/</i> MATTER
        </span>
        <div className="flex justify-between border-b border-[rgba(241,238,232,0.35)] pb-3.5 text-[9px] font-bold tracking-[0.16em] text-[rgba(241,238,232,0.62)]">
          <span>PREPARING YOUR SPACE</span>
          <span>PLEASE WAIT</span>
        </div>
        <span
          className="absolute right-[42px] bottom-[34px] left-[42px] h-px overflow-hidden bg-[rgba(241,238,232,0.16)] max-sm:right-5 max-sm:bottom-6 max-sm:left-5"
          aria-hidden="true"
        >
          <span className="block h-full w-[42%] animate-loader-progress bg-[#d9d0c2]" />
        </span>
      </div>

      <div
        className={`pointer-events-none sticky top-0 z-[2] mt-[-100vh] flex h-screen flex-col justify-between bg-[rgba(10,11,9,0.14)] px-[42px] pt-7 pb-[34px] text-[#f7f4ee] [box-shadow:inset_10vw_0_16vw_-5vw_rgba(10,11,9,0.72),inset_-10vw_0_16vw_-5vw_rgba(10,11,9,0.72),inset_0_9vw_14vw_-7vw_rgba(10,11,9,0.5),inset_0_-10vw_16vw_-7vw_rgba(10,11,9,0.62)] transition-opacity delay-[120ms] duration-[900ms] ease-out motion-reduce:transition-none max-sm:px-5 max-sm:pt-5 max-sm:pb-6 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <header className="pointer-events-auto grid grid-cols-3 items-center border-b border-[rgba(241,238,232,0.16)] pb-[18px] text-[10px] leading-none font-bold tracking-[0.12em] max-sm:grid-cols-[1fr_auto]">
          <a
            className={`${wordmarkClasses} [-webkit-tap-highlight-color:transparent]`}
            href="#top"
            aria-label="Form Matter home"
          >
            FORM <span className="text-[#8b735e]">/</span> MATTER
          </a>
          <p className="m-0 text-center text-[rgba(247,244,238,0.72)] max-sm:hidden">
            KITCHENS + LIVING SPACES
          </p>
          <button
            className="group ml-auto inline-flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 font-inherit leading-none text-inherit [-webkit-tap-highlight-color:transparent]"
            type="button"
            aria-controls="main-menu-overlay"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            MENU
            <span
              className="inline-flex w-[17px] flex-col justify-center gap-[3px]"
              aria-hidden="true"
            >
              <span className="block h-px w-full origin-right bg-current transition-transform duration-200" />
              <span className="block h-px w-full origin-right bg-current transition-transform duration-200 group-hover:scale-x-[0.62]" />
              <span className="block h-px w-full origin-right bg-current transition-transform duration-200" />
            </span>
          </button>
        </header>

        <div
          className={`pointer-events-auto mt-auto mr-0 mb-[4vh] ml-0 w-[min(760px,68vw)] transition-[opacity,translate] delay-[260ms] duration-[900ms] ease-out motion-reduce:transition-none max-sm:mb-[7vh] max-sm:w-full ${
            videoReady
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[18px] opacity-0'
          }`}
        >
          <div
            className="relative h-[clamp(112px,11.6vw,190px)] w-full max-w-[760px] max-sm:h-[clamp(102px,24vw,155px)]"
            aria-live="polite"
          >
            {heroHeadings.map(([firstLine, secondLine], index) => {
              const headingState =
                index === activeHeading
                  ? 'translate-y-0 scale-100 opacity-100 [clip-path:inset(0_0_0_0)] blur-none'
                  : index < activeHeading
                    ? '-translate-y-[42px] scale-[1.02] opacity-0 [clip-path:inset(0_0_100%_0)] blur-[12px]'
                    : 'translate-y-[42px] scale-[0.98] opacity-0 [clip-path:inset(100%_0_0_0)] blur-[12px]';

              return (
                <h1
                  className={`${headingBaseClasses} ${headingState}`}
                  aria-hidden={index !== activeHeading}
                  key={firstLine}
                >
                  <span className="block">{firstLine}</span>
                  <span className="block">{secondLine}</span>
                </h1>
              );
            })}
          </div>
          <p className="mt-0 mb-7 max-w-[300px] text-[13px] leading-[1.45] text-[rgba(247,244,238,0.88)]">
            Bespoke kitchens. Timeless materials. Made for your home.
          </p>
          <a
            className="group inline-flex items-center gap-[18px] border-b border-current pb-2.5 text-[10px] leading-none font-bold tracking-[0.15em] transition-[gap,color] duration-200 hover:gap-[25px] hover:text-[#d9d0c2] motion-reduce:transition-none [-webkit-tap-highlight-color:transparent]"
            href="#top"
          >
            EXPLORE COLLECTIONS{' '}
            <span
              className="text-lg leading-[8px] font-normal"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>

      <div
        id="main-menu-overlay"
        className={`fixed inset-0 z-20 overflow-y-auto bg-[#080e0b] text-[#f1eee8] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
          menuOpen
            ? 'pointer-events-auto [clip-path:inset(0_0_0_0)]'
            : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="flex min-h-full flex-col px-[42px] pt-7 pb-[30px] max-sm:px-5 max-sm:pt-5 max-sm:pb-6">
          <header className="flex items-center justify-between border-b border-[rgba(241,238,232,0.12)] pb-[18px]">
            <span className={wordmarkClasses}>
              FORM <span className="text-[#8b735e]">/</span> MATTER
            </span>
            <button
              className="inline-flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 font-inherit text-[10px] font-bold tracking-[0.14em] text-[#f1eee8] [-webkit-tap-highlight-color:transparent]"
              type="button"
              onClick={() => setMenuOpen(false)}
            >
              CLOSE{' '}
              <span
                className="text-[22px] leading-[0.4] font-normal"
                aria-hidden="true"
              >
                ×
              </span>
            </button>
          </header>

          <nav className="my-auto w-full" aria-label="Main navigation">
            {menuItems.map((item, index) => (
              <a
                className={`grid grid-cols-[66px_1fr_auto] items-baseline gap-[18px] border-t border-[rgba(241,238,232,0.12)] py-[18px] pt-[22px] transition-[opacity,translate,clip-path,color] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] last:border-b hover:text-[#d9d0c2] motion-reduce:transition-none max-sm:grid-cols-[34px_1fr_auto] max-sm:gap-2.5 max-sm:pt-5 max-sm:pb-4 ${
                  menuOpen
                    ? `translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)] ${item.openDelay}`
                    : `translate-y-[46px] opacity-0 [clip-path:inset(100%_0_0_0)] ${item.closeDelay}`
                }`}
                href="#top"
                key={item.label}
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-[10px] font-bold tracking-[0.13em] text-[#d9d0c2]">
                  0{index + 1}
                </span>
                <span className="font-display text-[clamp(46px,6.7vw,112px)] leading-[0.82] font-bold tracking-[-0.075em] max-sm:text-[clamp(38px,11.5vw,64px)]">
                  {item.label}
                </span>
                <span
                  className="text-[clamp(24px,3vw,48px)] leading-[0.8] font-light"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="flex justify-between border-t border-[rgba(241,238,232,0.12)] pt-[15px] text-[9px] font-bold tracking-[0.15em] text-[#8b735e] max-sm:text-[8px] max-sm:tracking-[0.08em]">
            <span>MODERN KITCHENS + LIVING SPACES</span>
            <span className="max-sm:hidden">FORM / MATTER — 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Hero />
    </main>
  );
}
