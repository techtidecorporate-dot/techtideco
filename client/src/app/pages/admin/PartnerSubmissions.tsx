import { useState, useEffect } from "react";
import { partnerAPI, PartnerRequest } from "@/api";
import { Search, Mail, Phone, Building } from "lucide-react";
import { toast } from "sonner";

export default function PartnerSubmissions() {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await partnerAPI.getAll();
      setRequests(data);
    } catch (error) {
      toast.error("Failed to fetch partner requests");
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.companyName &&
        r.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Partner Requests</h2>
          <p className="text-gray-400">Inquiries from potential partners.</p>
        </div>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by name, company or email..."
          className="w-full pl-12 pr-4 py-3 bg-[#16161a] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No requests found
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req._id}
              className="bg-[#16161a] border border-white/5 hover:border-white/10 rounded-2xl p-6 shadow-xl transition-all"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#453abc] to-[#60c3e3] flex items-center justify-center font-bold text-white">
                      {req.fullName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold flex items-center gap-2 text-lg">
                        {req.fullName}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail size={12} /> {req.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={12} /> {req.phone}
                        </span>
                        {req.companyName && (
                          <span className="flex items-center gap-1">
                            <Building size={12} /> {req.companyName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Service & Budget
                      </p>
                      <p className="font-medium text-[#60c3e3]">
                        {req.service}
                      </p>
                      <p className="text-sm text-gray-400">{req.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Status
                      </p>
                      <span
                        className={`text-[10px] px-2 py-1 rounded uppercase tracking-tighter font-bold ${
                          req.status === "new"
                            ? "bg-[#453abc] text-white"
                            : req.status === "contacted"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Message
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[150px]">
                  <p className="text-xs text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600 font-mono">
                    {new Date(req.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
