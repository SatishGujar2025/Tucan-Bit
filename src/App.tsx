import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CasinoPage from './pages/casino/CasinoPage';
import LiveCasinoPage from './pages/casino/LiveCasinoPage';
import TournamentPage from './pages/TournamentPage';
import TribesPage from './pages/TribesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AchievementsPage from './pages/AchievementsPage';
import EarnPage from './pages/EarnPage';
import TokenDashboardPage from './pages/TokenDashboardPage';
import TaskDashboardPage from './pages/TaskDashboardPage';
import GameLobbyPage from './pages/GameLobbyPage';
import SlotsPage from './pages/games/SlotsPage';
import BlackJacksPage from './pages/games/BlackJacksPage';
import JackPotsPage from './pages/games/JackPotsPage';
import RoulettePage from './pages/games/RoulettePage';
import TableGamesPage from './pages/games/TableGamesPage';
import SupportPage from './pages/support/SupportPage';
import CommunityPage from './pages/community/CommunityPage';
import PromotionsPage from './pages/PromotionsPage';
import HotSummerPage from './pages/promotions/HotSummerPage';
import WeekendSpecialPage from './pages/promotions/WeekendSpecialPage';
import VIPTournamentPage from './pages/tournaments/VIPTournamentPage';
import DepositPage from './pages/wallet/DepositPage';
import WithdrawPage from './pages/wallet/Withdrawpage';
import ProfilePage from './pages/ProfilePage';
import LootboxPage from './pages/LootboxPage';
import NewsPage from './pages/NewsPage';
import VIPClubPage from './pages/VIPClubPage';
import RegisterPage from './pages/RegisterPage';
import SportsPage from './pages/sports/SportsPage';
import ContactUs from './pages/support/ContactUs';
import Fairness from './pages/support/Fairness';
import HelpCenter from './pages/support/HelpCenter';
import LiveChatPage from './pages/support/LiveChatPage';
import ResponsibleGaming from './pages/support/ResponsibleGaming';
import CookiePolicy from './pages/legal/CookiePolicy';
import Licensing from './pages/legal/Licensing';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Security from './pages/legal/Security';
import TermsOfService from './pages/legal/TermsOfService';
import {
  NotFoundPage,
  GameDetailPage,
} from './pages';
import PromotionalModal from './components/modals/PromotionalModal';

// Wrapper components to provide onBack function
const SportsPageWrapper = () => {
  const navigate = useNavigate();
  return <SportsPage onBack={() => navigate(-1)} />;
};

const ContactUsWrapper = () => {
  const navigate = useNavigate();
  return <ContactUs onBack={() => navigate(-1)} />;
};

const FairnessWrapper = () => {
  const navigate = useNavigate();
  return <Fairness onBack={() => navigate(-1)} />;
};

const HelpCenterWrapper = () => {
  const navigate = useNavigate();
  return <HelpCenter onBack={() => navigate(-1)} />;
};

const ResponsibleGamingWrapper = () => {
  const navigate = useNavigate();
  return <ResponsibleGaming onBack={() => navigate(-1)} />;
};

const CookiePolicyWrapper = () => {
  const navigate = useNavigate();
  return <CookiePolicy onBack={() => navigate(-1)} />;
};

const LicensingWrapper = () => {
  const navigate = useNavigate();
  return <Licensing onBack={() => navigate(-1)} />;
};

const PrivacyPolicyWrapper = () => {
  const navigate = useNavigate();
  return <PrivacyPolicy onBack={() => navigate(-1)} />;
};

const SecurityWrapper = () => {
  const navigate = useNavigate();
  return <Security onBack={() => navigate(-1)} />;
};

const TermsOfServiceWrapper = () => {
  const navigate = useNavigate();
  return <TermsOfService onBack={() => navigate(-1)} />;
};

function AppContent() {
  const { showPromoModal, setShowPromoModal, currentAdType } = useAppContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="casino" element={<CasinoPage />} />
            <Route path="live-casino" element={<LiveCasinoPage />} />
            <Route path="tournaments" element={<TournamentPage />} />
            <Route path="tribes" element={<TribesPage />} />
            <Route path="leaderboards" element={<LeaderboardPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="earn" element={<EarnPage />} />
            <Route path="token-dashboard" element={<TokenDashboardPage />} />
            <Route path="task-dashboard" element={<TaskDashboardPage />} />
            <Route path="game-lobby" element={<GameLobbyPage />} />
            <Route path="slots" element={<SlotsPage />} />
            <Route path="blackjacks" element={<BlackJacksPage />} />
            <Route path="jackpots" element={<JackPotsPage />} />
            <Route path="roulette" element={<RoulettePage />} />
            <Route path="table-games" element={<TableGamesPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="promotions" element={<PromotionsPage />} />
            <Route path="promotions/hot-summer" element={<HotSummerPage />} />
            <Route path="promotions/weekend-special" element={<WeekendSpecialPage />} />
            <Route path="tournaments/vip" element={<VIPTournamentPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="lootboxes" element={<LootboxPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="vip-club" element={<VIPClubPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="sports" element={<SportsPageWrapper />} />
            <Route path="contact" element={<ContactUsWrapper />} />
            <Route path="fairness" element={<FairnessWrapper />} />
            <Route path="help" element={<HelpCenterWrapper />} />
            <Route path="live-chat" element={<LiveChatPage />} />
            <Route path="responsible-gaming" element={<ResponsibleGamingWrapper />} />
            <Route path="cookie-policy" element={<CookiePolicyWrapper />} />
            <Route path="licensing" element={<LicensingWrapper />} />
            <Route path="privacy-policy" element={<PrivacyPolicyWrapper />} />
            <Route path="security" element={<SecurityWrapper />} />
            <Route path="terms-of-service" element={<TermsOfServiceWrapper />} />
            <Route path="game/:gameId" element={<GameDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Global Promotional Modal */}
      <PromotionalModal 
        isOpen={showPromoModal} 
        onClose={() => setShowPromoModal(false)}
        adType={currentAdType}
      />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;