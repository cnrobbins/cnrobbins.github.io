// Site-wide identity: used by the page <head> (search/link-preview metadata),
// the footer links, and the home page's structured data for Google.
import { getImage } from 'astro:assets';
import profilePhoto from '../assets/images/pfp2.jpg';

export const SITE_NAME = 'Calder Robbins';

export const SITE_DESCRIPTION =
  "Calder Robbins is a biomechanics and robotics researcher in Northeastern University's NeuMove Lab, developing assistive devices through neuromechanical simulation.";

/** Public profiles: footer links, and `sameAs` so Google ties them to this site. */
export const PROFILE_LINKS = [
  { label: 'GitHub', url: 'https://github.com/cnrobbins' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/calder-robbins/' },
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=EdbE5wwAAAAJ&hl=en' },
];

/** Profiles listed in structured data only (not shown in the footer). */
const EXTRA_PROFILE_URLS = ['https://orcid.org/0009-0003-2857-9309'];

const NORTHEASTERN = {
  '@type': 'CollegeOrUniversity',
  name: 'Northeastern University',
  url: 'https://www.northeastern.edu/',
};

/** Profile photo as a JPEG at most 1200 px wide, as an absolute URL (link previews, structured data). */
export async function shareImageUrl(): Promise<string> {
  const image = await getImage({
    src: profilePhoto,
    width: Math.min(profilePhoto.width, 1200),
    format: 'jpg',
  });
  return new URL(image.src, import.meta.env.SITE).href;
}

/** schema.org Person + WebSite graph for the home page. */
export async function personStructuredData() {
  const home = new URL('/', import.meta.env.SITE).href;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${home}#website`,
        url: home,
        name: SITE_NAME,
        about: { '@id': `${home}#person` },
      },
      {
        '@type': 'Person',
        '@id': `${home}#person`,
        name: SITE_NAME,
        url: home,
        image: await shareImageUrl(),
        jobTitle: 'Biomechanics & Robotics Researcher',
        description: SITE_DESCRIPTION,
        affiliation: NORTHEASTERN,
        memberOf: {
          '@type': 'ResearchOrganization',
          name: 'NeuMove Lab',
          url: 'https://neumove.org/',
          parentOrganization: NORTHEASTERN,
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'University of Massachusetts Amherst',
          url: 'https://www.umass.edu/',
        },
        knowsAbout: [
          'Biomechanics',
          'Neuromechanical simulation',
          'Wearable robotics',
          'Exoskeletons',
          'Rehabilitation engineering',
        ],
        sameAs: [...PROFILE_LINKS.map((link) => link.url), ...EXTRA_PROFILE_URLS],
      },
    ],
  };
}
