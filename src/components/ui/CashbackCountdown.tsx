import React, { useState, useEffect } from 'react';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CashbackCountdownProps {
  backgroundImage: string;
}

const CashbackCountdown: React.FC<CashbackCountdownProps> = ({ backgroundImage }) => {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 10,
    minutes: 59,
    seconds: 55
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                days = 0;
                hours = 23;
                minutes = 59;
                seconds = 59;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-2 relative border-y border-yellow-500/20">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="relative h-80 w-full">
          {/* Background Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={backgroundImage} 
              alt="Zeus with Lightning" 
              className="h-full object-contain opacity-60"
            />
          </div>
          
          {/* Animated Border Lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

          <div className="relative countdown-timer-section h-full flex items-center">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full px-8 lg:px-16 lg:pr-8">
              {/* Left Side - Text Content */}
              <div className="lg:w-1/2 text-left mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                  DON'T MISS YOUR<br />DAILY CASHBACK
                </h2>
                <p className="text-xl text-white mb-2 drop-shadow-md">
                  Up to 20% Back. No BS. #SometimesLoseAlwaysWin
                </p>
              </div>
              
              {/* Right Side - Timer */}
              <div className="lg:w-auto text-center lg:pr-0 lg:mr-0 lg:-mr-4">
                <div className="bg-amber-500 text-black px-4 py-2 rounded mb-4 inline-block">
                  <p className="text-lg font-bold">YOUR NEXT CASHBACK DROPS IN</p>
                </div>
                <div className="flex justify-center items-center space-x-2 overflow-hidden">
                  <div className="text-center">
                    <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                      <div className="text-lg font-bold text-white leading-tight">
                        {countdown.days.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-300 leading-tight">Days</div>
                    </div>
                  </div>
                  <div className="text-lg text-white font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                      <div className="text-lg font-bold text-white leading-tight">
                        {countdown.hours.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-300 leading-tight">Hrs</div>
                    </div>
                  </div>
                  <div className="text-lg text-white font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                      <div className="text-lg font-bold text-white leading-tight">
                        {countdown.minutes.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-300 leading-tight">Min</div>
                    </div>
                  </div>
                  <div className="text-lg text-white font-bold">:</div>
                  <div className="text-center">
                    <div className="bg-gray-800 rounded-lg p-2 border border-yellow-500/30 min-w-[40px] max-w-[50px] overflow-hidden">
                      <div className="text-lg font-bold text-white leading-tight">
                        {countdown.seconds.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-300 leading-tight">Sec</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashbackCountdown;