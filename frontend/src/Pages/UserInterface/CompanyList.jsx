import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCompanies } from "../../api/userApi";
import Header from "../../components/Header";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    getUserCompanies(user.id)
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const chooseCompany = (companyId) => {
    localStorage.setItem("companyId", companyId);
    navigate("/complaintForm");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      <Header title="CMS" />

      <main className="p-6 flex justify-center overflow-auto">
        <div className="bg-[#EBF4F6] p-6 rounded-2xl shadow-md max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-[#071952]">
            Select a Company
          </h2>

          {companies.length === 0 ? (
            <p className="text-[#071952]">No companies linked to your account.</p>
          ) : (
            companies.map((c) => (
              <div
                key={c.id}
                className="flex justify-between items-center mb-2 p-3 bg-white rounded shadow"
              >
                <span className="text-[#071952]">{c.name}</span>
                <button
                  onClick={() => chooseCompany(c.id)}
                  className="px-3 py-1 bg-[#37B7C3] text-white rounded hover:bg-[#088395] transition"
                >
                  Select
                </button>
              </div>
            ))
          )}
        </div>
      </main>

    </div>
  );
}
