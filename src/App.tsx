import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CityList from "./components/City/CityList.tsx";
import City from "./components/City/CityDetails/City.tsx";
import CountryList from "./components/Country/CountryList.tsx";
import Form from "./components/Form/Form.tsx";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";
import { AuthProvider } from "./contexts/FakeAuthContext.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx.tsx";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/FullPageSpinner/SpinnerFullPage.tsx";

const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
