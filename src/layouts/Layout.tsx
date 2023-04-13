import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

export default function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
