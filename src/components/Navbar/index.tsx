import { useState } from "react";
import { ChevronDown, PersonCircle, SearchOutline, SettingsOutline } from "react-ionicons";

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // To toggle user details menu

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass search query to parent
  };

  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }
    onSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white border-b border-gray-300">
      <div className="flex items-center gap-3 cursor-pointer">
        
        <span className="text-blue-600 font-semibold md:text-lg text-sm whitespace-nowrap">
          Syntax Squad
        </span>
       
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-[400px] bg-gray-200 rounded-lg px-3 py-2">
        <button onClick={handleSearchClick} className="cursor-pointer">
          <SearchOutline color="#4B6EAF" />
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full bg-gray-200 outline-none text-sm text-gray-700"
        />
        {searchQuery && (
          <button onClick={handleClearSearch} className="text-gray-500 text-sm">
            Clear
          </button>
        )}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="grid place-items-center bg-gray-200 rounded-full p-2 cursor-pointer">
          <SettingsOutline color="#4B6EAF" />
        </div>
        
        {/* Profile Icon for User Details */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleUserMenu}
        >
          <PersonCircle color="#4B6EAF" width="28px" height="28px" />
          <span className="text-blue-600 font-semibold">User</span>
          {isUserMenuOpen && (
            <div className="absolute bg-white shadow-md p-4 rounded-lg top-[60px] right-0 w-48">
              <div className="cursor-pointer text-gray-700 py-2 hover:bg-gray-200">View Profile</div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
