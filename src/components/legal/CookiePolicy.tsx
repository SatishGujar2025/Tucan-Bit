import React from 'react';
import { ArrowLeft, Cookie, Settings, BarChart, Shield } from 'lucide-react';

interface CookiePolicyProps {
  onBack: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          {/* <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button> */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Cookie Policy</h1>
            <p className="text-gray-300">Last updated: January 1, 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-black/20 rounded-2xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Cookie className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">1. What Are Cookies?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and ensuring our platform functions properly.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">2. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Essential Cookies</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  These cookies are necessary for our website to function properly and cannot be disabled.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                  <li>Authentication and login status</li>
                  <li>Security and fraud prevention</li>
                  <li>Shopping cart and transaction processing</li>
                  <li>Load balancing and site performance</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Settings className="w-5 h-5 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Functional Cookies</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  These cookies enhance your experience by remembering your preferences and settings.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                  <li>Language and region preferences</li>
                  <li>Theme and display settings</li>
                  <li>Game preferences and favorites</li>
                  <li>Notification preferences</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <BarChart className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Analytics Cookies</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                  <li>Page views and user behavior</li>
                  <li>Popular games and features</li>
                  <li>Site performance metrics</li>
                  <li>Error tracking and debugging</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Cookies</h2>
            <div className="text-gray-300 space-y-3">
              <p>We may also use third-party cookies from trusted partners:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
                <li><strong>Payment Processors:</strong> Secure transaction processing and fraud prevention</li>
                <li><strong>Game Providers:</strong> Game functionality and performance optimization</li>
                <li><strong>Customer Support:</strong> Live chat and help desk functionality</li>
              </ul>
            </div>
          </section>

          {/* Cookie Management */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Managing Your Cookie Preferences</h2>
            <div className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Browser Settings:</h3>
                <p className="mb-2">You can control cookies through your browser settings:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Block all cookies or specific types</li>
                  <li>Delete existing cookies</li>
                  <li>Set preferences for future cookies</li>
                  <li>Receive notifications when cookies are set</li>
                </ul>
              </div>
              
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-200">
                  <strong>Important:</strong> Disabling essential cookies may affect the functionality of our platform and prevent you from using certain features.
                </p>
              </div>
            </div>
          </section>

          {/* Browser Instructions */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Browser-Specific Instructions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Chrome</h3>
                <p className="text-gray-300 text-sm">
                  Settings → Privacy and Security → Cookies and other site data
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Firefox</h3>
                <p className="text-gray-300 text-sm">
                  Options → Privacy & Security → Cookies and Site Data
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Safari</h3>
                <p className="text-gray-300 text-sm">
                  Preferences → Privacy → Manage Website Data
                </p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Edge</h3>
                <p className="text-gray-300 text-sm">
                  Settings → Cookies and site permissions → Cookies and site data
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Cookie Retention</h2>
            <div className="text-gray-300 space-y-3">
              <p>Different cookies have different lifespans:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain until expiration date or manual deletion</li>
                <li><strong>Essential Cookies:</strong> Typically expire after 1-2 years</li>
                <li><strong>Analytics Cookies:</strong> Usually expire after 2 years</li>
              </ul>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Policy Updates</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any significant changes by posting the updated policy on our website with a new "Last Updated" date.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
            <div className="text-gray-300 space-y-2">
              <p>If you have questions about our use of cookies, please contact us:</p>
              <p>Email: privacy@cryptovegas.com</p>
              <p>Email: privacy@tucanbit.com</p>
              <p>Live Chat: Available 24/7 on our platform</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;