import { ZodError } from 'zod';
import portfolioJson from '@/app/data/portfolio.json';
import type { PortfolioData } from '@/app/types/portfolioData';
import { PortfolioDataSchema } from './portfolioSchema';
import { normalizePortfolioData } from './portfolioNormalizer';

let cache: PortfolioData | null = null;

function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join('.') : '(root)';
      return `${path}: ${issue.message}`;
    })
    .join('\n');
}

export function parsePortfolioData(raw: unknown): PortfolioData {
  try {
    const parsed = PortfolioDataSchema.parse(raw);
    return normalizePortfolioData(parsed);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Invalid portfolio data:\n${formatZodError(error)}`);
    }
    throw error;
  }
}

export function getPortfolioData(): PortfolioData {
  if (cache) {
    return cache;
  }
  cache = parsePortfolioData(portfolioJson);
  return cache;
}

export function clearPortfolioDataCache(): void {
  cache = null;
}
