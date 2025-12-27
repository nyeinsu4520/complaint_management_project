import { useState } from "react";
import { addCompany } from "../../api/companyApi"; // your Axios function

export default function AddCompanyPage() {
  const [company, setCompany] = useState({
    name: "",
    domain: "",
    contactEmail: "",
    contactNumber: "",
    supportHours: "",
    tenantConfig: "{}",
    active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCompany((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!company.name.trim()) {
      alert("Company name is required!");
      return;
    }

    // Validate tenantConfig is valid JSON
    try {
      JSON.parse(company.tenantConfig || "{}");
    } catch (err) {
      alert("Tenant Config must be valid JSON!");
      return;
    }

    try {
      const payload = { ...company };
      const res = await addCompany(payload);
      alert(`Company ${res.data.name} created successfully!`);

      // Reset form
      setCompany({
        name: "",
        domain: "",
        contactEmail: "",
        contactNumber: "",
        supportHours: "",
        tenantConfig: "{}",
        active: true
      });
    } catch (err) {
      console.error(err);
      alert(
        "Failed to create company. Make sure all required fields are filled and unique."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Company</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          value={company.name}
          onChange={handleChange}
          placeholder="Company Name*"
          className="border p-2 rounded"
        />
        <input
          name="domain"
          value={company.domain}
          onChange={handleChange}
          placeholder="Domain"
          className="border p-2 rounded"
        />
        <input
          name="contactEmail"
          value={company.contactEmail}
          onChange={handleChange}
          placeholder="Contact Email"
          className="border p-2 rounded"
        />
        <input
          name="contactNumber"
          value={company.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border p-2 rounded"
        />
        <input
          name="supportHours"
          value={company.supportHours}
          onChange={handleChange}
          placeholder="Support Hours"
          className="border p-2 rounded"
        />
        <textarea
          name="tenantConfig"
          value={company.tenantConfig}
          onChange={handleChange}
          placeholder='Tenant Config (JSON, e.g., {"extensionTimeDays":2})'
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={company.active}
            onChange={handleChange}
          />
          Active
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Company
        </button>
      </form>
    </div>
  );
}
