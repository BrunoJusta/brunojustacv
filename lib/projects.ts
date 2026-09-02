/**
 * Five projects, all from the CV. Problem, approach and outcome only restate
 * facts Bruno stated. Where no number exists, the card says what shipped
 * instead of inventing a metric.
 */

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  problem: string;
  did: string;
  metric: { value: string; label: string };
  image: string;
  imageWide: string;
  imageAlt: string;
  approach: string[];
  outcome: string[];
  stack: string[];
  /** Layout weight in the 12 column work grid. */
  span: string;
  aspect: string;
};

export const projects: Project[] = [
  {
    slug: 'internal-ai-agent',
    title: 'Internal AI agent',
    year: '2025',
    role: 'Design, product and AI development',
    problem:
      'Employees were spending their time hunting for internal information across systems, HR policies and corporate documents.',
    did: "Built and launched Sogrape’s first internal AI agent, answering day-to-day, HR and corporate questions across the company.",
    metric: { value: '30%', label: 'less time spent searching' },
    image: '/images/ai-agent.jpg',
    imageWide: '/images/ai-agent-wide.jpg',
    imageAlt: 'Placeholder slot for a screen of the internal AI agent conversation interface.',
    approach: [
      'Started from the questions people actually ask, not from the documents. The first scope was the set of repeated questions that were reaching HR and corporate teams by email and message.',
      'Designed the conversation itself: how the agent asks for missing context, how it cites where an answer came from, and what it says when it does not know.',
      'Took it through to production deploy and stayed on quality, rating generated answers rather than assuming them.',
    ],
    outcome: [
      'The agent is the first one Sogrape put in front of the whole company.',
      'It cut the time employees spend searching for internal information by 30%.',
      'It runs at over 500 sessions a month with 65% engagement, and 92.3% of generated answers are rated good quality.',
    ],
    stack: ['Google AI Studio', 'Copilot Studio', 'GCP'],
    span: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    slug: 'generative-ai-hub',
    title: 'Generative AI hub for marketing imagery',
    year: '2025',
    role: 'AI Lead',
    problem:
      'Marketing teams across the brands needed imagery faster than the usual production route could deliver it.',
    did: 'AI Lead on a generative hub for marketing imagery, from requirements through to the production deploy.',
    metric: { value: '366 h', label: 'saved before go-live' },
    image: '/images/genai-hub.jpg',
    imageWide: '/images/genai-hub-wide.jpg',
    imageAlt: 'Placeholder slot for the generative AI hub asset grid.',
    approach: [
      'Defined what the hub had to produce before touching generation: which formats, which brands, and what "usable" means for a marketing asset.',
      'Built it with Google AI Studio and set up the environments and releases so the hub could be handed to brand teams rather than run by one person.',
      'Kept a human check between generation and use, because the review step is where the quality is decided.',
    ],
    outcome: [
      '572 media assets created and 366 hours saved, before go-live.',
      'More than 10 brands now use the hub.',
    ],
    stack: ['Google AI Studio', 'GCP', 'Firebase'],
    span: 'lg:col-span-5',
    aspect: 'aspect-[4/5]',
  },
  {
    slug: 'harvest-compliance',
    title: 'Harvest compliance app',
    year: '2024',
    role: 'Product Manager, end to end',
    problem:
      'More than 500 agricultural subcontractors had to be documented and validated for the harvest, and the process was slow and easy to get wrong.',
    did: 'Product Manager end to end on a mobile and web compliance application, launched for Harvest 2024.',
    metric: { value: '60%', label: 'faster document validation' },
    image: '/images/harvest-compliance.jpg',
    imageWide: '/images/harvest-compliance-wide.jpg',
    imageAlt: 'Placeholder slot for the harvest compliance mobile flow.',
    approach: [
      'Went to the people doing the validation first. The requirements came out of how the harvest actually runs, not out of a form.',
      'Designed one flow for the field on mobile and one for the back office on web, so the same record could be filed once and checked once.',
      'Ran it end to end as Product Manager: requirements, design, delivery and the release in time for Harvest 2024.',
    ],
    outcome: [
      'Serves 500+ agricultural subcontractors.',
      'Document validation is 60% faster and first-time compliance is 40% higher.',
      'Recognised as a success case by five internal areas.',
    ],
    stack: ['OutSystems', 'Power BI'],
    span: 'lg:col-span-5',
    aspect: 'aspect-[4/5]',
  },
  {
    slug: 'wine-tourism-scheduling',
    title: 'Wine tourism scheduling',
    year: '2025',
    role: 'AI Lead',
    problem:
      'Wine tourism units were building their visit schedules by hand, unit by unit.',
    did: 'Defined and delivered automatic scheduling, from requirements through to the production deploy.',
    metric: { value: 'In production', label: 'built with Google AI Studio' },
    image: '/images/wine-tourism.jpg',
    imageWide: '/images/wine-tourism-wide.jpg',
    imageAlt: 'Placeholder slot for the wine tourism scheduling calendar view.',
    approach: [
      'Wrote down the rules the schedule has to respect before automating anything: opening times, staff, languages and visit types.',
      'Built the application with Google AI Studio following the delivery method now used for these products.',
      'Handled the environments and the release so the units got a running product, not a prototype.',
    ],
    outcome: [
      'Deployed to production and used by the wine tourism units.',
      'Scheduling that was manual is now generated, with people reviewing rather than assembling it.',
    ],
    stack: ['Google AI Studio', 'Firebase'],
    span: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    slug: 'retail-price-monitor',
    title: 'Retail price monitor',
    year: '2025',
    role: 'AI Lead',
    problem:
      'There was no single view of how Sogrape products were priced across retailer online stores.',
    did: 'Specified and delivered a scraper that compares product prices across retailer stores.',
    metric: { value: 'In production', label: 'daily price comparison' },
    image: '/images/price-monitor.jpg',
    imageWide: '/images/price-monitor-wide.jpg',
    imageAlt: 'Placeholder slot for the retail price monitor comparison table.',
    approach: [
      'Defined what a comparable price is across stores, because the same wine is listed differently in each one.',
      'Built the collection and the comparison as one product, so the output is a readable view and not a data dump.',
      'Took it to production deploy with the same method used for the other internal applications.',
    ],
    outcome: [
      'Product prices across retailer stores are compared in one place.',
      'Deployed to production as part of the internal application portfolio.',
    ],
    stack: ['Google AI Studio', 'GCP', 'Power BI'],
    span: 'lg:col-span-12',
    aspect: 'aspect-[21/9]',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
