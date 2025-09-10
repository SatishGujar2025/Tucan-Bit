# Intercom Chat Widget Integration for TucanBIT

This guide provides a complete implementation of Intercom chat widget for your React gambling site with focus on security, user identification, and gambling-specific features.

## 🚀 Quick Start

### 1. Replace App ID
In `src/services/intercomService.ts`, replace `'YOUR_APP_ID'` with your actual Intercom App ID.

### 2. Add Intercom Script
The Intercom script is already added to `index.html`. Make sure to replace `YOUR_APP_ID` in the script URL.

### 3. Use the Chat Widget
The chat widget is automatically included in your Layout component and will appear in the bottom-right corner.

## 📁 File Structure

```
src/
├── services/
│   └── intercomService.ts          # Core Intercom service
├── hooks/
│   └── useIntercom.ts              # React hook for Intercom
├── context/
│   └── IntercomContext.tsx         # React context provider
├── components/ui/
│   └── IntercomChatWidget.tsx      # Custom chat widget component
├── types/
│   └── intercom.d.ts               # TypeScript declarations
└── examples/
    └── IntercomUsageExamples.tsx   # Usage examples
```

## 🔧 Configuration

### Environment Variables
```bash
# Add to your .env file
REACT_APP_INTERCOM_APP_ID=your_app_id_here
REACT_APP_INTERCOM_SECRET_KEY=your_secret_key_here
```

### App.tsx Integration
```tsx
import { IntercomProvider } from './context/IntercomContext';

function App() {
  return (
    <AppProvider>
      <IntercomProvider>
        <AppContent />
      </IntercomProvider>
    </AppProvider>
  );
}
```

## 👤 User Identification

### Basic User Boot
```tsx
import { useIntercomContext } from '../context/IntercomContext';

const { boot } = useIntercomContext();

const handleLogin = async (userData) => {
  await boot({
    user_id: userData.id,
    email: userData.email,
    name: userData.name,
    created_at: Math.floor(new Date(userData.createdAt).getTime() / 1000),
    current_balance: userData.balance,
    vip_level: userData.vipLevel,
    account_status: userData.status,
    verification_status: userData.verificationStatus,
    country: userData.country,
    language: userData.language
  });
};
```

### Custom Attributes for Gambling Sites
- `current_balance`: User's current account balance
- `vip_level`: VIP tier (Bronze, Silver, Gold, Platinum)
- `last_deposit_date`: Unix timestamp of last deposit
- `total_wagered`: Total amount wagered by user
- `number_of_games_played`: Count of games played
- `account_status`: Account status (active, suspended, etc.)
- `verification_status`: KYC verification status
- `preferred_payment_method`: User's preferred payment method
- `country`: User's country
- `language`: User's preferred language

## 🔒 Secure Mode Implementation

### Backend (Node.js/Express)
```javascript
const crypto = require('crypto');

function generateIntercomHash(user_id) {
  return crypto
    .createHmac('sha256', INTERCOM_SECRET_KEY)
    .update(user_id)
    .digest('hex');
}

function generateSecureModeData(user) {
  const user_id = user.id.toString();
  const hmac = generateIntercomHash(user_id);
  
  return { user_id, hmac };
}
```

### Frontend Usage
```tsx
const handleSecureLogin = async (userData) => {
  // Get secure mode data from backend
  const response = await fetch('/api/intercom/secure-mode', {
    method: 'POST',
    body: JSON.stringify({ userId: userData.id })
  });
  
  const { data: secureModeData } = await response.json();

  // Boot Intercom with secure mode
  await boot(userData, secureModeData);
};
```

## 📊 Event Tracking

### Gambling-Specific Events
```tsx
const { 
  trackDeposit, 
  trackWithdrawal, 
  trackGamePlayed, 
  trackBonusClaimed 
} = useIntercomContext();

// Track deposit
await trackDeposit(100, 'USD', 'credit_card');

// Track withdrawal
await trackWithdrawal(50, 'USD', 'pending');

// Track game played
await trackGamePlayed('Sweet Bonanza', 10, 25, true); // Win

// Track bonus claimed
await trackBonusClaimed('welcome_bonus', 100, 'USD');
```

### Custom Events
```tsx
const { trackEvent } = useIntercomContext();

await trackEvent('tournament_joined', {
  tournament_name: 'Weekly Championship',
  entry_fee: 25,
  prize_pool: 10000,
  participants: 150
});
```

## 🔄 User Data Updates

### Update User Without Re-booting
```tsx
const { updateUser } = useIntercomContext();

// Update balance
await updateUser({
  current_balance: 1500,
  last_deposit_date: Math.floor(Date.now() / 1000)
});

// Update VIP level
await updateUser({
  vip_level: 'Platinum',
  total_wagered: 50000
});
```

## 🎮 Chat Widget Customization

### Position and Theme
```tsx
<IntercomChatWidget 
  position="bottom-right"  // bottom-right, bottom-left, top-right, top-left
  theme="dark"             // dark, light
  className="custom-class"
/>
```

### Custom Styling
The widget uses Tailwind CSS classes and can be customized by modifying the component or passing custom classes.

## 🚪 Logout and Cleanup

### Proper Shutdown
```tsx
const { shutdown } = useIntercomContext();

const handleLogout = async () => {
  try {
    // Shutdown Intercom
    await shutdown();
    
    // Additional cleanup
    // Clear user data, redirect, etc.
  } catch (error) {
    console.error('Failed to shutdown Intercom:', error);
  }
};
```

## 🛡️ Security Best Practices

### 1. Secure Mode
- Always implement secure mode for production gambling sites
- Use HMAC-SHA256 for user verification
- Keep your secret key secure and never expose it in frontend code

### 2. User Data Validation
- Validate all user data before sending to Intercom
- Sanitize sensitive information
- Implement proper authentication checks

### 3. Rate Limiting
- Implement rate limiting on your backend endpoints
- Monitor for unusual activity patterns

## 📱 Mobile Responsiveness

The chat widget is fully responsive and works on all device sizes. The widget automatically adjusts its position and size based on screen dimensions.

## 🔍 Troubleshooting

### Common Issues

1. **Intercom not loading**
   - Check your App ID in the script URL
   - Verify the script is loading in browser console
   - Check for ad blockers

2. **User not identified**
   - Ensure `boot()` is called with valid user data
   - Check that user_id is unique and consistent
   - Verify secure mode implementation if using

3. **Events not tracking**
   - Check browser console for errors
   - Verify Intercom is initialized before tracking events
   - Check event name format and metadata structure

### Debug Mode
Enable debug logging by checking the browser console. All Intercom operations are logged with detailed information.

## 📈 Performance Considerations

### Lazy Loading
The Intercom script is loaded asynchronously to avoid blocking page rendering.

### Conditional Loading
Intercom only initializes when needed, reducing unnecessary resource usage.

### Error Handling
All Intercom operations include proper error handling to prevent crashes.

## 🔄 Integration with Existing Systems

### Authentication System
Integrate with your existing login/logout flow by calling `boot()` and `shutdown()` at appropriate times.

### User Management
Update Intercom user data whenever user information changes in your system.

### Analytics
Combine Intercom data with your existing analytics for comprehensive user insights.

## 📚 Additional Resources

- [Intercom Developer Documentation](https://developers.intercom.com/)
- [Intercom JavaScript API Reference](https://developers.intercom.com/installing-intercom/docs/javascript-api-reference)
- [Intercom Security Best Practices](https://developers.intercom.com/installing-intercom/docs/security)

## 🤝 Support

For issues with this integration:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify your Intercom App ID and configuration
4. Check Intercom's status page for service issues

For gambling-specific features or customizations, refer to the examples in `src/examples/IntercomUsageExamples.tsx`. 