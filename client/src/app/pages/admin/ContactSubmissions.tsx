import { useState, useEffect } from "react";
import { contactAPI, ContactMessage } from "@/api";
import { Trash2, Search, CheckCircle, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await contactAPI.getAll();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await contactAPI.updateStatus(id, status);
      toast.success(`Message marked as ${status}`);
      fetchMessages();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await contactAPI.delete(id);
        toast.success("Message removed");
        fetchMessages();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Contact Messages</h2>
          <p className="text-gray-400">
            Inbound inquiries from the contact form.
          </p>
        </div>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by name, email or subject..."
          className="w-full pl-12 pr-4 py-3 bg-[#16161a] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No messages found
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-[#16161a] border rounded-2xl p-6 shadow-xl transition-all ${
                msg.status === "new"
                  ? "border-[#453abc]/40 bg-[#453abc]/5"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        msg.status === "new"
                          ? "bg-[#453abc] text-white"
                          : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {msg.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        {msg.name}
                        {msg.status === "new" && (
                          <span className="text-[10px] bg-[#453abc] px-2 py-0.5 rounded text-white uppercase tracking-tighter">
                            New
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500">{msg.email}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#60c3e3] flex items-center gap-2">
                      <MessageSquare size={16} />
                      {msg.subject}
                    </h4>
                    <p className="mt-2 text-gray-300 bg-white/5 p-4 rounded-xl text-sm leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4 min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusUpdate(msg._id, "read")}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-400 title='Mark as Read'"
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 title='Delete'"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600 font-mono">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
