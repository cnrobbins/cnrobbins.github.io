// Site color palette: change ACTIVE_PALETTE to switch every color on the site.
// Each palette's colors are in src/styles/palettes/<name>.css. The hex values
// below are only for the browser-toolbar <meta name="theme-color"> tag, which
// cannot read CSS variables; keep them in sync with the palette file.

export type Section = 'current' | 'papers' | 'previous';

interface Palette {
  /** Toolbar tint in light mode, and per project section. */
  themeColor: string;
  sectionColors: Record<Section, string>;
  /** Toolbar tint in dark mode; omit to disable dark mode (and its nav toggle). */
  themeColorDark?: string;
  favicon: string;
}

export const PALETTES = {
  blue: {
    themeColor: '#325fbf',
    sectionColors: { current: '#325fbf', papers: '#325fbf', previous: '#325fbf' },
    themeColorDark: '#13254a',
    favicon: '/favicons/blue.svg',
  },
  classic: {
    themeColor: '#268F57',
    sectionColors: { current: '#EB3132', papers: '#515BE5', previous: '#F5CD4D' },
    favicon: '/favicons/classic.svg',
  },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof PALETTES;

export const ACTIVE_PALETTE: PaletteName = 'blue';

// Page themes: one project page can take on its own look (e.g. the MyoAssist
// page matches myoassist.neumove.org). A project opts in with `page.theme` in
// its data; colors are in src/styles/page-themes/<name>.css and apply on top
// of the active palette, light and dark.
export const PAGE_THEMES = {
  myoassist: { themeColor: '#155257', themeColorDark: '#27262b' },
} satisfies Record<string, { themeColor: string; themeColorDark: string }>;

export type PageThemeName = keyof typeof PAGE_THEMES;
