import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
  import { ClerkProvider } from '@clerk/clerk-react'
import { AdminProvider } from "./context/AdminContext.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
  publishableKey={PUBLISHABLE_KEY}
  signInFallbackRedirectUrl="/careers"
  signUpFallbackRedirectUrl="/careers"
  afterSignOutUrl="/careers"
  appearance={{
    baseTheme: "light",
    variables: {
      colorPrimary: "#FF7A00", // สีส้ม
      colorBackground: "#F0F7FF", // สีฟ้าอ่อน
    },
    
  }}
>
<AdminProvider>
        <App />
      </AdminProvider>
</ClerkProvider>

  </StrictMode>
);
