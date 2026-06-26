import { prisma } from '../../shared/database.js'
import type { Prisma } from '@prisma/client'

export class SchemaRepository {
  async findById(id: string) {
    return prisma.schema.findUnique({
      where: { id },
      include: { currentVersion: true },
    })
  }

  async findByName(name: string) {
    return prisma.schema.findUnique({
      where: { name },
    })
  }

  async findMany(params: {
    search?: string
    skip: number
    take: number
  }) {
    const where: Prisma.SchemaWhereInput = {}
    
    if (params.search) {
      where.OR = [
        { name: { contains: params.search } },
        { description: { contains: params.search } },
      ]
    }

    const [schemas, total] = await Promise.all([
      prisma.schema.findMany({
        where,
        skip: params.skip,
        take: params.take,
        orderBy: { updatedAt: 'desc' },
        include: {
          _count: { select: { versions: true } },
          currentVersion: { select: { versionNumber: true } },
        },
      }),
      prisma.schema.count({ where }),
    ])

    return { schemas, total }
  }

  async create(data: Prisma.SchemaCreateInput) {
    return prisma.schema.create({ data })
  }

  async update(id: string, data: Prisma.SchemaUpdateInput) {
    return prisma.schema.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return prisma.schema.delete({
      where: { id },
    })
  }

  async count() {
    return prisma.schema.count()
  }
}

export const schemaRepository = new SchemaRepository()
