import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Server, Zap, CheckCircle } from 'lucide-react';

interface SecurityProps {
  onBack: () => void;
}

const Security: React.FC<SecurityProps> = ({ onBack }) => {
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
            <h1 className="text-4xl font-bold text-white mb-2">Security & Safety</h1>
            <p className="text-gray-300">How we protect your data and ensure fair gaming</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-black/20 rounded-2xl p-8 space-y-8">
          {/* Overview */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Our Security Commitment</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              At CryptoVegas, security is our top priority. We employ industry-leading security measures, 
              cutting-edge encryption technology, and rigorous protocols to ensure your personal information, 
              funds, and gaming experience are completely secure and protected.
            </p>
          </section>

          {/* Security Features */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Security Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* SSL Encryption */}
              <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">SSL Encryption</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  All data transmission is protected with 256-bit SSL encryption, the same standard used by banks.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm ml-4">
                  <li>End-to-end encryption for all communications</li>
                  <li>Secure payment processing</li>
                  <li>Protected login credentials</li>
                  <li>Encrypted data storage</li>
                </ul>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Two-Factor Authentication</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  Add an extra layer of security to your account with 2FA protection.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm ml-4">
                  <li>SMS verification codes</li>
                  <li>Authenticator app support</li>
                  <li>Email confirmation</li>
                  <li>Biometric authentication</li>
                </ul>
              </div>

              {/* Secure Infrastructure */}
              <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Server className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Secure Infrastructure</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  Our servers are hosted in secure, certified data centers with 24/7 monitoring.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm ml-4">
                  <li>ISO 27001 certified data centers</li>
                  <li>DDoS protection</li>
                  <li>Regular security audits</li>
                  <li>Redundant backup systems</li>
                </ul>
              </div>

              {/* Privacy Protection */}
              <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border border-orange-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-semibold text-white">Privacy Protection</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  Your personal information is protected with advanced privacy measures.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm ml-4">
                  <li>Data anonymization</li>
                  <li>Limited access controls</li>
                  <li>Regular data purging</li>
                  <li>GDPR compliance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Fair Gaming */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Provably Fair Gaming</h2>
            <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border border-yellow-500/20 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                All our games use provably fair technology, allowing you to verify the fairness of every game round.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">Certified RNG</h4>
                  <p className="text-gray-300 text-sm">Random Number Generators certified by independent labs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">Blockchain Verification</h4>
                  <p className="text-gray-300 text-sm">Game results verifiable on the blockchain</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">Third-Party Audits</h4>
                  <p className="text-gray-300 text-sm">Regular audits by independent testing agencies</p>
                </div>
              </div>
            </div>
          </section>

          {/* Fund Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Fund Security</h2>
            <div className="text-gray-300 space-y-4">
              <p>Your cryptocurrency funds are protected through multiple security layers:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Cold Storage</h3>
                  <p className="text-sm">95% of funds stored offline in secure cold wallets</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Multi-Signature</h3>
                  <p className="text-sm">Multi-signature wallets requiring multiple approvals</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Segregated Accounts</h3>
                  <p className="text-sm">Player funds kept separate from operational funds</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Insurance Coverage</h3>
                  <p className="text-sm">Additional insurance protection for player funds</p>
                </div>
              </div>
            </div>
          </section>

          {/* Security Certifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Security Certifications</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">ISO 27001</h3>
                <p className="text-gray-300 text-xs">Information Security Management</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 text-center">
                <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">PCI DSS</h3>
                <p className="text-gray-300 text-xs">Payment Card Industry Standards</p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4 text-center">
                <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">GDPR</h3>
                <p className="text-gray-300 text-xs">Data Protection Compliance</p>
              </div>
              <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4 text-center">
                <Server className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">SOC 2</h3>
                <p className="text-gray-300 text-xs">Service Organization Control</p>
              </div>
            </div>
          </section>

          {/* Security Best Practices */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Security Checklist</h2>
            <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/20 rounded-xl p-6">
              <p className="text-gray-300 mb-4">Help us keep your account secure by following these best practices:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Use a strong, unique password</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Enable two-factor authentication</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Keep your email secure</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Log out from public devices</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Verify website URL before login</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Never share your login details</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Report suspicious activity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Keep software updated</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Security Team */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Security Support</h2>
            <div className="text-gray-300 space-y-2">
              <p>If you have security concerns or need assistance:</p>
              <p>Security Team: security@cryptovegas.com</p>
              <p>Security Team: security@tucanbit.com</p>
              <p>Emergency Line: Available 24/7 through live chat</p>
              <p>Bug Bounty: Report vulnerabilities to bounty@cryptovegas.com</p>
              <p>Bug Bounty: Report vulnerabilities to bounty@tucanbit.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Security;