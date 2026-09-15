import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { NotificationProvider } from "./contexts/notification/NotificationProvider";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <Toaster position="top-right" richColors />
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>
);
