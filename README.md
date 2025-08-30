# DeFi Web Application

A modern, non-custodial DeFi web application built with Next.js 14, Material UI 3, and TypeScript. Features token trading, staking, farming, and portfolio analytics across multiple EVM chains.

## 🚀 Features

- **Token Trading**: Swap tokens with best rates and lowest fees
- **Single Asset Staking**: Earn rewards with competitive APY rates
- **LP Farming**: Provide liquidity and earn additional rewards
- **Portfolio Analytics**: Track investments and performance in real-time
- **Multi-Chain Support**: Ethereum, Polygon, BSC
- **Light/Dark Mode**: Beautiful theme switching
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material UI 3**: Latest design system with modern aesthetics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material UI 3
- **Language**: TypeScript
- **Styling**: Emotion (CSS-in-JS)
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/namithm70/web33.git
   cd web33
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your `web33` repository
   - Vercel will automatically detect Next.js settings

3. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Choose your team/account
   - Deploy!

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/namithm70/web33)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME=DeFi App
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── trade/page.tsx     # Trading interface
│   ├── stake/page.tsx     # Staking dashboard
│   ├── farm/page.tsx      # Farming interface
│   ├── portfolio/page.tsx # Portfolio analytics
│   └── ClientThemeProvider.tsx # Theme management
├── components/            # Reusable components
│   └── Header.tsx        # Navigation header
```

## 🎨 Customization

### Theme Configuration
Edit `src/app/ClientThemeProvider.tsx` to customize:
- Color schemes
- Typography
- Component styles
- Dark/light mode preferences

### Adding New Pages
1. Create new directory in `src/app/`
2. Add `page.tsx` file
3. Import and use the `Header` component
4. Add navigation link in `src/components/Header.tsx`

## 🔍 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🌐 Live Demo

Visit the deployed application: [Your Vercel URL]

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@defiapp.com or create an issue in the repository.

---

Built with ❤️ using Next.js and Material UI
