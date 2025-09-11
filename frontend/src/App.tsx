import RequireAuthRedirect from './components/requireAuthRedirect.tsx'
import ProtectedRoute from './components/protectedRouteComponent.tsx'
import HomePage from './pages/homePage.tsx'
import BoardPage from './pages/boardPage.tsx'
import SignUpPage from './pages/signUpPage.tsx'
import SignInPage from './pages/signInPage.tsx'
import {Route, Routes} from "react-router-dom"
import {useSessionCheck} from './hooks/sessionCheckHook.tsx'

export const App = () => {
    const { loading } = useSessionCheck();

    if (loading) {
        return <div>Loading...</div>; // ✅ don’t render routes yet
    }

  return (
    <Routes>
        {/* Root: redirect based on login */}
        <Route path="/" element={<RequireAuthRedirect />} />

        {/* Public */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected */}
        <Route
            path="/home"
            element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/board"
            element={
                <ProtectedRoute>
                    <BoardPage />
                </ProtectedRoute>
            }
        />
    </Routes>
  )

}