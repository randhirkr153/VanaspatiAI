import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#031E12] text-slate-300 border-t border-emerald-900/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Columns Layout inspired directly by Reference Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-emerald-900/60">
          
          {/* Column 1: Solutions */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide border-l-2 border-[#FF652F] pl-3">
              Solutions
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300/80">
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">AI Disease Classification</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">Computer Vision Pathology</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">Organic Treatment Guidance</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">AI Botanical Assistant</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#FF652F] transition-colors">Historical Crop Analytics</Link>
              </li>
              <li>
                <Link to="/model" className="hover:text-[#FF652F] transition-colors">REST API & Inference Model</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">Enterprise Farm Integration</Link>
              </li>
              <li className="text-slate-400 italic pt-1">Many more...</li>
            </ul>
          </div>

          {/* Column 2: Industries & Crops */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide border-l-2 border-[#FF652F] pl-3">
              Crops & Industries
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300/80">
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">Solanaceous (Tomatoes & Peppers)</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">Fruits (Apples & Grapes)</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">Grains (Corn & Maize)</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">Tubers & Root Crops (Potatoes)</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-[#FF652F] transition-colors">Commercial Greenhouses</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">Hydroponics & Indoor Farming</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">Smallholder Agriculture</Link>
              </li>
              <li className="text-slate-400 italic pt-1">Others</li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide border-l-2 border-[#FF652F] pl-3">
              Company
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300/80">
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">Career</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">Approach & Methodology</Link>
              </li>
              <li>
                <Link to="/model" className="hover:text-[#FF652F] transition-colors">Pathology Research Blog</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF652F] transition-colors">Privacy Policy</Link>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 4: Office Locations & Contact + Orange CTA */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wide border-l-2 border-[#FF652F] pl-3">
              Office & Research Center
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-300/90">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#FF652F] flex-shrink-0 mt-1" />
                <span>6th Floor, Building 2A, Ecospace Business Park, New Town, Kolkata 700156</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+1-408-475-6464</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>support@plantai.com</span>
              </div>
            </div>

            {/* Vibrant Orange CTA Button inspired directly by Reference Image 2 */}
            <div className="pt-2">
              <Link
                to="/detect"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#FF652F] to-[#F97316] hover:from-[#E5531D] hover:to-[#EA580C] text-white font-extrabold text-sm py-3 px-6 rounded-lg uppercase tracking-wider shadow-lg shadow-orange-950/40 border border-orange-400/30 transition-all hover:shadow-orange-500/30"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Banner inspired by Reference Image 2 ("We are recognized by") */}
        <div className="pt-8 text-center space-y-4">
          <h4 className="text-white font-extrabold text-base tracking-widest uppercase">
            We are recognized & powered by
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-emerald-200">
            <span className="px-4 py-2 bg-emerald-950/80 border border-emerald-800/60 rounded-lg">
              🔥 PyTorch 2.0
            </span>
            <span className="px-4 py-2 bg-emerald-950/80 border border-emerald-800/60 rounded-lg">
              🤗 Hugging Face Transformers
            </span>
            <span className="px-4 py-2 bg-emerald-950/80 border border-emerald-800/60 rounded-lg">
              ⚡ FastAPI Server
            </span>
            <span className="px-4 py-2 bg-emerald-950/80 border border-emerald-800/60 rounded-lg">
              🌿 PlantVillage Dataset
            </span>
          </div>

          <div className="pt-4 text-xs text-emerald-400/60 border-t border-emerald-900/40">
            <p>© {new Date().getFullYear()} Plant AI. All Rights Reserved. Production AI SaaS Architecture.</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
