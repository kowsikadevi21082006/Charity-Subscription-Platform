import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ChevronRight, Home } from 'lucide-react';

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs = [{ name: 'Home', path: '/', icon: Home }];

    pathnames.forEach((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = pathname.charAt(0).toUpperCase() + pathname.slice(1).replace('-', ' ');
      breadcrumbs.push({ name, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="min-h-screen text-secondary-200 animate-fade-in bg-animated-gradient relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 -left-64 w-96 h-96 bg-primary-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 -right-64 w-96 h-96 bg-success-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10">
        <Navbar />

        {/* Breadcrumbs */}
        {breadcrumbs.length > 1 && (
          <div className="bg-secondary-900/40 border-b border-secondary-800 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex py-4" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-3">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.path} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="w-4 h-4 text-secondary-500 mx-1" />
                      )}
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-primary-300 font-medium flex items-center gap-2">
                          {crumb.icon && <crumb.icon className="w-4 h-4" />}
                          {crumb.name}
                        </span>
                      ) : (
                        <Link
                          to={crumb.path}
                          className="text-secondary-400 hover:text-primary-400 transition-colors flex items-center gap-2 hover:scale-105 transform duration-200"
                        >
                          {crumb.icon && <crumb.icon className="w-4 h-4" />}
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;