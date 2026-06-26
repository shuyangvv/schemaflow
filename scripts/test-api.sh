#!/bin/bash

BASE_URL="http://localhost:3001/api"

echo "🧪 Testing SchemaFlow API..."
echo ""

# Health check
echo "1️⃣  Health Check"
HEALTH=$(curl -s $BASE_URL/../health)
echo "Response: $HEALTH"
echo ""

# Create a schema
echo "2️⃣  Create Schema"
SCHEMA_RESPONSE=$(curl -s -X POST $BASE_URL/schemas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "user-form-'$(date +%s)'",
    "description": "User registration form",
    "content": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" }
      },
      "required": ["name", "email"]
    }
  }')
echo "Response: $(echo $SCHEMA_RESPONSE | jq -c . 2>/dev/null || echo $SCHEMA_RESPONSE)"
SCHEMA_ID=$(echo $SCHEMA_RESPONSE | jq -r '.id' 2>/dev/null || echo "")
echo ""

if [ -z "$SCHEMA_ID" ]; then
    echo "❌ Failed to create schema"
    exit 1
fi

# List schemas
echo "3️⃣  List Schemas"
LIST=$(curl -s $BASE_URL/schemas)
echo "Found $(echo $LIST | jq '.data | length') schemas"
echo ""

# Get schema
echo "4️⃣  Get Schema ($SCHEMA_ID)"
GET=$(curl -s $BASE_URL/schemas/$SCHEMA_ID)
echo "Name: $(echo $GET | jq -r '.name')"
echo "Current Version: $(echo $GET | jq -r '.currentVersion.versionNumber')"
echo ""

# Create new version
echo "5️⃣  Create New Version"
VERSION_RESPONSE=$(curl -s -X POST $BASE_URL/schemas/$SCHEMA_ID/versions \
  -H "Content-Type: application/json" \
  -d '{
    "content": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "age": { "type": "integer", "minimum": 18 }
      },
      "required": ["name", "email", "age"]
    },
    "changeSummary": "Added age field"
  }')
echo "Response: $(echo $VERSION_RESPONSE | jq -c . 2>/dev/null || echo $VERSION_RESPONSE)"
VERSION_ID=$(echo $VERSION_RESPONSE | jq -r '.id' 2>/dev/null || echo "")
echo ""

if [ -z "$VERSION_ID" ]; then
    echo "❌ Failed to create version"
    exit 1
fi

# List versions
echo "6️⃣  List Versions"
VERSIONS=$(curl -s $BASE_URL/schemas/$SCHEMA_ID/versions)
echo "Found $(echo $VERSIONS | jq '.data | length') versions"
echo ""

# Diff versions
echo "7️⃣  Diff Versions (1 vs 2)"
DIFF=$(curl -s "$BASE_URL/schemas/$SCHEMA_ID/diff?from=1&to=2")
echo "Has breaking changes: $(echo $DIFF | jq -r '.hasBreakingChanges')"
echo "Changes: $(echo $DIFF | jq -r '.changes | length') items"
echo "Summary: +$(echo $DIFF | jq -r '.summary.added') -$(echo $DIFF | jq -r '.summary.removed') ~$(echo $DIFF | jq -r '.summary.modified')"
echo ""

# Create release
echo "8️⃣  Create Release"
RELEASE=$(curl -s -X POST $BASE_URL/versions/$VERSION_ID/releases \
  -H "Content-Type: application/json" \
  -d '{"name": "v1.0", "description": "Production release"}')
echo "Response: $(echo $RELEASE | jq -c . 2>/dev/null || echo $RELEASE)"
echo ""

# List releases
echo "9️⃣  List Releases"
RELEASES=$(curl -s $BASE_URL/releases)
echo "Found $(echo $RELEASES | jq '.data | length') releases"
echo ""

# Cleanup
echo "🧹 Cleanup: Delete Schema"
curl -s -X DELETE $BASE_URL/schemas/$SCHEMA_ID
echo "✅ Deleted"
echo ""

echo "🎉 All API tests passed!"
