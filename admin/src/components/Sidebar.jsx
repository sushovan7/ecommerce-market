import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-full md:w-48 lg:w-56 bg-white border-r flex flex-row md:flex-col p-2 md:p-4 gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible sticky top-16 z-10 md:h-[calc(100vh-4rem)]">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `px-3 py-2 md:px-4 md:py-3 rounded border whitespace-nowrap text-sm md:text-base ${
            isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
          }`
        }
      >
        Add Product
      </NavLink>
      <NavLink
        to={"/list-items"}
        className={({ isActive }) =>
          `px-3 py-2 md:px-4 md:py-3 rounded border whitespace-nowrap text-sm md:text-base ${
            isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
          }`
        }
      >
        List items
      </NavLink>
      <NavLink
        to={"/orders"}
        className={({ isActive }) =>
          `px-3 py-2 md:px-4 md:py-3 rounded border whitespace-nowrap text-sm md:text-base ${
            isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
          }`
        }
      >
        Orders
      </NavLink>
    </div>
  );
}

export default Sidebar;
