/**
 * Every string on this site lives here or in lib/projects.ts.
 * Nothing is invented: all facts, dates and numbers come from Bruno’s CV.
 */

export const site = {
  name: 'Bruno Justa',
  role: 'Digital Product Manager & AI Lead',
  location: 'Porto, Portugal',
  email: 'brunomajusta@gmail.com',
  phone: '+351 936 579 491',
  phoneHref: '+351936579491',
  linkedin: 'https://www.linkedin.com/in/bruno-justa98',
  linkedinLabel: 'linkedin.com/in/bruno-justa98',
  cv: '/bruno-justa-cv.pdf',
  url: 'https://brunojusta.com',
  description:
    'Bruno Justa is a Digital Product Manager and AI Lead in Porto, Portugal. He takes internal products from interface to production, from the first requirement to the release.',
  languages: [
    { name: 'Portuguese', level: 'native' },
    { name: 'English', level: 'professional' },
  ],
} as const;

export const positioning = {
  lead: "I solve problems, and I don’t let go until there is a solution.",
  body:
    'I started in web development, moved into design through a master’s degree, and with AI the two finally line up: I take an idea from the interface to a running product, speak to the business and to the developers, and put method where there was none.',
  close: 'What I like most is looking at a finished product and being proud of it.',
} as const;

export type ImpactItem = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  caption: string;
  aside?: { value: number; suffix?: string; caption: string };
  span: string;
};

/** Seven real numbers. They carry the page, so they get their own band. */
export const impact: ImpactItem[] = [
  {
    value: 30,
    suffix: '%',
    caption: 'less time employees spend searching for internal information',
    span: 'lg:col-span-4',
  },
  {
    value: 500,
    suffix: '+',
    caption: 'monthly sessions on the internal AI agent',
    aside: { value: 65, suffix: '%', caption: 'engagement' },
    span: 'lg:col-span-4',
  },
  {
    value: 92.3,
    decimals: 1,
    suffix: '%',
    caption: 'of generated answers rated good quality',
    span: 'lg:col-span-4',
  },
  {
    value: 572,
    caption: 'media assets created by the generative AI hub, before go-live',
    aside: { value: 366, caption: 'hours saved' },
    span: 'lg:col-span-5',
  },
  {
    value: 10,
    suffix: '+',
    caption: 'brands using that hub',
    span: 'lg:col-span-3',
  },
  {
    value: 60,
    suffix: '%',
    caption: 'faster document validation',
    aside: { value: 40, suffix: '%', caption: 'higher first-time compliance' },
    span: 'lg:col-span-4',
  },
  {
    value: 500,
    suffix: '+',
    caption: 'agricultural subcontractors served by the compliance app',
    span: 'lg:col-span-12',
  },
];

export type Role = {
  title: string;
  company: string;
  period: string;
  summary?: string;
  bullets?: string[];
};

export const experience: Role[] = [
  {
    title: 'Digital Experience Specialist & AI Lead',
    company: 'Sogrape Vinhos S.A.',
    period: 'Sep 2024 to Present',
    summary:
      "Leads design, product management and AI development of Sogrape’s internal products, turning business needs into solutions from concept to production.",
    bullets: [
      "Designs intuitive, user-centred experiences across Sogrape’s digital ecosystem.",
      "Built and launched Sogrape’s first internal AI agent, answering employees’ day-to-day, HR and corporate questions across the company.",
      'AI Lead on internal applications built with Google AI Studio, from requirements through to production deploy: a generative AI hub for marketing imagery, automatic scheduling for wine tourism, a scraper comparing product prices across retailer stores, and an application supporting recorking services.',
      'Wrote the method the company now uses to build these applications. With AI, coding stopped being the bottleneck, so the effort moved to defining what to build and checking what came out.',
      'Product Manager end to end on a mobile and web compliance application for 500+ agricultural subcontractors, launched for Harvest 2024. Recognised as a success case by five internal areas.',
    ],
  },
  {
    title: 'UX / Product Designer',
    company: 'Sogrape Vinhos S.A.',
    period: 'Jan 2023 to Sep 2024',
    summary:
      "Designed user-centred interfaces across Sogrape’s platforms for internal and external audiences. Worked with cross-functional teams to refine visual hierarchy and interaction flows into coherent digital products.",
  },
  {
    title: 'UX/UI Designer',
    company: 'Willbe Collective',
    period: 'Jul 2021 to Dec 2022',
    summary:
      'Worked across client projects in the design department, from e-commerce to institutional sites, covering both the interface and the front-end behind it. Dealt directly with clients, from first meetings through to launch.',
  },
  {
    title: 'Earlier',
    company: '',
    period: '2019 to 2021',
    bullets: [
      'Front-end Developer & UI Designer, internship at Willbe Collective (Mar to Jun 2021).',
      'Digital Design, summer internship at Grupo Impetus (Jun to Aug 2019).',
    ],
  },
];

export const capabilities: { group: string; items: string[] }[] = [
  {
    group: 'Product & AI',
    items: [
      'Product management',
      'Product strategy',
      'Roadmap and prioritisation',
      'Stakeholder management',
      'AI agent design',
      'Prompt engineering',
      'AI-assisted development',
      'Delivery methodology',
      'Requirements definition',
      'Environment and release management',
    ],
  },
  {
    group: 'Design',
    items: [
      'Product design',
      'UX/UI design',
      'User research',
      'Usability testing',
      'User-centred design',
      'Design thinking',
      'Interaction design',
      'Prototyping',
      'Agile methodologies',
    ],
  },
  {
    group: 'Tools',
    items: [
      'Google AI Studio',
      'Copilot Studio',
      'Claude',
      'GCP',
      'Firebase',
      'Figma',
      'OutSystems',
      'Power BI',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
  },
];

export const education: { title: string; school: string; period: string }[] = [
  {
    title: 'Product & UX Design Leadership',
    school: 'EDIT. Disruptive Digital Education',
    period: '2024',
  },
  {
    title: 'MA Digital Design',
    school: 'Polytechnic Institute of Cávado and Ave',
    period: '2021 to 2023',
  },
  {
    title: 'BSc Technologies and Information Systems for the Web',
    school: 'Polytechnic Institute of Porto',
    period: '2018 to 2021',
  },
];

export const beyondWork =
  'I take photographs, draw, go to the cinema more than I should, and read. New tools get tested at home first, on small apps I build for myself.';

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
] as const;
