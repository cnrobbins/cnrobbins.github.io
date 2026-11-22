// Site color palette: change ACTIVE_PALETTE to switch every color on the site.
// Each palette's colors are in src/styles/palettes/<name>.css. The hex values
// below are only for things that cannot read CSS variables (the browser-toolbar
// <meta name="theme-color"> tag and the favicon); keep them in sync with the
// palette file.

export type Section = 'current' | 'papers' | 'previous';

/** Favicon colors: match the nav logo, which is drawn in
 *  var(--color-highlight, var(--color-accent)) in light and dark mode. */
interface LogoColors {
  light: string;
  /** Used when the browser is in dark mode; omit to keep the light color. */
  dark?: string;
}

interface Palette {
  /** Toolbar tint in light mode, and per project section. */
  themeColor: string;
  sectionColors: Record<Section, string>;
  /** Toolbar tint in dark mode; omit to disable dark mode (and its nav toggle). */
  themeColorDark?: string;
  logo: LogoColors;
}

export const PALETTES = {
  blue: {
    themeColor: '#325fbf',
    sectionColors: { current: '#325fbf', papers: '#325fbf', previous: '#325fbf' },
    themeColorDark: '#13254a',
    logo: { light: '#325fbf', dark: '#3e6bcc' },
  },
  classic: {
    themeColor: '#268F57',
    sectionColors: { current: '#EB3132', papers: '#515BE5', previous: '#F5CD4D' },
    logo: { light: '#268F57' },
  },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof PALETTES;

export const ACTIVE_PALETTE: PaletteName = 'blue';

// Page themes: one project page can take on its own look (e.g. the MyoAssist
// page matches myoassist.neumove.org). A project opts in with `page.theme` in
// its data; colors are in src/styles/page-themes/<name>.css and apply on top
// of the active palette, light and dark.
export const PAGE_THEMES = {
  myoassist: {
    themeColor: '#155257',
    themeColorDark: '#27262b',
    logo: { light: '#155257', dark: '#4fb6c0' },
  },
  // Steep Slopes project page: coral accent, MyoAssist's dark backgrounds.
  'steep-slopes': {
    themeColor: '#fe4d55',
    themeColorDark: '#27262b',
    logo: { light: '#fe4d55', dark: '#fe4d55' },
  },
} satisfies Record<string, { themeColor: string; themeColorDark: string; logo: LogoColors }>;

export type PageThemeName = keyof typeof PAGE_THEMES;

/** Favicon colors by palette or page theme name, built as /favicons/<name>.svg. */
export const FAVICON_COLORS: Record<string, LogoColors> = Object.fromEntries(
  [...Object.entries(PALETTES), ...Object.entries(PAGE_THEMES)].map(([name, { logo }]) => [name, logo]),
);
