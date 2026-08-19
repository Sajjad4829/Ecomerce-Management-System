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
  ],
  'Bedroom': [
    [
      { title: 'Bed', link: '/categories/bedroom/bed', items: ['King Size Bed', 'Queen Size Bed', 'Semi Double Bed', 'Single Bed', 'Bunk Bed', 'Hydraulic Bed'] }
    ],
    [
      { title: 'Wardrobe', link: '/categories/bedroom/wardrobe', items: ['2-Door Wardrobe', '3-Door Wardrobe', '4-Door Wardrobe', 'Sliding Wardrobe', 'Walk-in Closet'] },
      { title: 'Dressing Table', link: '/categories/bedroom/dressing-table', items: ['With Mirror', 'With Storage'] }
    ],
    [
      { title: 'Bedside Table', link: '/categories/bedroom/bedside-table', items: [] },
      { title: 'Chest of Drawers', link: '/categories/bedroom/chest-of-drawers', items: [] },
      { title: 'Almirah', link: '/categories/bedroom/almirah', items: [] }
    ],
    [
      { title: 'Mattress', link: '/categories/bedroom/mattress', items: ['Orthopedic', 'Spring', 'Foam'] },
      { title: 'Bedroom Chair', link: '/categories/bedroom/chair', items: [] },
      { title: 'Pillow', link: '/categories/bedroom/pillow', items: [] }
    ]
  ],
  'Dining': [
    [
      { title: 'Dining Table', link: '/categories/dining/dining-table', items: ['Wooden Table', 'Glass Top', 'Marble Top', '4-Seater', '6-Seater', '8-Seater', 'Extendable'] }
    ],
    [
      { title: 'Dining Chair', link: '/categories/dining/dining-chair', items: ['Wooden Chair', 'Upholstered', 'Arm Chair'] }
    ],
    [
      { title: 'Dinner Wagon', link: '/categories/dining/dinner-wagon', items: ['Showcase', 'Sideboard', 'Buffet Table'] },
      { title: 'Tea Cart', link: '/categories/dining/tea-cart', items: [] }
    ],
    [
      { title: 'Cupboard', link: '/categories/dining/cupboard', items: [] },
      { title: 'Bar Cabinet', link: '/categories/dining/bar-cabinet', items: [] },
      { title: 'Dining Bench', link: '/categories/dining/dining-bench', items: [] }
    ]
  ],
  'Kitchen': [
    [
      { title: 'Kitchen Cabinet', link: '/categories/kitchen/kitchen-cabinet', items: ['Wall Cabinet', 'Base Cabinet', 'Tall Unit'] }
    ],
    [
      { title: 'Kitchen Island', link: '/categories/kitchen/kitchen-island', items: [] },
      { title: 'Kitchen Rack', link: '/categories/kitchen/kitchen-rack', items: [] }
    ],
    [
      { title: 'Pantry Unit', link: '/categories/kitchen/pantry-unit', items: [] },
      { title: 'Trolley', link: '/categories/kitchen/trolley', items: [] }
    ],
    [
      { title: 'Kitchen Accessories', link: '/categories/kitchen/accessories', items: [] }
    ]
  ],
  'Kid\'s Room': [
    [
      { title: 'Kid\'s Bed', link: '/categories/kids-room/bed', items: ['Bunk Bed', 'Single Bed', 'Trundle Bed', 'Car Bed'] }
    ],
    [
      { title: 'Study Table', link: '/categories/kids-room/study-table', items: ['Adjustable', 'With Bookshelf'] },
      { title: 'Kid\'s Chair', link: '/categories/kids-room/chair', items: [] }
    ],
    [
      { title: 'Kid\'s Wardrobe', link: '/categories/kids-room/wardrobe', items: [] },
      { title: 'Toy Storage', link: '/categories/kids-room/toy-storage', items: [] }
    ],
    [
      { title: 'Cribs', link: '/categories/kids-room/cribs', items: [] },
      { title: 'Play Mat', link: '/categories/kids-room/play-mat', items: [] }
    ]
  ],
  'SmartFit': [
    [
      { title: 'Sofa-Cum-Bed', link: '/categories/smartfit/sofa-cum-bed', items: [] }
    ],
    [
      { title: 'Wall Bed', link: '/categories/smartfit/wall-bed', items: [] }
    ],
    [
      { title: 'Folding Table', link: '/categories/smartfit/folding-table', items: [] }
    ],
    [
      { title: 'Nested Table', link: '/categories/smartfit/nested-table', items: [] },
      { title: 'Multipurpose Cabinet', link: '/categories/smartfit/multipurpose-cabinet', items: [] }
    ]
  ],
  'Institutional': [
    [
      { title: 'Auditorium Chair', link: '/categories/institutional/auditorium-chair', items: [] },
      { title: 'Waiting Chair', link: '/categories/institutional/waiting-chair', items: [] }
    ],
    [
      { title: 'Hospital Bed', link: '/categories/institutional/hospital-bed', items: [] },
      { title: 'Patient Cabinet', link: '/categories/institutional/patient-cabinet', items: [] }
    ],
    [
      { title: 'School Desk', link: '/categories/institutional/school-desk', items: [] },
      { title: 'Teacher\'s Desk', link: '/categories/institutional/teachers-desk', items: [] }
    ],
    [
      { title: 'Conference Table', link: '/categories/institutional/conference-table', items: [] },
      { title: 'Podium', link: '/categories/institutional/podium', items: [] }
    ]
  ],
  'Door': [
    [
      { title: 'Solid Wooden Door', link: '/categories/door/solid-wooden-door', items: [] },
      { title: 'Flush Door', link: '/categories/door/flush-door', items: [] }
    ],
    [
      { title: 'Veneer Door', link: '/categories/door/veneer-door', items: [] },
      { title: 'Laminated Door', link: '/categories/door/laminated-door', items: [] }
    ],
    [
      { title: 'Glass Door', link: '/categories/door/glass-door', items: [] },
      { title: 'PVC Door', link: '/categories/door/pvc-door', items: [] }
    ],
    [
      { title: 'Door Frame (Chowkath)', link: '/categories/door/door-frame', items: [] },
      { title: 'Door Accessories', link: '/categories/door/door-accessories', items: [] }
    ]
  ],
  'Interior': [
    [
      { title: 'Wall Paneling', link: '/categories/interior/wall-paneling', items: [] },
      { title: 'False Ceiling', link: '/categories/interior/false-ceiling', items: [] }
    ],
    [
      { title: 'Window Blinds', link: '/categories/interior/window-blinds', items: [] },
      { title: 'Curtains', link: '/categories/interior/curtains', items: [] }
    ],
    [
      { title: 'Wall Wallpaper', link: '/categories/interior/wallpaper', items: [] },
      { title: 'Floor Covering', link: '/categories/interior/floor-covering', items: [] }
    ],
    [
      { title: 'Decorative Light', link: '/categories/interior/decorative-light', items: [] },
      { title: 'Room Divider', link: '/categories/interior/room-divider', items: [] }
    ]
  ],
  'Office': [
    [
      { title: 'Director Table', link: '/categories/office/director-table', items: [] },
      { title: 'Executive Table', link: '/categories/office/executive-table', items: [] },
      { title: 'Manager Table', link: '/categories/office/manager-table', items: [] }
    ],
    [
      { title: 'Swivel Chair', link: '/categories/office/swivel-chair', items: ['High Back', 'Mid Back', 'Low Back'] },
      { title: 'Visitor Chair', link: '/categories/office/visitor-chair', items: [] },
      { title: 'Conference Chair', link: '/categories/office/conference-chair', items: [] }
    ],
    [
      { title: 'File Cabinet', link: '/categories/office/file-cabinet', items: ['Wooden', 'Metal'] },
      { title: 'Drawer Mobile', link: '/categories/office/drawer-mobile', items: [] }
    ],
    [
      { title: 'Workstation', link: '/categories/office/workstation', items: ['2-Seater', '4-Seater', '6-Seater'] },
      { title: 'Sofa & Lounge', link: '/categories/office/sofa-lounge', items: [] }
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
              className="h-full"
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white text-gray-800 shadow-2xl p-8 grid grid-cols-4 gap-8 z-50">
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
