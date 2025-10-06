# Pesto - Aptos Remittance App

A blockchain remittance application built on the Aptos blockchain, designed for secure and compliant money transfers between friends and contacts.

## Features

### 🔐 Authentication
- Email/password login
- Google OAuth v2 integration
- Secure account management
- Biometric authentication support

### 💰 Aptos Integration
- Full Aptos TypeScript SDK integration
- Native APT token support
- Multi-token asset management
- Transaction history and tracking
- Gas estimation and optimization

### 👥 Friend System
- Aptos friend management
- Contact list integration
- Compliance-focused friend verification
- Transaction history with friends
- Secure money transfers to verified contacts only

### 🎨 Design System
- Comprehensive design tokens (colors, typography, spacing)
- Reusable component library
- Consistent UI/UX across all screens
- Responsive design for mobile devices

### 🧭 Navigation
- React Navigation v6
- Stack and tab navigators
- Deep linking support
- Smooth screen transitions

### 📱 UI Components
- Modals and bottom sheets
- Loading overlays
- Form inputs and validation
- Interactive lists and cards
- Custom buttons and avatars

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Button, Avatar, Logo)
│   ├── inputs/          # Form input components
│   ├── cards/           # Card components
│   ├── lists/           # List item components
│   └── overlays/        # Modal, BottomSheet, Overlay components
├── screens/             # Screen components
│   ├── auth/            # Authentication screens
│   ├── main/            # Main app screens
│   └── profile/         # Profile and settings screens
├── navigation/          # Navigation configuration
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication hook
│   ├── useAptos.tsx     # Aptos blockchain hook
│   └── useContacts.tsx  # Contacts and friends hook
├── services/            # External service integrations
│   └── aptos/           # Aptos blockchain service
├── constants/           # Design tokens and constants
├── types/               # TypeScript type definitions
└── config/              # App configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pesto/mobile-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file with your configuration
GOOGLE_WEB_CLIENT_ID=your_google_client_id
GOOGLE_IOS_CLIENT_ID=your_google_ios_client_id
APTOS_NETWORK=testnet
```

4. Start the development server:
```bash
npm start
```

### Configuration

Update the configuration in `src/config/app.ts`:

- Set your Google OAuth client IDs
- Configure Aptos network (testnet/mainnet)
- Set API endpoints
- Enable/disable features as needed

## Key Features Implementation

### Aptos Friend System

The app implements a compliance-focused friend system where users can only send money to verified friends or contacts with Aptos addresses. This helps with:

- **Compliance**: Easier KYC/AML compliance by maintaining verified contact lists
- **Security**: Reduced risk of sending to unknown addresses
- **User Experience**: Simplified money sending to known contacts

```typescript
// Example: Adding a friend
const { addFriend } = useContacts();

await addFriend({
  name: 'John Doe',
  username: '@johndoe',
  aptosAddress: '0x123...',
  isVerified: true,
});
```

### Design Tokens

The app uses a comprehensive design system with:

- **Colors**: Primary, secondary, status, and semantic colors
- **Typography**: Consistent font sizes, weights, and line heights
- **Spacing**: Standardized spacing system for consistent layouts
- **Components**: Reusable components with consistent styling

```typescript
// Example: Using design tokens
import { theme } from '../constants';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary.green,
    padding: theme.spacing.lg,
    borderRadius: theme.spacing.dimensions.button.borderRadius,
  },
  text: {
    ...theme.typography.textStyles.button,
    color: theme.colors.text.white,
  },
});
```

### Aptos Integration

Full integration with Aptos blockchain:

- Account generation and management
- Asset balance tracking
- Transaction creation and execution
- Gas estimation and optimization
- Multi-token support

```typescript
// Example: Sending money
const { sendMoney } = useAptos();

const transactionHash = await sendMoney(
  friend,
  100, // amount in APT
  'Payment for services'
);
```

## Compliance Features

The app is designed with compliance in mind:

1. **Friend Verification**: Only verified friends can receive money
2. **Transaction Limits**: Configurable daily and per-transaction limits
3. **Audit Trail**: Complete transaction history
4. **KYC Integration**: Ready for KYC/AML integration
5. **Regulatory Reporting**: Structured data for compliance reporting

## Development

### Adding New Components

1. Create component in appropriate folder under `src/components/`
2. Export from the folder's `index.ts`
3. Add TypeScript interfaces in `src/types/index.ts`
4. Use design tokens from `src/constants/`

### Adding New Screens

1. Create screen component in appropriate folder under `src/screens/`
2. Add to navigation configuration in `src/navigation/`
3. Update type definitions in `src/types/index.ts`

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Deployment

### iOS

1. Configure iOS-specific settings in `app.json`
2. Build for iOS:
```bash
expo build:ios
```

### Android

1. Configure Android-specific settings in `app.json`
2. Build for Android:
```bash
expo build:android
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.

