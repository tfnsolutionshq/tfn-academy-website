import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useToast } from '@/shared/context/ToastContext';

function lum(hex: string) {
  const c = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

export interface ApplyPreset {
  type?: 'paid' | 'scholarship';
  schol?: string;
  t?: string;
  key: number;
}

export interface ContactPreset {
  topic?: string;
  msg?: string;
  key: number;
}

export interface ConsultPreset {
  talentId: string;
  key: number;
}

interface SiteContextValue {
  review: boolean;
  setReview: (val: boolean) => void;
  toggleReview: () => void;
  panel: 'review' | 'profile' | null;
  setPanel: (panel: 'review' | 'profile' | null) => void;
  profId: string | null;
  openTalentProfile: (id: string) => void;
  highlightOdId: string | null;
  openOd: (id: string) => void;
  brand: string;
  accent: string;
  applyColor: (key: 'brand' | 'accent', hex: string, persist?: boolean) => boolean;
  resetColors: () => void;
  photos: Record<string, string>;
  pickPhoto: (slot: string) => void;
  resetPhotos: () => void;
  videos: Record<string, string>;
  vid: string;
  setVid: (id: string) => void;
  pickVideo: (id: string) => void;
  openDdId: string | null;
  setOpenDdId: (id: string | null) => void;
  applyPreset: ApplyPreset;
  startApplyNew: () => void;
  startApplyProg: (slug: string) => void;
  startApplySchol: (id: string) => void;
  hireNiche: string;
  setHireNiche: (niche: string) => void;
  consultPreset: ConsultPreset;
  triggerConsult: (talentId?: string) => void;
  verifyAutoNum: string;
  setVerifyAutoNum: (num: string) => void;
  contactPreset: ContactPreset;
  startCorpProposal: () => void;
  finderScrollKey: number;
  triggerFinderScroll: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function loadInitialPhotos(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem('tfn-photos');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [review, setReview] = useState(true);
  const [panel, setPanel] = useState<'review' | 'profile' | null>(null);
  const [profId, setProfId] = useState<string | null>(null);
  const [highlightOdId, setHighlightOdId] = useState<string | null>(null);
  const [brand, setBrand] = useState('#1F4FE0');
  const [accent, setAccent] = useState('#FF7A1A');
  const [photos, setPhotos] = useState<Record<string, string>>(loadInitialPhotos);
  const [videos, setVideos] = useState<Record<string, string>>({});
  const [vid, setVid] = useState('hub');
  const [openDdId, setOpenDdId] = useState<string | null>(null);

  const [applyPreset, setApplyPreset] = useState<ApplyPreset>({ key: 0 });
  const [hireNiche, setHireNiche] = useState('all');
  const [consultPreset, setConsultPreset] = useState<ConsultPreset>({ talentId: '', key: 0 });
  const [verifyAutoNum, setVerifyAutoNum] = useState('');
  const [contactPreset, setContactPreset] = useState<ContactPreset>({ key: 0 });
  const [finderScrollKey, setFinderScrollKey] = useState(0);

  const applyColor = useCallback((key: 'brand' | 'accent', hex: string, persist = false) => {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return false;
    if (key === 'brand') setBrand(hex);
    else setAccent(hex);

    const L = lum(hex);
    const cw = 1.05 / (L + 0.05);
    const cb = (L + 0.05) / (lum('#0B1230') + 0.05);
    const r = document.documentElement.style;
    r.setProperty('--' + key, hex);
    r.setProperty(key === 'brand' ? '--on-brand' : '--on-accent', cw >= cb ? '#FFFFFF' : '#0B1230');

    if (persist) {
      try {
        window.localStorage.setItem('tfn-' + key, hex);
      } catch {
        // ignore
      }
    }
    return true;
  }, []);

  const resetColors = useCallback(() => {
    const r = document.documentElement.style;
    ['--brand', '--accent', '--on-brand', '--on-accent'].forEach((k) => r.removeProperty(k));
    setBrand('#1F4FE0');
    setAccent('#FF7A1A');
    try {
      window.localStorage.removeItem('tfn-brand');
      window.localStorage.removeItem('tfn-accent');
    } catch {
      // ignore
    }
    showToast('TFN colours restored');
  }, [showToast]);

  useEffect(() => {
    try {
      (['brand', 'accent'] as const).forEach((k) => {
        const v = window.localStorage.getItem('tfn-' + k);
        if (v) applyColor(k, v, false);
      });
    } catch {
      // ignore
    }
  }, [applyColor]);

  useEffect(() => {
    document.body.classList.toggle('review', review);
  }, [review]);

  const toggleReview = useCallback(() => {
    setReview((prev) => !prev);
  }, []);

  const openTalentProfile = useCallback((id: string) => {
    setProfId(id);
    setPanel('profile');
  }, []);

  const openOd = useCallback((id: string) => {
    setHighlightOdId(id);
    setPanel('review');
  }, []);

  const pickPhoto = useCallback(
    (slot: string) => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'image/*';
      inp.onchange = () => {
        const f = inp.files?.[0];
        if (!f) return;
        const rd = new FileReader();
        rd.onload = () => {
          const im = new Image();
          im.onload = () => {
            const m = 1100;
            const k = Math.min(1, m / Math.max(im.width, im.height));
            const c = document.createElement('canvas');
            c.width = Math.round(im.width * k);
            c.height = Math.round(im.height * k);
            const ctx = c.getContext('2d');
            if (ctx) ctx.drawImage(im, 0, 0, c.width, c.height);
            const dataUrl = c.toDataURL('image/jpeg', 0.82);
            setPhotos((prev) => {
              const next = { ...prev, [slot]: dataUrl };
              let kept = true;
              try {
                window.localStorage.setItem('tfn-photos', JSON.stringify(next));
              } catch {
                kept = false;
              }
              showToast(
                kept
                  ? 'Photo replaced'
                  : 'Photo shown, but too large to remember after you close the page',
              );
              return next;
            });
          };
          if (typeof rd.result === 'string') im.src = rd.result;
        };
        rd.readAsDataURL(f);
      };
      inp.click();
    },
    [showToast],
  );

  const resetPhotos = useCallback(() => {
    setPhotos({});
    try {
      window.localStorage.removeItem('tfn-photos');
    } catch {
      // ignore
    }
    showToast('Photos reset');
  }, [showToast]);

  const pickVideo = useCallback(
    (id: string) => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'video/*';
      inp.onchange = () => {
        const f = inp.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        setVideos((prev) => {
          if (prev[id]) URL.revokeObjectURL(prev[id]);
          return { ...prev, [id]: url };
        });
        setVid(id);
        showToast('Video loaded for this session. Send the file to make it permanent.');
      };
      inp.click();
    },
    [showToast],
  );

  const startApplyNew = useCallback(() => {
    setApplyPreset((prev) => ({ key: prev.key + 1 }));
  }, []);

  const startApplyProg = useCallback((slug: string) => {
    setApplyPreset((prev) => ({ type: 'paid', t: slug, key: prev.key + 1 }));
  }, []);

  const startApplySchol = useCallback((id: string) => {
    setApplyPreset((prev) => ({ type: 'scholarship', schol: id, key: prev.key + 1 }));
  }, []);

  const triggerConsult = useCallback((talentId = '') => {
    setPanel(null);
    setConsultPreset((prev) => ({ talentId, key: prev.key + 1 }));
  }, []);

  const startCorpProposal = useCallback(() => {
    setContactPreset((prev) => ({
      topic: 'Corporate training',
      msg: 'Organisation:\nIndustry:\nTeam size:\nTraining focus:\nPreferred format (on-site or online):',
      key: prev.key + 1,
    }));
  }, []);

  const triggerFinderScroll = useCallback(() => {
    setFinderScrollKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const onDocClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      if (openDdId && target && !target.closest('.dd')) {
        setOpenDdId(null);
      }
    };
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        if (openDdId) {
          const id = openDdId;
          setOpenDdId(null);
          const btn = document.getElementById('dd-' + id);
          if (btn) btn.focus();
        } else if (panel) {
          setPanel(null);
        }
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openDdId, panel]);

  const value = useMemo(
    () => ({
      review,
      setReview,
      toggleReview,
      panel,
      setPanel,
      profId,
      openTalentProfile,
      highlightOdId,
      openOd,
      brand,
      accent,
      applyColor,
      resetColors,
      photos,
      pickPhoto,
      resetPhotos,
      videos,
      vid,
      setVid,
      pickVideo,
      openDdId,
      setOpenDdId,
      applyPreset,
      startApplyNew,
      startApplyProg,
      startApplySchol,
      hireNiche,
      setHireNiche,
      consultPreset,
      triggerConsult,
      verifyAutoNum,
      setVerifyAutoNum,
      contactPreset,
      startCorpProposal,
      finderScrollKey,
      triggerFinderScroll,
    }),
    [
      review,
      toggleReview,
      panel,
      profId,
      openTalentProfile,
      highlightOdId,
      openOd,
      brand,
      accent,
      applyColor,
      resetColors,
      photos,
      pickPhoto,
      resetPhotos,
      videos,
      vid,
      pickVideo,
      openDdId,
      applyPreset,
      startApplyNew,
      startApplyProg,
      startApplySchol,
      hireNiche,
      consultPreset,
      triggerConsult,
      verifyAutoNum,
      contactPreset,
      startCorpProposal,
      finderScrollKey,
      triggerFinderScroll,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return ctx;
}

