import { useState } from 'react';
import { FiSliders, FiCheckCircle, FiShield, FiSend, FiLink } from 'react-icons/fi';

export default function FormSettingsTab({
  settings = {},
  onChangeSettings
}) {
  const {
    name = 'Bespoke Furniture Quote Request',
    type = 'Quote Request',
    submitText = 'Submit Quote Request',
    successMessage = 'Thank you for your inquiry. An Aurelian private interior consultant will review your specifications and contact you within 2 business hours.',
    errorMessage = 'There was an error submitting your form. Please double-check required fields.',
    redirectUrl = '',
    spamProtection = 'recaptcha_v3',
    requireConsent = true,
    consentText = 'I consent to Aurelian Furniture storing my submission details according to privacy guidelines.'
  } = settings;

  const handleChange = (key, value) => {
    onChangeSettings({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white border border-black/10 rounded-xl p-6 shadow-2xs space-y-6 max-w-3xl mx-auto">
      <div className="border-b border-black/5 pb-3">
        <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Form Settings & Behavior</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure form submission messaging, redirect behavior, button copy, and spam protection.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Form Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Form Internal Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-bold focus:bg-white focus:outline-none"
          />
        </div>

        {/* Form Category Type */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Form Category</label>
          <select
            value={type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-semibold focus:bg-white focus:outline-none"
          >
            <option value="Contact">Contact Form</option>
            <option value="Newsletter">Newsletter Sign-up</option>
            <option value="Quote Request">Quote Request</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Showroom Inquiry">Showroom Inquiry</option>
            <option value="Callback">Callback Request</option>
            <option value="Feedback">Customer Feedback</option>
            <option value="Custom Form">Custom Form</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Submit Button Text */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Submit Button Label</label>
          <input
            type="text"
            value={submitText}
            onChange={(e) => handleChange('submitText', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-bold focus:bg-white focus:outline-none"
          />
        </div>

        {/* Redirect URL */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Optional Redirect URL</label>
          <input
            type="url"
            placeholder="https://aurelianfurniture.com/thank-you"
            value={redirectUrl}
            onChange={(e) => handleChange('redirectUrl', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Success Confirmation Message</label>
        <textarea
          rows={3}
          value={successMessage}
          onChange={(e) => handleChange('successMessage', e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs focus:bg-white focus:outline-none resize-none"
        />
      </div>

      {/* Error Message */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Error Message</label>
        <textarea
          rows={2}
          value={errorMessage}
          onChange={(e) => handleChange('errorMessage', e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs focus:bg-white focus:outline-none resize-none"
        />
      </div>

      {/* Spam Protection & Compliance */}
      <div className="pt-4 border-t border-black/5 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block flex items-center gap-1.5">
            <FiShield size={13} className="text-blue-600" />
            <span>Spam Protection Placeholder</span>
          </label>
          <select
            value={spamProtection}
            onChange={(e) => handleChange('spamProtection', e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-semibold"
          >
            <option value="recaptcha_v3">Google reCAPTCHA v3 (Invisible)</option>
            <option value="turnstile">Cloudflare Turnstile</option>
            <option value="honeypot">Honeypot Trap Only</option>
            <option value="disabled">Disabled (Testing Only)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Consent Requirement</label>
          <label className="flex items-center gap-2 text-xs text-gray-700 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={requireConsent}
              onChange={(e) => handleChange('requireConsent', e.target.checked)}
              className="rounded border-black/20"
            />
            <span className="font-semibold">Force GDPR / Privacy consent acceptance</span>
          </label>
        </div>
      </div>

    </div>
  );
}
