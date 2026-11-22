// Full project page for the steep-slope footwear study, rendered by
// src/components/ProjectPage.astro. Text is plain strings (one per paragraph).
// The paper is in preparation, so the findings are summarized in words only:
// keep result figures and numbers off the site (and out of this public repo)
// until it is published.
import shoes from '../../assets/images/steep-slopes/shoes.png';
import assembled from '../../assets/images/steep-slopes/assembled.jpg';
import incline from '../../assets/images/steep-slopes/incline.jpg';
import treadmillDiagram from '../../assets/images/treadmill_main.svg';

/** @type {import('./types').ProjectPageData} */
export const steepSlopesPage = {
  // Coral accent with the MyoAssist page's dark backgrounds (src/styles/page-themes/steep-slopes.css).
  theme: 'steep-slopes',
  role: 'First author (manuscript in preparation)',
  paper: 'Effects of steep slopes and footwear bending stiffness on joint kinematics during walking',
  banner: {
    image: shoes,
    alt: 'The three shoes tested: a Vibram FiveFingers KSO EVO minimalist shoe, a Puma Liberate Nitro running shoe without a plate, and a Puma Deviate Nitro Elite carbon-plated racing shoe.',
    crop: false,
  },
  intro: [
    'Carbon-plated shoes are now common in trail running, but studies of them have used level ground or slopes of about 10° or less. Trail races include much steeper climbs, and a stiff plate acts most directly on the metatarsophalangeal (MTP) joint at the base of the toes, which no earlier study had measured on slopes this steep.',
    "I designed and carried out a study of how slope and footwear bending stiffness change MTP, ankle and knee motion during uphill walking on slopes up to 30°, a 58% grade. I ran it in Prof. Wouter Hoogkamer's lab at UMass Amherst, and before it I helped build the custom treadmill that made these slopes possible to test.",
  ],
  sections: [
    {
      title: 'Study Design',
      features: [
        {
          heading: 'A Treadmill for Steep Slopes',
          body: [
            'All inclined trials used a custom-built treadmill that adjusts from 5° to 40°. Skateboard grip tape on the belt gives the foot traction at the steepest settings, following designs by  Nicola Giovanelli  and colleagues. Level-ground trials used a Treadmetrix lab treadmill.',
          ],
          media: {
            type: 'image',
            image: treadmillDiagram,
            alt: 'Diagram of the steep treadmill: motor, V-belt, winch mechanism, rope and counterweight, belt with grip tape, and hand rails, with the deck shown at 10, 20 and 30 degrees.',
            darkPanel: true,
          },
        },
        {
          heading: 'Protocol',
          body: [
            'Twelve healthy adults walked for one minute at each of four slopes (0°, 10°, 20° and 30°) in each of three shoes: a minimalist shoe (Vibram FiveFingers KSO EVO), a cushioned running shoe without a plate (Puma Liberate Nitro) and a carbon-plated racing shoe (Puma Deviate Nitro Elite). The minimalist shoe gave close to barefoot conditions without the safety and comfort problems of walking barefoot on grip tape.',
            'Speed was fixed at 0.6 m/s, at the upper end of what people could sustain up the 30° slope, so that only slope and shoe changed between trials. The order of conditions was counterbalanced across participants.',
          ],
          media: {
            type: 'gallery',
            images: [
              {
                image: assembled,
                alt: 'A person walking up the steep treadmill in running shoes, holding the hand rails.',
              },
              {
                image: incline,
                alt: 'A digital level reading 30.00 degrees on the grip-taped treadmill belt.',
              },
            ],
          },
        },
      ],
      closing: {
        heading: 'Kinematics',
        body: [
          'Reflective markers on the pelvis and leg were tracked with motion capture, and an OpenSim musculoskeletal model scaled to each participant gave MTP, ankle and knee angles through the stride. The steep treadmill has no force plates, so strides were split at the forward-most position of the marker on the first metatarsal head, which approximates foot contact.',
          'Statistical parametric mapping compared whole joint-angle curves across slopes and shoes, which places each difference in a specific phase of the stride.',
        ],
      },
    },
    {
      title: 'Findings',
      features: [],
      closing: {
        body: [
          'Slope changed motion at every joint. As the slope steepened, participants walked with more bend at the toes, more ankle dorsiflexion and more knee flexion.',
          'Footwear mattered mostly at the toes. On level ground and moderate slopes, differences between shoes appeared mainly at push-off. On the steepest slope, the plated shoe held the toes straighter than the unplated shoe from early stance through push-off. Footwear did not change ankle motion or stride timing.',
          'On the 30° slope, participants split into two foot strategies. Tip-toers stayed up on the forefoot with the toes bent through stance, and flat-footers kept the foot flat until push-off. The plate restricted toe motion in both groups: through stance in tip-toers, and mainly at push-off in flat-footers.',
          "A carbon plate keeps restricting the foot on steep climbs, where the foot does less of the leg's work, so its benefits on level ground may not carry over. The next step is to measure whether this restriction costs energy, and whether the cost differs between tip-toers and flat-footers.",
        ],
      },
    },
  ],
};
