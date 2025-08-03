import React from 'react';
import { ArrowLeft, Shield, Clock, DollarSign, Users, AlertTriangle, Heart, Phone } from 'lucide-react';

interface ResponsibleGamingProps {
  onBack: () => void;
}

const ResponsibleGaming: React.FC<ResponsibleGamingProps> = ({ onBack }) => {
  const tools = [
    {
      icon: DollarSign,
      title: 'Deposit Limits',
      description: 'Set daily, weekly, or monthly deposit limits to control your spending',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Session Time Limits',
      description: 'Set time limits for your gaming sessions to maintain balance',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Self-Exclusion',
      description: 'Temporarily or permanently exclude yourself from gaming',
      color: 'red'
    },
    {
      icon: AlertTriangle,
      title: 'Reality Checks',
      description: 'Receive regular reminders about your gaming time and spending',
      color: 'orange'
    }
  ];

  const warningSignsData = [
    'Spending more money than you can afford',
    'Chasing losses with bigger bets',
    'Gambling to escape problems or negative feelings',
    'Lying about gambling activities',
    'Neglecting work, family, or social responsibilities',
    'Borrowing money to gamble',
    'Feeling anxious or depressed about gambling',
    'Unable to stop or control gambling urges'
  ];

  const resources = [
    {
      name: 'Gamblers Anonymous',
      description: 'International fellowship for problem gamblers',
      website: 'www.gamblersanonymous.org',
      phone: '1-855-2-CALL-GA'
    },
    {
      name: 'National Council on Problem Gambling',
      description: 'US-based support and resources',
      website: 'www.ncpgambling.org',
      phone: '1-800-522-4700'
    },
    {
      name: 'GamCare',
      description: 'UK-based gambling support service',
      website: 'www.gamcare.org.uk',
      phone: '0808 8020 133'
    },
    {
      name: 'Gambling Therapy',
      description: 'Global online support community',
      website: 'www.gamblingtherapy.org',
      phone: 'Online chat available'
    }
  ];

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
            <h1 className="text-4xl font-bold text-white mb-2">Responsible Gaming</h1>
            <p className="text-gray-300">Your wellbeing is our priority</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-black/20 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Our Commitment</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              At CryptoVegas, we believe gaming should be fun, entertaining, and safe. We are committed to promoting 
              responsible gaming practices and providing tools to help our players maintain control over their gaming activities.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Gaming should never interfere with your personal relationships, work, or financial stability. 
              If you feel that your gaming habits are becoming problematic, we encourage you to use our responsible gaming tools 
              or seek professional help.
            </p>
          </section>

          {/* Responsible Gaming Tools */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Responsible Gaming Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-${tool.color}-900/30 to-${tool.color}-800/30 border border-${tool.color}-500/20 rounded-xl p-6`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 bg-${tool.color}-500/20 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${tool.color}-400`} />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{tool.description}</p>
                    <button className={`bg-gradient-to-r from-${tool.color}-500 to-${tool.color}-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-${tool.color}-600 hover:to-${tool.color}-700 transition-all duration-200`}>
                      Set Limits
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Warning Signs */}
          <section className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Warning Signs of Problem Gambling</h2>
            </div>
            <p className="text-gray-300 mb-6">
              It's important to recognize the warning signs of problem gambling. If you identify with any of these signs, 
              please consider seeking help:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {warningSignsData.map((sign, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{sign}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Self-Assessment */}
          <section className="bg-black/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Self-Assessment Questions</h2>
            <p className="text-gray-300 mb-6">
              Ask yourself these questions honestly to evaluate your gaming habits:
            </p>
            <div className="space-y-4">
              {[
                'Do you gamble longer than you intended?',
                'Do you gamble to escape from problems or feelings?',
                'Have you ever lied about your gambling activities?',
                'Do you feel restless or irritable when trying to cut down on gambling?',
                'Have you tried to win back money you lost by gambling more?',
                'Has gambling caused problems in your relationships?',
                'Have you borrowed money or sold possessions to fund gambling?',
                'Do you feel guilty about your gambling habits?'
              ].map((question, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                  <p className="text-white">{question}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-200">
                <strong>If you answered "yes" to several of these questions,</strong> you may have a gambling problem. 
                Please consider using our responsible gaming tools or seeking professional help.
              </p>
            </div>
          </section>

          {/* Help Resources */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Get Help</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-black/20 rounded-xl p-6 border border-[#3C1A4F]/20">
                  <h3 className="text-xl font-semibold text-white mb-2">{resource.name}</h3>
                  <p className="text-gray-300 mb-4">{resource.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400">{resource.website}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">{resource.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Us */}
          <section className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Need Support?</h2>
            <p className="text-gray-300 mb-6">
              Our support team is trained to help with responsible gaming concerns. 
              Contact us confidentially if you need assistance with setting limits or accessing help resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                Contact Support
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200">
                Set Account Limits
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleGaming;