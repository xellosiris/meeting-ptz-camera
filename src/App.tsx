import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { CameraProvider } from "./context/useCamera";
import { ScheduleProvider } from "./context/useSchedule";
import "./index.css";
import { Connect } from "./pages/Connect";
import { Layout } from "./pages/Layout";
import { Panel } from "./pages/Panel";
import { Speakers } from "./pages/Speakers";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CameraProvider>
        <ScheduleProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Panel />} />
                <Route path="panel" element={<Panel />} />
                <Route path="connect" element={<Connect />} />
                <Route path="speakers" element={<Speakers />} />
              </Route>
            </Routes>
          </HashRouter>
        </ScheduleProvider>
        <Toaster />
      </CameraProvider>
    </QueryClientProvider>
  );
}
