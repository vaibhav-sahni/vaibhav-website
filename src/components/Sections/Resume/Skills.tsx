import {FC, memo, PropsWithChildren, useState, useEffect, useRef} from 'react';

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';

// Small inline SVG icons for common CS skills; fallback to initials
const SkillIcon: FC<{name: string; className?: string}> = ({name, className}) => {
  // Prefer sensible filenames for common skills. Check known patterns first, otherwise
  // normalize to lowercase hyphen-separated name.
  const raw = name.toLowerCase().trim();
  // filename aliases are handled via 'candidates' below

  // use PNG files only per user's request
  // produce a list of candidate filenames for common skills (so 'C++' maps to cpp.png, c-plus-plus.png, etc.)
  const candidates = (() => {
    const base = (n: string) => n.replace(/\.svg$/, '').replace(/\.png$/, '') + '.png';
    if (/c\+\+|c\s*plus\s*plus|cpp/.test(raw)) return ['cpp.png', 'c-plus-plus.png', 'cplus.png'];
    if (/node\.?js|nodejs/.test(raw)) return ['node-js.png', 'nodejs.png', 'node.png'];
    if (/next\.?js|nextjs/.test(raw)) return ['next-js.png', 'nextjs.png'];
    if (/typescript|ts/.test(raw) && !/postgres|mysql/.test(raw)) return ['typescript.png', 'ts.png'];
    if (/javascript|js/.test(raw)) return ['javascript.png', 'js.png'];
    // default: normalized key
    const key = raw.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return [base(key)];
  })();

  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const candidate of candidates) {
        const url = `/logos/skills/${candidate}`;
        try {
          const res = await fetch(url, {method: 'HEAD'});
          if (res.ok) {
            if (!cancelled) {
              setSelectedSrc(url);
            }
            return;
          }
        } catch (err) {
          // ignore and try next
        }
      }
      if (!cancelled) setSelectedSrc(null);
    })();
    return () => {
      cancelled = true;
    };
  }, [raw]);
  // SVGs will scale to the parent container via CSS; no fixed pixel size here
  // No explicit JS-managed size; SVG scales via CSS

  // Render an <img> that attempts to load the public SVG; if it fails, fall back to the inline icon.
  // Use onError to toggle a local replaced state via a small inline trick: set dataset to "missing" and hide.
  // We'll use a simple approach: the <img> gets hidden on error and we render the inline SVG beneath using absolute stacking.

  return (
    <span className={`relative inline-block ${className}`}>
      {selectedSrc ? (
        <img
          src={selectedSrc}
          alt={name}
          className="block w-full h-full object-contain"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            // hide the image so the inline fallback shows
            el.style.display = 'none';
          }}
        />
      ) : null}

      {/* inline fallback (initials) — show only when PNG is confirmed missing */}
  {selectedSrc === null ? (
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="100%" height="100%" viewBox={`0 0 24 24`} aria-hidden>
            <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="#111827">
              {name
                .split(/\s|\.|\+/)
                .map(part => part.replace(/[^A-Za-z0-9]/g, ''))
                .filter(Boolean)
                .map(s => s[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </text>
          </svg>
        </span>
      ) : null}
      </span>
  );
};

export const SkillBadge: FC<{skill: SkillType}> = memo(({skill}) => {
  const {name} = skill;
  // Wikipedia summary popover state
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const cacheRef = useRef<Record<string, {text: string; url: string}>>({});
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const fetchSummary = async (queryName: string) => {
    // Normalized, hardcoded wiki title aliases to avoid ambiguous pages.
    const normalized = queryName.toLowerCase().replace(/[^a-z0-9+\-]+/g, '-').replace(/(^-|-$)/g, '');
    const aliasMap: Record<string, string> = {
      java: 'Java (programming language)',
      python: 'Python (programming language)',
      pandas: 'pandas (software)',
      'numpy': 'NumPy',
      django: 'Django (web framework)',
      'c++': 'C++',
      cpp: 'C++',
      'risc-v': 'RISC-V',
      riscv: 'RISC-V',
      'node.js': 'Node.js',
      nodejs: 'Node.js',
      node: 'Node.js',
      react: 'React (JavaScript library)',
      html: 'HTML',
      scss: 'Sass (stylesheet language)',
      sass: 'Sass (stylesheet language)',
      figma: 'Figma (software)',
      javascript: 'JavaScript',
      js: 'JavaScript',
      typescript: 'TypeScript',
      sql: 'SQL',
      fastapi: 'FastAPI'
    };
    const wikiTitle = aliasMap[normalized] || queryName;
    if (cacheRef.current[queryName]) {
      setSummary(cacheRef.current[queryName].text);
      return;
    }
    setLoading(true);
    try {
  const title = encodeURIComponent(wikiTitle);
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      if (!res.ok) throw new Error('no summary');
      const data = await res.json();
  const extract = data.extract || data.description || null;
  const url = data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiTitle)}`;
      if (extract) {
        cacheRef.current[queryName] = {text: extract, url};
        setSummary(extract);
      } else {
        cacheRef.current[queryName] = {text: 'No summary available.', url};
        setSummary('No summary available.');
      }
    } catch (err) {
      cacheRef.current[queryName] = {text: 'No summary available.', url: `https://en.wikipedia.org/wiki/${encodeURIComponent(queryName)}`};
      setSummary('No summary available.');
    } finally {
      setLoading(false);
    }
  };

  // handle hover/focus for desktop, click toggle for touch
  const show = () => {
    setOpen(true);
    fetchSummary(name);
  };
  // hide handled by scheduleClose when not pinned

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 150);
  };
  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // (No pinned behavior) — we only keep hover/focus handlers. Click will open the official site.

  return (
    <div className="relative inline-block">
      <button
        ref={openerRef}
        type="button"
        aria-label={name}
        aria-expanded={open}
        onMouseEnter={() => {
          cancelClose();
          show();
        }}
        onFocus={() => {
          cancelClose();
          show();
        }}
        onMouseLeave={() => {
          scheduleClose();
        }}
        onBlur={() => {
          scheduleClose();
        }}
        onClick={() => {
          // Open the official page for the skill/framework in a new tab.
          const openOfficial = () => {
            const n = name || '';
            const l = n.toLowerCase();
            let url: string | null = null;

            if (/react/i.test(l)) url = 'https://react.dev';
            else if (/next/i.test(l)) url = 'https://nextjs.org';
            else if (/node/i.test(l)) url = 'https://nodejs.org';
            else if (/python/i.test(l)) url = 'https://www.python.org';
            else if (/django/i.test(l)) url = 'https://www.djangoproject.com';
            else if (/typescript|\bts\b/i.test(l)) url = 'https://www.typescriptlang.org';
            else if (/javascript|\bjs\b/i.test(l)) url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';
            else if (/html/i.test(l)) url = 'https://developer.mozilla.org/en-US/docs/Web/HTML';
            else if (/scss|sass/i.test(l)) url = 'https://sass-lang.com';
            else if (/figma/i.test(l)) url = 'https://www.figma.com';
            else if (/risc-?v|riscv/i.test(l)) url = 'https://riscv.org';
            else if (/pandas/i.test(l)) url = 'https://pandas.pydata.org';
            else if (/numpy/i.test(l)) url = 'https://numpy.org';
            else if (/c\+\+|cpp|c\s*plus/i.test(l)) url = 'https://isocpp.org';
            else if (/java/i.test(l)) url = 'https://www.java.com';
            // fallback to cached wikipedia url if we've fetched it, otherwise Wikipedia
            const fallback = cacheRef.current[name]?.url || `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;
            const finalUrl = url || fallback;
            const w = window.open(finalUrl, '_blank');
            try {
              if (w) w.opener = null;
            } catch (e) {
              // ignore
            }
          };
          openOfficial();
        }}
        className="flex items-center justify-center transform transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400"
        title={name}>
        <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
          <SkillIcon name={name} className="h-full w-full" />
        </div>
      </button>

      {/* Popover */}
      {open ? (
        <div
          ref={popoverRef}
          onMouseEnter={() => cancelClose()}
          onMouseLeave={() => scheduleClose()}
          className="absolute z-50 left-1/2 transform -translate-x-1/2 top-full mt-2 w-72 max-w-xs bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 rounded-md shadow-lg ring-1 ring-black/5">
          <div className="p-3">
            <div className="font-semibold mb-1">{name}</div>
            {loading ? (
              <div className="text-xs text-neutral-500">Loading...</div>
            ) : (
              <div className="text-xs text-neutral-700 leading-relaxed">
                {summary ? (
                  <>
                    {summary.length > 400 ? `${summary.slice(0, 400)}...` : summary}
                    <div className="mt-2">
                      <a href={cacheRef.current[name]?.url || `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`} target="_blank" rel="noopener noreferrer" className="text-orange-500 underline text-xs">Read more</a>
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-neutral-500">No summary available.</div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
});

SkillBadge.displayName = 'SkillBadge';

export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {name, skills} = skillGroup;
  // exclude spoken languages groups
  if (name.toLowerCase().includes('spoken')) return null;

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 py-4">
        {skills.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="flex justify-center">
            <SkillBadge skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
});

SkillGroup.displayName = 'SkillGroup';

// Keep the old progress-style skill available as a fallback
export const Skill: FC<{skill: SkillType}> = memo(({skill}) => {
  const {name} = skill;

  return (
    <div className="flex flex-col">
      <span className="ml-2 text-sm font-medium">{name}</span>
    </div>
  );
});

Skill.displayName = 'Skill';
