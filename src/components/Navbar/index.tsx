import {
  ChevronDown,
  PersonCircle,
  SearchOutline,
  SettingsOutline,
} from "react-ionicons";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white border-b border-gray-300">
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonCircle color="#4B6EAF" width={"28px"} height={"28px"} />
        <span className="text-blue-600 font-semibold md:text-lg text-sm whitespace-nowrap">
          Board Name
        </span>
        <ChevronDown color="#4B6EAF" width={"16px"} height={"16px"} />
      </div>
      <div className="flex items-center gap-2 w-full md:w-[400px] bg-gray-200 rounded-lg px-3 py-2">
        <SearchOutline color="#4B6EAF" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-200 outline-none text-sm text-gray-700"
        />
      </div>
      <div className="hidden md:flex items-center gap-4">
        <div className="grid place-items-center bg-gray-200 rounded-full p-2 cursor-pointer">
          <SettingsOutline color="#4B6EAF" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
