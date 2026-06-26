export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const Errors = {
  SCHEMA_NOT_FOUND: (id: string) => 
    new AppError('SCHEMA_NOT_FOUND', `Schema with id '${id}' not found`, 404, { schemaId: id }),
  
  VERSION_NOT_FOUND: (id: string) => 
    new AppError('VERSION_NOT_FOUND', `Version with id '${id}' not found`, 404, { versionId: id }),
  
  DUPLICATE_SCHEMA_NAME: (name: string) => 
    new AppError('DUPLICATE_SCHEMA_NAME', `Schema with name '${name}' already exists`, 409, { name }),
  
  INVALID_JSON_SCHEMA: (message: string) => 
    new AppError('INVALID_JSON_SCHEMA', `Invalid JSON Schema: ${message}`, 400),
  
  DIFF_VERSIONS_INCOMPATIBLE: () => 
    new AppError('DIFF_VERSIONS_INCOMPATIBLE', 'Cannot diff versions from different schemas', 400),
  
  RELEASE_ALREADY_EXISTS: (versionId: string, name: string) => 
    new AppError('RELEASE_ALREADY_EXISTS', `Release '${name}' already exists for this version`, 409, { versionId, name }),
  
  INVALID_VERSION_NUMBER: (schemaId: string, versionNumber: number) => 
    new AppError('INVALID_VERSION_NUMBER', `Version ${versionNumber} not found for schema ${schemaId}`, 404, { schemaId, versionNumber }),
} as const
