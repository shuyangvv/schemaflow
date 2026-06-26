import { Routes, Route, NavLink } from 'react-router-dom'
import SchemaList from './modules/schemas/SchemaList'
import SchemaDetail from './modules/schemas/SchemaDetail'
import SchemaCreate from './modules/schemas/SchemaCreate'
import SchemaEdit from './modules/schemas/SchemaEdit'
import VersionCreate from './modules/versions/VersionCreate'
import DiffViewer from './modules/diff/DiffViewer'
import ReleaseList from './modules/releases/ReleaseList'
import ReleaseCreate from './modules/releases/ReleaseCreate'

function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="text-xl font-bold text-blue-600">
                SchemaFlow
              </NavLink>
            </div>
            <div className="flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                Schemas
              </NavLink>
              <NavLink
                to="/releases"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                Releases
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<SchemaList />} />
          <Route path="/schemas/new" element={<SchemaCreate />} />
          <Route path="/schemas/:id" element={<SchemaDetail />} />
          <Route path="/schemas/:id/edit" element={<SchemaEdit />} />
          <Route path="/schemas/:id/versions/new" element={<VersionCreate />} />
          <Route path="/schemas/:id/diff" element={<DiffViewer />} />
          <Route path="/releases" element={<ReleaseList />} />
          <Route path="/versions/:versionId/releases/new" element={<ReleaseCreate />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
