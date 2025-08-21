import { MessageSquare, Search } from "lucide-react";

const EmptyState = ({ type, onRefresh }) => {
  if (type === "loading") {
    return (
      <div
        className="px-4 py-8 flex flex-col items-center justify-center"
        style={{ color: "#E0E0E0" }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p className="text-center">Loading chats...</p>
      </div>
    );
  }

  if (type === "no-chats") {
    return (
      <div
        className="px-4 py-8 flex flex-col items-center justify-center"
        style={{ color: "#E0E0E0" }}
      >
        <MessageSquare
          size={48}
            className="mb-4 chat-icon"
          style={{ color: "#1F1F1F" }}
        />
        <p className="text-center text-lg font-medium mb-2">No chats yet</p>
        <p className="text-center text-sm mb-4">
          Click "New Chat" to start your first conversation
        </p>
        <button
          onClick={onRefresh}
          className="text-sm px-3 py-1 rounded-md transition-colors refresh-btn"
          style={{
            backgroundColor: "#1F1F1F",
            color: "#E0E0E0",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#2F2F2F";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#1F1F1F";
          }}
        >
          Refresh
        </button>
      </div>
    );
  }

  if (type === "no-search-results") {
    return (
      <div
        className="px-4 py-8 flex flex-col items-center justify-center"
        style={{ color: "#E0E0E0" }}
      >
        <Search size={32} className="mb-2" style={{ color: "#1F1F1F" }} />
        <p className="text-center">No chats match your search</p>
        <p className="text-center text-sm mt-1">Try a different search term</p>
      </div>
    );
  }

  return null;
};

export default EmptyState;