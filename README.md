# Good Company

A social platform focused on building trust and verifying authentic connections between people through endorsements and identity verification.

## 🎯 App Overview

Good Company is a unique social platform designed to help people establish and verify their reputation through authentic endorsements from real connections. The platform emphasizes trust, safety, and genuine relationships by implementing identity verification and a comprehensive endorsement system.

### Core Purpose
- **Trust Building**: Enable users to build verifiable reputations through endorsements
- **Identity Verification**: Implement robust verification through government ID and biometric checks
- **Safe Connections**: Create a safer environment for meeting new people through verified identities
- **Relationship Tracking**: Document and validate real-world relationships and connections

## ✨ Key Features

### 🔍 User Discovery & Search
- **Advanced Search**: Find people by name, location, interests, and verification status
- **Profile Discovery**: Browse verified user profiles with endorsement history
- **Safety Filters**: Filter results by verification level and safety ratings

### 👤 Profile Management
- **Comprehensive Profiles**: Detailed user profiles with photos, bio, and verification badges
- **Social Media Integration**: Link and verify social media accounts
- **Good Company Score**: Dynamic reputation scoring based on endorsements and verification
- **Privacy Controls**: Granular privacy settings for profile visibility

### 🤝 Endorsement System
- **Relationship Endorsements**: Get endorsed by friends, colleagues, family, and romantic partners
- **Relationship Categories**: Different endorsement types (friend, colleague, family, romantic)
- **Duration Tracking**: Record how long relationships have lasted
- **Mutual Verification**: Both parties can confirm relationship details

### 🛡️ Identity Verification
- **Government ID Verification**: Upload and verify driver's license or state ID
- **Biometric Verification**: Selfie capture for facial recognition matching
- **Multi-Step Process**: Comprehensive verification workflow for maximum security
- **Verification Badges**: Visual indicators of verification status

### 🔐 Safety & Security
- **Safety Center**: Comprehensive safety guidelines and reporting tools
- **Verification Requirements**: Multiple verification levels for different features
- **Report System**: Community-driven reporting for inappropriate behavior
- **Privacy Protection**: Advanced privacy controls and data protection

### 💎 Subscription Tiers
- **Free Tier**: Basic profile and limited endorsements
- **Premium Tiers**: Enhanced features, unlimited endorsements, advanced search
- **Verification Access**: Premium features for verified users

## 🛠️ Technical Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Routing**: React Router v6
- **State Management**: React Query for server state
- **Build Tool**: Vite
- **Backend**: Supabase (Database, Auth, Storage, Edge Functions)

### Project Structure
```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── shared/               # Shared components (Header, etc.)
│   ├── profile/              # Profile-related components
│   └── verification/         # Identity verification components
├── pages/                    # Route components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
└── assets/                   # Static assets
```

### Design System
- **CSS Variables**: Comprehensive theming with light/dark mode support
- **Semantic Tokens**: Color, spacing, and typography tokens
- **Component Variants**: Extensible component variant system
- **Responsive Design**: Mobile-first responsive approach

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index` | Landing page with search and sign-up |
| `/search` | `Search` | User search with filters and results |
| `/profile/:id` | `Profile` | View other user profiles |
| `/my-profile` | `MyProfile` | Current user's profile management |
| `/settings` | `Settings` | Account and privacy settings |
| `/safety` | `Safety` | Safety center and guidelines |
| `/verification` | `Verification` | Identity verification process |
| `/subscription` | `Subscription` | Subscription management |
| `/*` | `NotFound` | 404 error page |

## 🧩 Component Library

### UI Components (shadcn/ui)
- **Forms**: Input, textarea, select, checkbox, radio groups
- **Navigation**: Buttons, links, breadcrumbs, pagination
- **Feedback**: Alerts, toasts, progress indicators
- **Overlays**: Modals, dialogs, popovers, tooltips
- **Data Display**: Cards, tables, badges, avatars
- **Layout**: Sheets, separators, scroll areas

### Custom Components
- **Header**: Navigation with search and user controls
- **SocialMediaLinks**: Social media profile management
- **AddSocialMediaModal**: Modal for adding social media links
- **DLUpload**: Driver's license upload component
- **SelfieCapture**: Selfie capture for verification

## 🚧 Current Status

### ✅ Implemented (Frontend)
- Complete UI/UX design system
- All page layouts and navigation
- Component library with variants
- Responsive design for all screen sizes
- Mock data and placeholder functionality
- Search interface and filters
- Profile display and management UI
- Identity verification workflow UI
- Social media integration UI

### ❌ Needs Backend Integration
- **Authentication**: User registration, login, session management
- **Database**: User profiles, endorsements, verifications
- **File Storage**: Profile photos, ID uploads, selfies
- **API Endpoints**: All CRUD operations
- **Payment Processing**: Subscription management
- **Email Services**: Verification, notifications
- **Identity Verification**: ID validation, facial recognition
- **Search Engine**: Real-time user search functionality

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git for version control

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd good-company

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```env
# Supabase Configuration (when backend is integrated)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration (for payments)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## 🔮 Future Development

### Phase 1: Core Backend (Priority)
- [ ] Supabase authentication integration
- [ ] Database schema implementation
- [ ] User profile CRUD operations
- [ ] File upload and storage
- [ ] Basic API endpoints

### Phase 2: Core Features
- [ ] Endorsement system implementation
- [ ] Real-time search functionality
- [ ] Identity verification processing
- [ ] Social media link verification
- [ ] Email notification system

### Phase 3: Advanced Features
- [ ] Payment integration (Stripe)
- [ ] Advanced search algorithms
- [ ] AI-powered safety features
- [ ] Mobile app development
- [ ] API rate limiting and security

### Phase 4: Scale & Optimize
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] Machine learning for trust scoring
- [ ] Enterprise features
- [ ] International expansion

## 🔌 API Integration Notes

### Required Supabase Setup
```sql
-- Core tables needed:
- profiles (user data)
- endorsements (relationship data)
- social_media_links (social profiles)
- verifications (ID verification)
- subscriptions (payment data)
```

### Third-Party Integrations
- **Stripe**: Payment processing and subscription management
- **ID Verification Service**: Government ID validation
- **Facial Recognition**: Biometric verification
- **Email Service**: Transactional emails and notifications

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For development questions or issues, please contact the development team.

---

**Note**: This application is currently in development. The frontend UI is complete, but backend integration with Supabase is required for full functionality.