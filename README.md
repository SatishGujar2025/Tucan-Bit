# Tucan Bit Frontend

A modern React-based gaming and casino platform built with TypeScript, Vite, and Tailwind CSS.

## 🏗️ Project Architecture

The project follows a well-organized, scalable architecture with clear separation of concerns:

```
src/
├── assets/                 # Static assets (images, icons, etc.)
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (Layout, Sidebar, etc.)
│   ├── ui/               # Generic UI components (buttons, cards, etc.)
│   ├── modals/           # Modal components (login, deposit, etc.)
│   ├── forms/            # Form components
│   └── games/            # Game-specific components
├── pages/                # Page components organized by feature
│   ├── games/           # Game-related pages
│   ├── casino/          # Casino pages
│   ├── sports/          # Sports betting pages
│   ├── wallet/          # Wallet and payment pages
│   ├── community/       # Community features
│   ├── support/         # Support and help pages
│   └── legal/           # Legal and policy pages
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── services/            # API services and external integrations
├── types/               # TypeScript type definitions
├── constants/           # Application constants
└── styles/              # Global styles and CSS
```

## 📁 Directory Structure

### `/src/components/`
Reusable UI components organized by purpose:

- **`layout/`** - Layout components like `Layout`, `Sidebar`, `SportsSidebar`
- **`ui/`** - Generic UI components like `GameCard`, `SearchBar`, `PromotionalBanner`
- **`modals/`** - Modal components for authentication, payments, etc.
- **`forms/`** - Form components and form-related utilities
- **`games/`** - Game-specific components like `Blackjack`, `Roulette`, `SlotMachine`

### `/src/pages/`
Page components organized by feature domain:

- **`games/`** - Game pages: `GamesPage`, `SlotsPage`, `TableGamesPage`, etc.
- **`casino/`** - Casino-specific pages
- **`sports/`** - Sports betting pages
- **`wallet/`** - Wallet and payment pages: `DepositPage`, `WithdrawPage`, `WalletPage`
- **`community/`** - Community features
- **`support/`** - Support pages: `SupportPage`, `HelpCenter`, `ContactUs`, etc.
- **`legal/`** - Legal pages: `TermsOfService`, `PrivacyPolicy`, etc.

### `/src/context/`
React context providers for global state management.

### `/src/hooks/`
Custom React hooks for reusable logic.

### `/src/utils/`
Utility functions including:
- Currency and number formatting
- Email and password validation
- Local storage helpers
- Debounce and throttle functions

### `/src/types/`
TypeScript type definitions for:
- User interfaces
- Game data structures
- Transaction types
- API response types

### `/src/constants/`
Application constants including:
- Route definitions
- Navigation structure
- Translation keys

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📦 Key Features

- **Gaming Platform**: Casino games, sports betting, tournaments
- **Wallet System**: Deposit, withdrawal, and transaction management
- **User Management**: Authentication, profiles, and preferences
- **Community Features**: Social interactions and user engagement
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety and better developer experience
- **Modern Stack**: React 18, Vite, and latest web technologies

## 🎯 Best Practices

### Component Organization
- Use index files for clean imports
- Group related components in feature folders
- Keep components small and focused
- Use TypeScript interfaces for props

### File Naming
- Use PascalCase for components: `GameCard.tsx`
- Use camelCase for utilities: `formatCurrency.ts`
- Use kebab-case for CSS modules: `game-card.module.css`

### Import Structure
```typescript
// Use organized imports
import { Layout, GameCard } from '@/components';
import { HomePage, GamesPage } from '@/pages';
import { formatCurrency, storage } from '@/utils';
import { ROUTES } from '@/constants';
```

## 🔧 Configuration

The project uses:
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** for CSS processing

## 📝 Contributing

1. Follow the established folder structure
2. Use TypeScript for all new components
3. Add proper type definitions
4. Follow the naming conventions
5. Update this README for significant changes

## 🎮 Game Integration

Games are organized in the `/src/components/games/` directory with:
- Individual game components (`Blackjack`, `Roulette`, `SlotMachine`)
- Game lobby and management components
- Game-specific utilities and types

## 💰 Wallet & Payments

Payment functionality is centralized in `/src/pages/wallet/` with:
- Deposit and withdrawal pages
- Payment modal components
- Transaction management
- Wallet balance tracking

This architecture provides a scalable, maintainable foundation for the gaming platform with clear separation of concerns and easy navigation for developers. 