import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product.tsx";
import Pricing from "./pages/Pricing.tsx";
import HomePage from "./pages/HomePage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import Login from "./pages/Login.tsx";
import CityList from "./components/City/CityList.tsx";
import City from "./components/City/CityDetails/City.tsx";
import CountryList from "./components/Country/CountryList.tsx";
import Form from "./components/Form/Form.tsx";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";
import { AuthProvider } from "./contexts/FakeAuthContext.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx.tsx";

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
