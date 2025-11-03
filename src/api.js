export async function submitApplication(payload) {
    const res = await fetch("https://alloy-integration-app.onrender.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Submission failed");
    }
  
    return res.json();
  }
  