import React from 'react';


import SearchBar from '../../components/ui/SearchBar';
import GameSection from '../../components/ui/GameSection';
import { gameData } from '../../components/ui/data/games';
import Header from '../../components/ui/Header'; // This is the header specific to the casino page, not the main layout header

// The component is now much simpler. It doesn't need props for navigation.
const CasinoPage: React.FC = () => {
  // All state and wallet logic has been removed because the Layout component handles it.
  // The component now only needs to return the content for the casino page.

  return (
    // This div contains all the content unique to the casino page.
    // It will be placed inside the <main> tag of your Layout.
    <div className="page-content p-6 bg-gray-900">
      <Header />
      <SearchBar />
      
      <div className="mt-8 space-y-8">
        <GameSection 
          title="New Arrivals" 
          games={gameData.newArrivals}
          showViewAll={true}
        />
        
        <GameSection 
          title="Top 10" 
          games={gameData.topGames}
          showViewAll={false}
        />

         <GameSection 
                  title="TucanBit Specials"
        games={gameData.tucanbitSpecials}
          showViewAll={false}
        />

         <GameSection 
          title="Spin Wars" 
          games={gameData.spinWars}
          showViewAll={false}
        />

         <GameSection 
          title="Crypto Games" 
          games={gameData.topGames}
          showViewAll={false}
        />

         <GameSection 
          title="Live Casino" 
          games={gameData.newArrivals}
          showViewAll={false}
        />

         <GameSection 
          title="Buy Features" 
          games={gameData.spinWars}
          showViewAll={false}
        />

         <GameSection 
          title="Win Big" 
          games={gameData.topGames}
          showViewAll={false}
        />

        <GameSection 
          title="Bingo Games" 
          games={gameData.newArrivals}
          showViewAll={false}
        />

        <GameSection 
          title="Book Games" 
          games={gameData.newArrivals}
          showViewAll={true}
        />

        <GameSection 
          title="Cluster Games" 
          games={gameData.tucanbitSpecials}
          showViewAll={false}
        />

         <GameSection 
          title="Megaways" 
          games={gameData.topGames}
          showViewAll={false}
        />
      </div>
    </div>
  );
};

export default CasinoPage;