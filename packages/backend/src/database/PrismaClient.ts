import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env?.PRISMA_LOGGING ? ['query', 'info', 'warn', 'error'] : [],
});

export default prisma;
