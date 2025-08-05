import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma || new PrismaClient()

// Always use global instance for development
globalForPrisma.prisma = prisma