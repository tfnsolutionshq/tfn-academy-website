import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ODS, findTrack } from '@/shared/constants/academyData';
import type { BlogPost, FaqItem, Track } from '@/shared/types/academy';
import { Icon } from '@/shared/components/ui/Icon';
import { useSite } from '@/shared/context/SiteContext';

const SKIN = ['#4A2C1F', '#6B4128', '#8A5A3B', '#A8754F', '#C79A74'];

const shade = (hex: string, f: number) =>
  '#' +
  [1, 3, 5]
    .map((i) =>
      Math.max(0, Math.min(255, Math.round(parseInt(hex.slice(i, i + 2), 16) * f)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

interface PersonSpec {
  s: number;
  h: string;
  hc: string;
  c: string;
  bg: number;
  gl?: number;
  wc?: string;
  kid?: number;
}

const PEOPLE: PersonSpec[] = [
  { s: 1, h: 'afro', hc: '#17110E', c: 'brand', bg: 0 },
  { s: 0, h: 'braids', hc: '#17110E', c: '#1B2430', bg: 1, gl: 1 },
  { s: 2, h: 'wrap', hc: '#17110E', c: '#F2F4F7', bg: 2, wc: 'accent' },
  { s: 3, h: 'short', hc: '#1D1511', c: 'accent', bg: 0, gl: 1 },
  { s: 1, h: 'locs', hc: '#17110E', c: '#6B7686', bg: 1 },
  { s: 0, h: 'bun', hc: '#17110E', c: 'brand', bg: 2 },
  { s: 4, h: 'fade', hc: '#1D1511', c: '#F2F4F7', bg: 0, gl: 1 },
  { s: 2, h: 'afro', hc: '#17110E', c: '#1B2430', bg: 1, gl: 1 },
  { s: 3, h: 'wrap', hc: '#17110E', c: '#6B7686', bg: 2, wc: '#1F7A6B' },
  { s: 0, h: 'short', hc: '#17110E', c: 'brand', bg: 0 },
  { s: 1, h: 'puffs', hc: '#17110E', c: 'accent', bg: 0, kid: 1 },
  { s: 0, h: 'fade', hc: '#17110E', c: 'brand', bg: 1, kid: 1 },
  { s: 2, h: 'braids', hc: '#17110E', c: '#1B2430', bg: 2, kid: 1 },
];

export function personSvg(i: number): string {
  const p = PEOPLE[((i % PEOPLE.length) + PEOPLE.length) % PEOPLE.length];
  const skin = SKIN[p.s];
  const skinD = shade(skin, 0.82);
  const hc = p.hc;
  const kid = !!p.kid;
  const V: Record<string, string> = { brand: 'var(--brand)', accent: 'var(--accent)' };
  const cloth = V[p.c] || p.c;
  const clothD = V[p.c] ? `color-mix(in srgb,${V[p.c]} 78%,#000)` : shade(p.c, 0.8);
  const wrapC = (p.wc && V[p.wc]) || p.wc || '#F2B705';
  const bg = [
    `<rect width="400" height="500" style="fill:var(--brand-soft)"/><circle cx="200" cy="235" r="175" style="fill:var(--brand-mid)"/>`,
    `<rect width="400" height="500" style="fill:var(--brand)"/><circle cx="318" cy="96" r="62" fill="#fff" opacity=".22"/><circle cx="60" cy="420" r="96" fill="#fff" opacity=".14"/>`,
    `<rect width="400" height="500" fill="#0B1737"/><circle cx="200" cy="225" r="150" style="fill:var(--accent)"/>`,
  ][p.bg];
  let back = '';
  let front = '';
  if (p.h === 'afro') {
    back = `<circle cx="200" cy="150" r="96" fill="${hc}"/>`;
    front = `<path d="M143 188 C138 118 262 118 257 188 C248 152 152 152 143 188Z" fill="${hc}"/>`;
  }
  if (p.h === 'braids') {
    back =
      [146, 136, 126]
        .map(
          (x, k) =>
            `<path d="M${x} 150 Q${x - 8} 240 ${x - 14} ${300 + k * 14}" stroke="${hc}" stroke-width="14" stroke-linecap="round" fill="none"/>`,
        )
        .join('') +
      [254, 264, 274]
        .map(
          (x, k) =>
            `<path d="M${x} 150 Q${x + 8} 240 ${x + 14} ${300 + k * 14}" stroke="${hc}" stroke-width="14" stroke-linecap="round" fill="none"/>`,
        )
        .join('');
    front = `<path d="M142 190 C136 108 264 108 258 190 C248 148 152 148 142 190Z" fill="${hc}"/>`;
  }
  if (p.h === 'locs') {
    back = Array.from({ length: 9 }, (_, k) => {
      const x = 142 + k * 14.5;
      const L = 240 + ((k * 37) % 60);
      return `<path d="M${x} 130 Q${x + (k - 4) * 2} ${L - 60} ${x + (k - 4) * 3} ${L}" stroke="${hc}" stroke-width="11" stroke-linecap="round" fill="none"/>`;
    }).join('');
    front = `<path d="M142 190 C134 104 266 104 258 190 C248 146 152 146 142 190Z" fill="${hc}"/>`;
  }
  if (p.h === 'short')
    front = `<path d="M144 184 C142 124 258 124 256 184 C246 156 154 156 144 184Z" fill="${hc}"/>`;
  if (p.h === 'fade')
    front = `<path d="M147 176 C150 128 250 128 253 176 C240 150 160 150 147 176Z" fill="${hc}"/>`;
  if (p.h === 'bun') {
    back = `<circle cx="200" cy="96" r="30" fill="${hc}"/>`;
    front = `<path d="M143 188 C140 118 260 118 257 188 C248 152 152 152 143 188Z" fill="${hc}"/>`;
  }
  if (p.h === 'puffs') {
    back = `<circle cx="146" cy="124" r="32" fill="${hc}"/><circle cx="254" cy="124" r="32" fill="${hc}"/>`;
    front = `<path d="M142 188 C140 124 260 124 258 188 C248 154 152 154 142 188Z" fill="${hc}"/>`;
  }
  if (p.h === 'wrap')
    front = `<path d="M139 182 C132 118 268 118 261 182 C250 150 150 150 139 182Z" fill="${wrapC}"/><ellipse cx="206" cy="108" rx="66" ry="42" transform="rotate(-8 206 108)" fill="${wrapC}"/><path d="M150 128 Q205 70 262 118 M156 146 Q210 96 258 138" stroke="#fff" stroke-width="3" fill="none" opacity=".45"/>`;
  const glasses = p.gl
    ? `<g fill="none" stroke="#111" stroke-width="4"><circle cx="177" cy="198" r="17"/><circle cx="223" cy="198" r="17"/><path d="M194 198 H206"/></g>`
    : '';
  const rx = kid ? 62 : 58;
  const ry = kid ? 64 : 70;
  const er = kid ? 5.6 : 4.5;
  const fig = `${back}
    <path d="M30 500 C30 392 84 328 150 308 L250 308 C316 328 370 392 370 500Z" fill="${cloth}"/>
    <rect x="180" y="236" width="40" height="80" rx="16" fill="${skinD}"/>
    <path d="M158 306 Q200 350 242 306 Q200 322 158 306Z" fill="${clothD}"/>
    <ellipse cx="142" cy="198" rx="9" ry="15" fill="${skin}"/><ellipse cx="258" cy="198" rx="9" ry="15" fill="${skin}"/>
    <ellipse cx="200" cy="${kid ? 196 : 192}" rx="${rx}" ry="${ry}" fill="${skin}"/>
    ${front}
    <g fill="#1A1210"><circle cx="177" cy="198" r="${er}"/><circle cx="223" cy="198" r="${er}"/></g>
    <path d="M180 228 Q200 246 220 228" stroke="#1A1210" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    ${glasses}
    <path d="M86 500 L104 414 Q107 402 120 402 L280 402 Q293 402 296 414 L314 500Z" fill="#CBD2DB"/>
    <rect x="108" y="406" width="184" height="4" rx="2" fill="#fff" opacity=".6"/>
    <circle cx="200" cy="456" r="15" style="fill:var(--accent)"/>`;
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMin slice" role="img" aria-label="Illustrated student placeholder">${bg}${kid ? `<g transform="translate(200 500) scale(.9) translate(-200 -500)">${fig}</g>` : fig}</svg>`;
}

export function spaceSvg(v: number): string {
  const wall = `<rect width="600" height="400" style="fill:var(--brand-soft)"/><rect y="255" width="600" height="145" style="fill:var(--brand-mid)"/>`;
  const win = `<rect x="50" y="46" width="150" height="124" rx="10" fill="#fff" opacity=".75"/><path d="M125 46V170M50 108H200" stroke="var(--brand-mid)" stroke-width="4"/>`;
  const plant = `<circle cx="552" cy="212" r="30" fill="#2E9E6B"/><circle cx="530" cy="232" r="20" fill="#3DB57E"/><rect x="545" y="236" width="14" height="44" rx="4" fill="#8A5A3B"/>`;
  let s = '';
  if (v === 0) {
    s =
      win +
      `<rect x="330" y="60" width="220" height="124" rx="10" fill="#0B1737"/><rect x="350" y="82" width="110" height="10" rx="5" style="fill:var(--accent)"/><rect x="350" y="106" width="170" height="8" rx="4" fill="#fff" opacity=".35"/><rect x="350" y="124" width="140" height="8" rx="4" fill="#fff" opacity=".25"/>`;
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++) {
        const x = 70 + c * 118;
        const y = 262 + r * 42;
        s += `<rect x="${x}" y="${y}" width="96" height="14" rx="4" fill="#16224A"/><rect x="${x + 8}" y="${y + 14}" width="6" height="20" fill="#16224A"/><rect x="${x + 82}" y="${y + 14}" width="6" height="20" fill="#16224A"/><circle cx="${x + 48}" cy="${y + 42}" r="9" style="fill:var(--accent)"/>`;
      }
  } else if (v === 1) {
    s =
      win +
      plant +
      `<rect x="60" y="236" width="470" height="18" rx="6" fill="#16224A"/><rect x="80" y="254" width="8" height="70" fill="#16224A"/><rect x="500" y="254" width="8" height="70" fill="#16224A"/>`;
    for (let i = 0; i < 4; i++) {
      const x = 90 + i * 112;
      s += `<rect x="${x}" y="190" width="68" height="44" rx="4" fill="#0B1737"/><rect x="${x + 8}" y="198" width="52" height="6" rx="3" style="fill:var(--accent)"/><rect x="${x + 8}" y="210" width="38" height="5" rx="2.5" fill="#fff" opacity=".35"/><circle cx="${x + 34}" cy="300" r="16" style="fill:var(--brand)"/>`;
    }
  } else if (v === 2) {
    s = `<rect x="40" y="50" width="520" height="250" rx="14" fill="#fff" opacity=".4" stroke="#fff" stroke-width="3"/><path d="M215 50V300M385 50V300" stroke="#fff" stroke-width="3" opacity=".7"/><rect x="190" y="84" width="220" height="100" rx="8" fill="#0B1737"/><rect x="208" y="102" width="90" height="9" rx="4" style="fill:var(--accent)"/><rect x="208" y="124" width="150" height="7" rx="3" fill="#fff" opacity=".35"/><ellipse cx="300" cy="300" rx="130" ry="38" fill="#16224A"/>`;
    [
      [190, 278],
      [410, 278],
      [250, 334],
      [350, 334],
    ].forEach(([x, y]) => {
      s += `<circle cx="${x}" cy="${y}" r="14" style="fill:var(--accent)"/>`;
    });
    s += plant.replace(/552/g, '515').replace(/530/g, '495').replace(/545/g, '508');
  } else {
    s =
      win +
      `<rect x="300" y="210" width="240" height="70" rx="22" style="fill:var(--brand)"/><rect x="290" y="236" width="30" height="60" rx="14" style="fill:var(--brand)"/><rect x="520" y="236" width="30" height="60" rx="14" style="fill:var(--brand)"/><rect x="60" y="250" width="180" height="40" rx="8" fill="#16224A"/><rect x="80" y="214" width="60" height="36" rx="4" fill="#0B1737"/>` +
      plant.replace(/552/g, '270').replace(/530/g, '248').replace(/545/g, '263');
  }
  return wall + s;
}

import ctaImg from '@/assets/optimized/cta.jpg';
import hero1Img from '@/assets/optimized/hero1.jpg';
import hero2Img from '@/assets/optimized/hero2.jpg';
import kidsband1Img from '@/assets/optimized/kidsband1.jpg';
import kidsband2Img from '@/assets/optimized/kidsband2.jpg';
import who1Img from '@/assets/optimized/who1.jpg';
import who2Img from '@/assets/optimized/who2.jpg';
import who3Img from '@/assets/optimized/who3.jpg';
import who4Img from '@/assets/optimized/who4.jpg';
import who5Img from '@/assets/optimized/who5.jpg';
import who6Img from '@/assets/optimized/who6.jpg';
import whyImg from '@/assets/optimized/why.jpg';

// Programme pages hero images
import progFrontendImg from '@/assets/optimized/prog-frontend.jpg';
import progBackendImg from '@/assets/optimized/prog-backend.jpg';
import progFullstackImg from '@/assets/optimized/prog-fullstack.jpg';
import progMobileImg from '@/assets/optimized/prog-mobile.jpg';
import progCloudImg from '@/assets/optimized/prog-cloud.jpg';
import progCyberImg from '@/assets/optimized/prog-cyber.jpg';
import progNetworkImg from '@/assets/optimized/prog-network.jpg';
import progItsupportImg from '@/assets/optimized/prog-itsupport.jpg';
import progDataImg from '@/assets/optimized/prog-data.jpg';
import progAiImg from '@/assets/optimized/prog-ai.jpg';
import progMarketingImg from '@/assets/optimized/prog-marketing.jpg';
import progSocialImg from '@/assets/optimized/prog-social.jpg';
import progGraphicsImg from '@/assets/optimized/prog-graphics.jpg';
import progVideoImg from '@/assets/optimized/prog-video.jpg';
import progBrandingImg from '@/assets/optimized/prog-branding.jpg';
import progBusinessImg from '@/assets/optimized/prog-business.jpg';
import progProductImg from '@/assets/optimized/prog-product.jpg';
import progProjectImg from '@/assets/optimized/prog-project.jpg';
import progVaImg from '@/assets/optimized/prog-va.jpg';

// Academy pages images
import acadAboutImg from '@/assets/optimized/acad-about.jpg';
import acadAboutHubImg from '@/assets/optimized/acad-about-hub.jpg';
import acadAdmImg from '@/assets/optimized/acad-adm.jpg';
import acadKids1Img from '@/assets/optimized/acad-kids1.jpg';
import acadKids2Img from '@/assets/optimized/acad-kids2.jpg';
import acadSch1Img from '@/assets/optimized/acad-sch1.jpg';
import acadSch2Img from '@/assets/optimized/acad-sch2.jpg';
import acadSchBandImg from '@/assets/optimized/acad-sch-band.jpg';
import acadCareersImg from '@/assets/optimized/acad-careers.jpg';

// Blog posts images
import blogChooseSkillImg from '@/assets/optimized/blog-choose-skill.jpg';
import blogProjectsImg from '@/assets/optimized/blog-projects.jpg';
import blogDevopsImg from '@/assets/optimized/blog-devops.jpg';
import blogMktgImg from '@/assets/optimized/blog-mktg.jpg';
import blogStudyImg from '@/assets/optimized/blog-study.jpg';
import blogVaImg from '@/assets/optimized/blog-va.jpg';
import blogKidsImg from '@/assets/optimized/blog-kids.jpg';
import blogCertsImg from '@/assets/optimized/blog-certs.jpg';

// Corporate, Hire Talents & Hub images
import corp1Img from '@/assets/optimized/corp1.jpg';
import corp2Img from '@/assets/optimized/corp2.jpg';
import corp3Img from '@/assets/optimized/corp3.jpg';
import corpOnsiteImg from '@/assets/optimized/corp-onsite.jpg';
import corpOnsite2Img from '@/assets/optimized/corp-onsite2.jpg';
import corpOnlineImg from '@/assets/optimized/corp-online.jpg';
import corpBandImg from '@/assets/optimized/corp-band.jpg';
import hireImg from '@/assets/optimized/hire.jpg';
import hub1Img from '@/assets/optimized/hub1.jpg';
import hub2Img from '@/assets/optimized/hub2.jpg';
import hub3Img from '@/assets/optimized/hub3.jpg';
import hubSpaceTrainingImg from '@/assets/optimized/hub-space-training.jpg';
import hubSpaceFlexiImg from '@/assets/optimized/hub-space-flexi.jpg';
import hubSpaceMeetingImg from '@/assets/optimized/hub-space-meeting.jpg';

const DEFAULT_SLOT_IMAGES: Record<string, string> = {
  hero1: hero1Img,
  hero2: hero2Img,
  why: whyImg,
  who1: who1Img,
  who2: who2Img,
  who3: who3Img,
  who4: who4Img,
  who5: who5Img,
  who6: who6Img,
  kidsband1: kidsband1Img,
  kidsband2: kidsband2Img,
  cta: ctaImg,

  // Programme sub-pages: 'prog-' + slug
  'prog-frontend': progFrontendImg,
  'prog-backend': progBackendImg,
  'prog-fullstack': progFullstackImg,
  'prog-mobile': progMobileImg,
  'prog-cloud': progCloudImg,
  'prog-cyber': progCyberImg,
  'prog-network': progNetworkImg,
  'prog-itsupport': progItsupportImg,
  'prog-data': progDataImg,
  'prog-ai': progAiImg,
  'prog-marketing': progMarketingImg,
  'prog-social': progSocialImg,
  'prog-graphics': progGraphicsImg,
  'prog-video': progVideoImg,
  'prog-branding': progBrandingImg,
  'prog-business': progBusinessImg,
  'prog-product': progProductImg,
  'prog-project': progProjectImg,
  'prog-va': progVaImg,

  // Academy sub-pages
  about: acadAboutImg,
  about2: progBrandingImg,
  'about-hub': acadAboutHubImg,
  adm: acadAdmImg,
  kids1: acadKids1Img,
  kids2: acadKids2Img,
  sch1: acadSch1Img,
  sch2: acadSch2Img,
  'sch-band': acadSchBandImg,
  careers: acadCareersImg,

  // Blog posts
  'blog-choose-your-first-tech-skill': blogChooseSkillImg,
  'blog-beginner-projects-for-your-portfolio': blogProjectsImg,
  'blog-what-does-a-devops-engineer-do': blogDevopsImg,
  'blog-digital-marketing-skills-businesses-need': blogMktgImg,
  'blog-learn-faster-studying-part-time': blogStudyImg,
  'blog-start-as-a-virtual-assistant': blogVaImg,
  'blog-why-kids-should-learn-digital-skills': blogKidsImg,
  'blog-certifications-that-help-beginners': blogCertsImg,

  // Corporate Training
  corp1: corp1Img,
  corp2: corp2Img,
  corp3: corp3Img,
  'corp-onsite': corpOnsiteImg,
  'corp-onsite2': corpOnsite2Img,
  'corp-online': corpOnlineImg,
  'corp-band': corpBandImg,

  // Hire Talents hero
  hire: hireImg,

  // TFN Hub
  hub1: hub1Img,
  hub2: hub2Img,
  hub3: hub3Img,
  'space-training': hubSpaceTrainingImg,
  'space-flexi': hubSpaceFlexiImg,
  'space-meeting': hubSpaceMeetingImg,
};

export function Photo({
  slot,
  idx,
  className = '',
}: {
  slot: string;
  idx: number;
  className?: string;
}) {
  const { photos, pickPhoto } = useSite();
  const effectiveSrc = photos[slot] || DEFAULT_SLOT_IMAGES[slot];
  return (
    <div className={`photo ${className}`.trim()} data-slot={slot}>
      {effectiveSrc ? (
        <img src={effectiveSrc} alt="Student photo" loading="lazy" />
      ) : (
        <div
          style={{ width: '100%', height: '100%', display: 'contents' }}
          dangerouslySetInnerHTML={{ __html: personSvg(idx) }}
        />
      )}
      <button
        type="button"
        className="rp"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          pickPhoto(slot);
        }}
      >
        <Icon name="camera" />
        Replace photo
      </button>
    </div>
  );
}

export function Scene({
  slot,
  v,
  className = '',
}: {
  slot: string;
  v: number;
  className?: string;
}) {
  const { photos, pickPhoto } = useSite();
  const effectiveSrc = photos[slot] || DEFAULT_SLOT_IMAGES[slot];
  const fullSvg = `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated space placeholder">${spaceSvg(v)}</svg>`;
  return (
    <div className={`photo ${className}`.trim()} data-slot={slot}>
      {effectiveSrc ? (
        <img src={effectiveSrc} alt="Space photo" loading="lazy" />
      ) : (
        <div
          style={{ width: '100%', height: '100%', display: 'contents' }}
          dangerouslySetInnerHTML={{ __html: fullSvg }}
        />
      )}
      <button
        type="button"
        className="rp"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          pickPhoto(slot);
        }}
      >
        <Icon name="camera" />
        Replace photo
      </button>
    </div>
  );
}

export function BlogCover({ post, extraClass = '' }: { post: BlogPost; extraClass?: string }) {
  const { photos, pickPhoto } = useSite();
  const slot = 'blog-' + post.slug;
  const effectiveSrc = photos[slot] || DEFAULT_SLOT_IMAGES[slot];
  return (
    <div className={`bcover v${post.v} ${extraClass}`.trim()} data-slot={slot}>
      {effectiveSrc ? (
        <img src={effectiveSrc} alt={post.t} loading="lazy" />
      ) : (
        <Icon name={post.ic} />
      )}
      <button
        type="button"
        className="rp"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          pickPhoto(slot);
        }}
      >
        <Icon name="camera" />
        Replace image
      </button>
    </div>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link className="bcard" to={`/blog/${post.slug}`}>
      <BlogCover post={post} />
      <div className="bbody">
        <div className="bmeta">
          <span className="pill ac">{post.cat}</span>
          <span>{post.read}</span>
        </div>
        <h3>{post.t}</h3>
        <p>{post.ex}</p>
      </div>
    </Link>
  );
}

export function OdTag({ id }: { id: string }) {
  const { openOd } = useSite();
  const o = ODS.find((x) => x.id === id);
  if (!o) return null;
  return (
    <button
      type="button"
      className="od"
      title={o.d}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openOd(id);
      }}
    >
      {id} {o.t}
    </button>
  );
}

export function CtaBand() {
  const { startApplyNew } = useSite();
  return (
    <div className="band">
      <div className="t">
        <h2>Start building your future today.</h2>
        <p>
          Pick a programme, apply in a few minutes, and our admissions team will take you through
          your cohort and next steps.
        </p>
        <div className="btns">
          <Link className="btn btn-accent" to="/apply" onClick={startApplyNew}>
            Apply now <Icon name="arrow-right" className="arr" />
          </Link>
          <Link className="btn btn-line-w" to="/programmes">
            Explore programmes
          </Link>
        </div>
      </div>
      <Photo slot="cta" idx={5} />
    </div>
  );
}

export function ProgrammeCard({ track }: { track: Track }) {
  return (
    <Link className={`pcard c-${track.cat}`} to={`/programmes/${track.slug}`}>
      <div className="pcover">
        <span className="big">
          <Icon name={track.ic} />
        </span>
        <span className="lv pill dk">
          {track.levels.length === 2 ? 'Beginner to Advanced' : 'Single course'}
        </span>
      </div>
      <div className="pbody">
        <h3>{track.short}</h3>
        <p>{track.line}</p>
        <div className="tags">
          {track.tags.map((x) => (
            <span key={x} className="tag">
              {x}
            </span>
          ))}
        </div>
        <span className="go">
          View programme <Icon name="arrow-right" />
        </span>
      </div>
    </Link>
  );
}

export function CertChip({ cert }: { cert: string }) {
  return (
    <span className="cert" tabIndex={0}>
      <Icon name="award" />
      <span>{cert}</span>
    </span>
  );
}

export function FaqList({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(defaultOpen);
  return (
    <div className="faq">
      {items.map(([q, a, o], i) => {
        const isOpen = openIdx === i;
        return (
          <div key={q} className={`qa ${isOpen ? 'open' : ''}`.trim()}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? null : i)}
            >
              {q}
              <Icon name="chevron-down" />
            </button>
            <div className="bw">
              <div className="bi">
                <div className="a">
                  {a} {o ? <OdTag id={o} /> : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Marquee({
  items,
  durationSec,
  label,
}: {
  items: ReactNode[];
  durationSec: number;
  label: string;
}) {
  return (
    <div className="marquee" role="region" aria-label={label}>
      <div className="mq-track" style={{ ['--mq' as string]: `${durationSec}s` }}>
        {items.map((item, idx) => (
          <div key={`a-${idx}`} className="mq-item">
            {item}
          </div>
        ))}
        {items.map((item, idx) => (
          <div key={`b-${idx}`} className="mq-item dup" aria-hidden="true">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface DdOption {
  v: string;
  l: string;
  ic?: string;
  g?: string;
  r?: string;
  rc?: string;
}

export function CustomDropdown({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (val: string) => void;
  options: DdOption[];
  placeholder: string;
}) {
  const { openDdId, setOpenDdId } = useSite();
  const isOpen = openDdId === id;
  const sel = options.find((x) => x.v === value);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setOpenDdId(id);
        return;
      }
      const box = e.currentTarget;
      const os = Array.from(box.querySelectorAll<HTMLButtonElement>('.dd-opt'));
      if (!os.length) return;
      let idx = os.indexOf(document.activeElement as HTMLButtonElement);
      idx = e.key === 'ArrowDown' ? Math.min(os.length - 1, idx + 1) : Math.max(0, idx - 1);
      os[idx < 0 ? 0 : idx]?.focus();
    }
  };

  let lastG: string | null = null;

  return (
    <div className={`dd ${isOpen ? 'open' : ''}`.trim()} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="dd-btn"
        id={`dd-${id}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setOpenDdId(isOpen ? null : id)}
      >
        <span className={`dd-val ${sel ? '' : 'ph'}`.trim()}>
          {sel && sel.ic ? <Icon name={sel.ic} /> : null}
          <span>{sel ? sel.l : placeholder}</span>
        </span>
        <Icon name="chevron-down" />
      </button>
      {isOpen && (
        <div className="dd-list" role="listbox">
          {options.map((x) => {
            const showGroup = x.g && x.g !== lastG;
            if (x.g) lastG = x.g;
            return (
              <div key={x.v} style={{ display: 'contents' }}>
                {showGroup ? <div className="dd-g">{x.g}</div> : null}
                <button
                  type="button"
                  role="option"
                  aria-selected={x.v === value}
                  className={`dd-opt ${x.v === value ? 'on' : ''}`.trim()}
                  onClick={() => {
                    onChange(x.v);
                    setOpenDdId(null);
                    const btn = document.getElementById(`dd-${id}`);
                    if (btn) btn.focus();
                  }}
                >
                  <span className="l">
                    {x.ic ? <Icon name={x.ic} /> : null}
                    {x.l}
                  </span>
                  {x.r ? <span className={`r ${x.rc || ''}`.trim()}>{x.r}</span> : null}
                  {x.v === value ? <Icon name="check" className="ck" /> : null}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const esc = (s: unknown) =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c,
  );

export function downloadSyllabus(slug: string, showToast: (msg: string) => void) {
  const t = findTrack(slug);
  if (!t) return;
  const h = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${esc(t.short)} syllabus | TFN Academy</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;color:#0B1230}h1{font-size:2rem;margin:0}h2{margin-top:2rem;border-bottom:2px solid #1F4FE0;padding-bottom:6px}li{margin:6px 0}small{color:#5C668A}</style><body><small>TFN Academy, a subsidiary of TFN Solutions</small><h1>${esc(t.short)}</h1><p>${esc(t.line)}</p>
  <h2>What you’ll learn</h2><p>${esc(t.fq['Need to know'])}</p><h2>What you’ll be able to do</h2><p>${esc(t.fq['Able to do'])}</p>
  ${t.levels
    .map(
      (l) =>
        `<h2>${esc(l.kind)}: curriculum</h2><p><i>${esc(l.pre)}</i></p><ol>${l.mods
          .map((m) => `<li><b>${esc(m.n)}</b><br>${esc(m.t)}</li>`)
          .join('')}</ol><h3>Projects</h3><ul>${l.projs
          .map((p) => `<li><b>${esc(p.k)}:</b> ${esc(p.t)}</li>`)
          .join('')}</ul>`,
    )
    .join('')}
  <h2>Certifications</h2><ul>${t.certs.map((c) => `<li>${esc(c)}</li>`).join('')}</ul><h2>Tools and accounts</h2><p>${esc(t.tools)}</p><p><small>Learning format: in person and hybrid. Cohort dates and fees are shared by admissions after you apply.</small></p></body></html>`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([h], { type: 'text/html' }));
  a.download = `TFN-Academy-${slug}-syllabus.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  showToast(`${t.short} syllabus downloaded`);
}

