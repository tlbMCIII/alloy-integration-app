import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server running."));

app.post("/submit", async (req, res) => {
    const data = req.body;
  
    // Required base fields (from Alloy parameters)
    const required = [
      "email_address",
      "address_line_1",
      "address_country_code",
      "phone_number",
      "name_first",
      "name_last"
    ];
  
    const missing = required.filter(f => !data[f]);
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
    }
  
    if (data.address_country_code !== "US") {
      return res.status(400).json({ error: "address_country_code must be 'US'" });
    }
  
    if (data.document_ssn && !/^\d{9}$/.test(data.document_ssn)) {
      return res.status(400).json({ error: "document_ssn must be 9 digits if provided" });
    }
  
    if (data.birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(data.birth_date)) {
      return res.status(400).json({ error: "birth_date must be YYYY-MM-DD if provided" });
    }
  
    const authHeader = "Basic " + Buffer
      .from(`${process.env.WORKFLOW_TOKEN}:${process.env.WORKFLOW_SECRET}`)
      .toString("base64");
  
    try {
      const resp = await fetch("https://sandbox.alloy.co/v1/evaluations/", {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const json = await resp.json();
      if (!resp.ok) {
        console.error("Alloy API error:", json);
        return res.status(resp.status).json({ error: json });
      }
  
      return res.status(200).json(json);
    } catch (err) {
      console.error("Server error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
