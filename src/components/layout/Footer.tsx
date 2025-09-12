import React from "react";
import { Link } from "react-router-dom";
import tucanLogo from "../../assets/logos/logoNew.svg";
// import bitcoinLogo from "../../assets/payment-methods/icons8-bitcoin-94.png";
// import ethereumLogo from "../../assets/payment-methods/icons8-ethereum-24.png";
// import tonLogo from "../../assets/payment-methods/ton_symbol.png";
// import dollarSymbol from "../../assets/payment-methods/dollar-symbol.png";
// import partnerToncoin from "../../assets/payment-methods/partner_Toncoin review.webp";
// import partnerBitcoin from "../../assets/payment-methods/partner-bitcoin-cryptocurrency-electronic-money-golden.jpg";
// import partnerTether from "../../assets/payment-methods/partner-Tethers-Secret-8B-Gold-Stockpile-A-Strategic-Move-Amid-Economic-Uncertainty.webp";
// import gcbLogo from "../../assets/payment-methods/GCB.png";
// import eighteenPlusLogo from "../../assets/payment-methods/icons8-18-plus-50.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 border-t border-[#3C1A4F]/20 bg-gradient-to-b from-[#1E2129] to-[#19191F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8 mb-0">
          {/* Column 1: Logo, Description, Copyright */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <img src={tucanLogo} alt="TucanBIT" className="w-[auto] h-[15px]" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              TucanBIT is owned and operated by Tucan Entertainment B.V. and holds a certificate of operation duly extended by the Curacao Gaming Control Board. The world's most trusted crypto casino. Play responsibly and enjoy the future of online gaming.
            </p>
            <div className="mt-auto">
              <p className="text-gray-500 text-sm">
                © 2024 TucanBIT. All rights reserved.
              </p>
            </div>
          </div>

          {/* Column 2: All Links */}
          <div className="lg:col-span-7 grid grid-cols-4 gap-0">
           
              <div>
              <h3 className="text-white font-bold text-lg mb-4">Casino</h3>
              <ul className="space-y-2 mb-6">
                <li><Link to="/slots" className="text-gray-400 hover:text-white transition-colors text-sm">Slots</Link></li>
                <li><Link to="/blackjacks" className="text-gray-400 hover:text-white transition-colors text-sm">Blackjack</Link></li>
                <li><Link to="/roulette" className="text-gray-400 hover:text-white transition-colors text-sm">Roulette</Link></li>
                <li><Link to="/live-casino" className="text-gray-400 hover:text-white transition-colors text-sm">Live Casino</Link></li>
                <li><Link to="/jackpots" className="text-gray-400 hover:text-white transition-colors text-sm">Jackpots</Link></li>
                <li><Link to="/table-games" className="text-gray-400 hover:text-white transition-colors text-sm">Table Games</Link></li>
              </ul>
              </div>
              <div>
              <h3 className="text-white font-bold text-lg mb-4">Sports</h3>
              <ul className="space-y-2">
                <li><Link to="/sports" className="text-gray-400 hover:text-white transition-colors text-sm">Sportsbook</Link></li>
                <li><Link to="/sports/football" className="text-gray-400 hover:text-white transition-colors text-sm">Football</Link></li>
                <li><Link to="/sports/basketball" className="text-gray-400 hover:text-white transition-colors text-sm">Basketball</Link></li>
                <li><Link to="/sports/esports" className="text-gray-400 hover:text-white transition-colors text-sm">Esports</Link></li>
              </ul>
              </div>
              <div>
               <h3 className="text-white font-bold text-lg mb-4">Promotions</h3>
              <ul className="space-y-2 mb-6">
                <li><Link to="/promotions" className="text-gray-400 hover:text-white transition-colors text-sm">Promotions</Link></li>
                <li><Link to="/promotions/daily-fin" className="text-gray-400 hover:text-white transition-colors text-sm">The Daily Fin</Link></li>
                <li><Link to="/promotions/battle-pass" className="text-gray-400 hover:text-white transition-colors text-sm">Battle Pass</Link></li>
                <li><Link to="/promotions/wtf" className="text-gray-400 hover:text-white transition-colors text-sm">WTF?!</Link></li>
                <li><Link to="/promotions/refer-friend" className="text-gray-400 hover:text-white transition-colors text-sm">Refer a Friend</Link></li>
                <li><Link to="/promotions/affiliates" className="text-gray-400 hover:text-white transition-colors text-sm">Affiliates</Link></li>
              </ul>
              </div>
              <div>
              <h3 className="text-white font-bold text-lg mb-4">Support & Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">Support</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
                <li><Link to="/responsible-gaming" className="text-gray-400 hover:text-white transition-colors text-sm">Responsible Gaming</Link></li>
                <li><Link to="/fairness" className="text-gray-400 hover:text-white transition-colors text-sm">Fairness</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              </ul>
              </div>
          
          </div>

          {/* Column 3: Social Media */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6">Follow Us</h3>
            <div className="flex  gap-3 items-center">
              <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-white">𝕏</span>
                </div>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-white">📷</span>
                </div>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-white">▶</span>
                </div>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-white">💬</span>
                </div>
              </a>
            </div>
            
           
          </div>
        </div>
        {/* <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid lg:grid-cols-4 gap-20">
            <div>
              <h4 className="text-white font-semibold text-md mb-4">Partners</h4>
              <div className="flex gap-4">
                <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <img src={partnerToncoin} alt="Toncoin Partner" className="w-16 h-16 object-contain" />
                  <span className="text-white text-xs font-medium text-center">Toncoin</span>
                </div>
                <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <img src={partnerBitcoin} alt="Bitcoin Partner" className="w-16 h-16 object-contain" />
                  <span className="text-white text-xs font-medium text-center">Bitcoin</span>
                </div>
                <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <img src={partnerTether} alt="Tether Partner" className="w-16 h-16 object-contain" />
                  <span className="text-white text-xs font-medium text-center">Tether</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-md mb-4">Payment Methods</h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <img src={bitcoinLogo} alt="Bitcoin" className="w-5 h-5" />
                  <span className="text-white text-sm">Bitcoin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={ethereumLogo} alt="Ethereum" className="w-5 h-5" />
                  <span className="text-white text-sm">Ethereum</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src={tonLogo} alt="TON" className="w-5 h-5" />
                  <span className="text-white text-sm">TON</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-md mb-4">Currency</h4>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center space-x-2">
                  <img src={tonLogo} alt="TON" className="w-5 h-5" />
                  <span className="text-white text-sm">1 TON</span>
                </div>
                <span className="text-gray-400">→</span>
                <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center space-x-2">
                  <img src={dollarSymbol} alt="USD" className="w-5 h-5" />
                  <span className="text-white text-sm">$3.31 USD</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-md mb-4">Compliance</h4>
              <div className="flex gap-4">
                <div className="flex items-center justify-center">
                  <img src={gcbLogo} alt="GCB" className="w-12 h-12 object-contain" />
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <img src={eighteenPlusLogo} alt="18+" className="w-8 h-8 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 mb-4 lg:mb-0">
              <p className="text-gray-400 text-sm">© 2025 TucanBIT. All rights reserved. Licensed in Curacao.</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">🛡</span>
                  <span className="text-sm text-gray-400">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">🏆</span>
                  <span className="text-sm text-gray-400">Provably Fair</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-500">🕐</span>
                  <span className="text-sm text-gray-400">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;