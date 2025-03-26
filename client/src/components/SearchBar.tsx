
import { Search, X } from "lucide-react";
import { useRef, useEffect } from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services and conditions we treat"
          className="w-full h-12 pl-4 pr-12 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
        {searchQuery ? (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute right-14 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        ) : null}
        <button 
          className="absolute right-3 h-8 w-8 flex items-center justify-center bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          aria-label="Search"
        >
          <Search size={16} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
