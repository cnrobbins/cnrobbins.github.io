// Previous Work projects, in display order (the Previous Work section on /projects).
// A project with `page` data also gets a full page at /projects/<slug>
// (src/pages/projects/[slug].astro) and a linked title; the others are listed only.
// Images are imported (not /assets/ paths) so the build can process them; see Img.astro.
import treadmillMain from '../assets/images/treadmill_main.svg';
import roboshoes from '../assets/images/roboshoes.png';
import { steepSlopesPage } from './projects/steep-slopes.js';

/** @type {import('./projects/types').Project[]} */
export const previousProjects = [
  {
    slug: 'steep-slopes',
    title: 'Uphill Biomechanics',
    image: treadmillMain,
    imageAlt: 'Diagram of the custom steep-incline treadmill and its 10, 20 and 30 degree settings',
    darkPanel: true,
    page: steepSlopesPage,
    blurb: 'How slopes up to 30° and carbon-plated running shoes change toe, ankle and knee motion during uphill walking.',
    description:
      'I investigated whether carbon-plated running shoes provide biomechanical advantages during extreme uphill walking. I designed and carried out the full study, analyzing joint kinematics across three footwear types (minimalist, standard, and carbon-plated) on inclines up to 30°. Prior to the study, I helped build a custom steep-incline treadmill system capable of adjusting from 5-40° for testing at these extreme slopes.',
  },
  {
    slug: 'wearable-robotic-shoes',
    title: 'Wearable Robotic Shoes',
    image: roboshoes,
    imageAlt: 'Wearable Robotic Shoes Project',
    darkPanel: true,
    blurb: 'Shoes with pneumatic sole pockets that change stiffness during walking, for gait rehabilitation.',
    description:
      'I helped develop wearable robotic shoes for gait rehabilitation. I designed and prototyped custom pneumatic air pockets that can adjust the stiffness of the shoe sole during walking, allowing patients to experience gait perturbations in natural environments rather than being confined to laboratory settings. The system uses flexible components and embedded sensors to maintain a lightweight, portable design.',
  },
];
