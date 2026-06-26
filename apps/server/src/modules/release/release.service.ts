import { releaseRepository } from './release.repository.js'
import { versionRepository } from '../version/version.repository.js'
import { Errors } from '../../shared/errors.js'
import type { CreateReleaseBody, UpdateReleaseBody, ReleaseResponse, ReleaseListResponse } from './release.types.js'

export class ReleaseService {
  async createRelease(versionId: string, body: CreateReleaseBody): Promise<ReleaseResponse> {
    const version = await versionRepository.findById(versionId)
    if (!version) {
      throw Errors.VERSION_NOT_FOUND(versionId)
    }

    const existing = await releaseRepository.findByVersionAndName(versionId, body.name)
    if (existing) {
      throw Errors.RELEASE_ALREADY_EXISTS(versionId, body.name)
    }

    const release = await releaseRepository.create({
      version: { connect: { id: versionId } },
      name: body.name,
      description: body.description,
    })

    return this.toReleaseResponse(release)
  }

  async getRelease(id: string): Promise<ReleaseResponse> {
    const release = await releaseRepository.findById(id)
    if (!release) {
      throw new Error(`Release with id ${id} not found`)
    }

    return this.toReleaseResponse(release)
  }

  async listReleases(): Promise<ReleaseListResponse> {
    const releases = await releaseRepository.findAll()

    return {
      data: releases.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        isActive: r.isActive,
        releasedAt: r.releasedAt.toISOString(),
        version: r.version,
      })),
    }
  }

  async updateRelease(id: string, body: UpdateReleaseBody): Promise<ReleaseResponse> {
    const release = await releaseRepository.findById(id)
    if (!release) {
      throw new Error(`Release with id ${id} not found`)
    }

    if (body.name && body.name !== release.name) {
      const existing = await releaseRepository.findByVersionAndName(release.versionId, body.name)
      if (existing) {
        throw Errors.RELEASE_ALREADY_EXISTS(release.versionId, body.name)
      }
    }

    const updated = await releaseRepository.update(id, {
      name: body.name,
      description: body.description,
      isActive: body.isActive,
    })

    return this.toReleaseResponse(updated)
  }

  async deleteRelease(id: string): Promise<void> {
    const release = await releaseRepository.findById(id)
    if (!release) {
      throw new Error(`Release with id ${id} not found`)
    }

    await releaseRepository.delete(id)
  }

  private toReleaseResponse(release: { id: string; versionId: string; name: string; description: string | null; isActive: boolean; releasedAt: Date }): ReleaseResponse {
    return {
      id: release.id,
      versionId: release.versionId,
      name: release.name,
      description: release.description,
      isActive: release.isActive,
      releasedAt: release.releasedAt.toISOString(),
    }
  }
}

export const releaseService = new ReleaseService()
