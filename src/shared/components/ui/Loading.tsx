import { useEffect, useState, type CSSProperties } from 'react';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'brand' | 'accent' | 'white' | 'muted';
  className?: string;
  label?: string;
}

const SIZE_MAP: Record<NonNullable<SpinnerProps['size']>, { width: number; height: number; stroke: number }> = {
  xs: { width: 16, height: 16, stroke: 2.5 },
  sm: { width: 22, height: 22, stroke: 3 },
  md: { width: 36, height: 36, stroke: 3.5 },
  lg: { width: 48, height: 48, stroke: 4 },
  xl: { width: 64, height: 64, stroke: 4.5 },
};

const VARIANT_COLOR_MAP: Record<NonNullable<SpinnerProps['variant']>, string> = {
  brand: 'var(--brand)',
  accent: 'var(--accent)',
  white: '#ffffff',
  muted: 'var(--muted)',
};

/**
 * Clean inline SVG spinner for buttons, search inputs, and compact loading states.
 */
export function Spinner({
  size = 'md',
  variant = 'brand',
  className = '',
  label = 'Loading...',
}: SpinnerProps) {
  const { width, height, stroke } = SIZE_MAP[size];
  const color = VARIANT_COLOR_MAP[variant];

  return (
    <span
      role="status"
      aria-label={label}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      className={className}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: 'spin 0.85s linear infinite',
          transformOrigin: 'center',
        }}
      >
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeOpacity="0.18"
          style={{ color }}
        />
        <path
          d="M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{ color }}
        />
      </svg>
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {label}
      </span>
    </span>
  );
}

export interface PagePreloaderProps {
  fullScreen?: boolean;
  exiting?: boolean;
  message?: string;
  className?: string;
}

/**
 * Branded TFN Academy page preloader matching our visual identity
 * (TFN gradient mark, accent orb, Sora wordmark, and animated brand-to-accent progress bar).
 */
export function PagePreloader({
  fullScreen = false,
  exiting = false,
  message = 'Learn. Build. Certify.',
  className = '',
}: PagePreloaderProps) {
  return (
    <div
      className={`tfn-preloader ${fullScreen ? 'full-screen' : ''} ${exiting ? 'is-exiting' : ''} ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={message || 'Loading TFN Academy'}
    >
      <div className="tfn-preloader-glow" aria-hidden="true" />
      <div className="tfn-preloader-inner">
        <div className="tfn-preloader-badge" aria-hidden="true">
          <span className="tfn-preloader-ring" />
          <span className="tfn-preloader-mark">TFN</span>
        </div>

        <div className="tfn-preloader-wordmark">
          <span className="tfn-preloader-title">TFN Academy</span>
          {message ? <span className="tfn-preloader-sub">{message}</span> : null}
        </div>

        <div className="tfn-preloader-track" aria-hidden="true">
          <div className="tfn-preloader-bar" />
        </div>
      </div>
    </div>
  );
}

export interface AppPreloaderProps {
  /** Minimum time (ms) to display the branded preloader on initial boot before fading out */
  minDurationMs?: number;
  message?: string;
}

/**
 * Initial full-screen boot preloader shown briefly while the app mounts,
 * fonts settle, and the page prepares to render.
 */
export function AppPreloader({
  minDurationMs = 550,
  message = 'Learn. Build. Certify.',
}: AppPreloaderProps) {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let unmountTimer: ReturnType<typeof setTimeout> | undefined;
    const startTime = performance.now();

    const triggerExit = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, minDurationMs - elapsed);

      exitTimer = setTimeout(() => {
        setExiting(true);
        unmountTimer = setTimeout(() => {
          setMounted(false);
        }, 400);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      triggerExit();
    } else {
      window.addEventListener('load', triggerExit, { once: true });
      // Safety cap so a slow third-party resource never traps the preloader
      const maxCapTimer = setTimeout(triggerExit, 1800);
      return () => {
        window.removeEventListener('load', triggerExit);
        clearTimeout(maxCapTimer);
        if (exitTimer) clearTimeout(exitTimer);
        if (unmountTimer) clearTimeout(unmountTimer);
      };
    }

    return () => {
      if (exitTimer) clearTimeout(exitTimer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, [minDurationMs]);

  if (!mounted) return null;

  return <PagePreloader fullScreen exiting={exiting} message={message} />;
}

export interface GlobalLoadingProps {
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

/**
 * Central full-page or section loading view powered by the branded PagePreloader.
 */
export function GlobalLoading({
  fullScreen = false,
  message = 'Preparing your experience...',
  className = '',
}: GlobalLoadingProps) {
  return <PagePreloader fullScreen={fullScreen} message={message} className={className} />;
}

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Shimmering skeleton primitive component
 */
export function Skeleton({
  width = '100%',
  height = '1rem',
  radius,
  className = '',
  style,
}: SkeletonProps) {
  return (
    <span
      className={`skeleton ${className}`.trim()}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius:
          radius !== undefined ? (typeof radius === 'number' ? `${radius}px` : radius) : undefined,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export interface SkeletonTextProps {
  lines?: number;
  gap?: number;
  lastLineWidth?: string;
  className?: string;
}

/**
 * Multi-line skeleton placeholder for paragraphs
 */
export function SkeletonText({
  lines = 3,
  gap = 10,
  lastLineWidth = '70%',
  className = '',
}: SkeletonTextProps) {
  return (
    <div style={{ display: 'grid', gap }} className={className} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="14px"
          width={i === lines - 1 ? lastLineWidth : '100%'}
          radius="6px"
        />
      ))}
    </div>
  );
}

/**
 * Skeleton placeholder for Programme Cards
 */
export function ProgrammeCardSkeleton() {
  return (
    <div
      className="pcard skeleton-card"
      style={{ border: '1.5px solid var(--line)', pointerEvents: 'none' }}
    >
      <div
        className="pcover"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Skeleton width="48px" height="48px" radius="14px" />
      </div>
      <div className="pbody" style={{ display: 'grid', gap: '10px' }}>
        <Skeleton width="75%" height="22px" radius="6px" />
        <Skeleton width="95%" height="15px" radius="4px" />
        <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
          <Skeleton width="60px" height="22px" radius="999px" />
          <Skeleton width="75px" height="22px" radius="999px" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Blog Cards
 */
export function BlogCardSkeleton() {
  return (
    <div className="bcard" style={{ border: '1.5px solid var(--line)', pointerEvents: 'none' }}>
      <Skeleton height="190px" radius="16px" />
      <div className="bbody" style={{ display: 'grid', gap: '10px', padding: '16px 0' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Skeleton width="70px" height="20px" radius="999px" />
          <Skeleton width="60px" height="20px" radius="999px" />
        </div>
        <Skeleton width="90%" height="20px" radius="6px" />
        <Skeleton width="100%" height="14px" radius="4px" />
      </div>
    </div>
  );
}
