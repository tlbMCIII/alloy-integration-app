import { useState } from "react";
import { submitApplication } from "../api";

const stateCodes = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL",
  "IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT",
  "NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI",
  "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

export default function ApplicationForm({ onResult }) {
  const [form, setForm] = useState({
    name_first: "",
    name_last: "",
    email_address: "",
    phone_number: "",
    address_line_1: "",
    address_city: "",
    address_state: "",
    address_postal_code: "",
    address_country_code: "US",
    document_ssn: "",
    birth_date: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = (form) => {
    const errs = [];
    if (!form.name_first) errs.push("First Name is required.");
    if (!form.name_last) errs.push("Last Name is required.");
    if (!form.email_address) errs.push("Email is required.");
    else if (!/^\S+@\S+\.\S+$/.test(form.email_address))
      errs.push("Email format is invalid.");
    if (!form.phone_number) errs.push("Phone Number is required.");
    else if (!/^\d{10}$/.test(form.phone_number))
      errs.push("Phone Number must be 10 digits, numbers only.");
    if (!form.address_line_1) errs.push("Street Address is required.");
    if (!form.address_city) errs.push("City is required.");
    if (!stateCodes.includes(form.address_state)) errs.push("Select a valid 2-letter state code.");
    if (!/^\d{5}$/.test(form.address_postal_code))
      errs.push("ZIP code must be 5 digits, numbers only.");
    if (form.document_ssn && !/^\d{9}$/.test(form.document_ssn))
      errs.push("SSN must be 9 digits, no dashes.");
    if (form.birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(form.birth_date))
      errs.push("Birth date format must be YYYY-MM-DD.");
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateForm(form);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await submitApplication(form);
      onResult(result);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors.map((e) => e.message));
      } else {
        setErrors([err.message || "Unknown error occurred."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 sm:px-12 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 animate-gradient-x">
      <form
        className="bg-white w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        
        {/* Name Fields */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            name="name_first"
            placeholder="First Name"
            value={form.name_first}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="name_last"
            placeholder="Last Name"
            value={form.name_last}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
  
        {/* Contact Fields */}
        <input
          name="email_address"
          placeholder="Email"
          value={form.email_address}
          onChange={handleChange}
          className="p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          className="p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
  
        {/* Address Fields */}
        <input
          name="address_line_1"
          placeholder="Street Address"
          value={form.address_line_1}
          onChange={handleChange}
          className="p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            name="address_city"
            placeholder="City"
            value={form.address_city}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <select
            name="address_state"
            value={form.address_state}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-white bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">State</option>
            {stateCodes.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          <input
            name="address_postal_code"
            placeholder="ZIP"
            value={form.address_postal_code}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
  
        {/* SSN & Birth */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            name="document_ssn"
            placeholder="SSN (XXXXXXXXX)"
            value={form.document_ssn}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="birth_date"
            placeholder="Birth Date (YYYY-MM-DD)"
            value={form.birth_date}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg border border-white bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
  
        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg">
            <ul className="list-disc list-inside">
              {errors.map((e, idx) => <li key={idx}>{e}</li>)}
            </ul>
          </div>
        )}
  
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
  
}
