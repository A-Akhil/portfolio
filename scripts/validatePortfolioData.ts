import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { PortfolioDataSchema } from '@/app/utils/portfolioSchema';
import { normalizePortfolioData } from '@/app/utils/portfolioNormalizer';

async function main(): Promise<void> {
  const filePath = path.resolve(process.cwd(), 'app/data/portfolio.json');
  const fileContents = await readFile(filePath, 'utf-8');
  const json = JSON.parse(fileContents);

  const parsed = PortfolioDataSchema.parse(json);
  normalizePortfolioData(parsed);

  console.log('✅ portfolio.json is valid and normalized successfully.');
}

main().catch((error) => {
  console.error('❌ Portfolio data validation failed.');
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  process.exit(1);
});
