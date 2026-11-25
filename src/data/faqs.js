import { company } from './company.js'

export const faqGroups = [
  {
    title: 'Water well drilling',
    items: [
      {
        question: 'What kind of water wells does Davidson drill?',
        answer: 'Davidson describes 6-inch drilled water wells with casing to bedrock. Its published depth guidance for the surrounding area is approximate; actual site requirements vary.',
      },
      {
        question: 'How deep is the well casing?',
        answer: 'Davidson’s original website says its fresh water wells are cased to bedrock, roughly 70 to 100 feet in surrounding areas. The actual depth depends on local conditions.',
      },
    ],
  },
  {
    title: 'Hydrofracturing',
    items: [
      {
        question: 'What is hydrofracturing?',
        answer: 'Davidson describes injecting clean water at high pressure and volume into a low-yield well to open or clear existing water-producing fractures. The published process uses no additives.',
      },
      {
        question: 'Can hydrofracturing restore every low-yield well?',
        answer: 'No outcome is guaranteed. The company says hydrofracturing may regenerate a well in many cases, but suitability and results depend on the well and its conditions.',
      },
    ],
  },
  {
    title: 'Geothermal systems',
    items: [
      {
        question: 'What does Davidson do on a geothermal project?',
        answer: 'Davidson’s published scope is drilling and down-hole installation of vertical ground loops and transfer medium. The company can work with a geothermal or heating-and-air contractor.',
      },
      {
        question: 'Does Davidson install the complete heating and cooling system?',
        answer: 'The original website says its geothermal work is limited to the drilling and down-hole installation. The building system is coordinated with a geothermal or HVAC contractor.',
      },
    ],
  },
  {
    title: 'Company and service area',
    items: [
      {
        question: 'Where does Davidson Well Drilling serve?',
        answer: `Davidson is based in Turnerville, Georgia, and serves ${company.serviceArea}.`,
      },
      {
        question: 'How can I discuss a project?',
        answer: `Call ${company.phone} or ${company.tollFree}, or email ${company.email}.`,
      },
    ],
  },
]
