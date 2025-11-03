import { useState } from "react";
import ApplicationForm from "./components/ApplicationForm";
import ResultScreen from "./components/ResultScreen";
import logo from "./assets/logo.png";

const PRIMARY_COLOR = "#2c7be5"; // Modern blue

function App() {
  const [result, setResult] = useState(null);

  const handleResult = (res) => {
    const rawOutcome = res.summary?.outcome || "Unknown";

    let outcome;
    switch (rawOutcome) {
      case "Approved":
        outcome = "Approved";
        break;
      case "Manual Review":
        outcome = "Manual Review";
        break;
      case "Denied":
        outcome = "Deny";
        break;
      default:
        outcome = "Unknown";
    }

    setResult(outcome);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 sm:p-12">
      {/* Card Container */}
      <div className="w-full max-w-xl sm:max-w-2xl bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl transition duration-300">
        
        {/* HEADER */}
<div className="flex flex-col items-center mb-8 sm:mb-10">
  {/* Logo */}
  <div className="flex justify-center mb-4">
    <img 
      src={logo} 
      alt="Better Bank Loans Logo" 
      className="w-24 h-24 object-contain" 
      style={{ maxWidth: '96px', maxHeight: '96px' }}
    />
  </div>
  {/* Title */}
  <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center tracking-wide drop-shadow-md">
    Better Bank Loans
  </h1>
  {/* Tagline */}
  <p className="text-lg sm:text-xl font-light mt-2 text-[#2c7be5] text-center">
    Looking at the person, not just the paperwork.
  </p>
</div>

        
        {/* Divider */}
        <hr className="my-12 border-gray-200" />

        {/* Form / Result */}
        <div className="py-4">
          {!result ? (
            <ApplicationForm onResult={handleResult} />
          ) : (
            <ResultScreen outcome={result} onReset={() => setResult(null)} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-2xl text-gray-500 text-sm text-center mt-12">
        &copy; {new Date().getFullYear()} Better Bank | NMLS #123456 |{" "}
        <a href="#" className="text-[#2c7be5] hover:text-gray-700 transition">
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}

export default App;
