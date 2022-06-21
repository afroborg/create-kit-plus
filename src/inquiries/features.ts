import { prompt } from 'inquirer';
import { Feature } from '../models/feature';

export const getAdditionalFeatures = async () => {
  const { features } = await prompt<{ features: Feature[] }>({
    choices: ['Tailwind', 'Prisma', 'Docker'],
    default: ['Tailwind'],
    type: 'checkbox',
    name: 'features',
    message: 'Which features would you like to add?',
  });

  return features;
};
