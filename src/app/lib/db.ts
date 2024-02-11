import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

//That file handles there is only one prisma client instance in the app. Prisma will be imported from here.