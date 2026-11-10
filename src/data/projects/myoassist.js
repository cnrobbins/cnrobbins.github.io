// Full project page for MyoAssist, rendered by src/components/ProjectPage.astro.
// Text is plain strings (one per paragraph). Images go through Img.astro;
// videos live in public/assets/projects/<slug>/ (Astro does not process video).
import ensemble from '../../assets/images/myoassist/ensemble.png';
import pipeline from '../../assets/images/myoassist/pipeline.png';
import terrainTiles from '../../assets/images/myoassist/base_tiled_diverse.png';
import coFramework from '../../assets/images/myoassist/co_framework.png';

/** @type {import('./types').ProjectPageData} */
export const myoassistPage = {
  // Matches the MyoAssist website's teal theme (src/styles/page-themes/myoassist.css).
  theme: 'myoassist',
  role: 'Project Lead and co-first author of MyoAssist 1.0',
  banner: {
    image: ensemble,
    alt: 'Musculoskeletal models wearing different assistive devices walk across procedurally generated terrain with stairs, slopes and gaps.',
    position: 'center 45%',
  },
  intro: [
    'MyoAssist is an open-source framework for neuromechanical simulation of physical human-device interaction, built on MuJoCo within the MyoSuite ecosystem. It composes musculoskeletal models, assistive-device models and task scenarios into simulation environments, and provides frameworks to develop controllers for both the human and the device.',
    'Simulation studies of assistive devices typically rebuild device models, human-device integration and training pipelines for each study. MyoAssist provides these as shared, configurable components so that results can be reproduced, compared and extended. As Project Lead, I develop the device models, the environment-composition pipeline, the terrain generator, the controller-optimization framework, and the documentation and packaging.',
  ],
  links: [
    { label: 'MyoAssist Website', href: 'https://myoassist.neumove.org/' },
    { label: 'GitHub', href: 'https://github.com/neumovelab/myoassist' },
    { label: 'Preprint', href: 'https://www.biorxiv.org/content/10.64898/2026.08.25.746839v1' },
  ],
  sections: [
    {
      title: 'Framework',
      features: [
        {
          heading: 'Assistive-Device Models',
          body: [
            'MyoAssist includes models of 15 existing assistive devices: powered and passive prostheses, ankle and hip exoskeletons, a load-bearing exoskeleton, an upper-limb prosthesis and a wheelchair. I led the development of these models in MuJoCo from manufacturer CAD and specifications, in collaboration with the device developers (Open-Source Leg, Dephy, Humotech, OpenExo, Hurotics and others).',
            'Each model reduces a detailed mechanical assembly to a simulation model with specified inertial properties, joints, cable paths and actuators. Actuator, attachment and inertial parameters are set in a configuration file, so a device can be adjusted without editing its model.',
          ],
          media: {
            type: 'video',
            sources: [
              { src: '/assets/projects/myoassist/device-catalog.webm', type: 'video/webm' },
              { src: '/assets/projects/myoassist/device-catalog.mp4', type: 'video/mp4' },
            ],
            poster: '/assets/projects/myoassist/device-catalog-poster.webp',
            width: 800,
            height: 600,
            alt: 'Rotating views of the lower-limb assistive devices in MyoAssist, each attached to a musculoskeletal model.',
          },
        },
        {
          heading: 'Environment Composition',
          body: [
            'I built the composition pipeline, which merges a musculoskeletal model, a device model and a task scenario into one compiled MuJoCo model through the mjSpec API. A YAML configuration defines the attachment sites, equality constraints, actuators and initial pose. Lower-limb devices compose with musculoskeletal models from a 22-muscle lower-limb model to a 416-muscle full-body model.',
            'For prostheses, the pipeline removes the replaced segments, adds residual-limb geometry, re-anchors the affected muscles and attaches the device in place of the removed anatomy. Automated tests compile every supported device and model combination.',
          ],
          media: {
            type: 'image',
            image: pipeline,
            alt: 'Diagram: a musculoskeletal model, an assistive-device model and a task scenario are combined into one simulation environment.',
          },
        },
        {
          heading: 'Locomotion Task Scenarios',
          body: [
            'I developed the procedural terrain generator, which builds terrains from nine tile types (flat ground, slopes, stairs, pyramid stairs, rough terrain, obstacles, stepping stones, boulders and gaps) with configurable parameter ranges, placed explicitly or by weighted random sampling.',
            'Target-velocity maps set the desired walking speed and direction at each location on the terrain.',
          ],
          media: {
            type: 'image',
            image: terrainTiles,
            alt: 'A procedurally generated terrain made of colored tiles: slopes, stairs, stepping stones, rough terrain and obstacles.',
          },
        },
      ],
      closing: {
        heading: 'Open-Source Release',
        body: [
          'MyoAssist packages are published on PyPI with automated testing, alongside a documentation website with tutorials, a browser-based interactive device demo and an archived, versioned release. As Project Lead, I coordinate contributions from collaborating universities and device developers and maintain compatibility with upstream MyoSuite.',
        ],
      },
    },
    {
      title: 'Simulation-Based Device Optimization',
      features: [
        {
          heading: 'Controller Optimization',
          body: [
            'My research uses MyoAssist to design and tune assistive devices in simulation before hardware prototyping or human-subject testing. MyoAssist provides two controller-development frameworks on the same environments: reinforcement learning for learned policies, and controller optimization for structured, interpretable controllers.',
            'I developed the controller-optimization framework. It uses CMA-ES to tune a reflex-based neuromuscular controller of the human together with the device controller (spline-based exoskeleton torque profiles or a four-state prosthesis impedance controller), scored by a staged cost on muscle effort, gait quality and task constraints. Applications include exoskeleton assistance across locomotion tasks, passive prosthetic ankle stiffness, and extension of the reflex controller to prosthesis users.',
          ],
          media: {
            type: 'image',
            image: coFramework,
            alt: 'Diagram of the optimization loop: candidate human and device controller parameters are simulated, scored and updated by an optimization algorithm.',
            // Black labels on a transparent background: needs a light panel in dark mode.
            darkPanel: true,
          },
        },
      ],
      closing: {
        body: [
          'Both frameworks produce standardized evaluation reports (gait kinematics and kinetics, muscle activation and device torque) for direct comparison of optimized and learned controllers. An independent group has reported that a hip-exoskeleton controller trained with an earlier MyoAssist version substantially reduced metabolic cost in human experiments.',
        ],
      },
    },
  ],
};
