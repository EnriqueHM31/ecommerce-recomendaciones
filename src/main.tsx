import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './css/global.css'
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/700.css"; // Specify weight
import "@fontsource/ubuntu/400.css"; // Specify weight
import "@fontsource/ubuntu/700.css"; // Specify weight
import { ClerkProvider } from '@clerk/clerk-react'
import { esES } from '@clerk/localizations';
import { dark } from '@clerk/themes';
import { experimental__simple } from '@clerk/themes';
import { useThemeStore } from './store/themeStore.ts';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export function Root() {
  const { theme } = useThemeStore();

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} localization={esES} appearance={{ baseTheme: theme === 'dark' ? dark : experimental__simple }}>
      <App />
    </ClerkProvider>
  )

}
createRoot(document.getElementById('root')!).render(<Root />)
