import React from 'react';
import { ArrowLeft, Shield, Eye, Database, Lock, Globe } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-300">Last updated: January 1, 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-black/20 rounded-2xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              At CryptoVegas, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cryptocurrency casino platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
            </div>
            <div className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Personal Information:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name, email address, and date of birth</li>
                  <li>Identity verification documents</li>
                  <li>Cryptocurrency wallet addresses</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Usage Information:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Gaming activity and transaction history</li>
                  <li>Device information and IP addresses</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our gaming services</li>
                <li>Process deposits, withdrawals, and transactions</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Send important account and service updates</li>
                <li>Improve our platform and user experience</li>
                <li>Provide customer support and assistance</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing and Disclosure</h2>
            <div className="text-gray-300 space-y-3">
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With service providers who assist in our operations</li>
                <li>To comply with legal obligations and regulatory requirements</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transfer or acquisition</li>
                <li>With your explicit consent</li>
              </ul>
              <p className="mt-4 font-semibold text-white">
                We never sell your personal information to third parties for marketing purposes.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">5. Data Security</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>We implement robust security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for all data transmission</li>
                <li>Secure servers with regular security updates</li>
                <li>Multi-factor authentication options</li>
                <li>Regular security audits and penetration testing</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure cryptocurrency wallet infrastructure</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Account information is typically retained for 7 years after account closure, as required by anti-money laundering regulations.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Privacy Rights</h2>
            <div className="text-gray-300 space-y-3">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking</h2>
            <div className="text-gray-300 space-y-3">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
              <p className="mt-3">
                You can control cookie settings through your browser preferences.
              </p>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">9. International Data Transfers</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable data protection laws.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <div className="text-gray-300 space-y-2">
              <p>For privacy-related questions or requests, contact us:</p>
              <p>Email: privacy@cryptovegas.com</p>
              <p>Email: privacy@tucanbit.com</p>
              <p>Data Protection Officer: dpo@cryptovegas.com</p>
              <p>Data Protection Officer: dpo@tucanbit.com</p>
              <p>Live Chat: Available 24/7 on our platform</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;