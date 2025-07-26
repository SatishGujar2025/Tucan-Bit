import React from 'react';
import SearchBar from './SearchBar';
import GameSection from './GameSection';
import { gameData } from './data/games';
import Header from './Header';

const MainContent = () => {
  return (
    <div className="flex-1 p-6  ml-20 pl-48 bg-gray-900">
      <Header />
      <SearchBar />
      
      <div className="space-y-8">
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
          title="Whale Specials" 
          games={gameData.whaleSpecials}
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
          games={gameData.whaleSpecials}
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

export default MainContent;