import React from 'react';
import { ArrowLeft, Shield, AlertTriangle, Clock, Users } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
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
              Welcome to CryptoVegas ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our cryptocurrency casino platform and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">2. Eligibility</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>To use our services, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age or the legal gambling age in your jurisdiction</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Not be located in a restricted jurisdiction</li>
                <li>Provide accurate and complete registration information</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
            <div className="text-gray-300 space-y-3">
              <p>When creating an account, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide truthful, accurate, and complete information</li>
                <li>Maintain only one account per person</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized account access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>
          </section>

          {/* Deposits and Withdrawals */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Deposits and Withdrawals</h2>
            <div className="text-gray-300 space-y-3">
              <p>Regarding financial transactions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We accept various cryptocurrencies as specified on our platform</li>
                <li>Minimum and maximum deposit/withdrawal limits apply</li>
                <li>Withdrawal requests may require identity verification</li>
                <li>Processing times vary by cryptocurrency and network conditions</li>
                <li>We reserve the right to request additional documentation</li>
              </ul>
            </div>
          </section>

          {/* Gaming Rules */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Gaming Rules</h2>
            <div className="text-gray-300 space-y-3">
              <p>When participating in games:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All games are provably fair and use certified random number generators</li>
                <li>Game rules and payout rates are displayed for each game</li>
                <li>Bonus terms and wagering requirements must be met before withdrawal</li>
                <li>We reserve the right to void bets in case of technical errors</li>
                <li>Maximum win limits may apply to certain games or bonuses</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">6. Prohibited Activities</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>The following activities are strictly prohibited:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Using automated software, bots, or scripts</li>
                <li>Colluding with other players or third parties</li>
                <li>Exploiting software vulnerabilities or bugs</li>
                <li>Money laundering or other illegal financial activities</li>
                <li>Creating multiple accounts to abuse bonuses</li>
                <li>Using VPNs to circumvent geographical restrictions</li>
              </ul>
            </div>
          </section>

          {/* Responsible Gaming */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Responsible Gaming</h2>
            <div className="text-gray-300 space-y-3">
              <p>We are committed to promoting responsible gaming:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Set deposit, loss, and session time limits</li>
                <li>Self-exclusion options are available</li>
                <li>We provide links to gambling addiction resources</li>
                <li>Underage gambling is strictly prohibited</li>
                <li>We may restrict accounts showing signs of problem gambling</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, CryptoVegas shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from your use of our services.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">9. Changes to Terms</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
            <div className="text-gray-300 space-y-2">
              <p>If you have questions about these Terms, please contact us:</p>
              <p>Email: legal@cryptovegas.com</p>
              <p>Email: legal@tucanbit.com</p>
              <p>Live Chat: Available 24/7 on our platform</p>
              <p>License: Curacao Gaming License #8048/JAZ</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;