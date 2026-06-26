import { prisma } from '../../shared/database.js'
import type { Prisma } from '@prisma/client'

export class ReleaseRepository {
  async findById(id: string) {
    return prisma.release.findUnique({
      where: { id },
      include: {
        version: {
          select: {
            id: true,
            versionNumber: true,
            schema: {
              select: { id: true, name: true },
            },
          },
        },
      },
    })
  }

  async findByVersionAndName(versionId: string, name: string) {
    return prisma.release.findUnique({
      where: {
        versionId_name: { versionId, name },
      },
    })
  }

  async findAll() {
    return prisma.release.findMany({
      orderBy: { releasedAt: 'desc' },
      include: {
        version: {
          select: {
            id: true,
            versionNumber: true,
            schema: {
              select: { id: true, name: true },
            },
          },
        },
      },
    })
  }

  async create(data: Prisma.ReleaseCreateInput) {
    return prisma.release.create({ data })
  }

  async update(id: string, data: Prisma.ReleaseUpdateInput) {
    return prisma.release.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return prisma.release.delete({
      where: { id },
    })
  }
}

export const releaseRepository = new ReleaseRepository()
