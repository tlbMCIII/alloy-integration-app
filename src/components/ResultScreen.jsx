export default function ResultScreen({ outcome, onReset }) {
    // Normalize outcome for mapping
    const normalized = outcome.toLowerCase();
  
    const messages = {
      approved: "Congratulations! Your application was approved.",
      "manual review": "Your application is under review.",
      deny: "Unfortunately, your application was not approved.",
      unknown: "Unexpected response."
    };
  
    // Map normalized outcome to correct key
    let key;
    if (normalized === "approved") key = "approved";
    else if (normalized === "manual review") key = "manual review";
    else if (normalized === "deny" || normalized === "denied") key = "deny";
    else key = "unknown";
  
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl mb-4">{messages[key]}</h2>
        <button
          onClick={onReset}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Submit Another
        </button>
      </div>
    );
  }
  