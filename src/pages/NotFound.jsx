import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import Button from "../components/common/Button.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#102A40]">
      <Navbar variant="solid" />
      <main className="mx-auto flex max-w-[1280px] flex-col items-start px-6 py-28 sm:px-10 lg:px-12">
        <span className="text-[11px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
          404 · PAGE NOT FOUND
        </span>
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#102A40] sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-[480px] text-base text-[#142B3D]/80">
          Return to the Davidson Well Drilling homepage or explore our water
          well, pump, hydrofracturing, and geothermal services.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button to="/">Back to Home</Button>
          <Button to="/services" variant="outline">
            Explore Services
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
