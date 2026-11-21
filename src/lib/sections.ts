export const sections = {
  'case-files': {
    name: 'Case Files',
    singular: 'Case file',
    description: 'Investigations, their evidence, and the occasional culprit.',
  },
  laboratory: {
    name: 'Laboratory',
    singular: 'Experiment',
    description: 'Small machines you can put your hands on. The inputs are yours.',
  },
  'common-arsenal': {
    name: 'Common Arsenal',
    singular: 'Contribution',
    description: 'Patches sent upstream, with the people and projects they belong to.',
  },
  notebook: {
    name: 'Notebook',
    singular: 'Notebook entry',
    description: 'Working notes on the things I’m still figuring out.',
  },
} as const;
export type Section = keyof typeof sections;
