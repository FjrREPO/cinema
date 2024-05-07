import { NextApiRequest, NextApiResponse } from 'next';
import { fetchTopMovies } from '@/components/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const topMovies = await fetchTopMovies();
    res.status(200).json(topMovies);
  } catch (error) {
    res.status(500).json((error as Error).message);
  }
}