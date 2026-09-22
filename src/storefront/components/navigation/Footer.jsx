import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiHome, FiSmartphone, FiPhone, FiMail } from 'react-icons/fi';
import { FaPinterestP, FaWikipediaW } from 'react-icons/fa';
import { useCMS } from '../../../admin/context/cms/CMSContext';

export default function Footer() {
  const { footerConfig } = useCMS();
  
  const { contact, columns, appLinks, social, logoImage } = footerConfig || {};

  return (
    <footer className="bg-[#f4f5f6] text-neutral-600 pt-16 pb-8 border-t border-neutral-200 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {logoImage ? (
                <img src={logoImage} alt="Logo" className="h-10 object-contain" />
              ) : (
                <div className="inline-block bg-red-600 text-white font-bold text-2xl tracking-widest px-4 py-2 uppercase">
                  HATIL
                </div>
              )}
            </div>
            
            <div className="space-y-4 text-[13px] text-neutral-600 leading-relaxed">
              {contact?.address && (
                <div className="flex items-start gap-3">
                  <FiHome className="text-neutral-400 mt-1 flex-shrink-0" size={16} />
                  <span>{contact.address}</span>
                </div>
              )}
              {contact?.phone1 && (
                <div className="flex items-center gap-3">
                  <FiSmartphone className="text-neutral-400 flex-shrink-0" size={16} />
                  <span>{contact.phone1}</span>
                </div>
              )}
              {contact?.phone2 && (
                <div className="flex items-center gap-3">
                  <FiPhone className="text-neutral-400 flex-shrink-0" size={16} />
                  <span>{contact.phone2}</span>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-center gap-3">
                  <FiMail className="text-neutral-400 flex-shrink-0" size={16} />
                  <a href={`mailto:${contact.email}`} className="hover:text-red-600 transition-colors">{contact.email}</a>
                </div>
              )}
            </div>
          </div>

          {/* Columns 2, 3, 4 */}
          {columns?.map((col, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="font-bold mb-6 text-[13px] uppercase tracking-wider text-neutral-900">
                {col.title}
              </h4>
              <ul className="space-y-3 text-[13px]">
                {col.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.url} className="text-neutral-500 hover:text-red-600 transition-colors inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row: Apps and Social */}
        <div className="pt-8 border-t border-neutral-300 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            {appLinks?.appStore && (
              <a href={appLinks.appStore} target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                {appLinks.appStoreImage ? (
                  <img src={appLinks.appStoreImage} alt="App Store" className="h-10 object-contain" />
                ) : (
                  <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-neutral-800 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] leading-tight">Download on the</span>
                      <span className="text-sm font-semibold leading-tight tracking-tight">App Store</span>
                    </div>
                  </div>
                )}
              </a>
            )}
            {appLinks?.googlePlay && (
              <a href={appLinks.googlePlay} target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                {appLinks.googlePlayImage ? (
                  <img src={appLinks.googlePlayImage} alt="Google Play" className="h-10 object-contain" />
                ) : (
                  <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-neutral-800 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] leading-tight uppercase">GET IT ON</span>
                      <span className="text-sm font-semibold leading-tight tracking-tight">Google Play</span>
                    </div>
                  </div>
                )}
              </a>
            )}
          </div>

          <div className="flex items-center gap-5 text-neutral-400">
            {social?.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                {social.facebookImage ? <img src={social.facebookImage} alt="Facebook" className="w-5 h-5 object-contain" /> : <FiFacebook size={18} className="hover:text-blue-600 transition-colors" />}
              </a>
            )}
            {social?.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                {social.instagramImage ? <img src={social.instagramImage} alt="Instagram" className="w-5 h-5 object-contain" /> : <FiInstagram size={18} className="hover:text-pink-600 transition-colors" />}
              </a>
            )}
            {social?.youtube && (
              <a href={social.youtube} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                {social.youtubeImage ? <img src={social.youtubeImage} alt="YouTube" className="w-5 h-5 object-contain" /> : <FiYoutube size={18} className="hover:text-red-600 transition-colors" />}
              </a>
            )}
            {social?.pinterest && (
              <a href={social.pinterest} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                {social.pinterestImage ? <img src={social.pinterestImage} alt="Pinterest" className="w-5 h-5 object-contain" /> : <FaPinterestP size={18} className="hover:text-red-600 transition-colors" />}
              </a>
            )}
            {social?.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                {social.linkedinImage ? <img src={social.linkedinImage} alt="LinkedIn" className="w-5 h-5 object-contain" /> : <FiLinkedin size={18} className="hover:text-blue-700 transition-colors" />}
              </a>
            )}
            {social?.wikipedia && (
              <a href={social.wikipedia} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity flex items-center justify-center">
                {social.wikipediaImage ? <img src={social.wikipediaImage} alt="Wikipedia" className="w-5 h-5 object-contain" /> : <FaWikipediaW size={18} className="hover:text-neutral-900 transition-colors" />}
              </a>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
}
