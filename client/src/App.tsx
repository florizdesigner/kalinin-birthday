import { BrowserRouter, Routes, Route } from "react-router-dom";
import Certificate from "./pages/Certificate";
import Form from "./pages/Form";
import MainPage from "./pages/MainPage";
import OrderFinishPage from "./pages/OrderFinishPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/form" element={<Form />} />
        <Route path="/success" element={<OrderFinishPage />} />
      </Routes>
    </BrowserRouter>
  );
}
