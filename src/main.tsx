import * as Sentry from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ModalProvider } from "./contexts/modal.context.tsx";
import "./index.css";
import QueryProvider from "./providers/query.provider.tsx";
import router from "./routes/router.tsx";

Sentry.init({
  dsn: "https://5d2cde8f94fe1e612c97f2b12a8cbd4f@o4507895820517376.ingest.us.sentry.io/4507895824777216",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </QueryProvider>
  </StrictMode>
);
