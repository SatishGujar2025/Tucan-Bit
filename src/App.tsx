import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './components/context/AppContext'; // Make sure this is imported
import Layout from './components/Layout';

// Import all your page components
import HomePage from './components/HomePage';
import CasinoPage from './components/Caino/CasinoPage';
import GameLobbyPage from './components/GameLobbyPage';
import SlotsPage from './components/SlotsPage';
import TableGamesPage from './components/TableGamesPage';
import RoulettePage from './components/RoulettePage';
import BlackjackPage from './components/BlackJacksPage';
import JackPotsPage from './components/JackPotsPage';
import PromotionsPage from './components/PromotionsPage';
import DepositPage from './components/DepositPage';
import WithdrawPage from './components/Withdrawpage';
import TournamentPage from './components/TournamentPage';
import EarnPage from './components/EarnPage';
import TaskDashboardPage from './components/TaskDashboardPage';
import TokenDashboardPage from './components/TokenDashboardPage';
import SupportPage from './components/SupportPage';
import CommunityPage from './components/CommunityPage';
import ProfilePage from './components/ProfilePage';
import LootboxPage from './components/LootboxPage';
import GamesPage from './components/GamesPage';
import SportsPage from './components/SportsPage';
import TermsOfService from './components/legal/TermsOfService';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import CookiePolicy from './components/legal/CookiePolicy';
import Licensing from './components/legal/Licensing';
import Security from './components/legal/Security';
import HelpCenter from './components/support/HelpCenter';
import ContactUs from './components/support/ContactUs';
import ResponsibleGaming from './components/support/ResponsibleGaming';
import Fairness from './components/support/Fairness';

function App() {
  return (
    // =================================================================
    // THE FIX IS HERE: <AppProvider> must wrap your entire router.
    // This makes the context available to all components, including Layout.
    // =================================================================
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* All your page routes go here as before */}
            <Route index element={<HomePage />} />
            <Route path="casino" element={<CasinoPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="sports" element={<SportsPage />} />
            <Route path="lootboxes" element={<LootboxPage />} />
            <Route path="promotions" element={<PromotionsPage />} />
            <Route path="tournaments" element={<TournamentPage />} />
            <Route path="earn" element={<EarnPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="lobby" element={<GameLobbyPage />} />
            <Route path="slots" element={<SlotsPage />} />
            <Route path="table-games" element={<TableGamesPage />} />
            <Route path="roulette" element={<RoulettePage />} />
            <Route path="blackjack" element={<BlackjackPage />} />
            <Route path="jackpots" element={<JackPotsPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="task-dashboard" element={<TaskDashboardPage />} />
            <Route path="token-dashboard" element={<TokenDashboardPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="responsible-gaming" element={<ResponsibleGaming />} />
            <Route path="fairness" element={<Fairness />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="cookies" element={<CookiePolicy />} />
            <Route path="licensing" element={<Licensing />} />
            <Route path="security" element={<Security />} />
            {/* <Route path="deposit" element={<DepositPage />} /> */}
            
            <Route path="*" element={<h1 className="p-8 text-white">404 - Page Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;