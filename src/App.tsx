import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components';

// Import all page components from the organized structure
import {
  HomePage,
  CasinoPage,
  LiveCasinoPage,
  GameLobbyPage,
  SlotsPage,
  TableGamesPage,
  RoulettePage,
  BlackJacksPage,
  JackPotsPage,
  PromotionsPage,
  DepositPage,
  WithdrawPage,
  TournamentPage,
  EarnPage,
  TaskDashboardPage,
  TokenDashboardPage,
  SupportPage,
  CommunityPage,
  ProfilePage,
  LootboxPage,
  GamesPage,
  SportsPage,
  TermsOfService,
  PrivacyPolicy,
  CookiePolicy,
  Licensing,
  Security,
  HelpCenter,
  ContactUs,
  ResponsibleGaming,
  Fairness,
  LiveChatPage,
} from './pages';

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
            <Route path="live-casino" element={<LiveCasinoPage />} />
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
            <Route path="blackjack" element={<BlackJacksPage />} />
            <Route path="jackpots" element={<JackPotsPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="task-dashboard" element={<TaskDashboardPage />} />
            <Route path="token-dashboard" element={<TokenDashboardPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="live-chat" element={<LiveChatPage />} />
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