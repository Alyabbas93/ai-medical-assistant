# MedVoice - AI Medical Voice Scheduler

A premium, production-ready SaaS frontend for managing AI-powered medical voice calls. Built with Next.js, Framer Motion, and Tailwind CSS.

## Features

✨ **Premium SaaS UI**
- Modern glassmorphism design with gradient accents
- Dark/Light theme toggle with persistent storage
- Smooth, sophisticated animations throughout
- Fully responsive design

📊 **Dashboard**
- Real-time stat cards with animated counters
- Recent calls activity feed
- Quick action buttons
- Weekly activity analytics

👥 **Patients Management**
- Add, view, and manage patient records
- Search and filter functionality
- Phone number validation
- Start calls directly from the table
- Delete patient records

📞 **Call Management**
- Complete call history with timeline view
- Call details with AI conversation transcripts
- Call duration tracking
- Download/copy transcript functionality
- Call status monitoring

🎨 **Design System**
- Indigo/Purple/Cyan gradient primary theme
- Soft dark background with dynamic gradients
- Consistent spacing and typography
- Reusable animated components
- Micro-interactions on every element

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Backend API running on `http://localhost:5000/api`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
app/
├── page.js                    # Dashboard
├── layout.tsx                 # Root layout
├── layout-client.js           # Client wrapper with providers
├── globals.css                # Global styles & animations
├── context/
│   └── AppContext.js          # Global state management
├── services/
│   └── api.js                 # API client configuration
├── patients/
│   └── page.js                # Patients management page
├── calls/
│   ├── page.js                # Calls history
│   └── [id]/
│       └── page.js            # Call details with transcript

components/
├── layout/
│   ├── Header.js              # Sticky header with logo
│   └── Sidebar.js             # Navigation sidebar
├── dashboard/
│   └── StatCard.js            # Animated stat cards
├── patients/
│   ├── PatientForm.js         # Add patient modal
│   └── PatientTable.js        # Patient data table
├── AnimatedButton.js          # Reusable animated button
├── AnimatedCard.js            # Reusable animated card
├── Loader.js                  # Animated loader
├── Snackbar.js                # Toast notifications
├── ThemeToggle.js             # Dark/Light mode toggle
└── EmptyState.js              # Empty state component
```

## API Integration

The app is configured to connect to a backend API at `http://localhost:5000/api`. Available endpoints:

### Patients
- `GET /patients` - List all patients
- `POST /patients` - Create new patient
- `GET /patients/:id` - Get patient details
- `PUT /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient

### Calls
- `GET /calls` - List all calls
- `GET /calls/:id` - Get call details
- `POST /calls` - Create new call
- `POST /calls/start` - Start a call
- `POST /calls/:id/end` - End a call

## Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette. Primary colors include:
- Indigo: Primary brand color
- Purple: Secondary/accent
- Cyan: Additional accent

### Animations
All animations are in `app/globals.css` using CSS keyframes. Adjust `@keyframes` sections to customize animation behavior.

### Component Props
All components accept standard props plus animation-specific options:
- `AnimatedCard`: `delay`, `glowColor`
- `AnimatedButton`: `variant`, `size`, `isLoading`
- `StatCard`: `icon`, `label`, `value`, `trend`, `glowColor`

## Building for Production

```bash
npm run build
npm start
```

The app will be optimized and ready for deployment to Vercel or any Next.js hosting platform.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Optimizations

- Server-side rendering with Next.js
- Component memoization
- Lazy loading of routes
- Optimized animations with Framer Motion
- Image optimization

## Troubleshooting

**Theme not persisting?**
- Check browser localStorage is enabled
- Clear browser cache and reload

**API connection errors?**
- Verify backend is running on `http://localhost:5000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Open browser dev console for detailed errors

**Animations stuttering?**
- Check GPU acceleration is enabled
- Reduce motion in OS settings may be interfering
- Try in a different browser

## License

MIT - Feel free to use this project as a template for your own SaaS applications.

## Support

For issues or questions, please refer to the documentation or contact the development team.

---

Built with ❤️ as a premium SaaS template
