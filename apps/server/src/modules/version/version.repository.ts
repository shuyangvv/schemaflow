import { prisma } from '../../shared/database.js'
import type { Prisma } from '@prisma/client'

export class VersionRepository {
  async findById(id: string) {
    return prisma.version.findUnique({
      where: { id },
    })
  }

  async findBySchemaId(schemaId: string) {
    return prisma.version.findMany({
      where: { schemaId },
      orderBy: { versionNumber: 'desc' },
    })
  }

  async findBySchemaAndNumber(schemaId: string, versionNumber: number) {
    return prisma.version.findFirst({
      where: { schemaId, versionNumber },
    })
  }

  async getNextVersionNumber(schemaId: string): Promise<number> {
    const last = await prisma.version.findFirst({
      where: { schemaId },
      orderBy: { versionNumber: 'desc' },
      select: { versionNumber: true },
    })
    return (last?.versionNumber ?? 0) + 1
  }

  async create(data: Prisma.VersionCreateInput) {
    return prisma.version.create({ data })
  }
}

export const versionRepository = new VersionRepository()
