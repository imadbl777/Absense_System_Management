/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export default function Select({ branches, setSelectedGroup, selectedGroup }) {
  const [showDropDown, setshowDropDown] = useState(null);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-[10px] text-sm text-gray-500 ring-1 shadow-xs ring-gray-200 ring-inset hover:bg-gray-50">
          {selectedGroup === "" ? "Choisir Un Group" : selectedGroup}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {branches.map((b) => (
            <MenuItem key={b.branch_id} as={"div"}>
              <a
                href="#"
                onMouseEnter={() => setshowDropDown(b.branch_id)}
                className="block px-4 py-2 text-sm text-gray-500 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden font-semibold"
              >
                {b.branch_name}
              </a>
              {showDropDown === b.branch_id ? (
                <>
                  {b.groups.map((g) => (
                    <div key={g.group_name} className="">
                      <button
                        onClick={() => setSelectedGroup(g.group_name)}
                        value={g.group_name}
                        className="p-2 hover:bg-blue-500 hover:text-white w-full text-start pl-10 text-sm rounded-lg"
                      >
                        {g.group_name}
                      </button>
                    </div>
                  ))}
                </>
              ) : null}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
