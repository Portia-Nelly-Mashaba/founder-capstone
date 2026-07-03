import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";
import { BookingPage } from "./pages/BookingPage.tsx";
import { BrowsePage } from "./pages/BrowsePage.tsx";
import { ItemDetailPage } from "./pages/ItemDetailPage.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<BrowsePage />} />
          <Route path="items/:id" element={<ItemDetailPage />} />
          <Route path="book/:id" element={<BookingPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
