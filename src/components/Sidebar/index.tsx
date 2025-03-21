import {
	HomeOutline,
	GridOutline,
	NotificationsOutline,
	LogOutOutline,
  } from "react-ionicons";
  
  const Sidebar = () => {
	const navLinks = [
	  {
		title: "Home",
		icon: (
		  <HomeOutline
			color="#4B6EAF"
			width="22px"
			height="22px"
		  />
		),
		active: true,
	  },
	  {
		title: "Projects",
		icon: (
		  <GridOutline
			color="#4B6EAF"
			width="22px"
			height="22px"
		  />
		),
		active: false,
	  },
	  {
		title: "Notifications",
		icon: (
		  <NotificationsOutline
			color="#4B6EAF"
			width="22px"
			height="22px"
		  />
		),
		active: false,
	  },
	];
  
	return (
	  <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
		<div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
		  <span className="text-blue-600 font-semibold text-2xl md:block hidden">Logo.</span>
		  <span className="text-blue-600 font-semibold text-2xl md:hidden block">L.</span>
		</div>
		<div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
		  {navLinks.map((link) => {
			return (
			  <div
				key={link.title}
				className={`flex items-center gap-2 w-full rounded-lg hover:bg-gray-300 px-2 py-3 cursor-pointer ${
				  link.active ? "bg-blue-200" : "bg-transparent"
				}`}
			  >
				{link.icon}
				<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
			  </div>
			);
		  })}
		  <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-gray-300 px-2 py-3 cursor-pointer bg-gray-200">
			<LogOutOutline color="#4B6EAF" />
			<span className="font-medium text-[15px] md:block hidden">Log Out</span>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default Sidebar;
  