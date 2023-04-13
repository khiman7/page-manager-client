import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Page from './components/Page';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './hoc/ProtectedRoute';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound';
import pagesService from './services/pages.service';
import { IPage } from './types';

function App() {
  const [pages, setPages] = useState<IPage[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await pagesService.fetchPages();

      setPages(data);
    })();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          {pages &&
            pages?.map((page) => (
              <Route
                key={page.slug}
                path={`/${page.slug}`}
                element={<Page page={page} />}
              />
            ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
