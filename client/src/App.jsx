import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Signup, Signin, Dashboard, Profile, ProfileSettings, CreateBookmark, Starred, Bookmark, SearchPage, EditBookmark, LandingPage, ErrorPage } from '@pages'
import { Navbar, Footer, SideBar } from '@layouts'

import { useAuthStatus } from '@hooks'
import { useThemeStore } from '@store'

import { UpdatePassword } from '@features/users'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (['/', '/signin', '/signup'].includes(location.pathname)) return;

    if (!isAuthenticated) {
      navigate('/');
    }

  }, [location, isAuthenticated, navigate]);

  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const renderNavigation = !['/', '/signin', '/signup'].includes(
    location.pathname,
  );

  return (
    <div className='flex'>
      {
        renderNavigation && (
          <aside>
            <SideBar />
          </aside>
        )
      }

      <section className='flex-1 flex flex-col h-screen'>
        <header>{
          renderNavigation && <Navbar />
        }</header>

        <main
          className={`flex-1 h-[100vh-73px] basis-full overflow-y-auto lg:h-screen ${!renderNavigation && `max-container relative`}`}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sb" element={<Navbar />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateBookmark />} />

            <Route path="/bookmark">
              <Route index element={<LandingPage />} />
              <Route path=":id" element={<Bookmark />} />
            </Route>

            <Route path="/starred" element={<Starred />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/password" element={<UpdatePassword />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/edit-bookmark/:id" element={<EditBookmark />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </main>
      </section>
    </div>
  )
}

export default App
