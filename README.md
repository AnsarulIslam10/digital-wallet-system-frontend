# SecurePay - Digital Wallet System Frontend

A modern, responsive digital wallet application built with React, TypeScript, and Tailwind CSS that allows users to send, receive, and manage money securely.

## 🌟 Project Overview

SecurePay is a comprehensive digital wallet solution with role-based access for three user types:

- **Users**: Can send/receive money, add/withdraw funds, and view transaction history
- **Agents**: Can perform cash-in/cash-out operations and earn commissions
- **Admins**: Can manage users, agents, and monitor all transactions

The application features a clean, modern UI with dark/light mode support, responsive design, and intuitive navigation.

## 🚀 Testing Credentials

## Admin: </br>
Phone: `01711111111` </br>
Pass: `123456`
## Agent: </br>
Phone: `01799999999` </br>
Pass: `123456`


# 🚀 Live Demo
## [Live Link ](https://digital-wallet-system-frontend-mu.vercel.app/)

## 🛠 Technology Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v7
- **Form Handling**: React Hook Form + Zod validation
- **Authentication**: JWT tokens
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Radix UI + custom shadcn components
- **Deployment**: Vercel (configured)

## 📋 Features

### Core Functionality
- User registration and authentication
- Role-based dashboard access (User, Agent, Admin)
- Money transfer between users
- Cash-in/Cash-out operations
- Transaction history
- Wallet balance management

### User Experience
- Responsive design for all devices
- Dark/Light mode toggle
- Interactive sidebar navigation
- Form validation with helpful error messages
- Loading states and skeletons
- Toast notifications

### Admin Features
- User management (block/unblock)
- Agent approval system
- Transaction monitoring
- Analytics and charts

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ansarulislam10/digital-wallet-system-frontend.git
   cd digital-wallet-system-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=your_backend_api_url
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```


## 🔐 Authentication Flow

1. Users register with phone number and choose role (User/Agent)
2. Agents require admin approval before full access
3. JWT tokens stored in localStorage for persistent sessions
4. Automatic token refresh and protected route handling

## 🎨 Theming

The application supports both light and dark themes with:
- System preference detection
- Manual theme selection
- Persistent theme preference
- Custom color scheme using CSS variables

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on small screens
- Responsive tables and forms
- Touch-friendly interactions


## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS
- [Vite](https://vitejs.dev) for fast build tooling
- [React](https://reactjs.org) for the UI framework

---