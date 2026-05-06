import Navbar from './Navbar';

const Layout = ({ children, navigate, currentView }) => {
  return (
    <div className="min-h-screen">
      <Navbar navigate={navigate} currentView={currentView} />
      <main className="container py-8">{children}</main>
    </div>
  );
};

export default Layout;