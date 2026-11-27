import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransition from "./components/common/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import OurWork from "./pages/OurWork.jsx";
import FAQs from "./pages/FAQs.jsx";
import RequestEstimate from "./pages/RequestEstimate.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/request-estimate" element={<RequestEstimate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
}
