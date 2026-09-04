import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, History, Info, Cpu, Menu, X, ArrowRight, Award } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'HOME', icon: Sprout },
    { path: '/detect', label: 'DISEASE DETECTION', icon: Sprout },
    { path: '/history', label: 'ANALYSIS HISTORY', icon: History },
    { path: '/model', label: 'MODEL INFO', icon: Cpu },
    { path: '/about', label: 'ABOUT US', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#063B22]/95 backdrop-blur-md border-b border-emerald-800/40 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-900/50 group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                Plant AI
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-300/80 font-medium">
                Plant Care & Pathology Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            
            {/* Benchmark Badge inspired by Reference 1 */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-blue-600/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-md border border-blue-400/40 shadow-sm mr-3">
              <Award className="w-3.5 h-3.5 text-blue-200" />
              <span className="tracking-wider">AI BENCHMARK CERTIFIED</span>
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 flex items-center space-x-1.5 ${
                    active
                      ? 'bg-emerald-700/60 text-white shadow-inner border border-emerald-500/30'
                      : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/40'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Vibrant Orange CTA Button inspired by Reference 1 & 2 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/detect"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FF652F] to-[#F97316] hover:from-[#E5531D] hover:to-[#EA580C] text-white px-6 py-3 rounded-lg font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-950/40 transition-all hover:shadow-orange-500/30 active:scale-95 border border-orange-400/30"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/60 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#063B22] border-b border-emerald-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors ${
                  active
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/detect"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#FF652F] to-[#F97316] hover:from-[#E5531D] hover:to-[#EA580C] text-white py-3.5 rounded-lg font-extrabold text-sm uppercase tracking-wider shadow-md"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
