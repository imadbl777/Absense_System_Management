/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ListsSideMenu = ({
  links,
  selectedPath,
  onLinkClick,
  isExpand,
  darkMode,
}) => {
  return (
    <>
      {links.map((link, index) => (
        <div key={index} className="mb-6">
          {isExpand && (
            <div
              className={`font-semibold text-sm px-3 mb-3 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p>{link.head}</p>
            </div>
          )}

          {link.subLinks.map((subLink, subIndex) => {
            const isSelected = subLink.path === selectedPath;
            return (
              <li
                key={subIndex}
                className={`mb-3 flex items-center cursor-pointer transition-all duration-300 hover:bg-blue-50 hover:p-2 rounded-lg ${
                  isSelected
                    ? "bg-blue-300 text-gray-800 p-2 rounded-lg"
                    : "text-gray-500 hover:text-blue-600"
                } ${isExpand ? "px-3" : "justify-center mx-auto px-1"}`}
              >
                <Link
                  to={subLink.path}
                  className="flex items-center"
                  onClick={() => onLinkClick(subLink.path)}
                  title={!isExpand ? subLink.title : ""}
                >
                  <div className="transition-transform duration-300 hover:scale-110">
                    <subLink.icon
                      className={`${isExpand ? "w-8 h-8 pr-3" : "w-6 h-6"}`}
                    />
                  </div>
                  {isExpand && (
                    <p
                      className={`transition-all duration-300 whitespace-nowrap`}
                    >
                      {subLink.title}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default ListsSideMenu;
