// Shapes of the project data in src/data/currentProjects.js and
// src/data/previousProjects.js, and the optional full-page content in
// src/data/projects/<slug>.js (rendered by ProjectPage.astro).
import type { ImageMetadata } from 'astro';
import type { PageThemeName } from '../../theme.config';

export interface ImageMedia {
  type: 'image';
  image: ImageMetadata;
  alt: string;
  /** Show on a light panel in dark mode (dark-on-transparent artwork). */
  darkPanel?: boolean;
}

/** A muted, looping clip; files live in public/assets/projects/<slug>/. */
export interface VideoMedia {
  type: 'video';
  sources: { src: string; type: string }[];
  poster: string;
  width: number;
  height: number;
  alt: string;
}

/** Several photos side by side at the same height, in one row's media slot. */
export interface GalleryMedia {
  type: 'gallery';
  images: { image: ImageMetadata; alt: string }[];
}

/** One alternating image/text row. */
export interface Feature {
  heading: string;
  /** One string per paragraph. */
  body: string[];
  media: ImageMedia | VideoMedia | GalleryMedia;
  /** 'wide': the media spans the page width between the heading and the text,
   *  for figures too detailed to read at half width. */
  layout?: 'wide';
}

export interface PageSection {
  title: string;
  /** Rows; leave empty for a text-only section (put the text in `closing`). */
  features: Feature[];
  /** Full-width text after the rows. */
  closing?: { heading?: string; body: string[] };
}

export interface ProjectPageData {
  theme?: PageThemeName;
  /** One line under the title, e.g. your role. */
  role?: string;
  /** Paper title, shown in italics after the role (e.g. "First author — <title>"). */
  paper?: string;
  /** Wide banner; `position` is a CSS object-position for the 3:1 crop.
   *  `crop: false` shows the whole image with no frame instead, for cut-outs on
   *  a transparent background (e.g. a row of products). */
  banner: { image: ImageMetadata; alt: string; position?: string; crop?: boolean };
  intro: string[];
  links?: { label: string; href: string }[];
  sections: PageSection[];
}

export interface Project {
  slug: string;
  title: string;
  image: ImageMetadata;
  /** Alt text for `image` in the /projects list (default: "<title> Project"). */
  imageAlt?: string;
  /** Show `image` on a light panel in dark mode (dark-on-transparent artwork). */
  darkPanel?: boolean;
  blurb: string;
  description: string;
  page?: ProjectPageData;
}
