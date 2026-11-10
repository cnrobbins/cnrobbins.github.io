// Shapes of the project data in src/data/currentProjects.js and the optional
// full-page content in src/data/projects/<slug>.js (rendered by ProjectPage.astro).
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

/** One alternating image/text row. */
export interface Feature {
  heading: string;
  /** One string per paragraph. */
  body: string[];
  media: ImageMedia | VideoMedia;
}

export interface PageSection {
  title: string;
  features: Feature[];
  /** Full-width text after the rows. */
  closing?: { heading?: string; body: string[] };
}

export interface ProjectPageData {
  theme?: PageThemeName;
  /** One line under the title, e.g. your role. */
  role?: string;
  /** Wide banner; `position` is a CSS object-position for the 3:1 crop. */
  banner: { image: ImageMetadata; alt: string; position?: string };
  intro: string[];
  links?: { label: string; href: string }[];
  sections: PageSection[];
}

export interface Project {
  slug: string;
  title: string;
  image: ImageMetadata;
  blurb: string;
  description: string;
  page?: ProjectPageData;
}
