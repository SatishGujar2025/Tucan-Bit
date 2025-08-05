import React from 'react';
import { ArrowLeft, Award, Shield, Globe, CheckCircle } from 'lucide-react';

interface LicensingProps {
  onBack: () => void;
}

const Licensing: React.FC<LicensingProps> = ({ onBack }) => {
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
            <h1 className="text-4xl font-bold text-white mb-2">Licensing Information</h1>
            <p className="text-gray-300">Our regulatory compliance and licensing details</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-black/20 rounded-2xl p-8 space-y-8">
          {/* Main License */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Primary Gaming License</h2>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Curacao Gaming License</h3>
                  <p className="text-yellow-400 font-semibold">License #8048/JAZ</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p><strong className="text-white">Issued by:</strong> Government of Curacao</p>
                  <p><strong className="text-white">License Type:</strong> Master Gaming License</p>
                  <p><strong className="text-white">Valid Until:</strong> December 31, 2025</p>
                </div>
                <div>
                  <p><strong className="text-white">Jurisdiction:</strong> Curacao</p>
                  <p><strong className="text-white">Regulator:</strong> Curacao Gaming Control Board</p>
                  <p><strong className="text-white">Status:</strong> <span className="text-green-400">Active & Valid</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* What This Means */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Our License Means for You</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Regulatory Oversight</h3>
                    <p className="text-gray-300 text-sm">We operate under strict regulatory supervision and must comply with all gaming laws.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Player Protection</h3>
                    <p className="text-gray-300 text-sm">Your funds are protected through segregated accounts and regulatory requirements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Fair Gaming</h3>
                    <p className="text-gray-300 text-sm">All games are regularly audited for fairness and randomness.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Responsible Gaming</h3>
                    <p className="text-gray-300 text-sm">We must provide tools and resources for responsible gambling.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Dispute Resolution</h3>
                    <p className="text-gray-300 text-sm">Access to independent dispute resolution mechanisms.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">Anti-Money Laundering</h3>
                    <p className="text-gray-300 text-sm">Strict AML and KYC procedures to prevent financial crimes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance Standards */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Compliance Standards</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-1">Security Standards</h3>
                <p className="text-gray-300 text-sm">ISO 27001 certified security management</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 text-center">
                <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-1">International Standards</h3>
                <p className="text-gray-300 text-sm">Compliance with international gaming regulations</p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4 text-center">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-1">Industry Certifications</h3>
                <p className="text-gray-300 text-sm">Certified by leading gaming authorities</p>
              </div>
            </div>
          </section>

          {/* Regulatory Requirements */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Regulatory Obligations</h2>
            <div className="text-gray-300 space-y-3">
              <p>As a licensed operator, we are required to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain segregated player funds in licensed financial institutions</li>
                <li>Submit regular financial and operational reports to regulators</li>
                <li>Implement robust anti-money laundering (AML) procedures</li>
                <li>Provide responsible gaming tools and resources</li>
                <li>Ensure all games are fair and use certified random number generators</li>
                <li>Maintain detailed records of all transactions and player activities</li>
                <li>Cooperate with regulatory investigations and audits</li>
                <li>Provide transparent terms and conditions</li>
              </ul>
            </div>
          </section>

          {/* Verification */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">License Verification</h2>
            <div className="bg-gray-800/30 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                You can verify our license status directly with the Curacao Gaming Control Board:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><strong className="text-white">Website:</strong> www.gaming-curacao.com</p>
                <p><strong className="text-white">License Number:</strong> 8048/JAZ</p>
                <p><strong className="text-white">Operator:</strong> CryptoVegas N.V.</p>
                <p><strong className="text-white">Registration:</strong> Curacao Commercial Register</p>
              </div>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Dispute Resolution</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                If you have a dispute that cannot be resolved through our customer support, 
                you may contact our licensing authority:
              </p>
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                <p><strong className="text-white">Curacao Gaming Control Board</strong></p>
                <p>Email: complaints@gaming-curacao.com</p>
                <p>Address: Heelsumstraat 51, E-Commerce Park, Curacao</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Our Compliance Team</h2>
            <div className="text-gray-300 space-y-2">
              <p>For licensing or compliance questions:</p>
              <p>Email: compliance@cryptovegas.com</p>
              <p>Email: compliance@tucanbit.com</p>
              <p>Legal Department: legal@cryptovegas.com</p>
              <p>Legal Department: legal@tucanbit.com</p>
              <p>Live Chat: Available 24/7 on our platform</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Licensing;