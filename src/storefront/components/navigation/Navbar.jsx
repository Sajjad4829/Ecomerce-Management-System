import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { useAuth } from '../../../auth/context/AuthContext';
import CartBadge from '../cart/CartBadge';

const megaMenus = {
  'Living Room': [
    [
      { title: 'Sofa Set', link: '/categories/living-room/sofa-set', items: ['Fabric Sofa', 'Wooden Sofa', 'L-Shaped Sofa', 'Leather Sofa', 'Rexin Sofa', 'Sofa-Bed', '3-Seater Sofa', '2-Seater Sofa', 'Single Seater', 'Modular Sofa', 'Sofa with Divan', 'Multipurpose Sofa', 'Storage Sofa', 'Ottoman'] },
      { title: 'Cushion', link: '/categories/living-room/cushion', items: [] }
    ],
    [
      { title: 'Center Table', link: '/categories/living-room/center-table', items: ['Center Table With Glass Top', 'Center Table With Wooden Top', 'Center Table With Storage', 'Corner Table', 'Modular Center Table', 'Non-Lacquer Center Table', 'Nested Table'] },
      { title: 'Divan', link: '/categories/living-room/divan', items: ['Fabric Divan', 'Wooden Divan', 'Modular Divan'] },
      { title: 'Shoe Rack', link: '/categories/living-room/shoe-rack', items: ['Storage', 'Shoe Rack With Mirror'] },
      { title: 'Cradle', link: '/categories/living-room/cradle', items: [] }
    ],
    [
      { title: 'File Rack', link: '/categories/living-room/file-rack', items: [] },
      { title: 'Stand', link: '/categories/living-room/stand', items: ['Hanger Stand', 'Iron Stand'] },
      { title: 'TV Cabinet', link: '/categories/living-room/tv-cabinet', items: ['TV Cabinet With Hanging Unit', 'Low Height TV Cabinet', 'Modular TV Cabinet'] },
      { title: 'Open Shelves', link: '/categories/living-room/open-shelves', items: ['Book Shelves', 'Corner Shelves', 'Display Rack'] }
    ],
    [
      { title: 'Chair', link: '/categories/living-room/chair', items: ['Rocking Chair', 'Easy Chair', 'Accent Chair', 'Bar Stool', 'Foot Stool', 'Telephone Seater', 'Recliner Chair'] },
      { title: 'Lobby', link: '/categories/living-room/lobby', items: ['Lobby Table', 'Lobby Chair'] }
    ]
  ]
};

export default function Navbar({ onOpenMobileMenu, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  
  const location = useLocation();
  const { openCartDrawer } = useCommerce();
  const { isAuthenticated, user } = useAuth();

  const isHomePage = location.pathname === '/';
  
  // Navbar is solid white if we are scrolled, NOT on homepage, or if the user is hovering over the navbar/categories
  const isSolid = isScrolled || !isHomePage || isHovered || hoveredCategory !== null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const categories = [
    { name: 'Living Room', path: '/categories/living-room' },
    { name: 'Bedroom', path: '/categories/bedroom' },
    { name: 'Dining', path: '/categories/dining' },
    { name: 'Kitchen', path: '/categories/kitchen' },
    { name: "Kid's Room", path: '/categories/kids-room' },
    { name: 'SmartFit', path: '/categories/smartfit' },
    { name: 'Institutional', path: '/categories/institutional' },
    { name: 'Door', path: '/categories/door' },
    { name: 'Interior', path: '/categories/interior' },
    { name: 'Office', path: '/categories/office' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 border-b h-[72px] md:h-[84px] ${
        isSolid ? 'bg-white text-gray-800 shadow-md border-gray-200' : 'bg-transparent text-white border-transparent'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full mx-auto flex items-center justify-between xl:grid xl:grid-cols-3 h-full px-5">
        {/* Left Section: Brand Logo */}
        <div className="flex items-center xl:justify-self-start h-full">
          <Link to="/" className="bg-[#E31E24] hover:brightness-110 transition-all flex items-center justify-center px-3 py-0.5 md:px-4 md:py-1">
            <span className="text-white text-3xl md:text-[40px] font-black tracking-tighter uppercase text-center leading-none">
              DORY
            </span>
          </Link>
        </div>

        {/* Center Section: Categories (Desktop) */}
        <nav className="hidden lg:flex items-center h-full xl:justify-self-center relative">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="h-full relative"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link 
                to={category.path}
                className={`whitespace-nowrap h-full flex items-center px-3 xl:px-4 text-sm xl:text-base font-semibold transition-colors duration-200 ${
                  hoveredCategory === category.name 
                    ? (isSolid ? 'bg-blue-50/30 text-black' : 'bg-white/10 text-white')
                    : (isSolid ? 'text-gray-800 hover:text-black' : 'text-white/90 hover:text-white')
                }`}
              >
                {category.name}
              </Link>
              
              {/* Mega Menu Dropdown */}
              {hoveredCategory === category.name && megaMenus[category.name] && (
                <div className="absolute top-full left-0 min-[1920px]:left-1/2 min-[1920px]:-translate-x-1/2 w-[900px] bg-white text-gray-800 shadow-2xl p-8 grid grid-cols-4 gap-8 z-50">
                  {megaMenus[category.name].map((col, colIndex) => (
                    <div key={colIndex} className="flex flex-col space-y-6">
                      {col.map((section, secIndex) => (
                        <div key={secIndex} className="flex flex-col">
                          <Link to={section.link} className="font-bold text-sm text-gray-900 mb-3 hover:text-red-600 flex items-center group">
                            {section.title}
                            {section.items.length > 0 && <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-200" />}
                          </Link>
                          {section.items.length > 0 && (
                            <ul className="flex flex-col space-y-2">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link to={`${section.link}/${item.toLowerCase().replace(/ /g, '-')}`} className="text-xs text-gray-500 hover:text-[#2563eb] transition-colors">
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className={`whitespace-nowrap h-full flex items-center px-3 xl:px-4 text-sm xl:text-base font-semibold transition-colors duration-200 gap-1 ${
            isSolid ? 'text-gray-800 hover:text-black' : 'text-white/90 hover:text-white'
          }`}>
            More <ChevronDown size={14} />
          </button>
        </nav>

        {/* Right Section: Utilities */}
        <div className={`flex items-center space-x-4 md:space-x-5 xl:justify-self-end ${
          isSolid ? 'text-gray-800' : 'text-white'
        }`}>
          <button 
            onClick={onOpenSearch}
            className={`p-1 transition-colors ${isSolid ? 'hover:text-red-600' : 'hover:text-gray-300'}`}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to={isAuthenticated ? "/account" : "/account/login"} 
            className={`p-1 transition-colors hidden sm:block ${isSolid ? 'hover:text-red-600' : 'hover:text-gray-300'}`}
            aria-label="Account"
          >
            {isAuthenticated ? (
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isSolid ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              }`}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            ) : (
              <User size={20} />
            )}
          </Link>
          
          <button 
            onClick={openCartDrawer}
            className={`p-1 transition-colors relative ${isSolid ? 'hover:text-red-600' : 'hover:text-gray-300'}`}
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            <CartBadge />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={onOpenMobileMenu}
            className={`p-1 transition-colors lg:hidden ml-2 ${isSolid ? 'hover:text-red-600' : 'hover:text-gray-300'}`}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
