import { Menu, MenuButton, MenuItem, MenuItems,Transition } from '@headlessui/react'

type props ={
  fname: string;
  lname: string;
  handleLogout: () => void;
}

function UserDropdown({fname, lname,handleLogout}: props) {

  return (
    <Menu as="div" className="relative">
      <MenuButton id='ProfilePic'>
          <button 
          data-tooltip-target="test"
          className="size-[20px] lg:size-8 hover:ring-3 hover:ring-[#213a39] bg-amber-50 rounded-full overflow-hidden transform transition-transform duration-200 hover:scale-110"
          >
          {fname && lname ? `${fname[0]}${lname[0]}`.toUpperCase() : "?"}
          </button>
      </MenuButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems className="absolute -right-6 mt-4 p-1 w-50 md:w-55 rounded-lg bg-[#142A29] text-sm md:text-lg font-[500] text-[#B68D67] focus:outline-none z-50">
          <div id='arrow' className="absolute top-0 right-7 md:right-8 -translate-y-1 w-4 h-4 bg-[#142A29] rotate-45 z-[-1]"></div>
          <MenuItem>
              <div className='flex justify-start pl-2 items-center hover:bg-[#213a39] rounded-md'>
              <img src="/reservation-history.png" className='size-5 md:size-6' alt="" />
              <a className="block hover:brightness-125 transition duration-200 px-4 py-2">
                  My Reservations
              </a>
              </div>
          </MenuItem>
          <MenuItem>
              <div className='flex justify-start pl-2 items-center hover:bg-[#213a39] rounded-md'>
              <img src="/order-history.png" className='size-5 md:size-6' alt="" />
              <a className="block hover:brightness-125 transition duration-200 px-4 py-2">
                  My Orders
              </a>
              </div>
          </MenuItem>
          <MenuItem>
              <div className='flex justify-start pl-2 items-center hover:bg-[#213a39] rounded-md'>
              <img src="/settings.png" className='size-5 md:size-6' alt="" />
              <a className="block hover:brightness-125 transition duration-200 px-4 py-2">
                  Settings
              </a>
              </div>
          </MenuItem> 
          <div id='separator' className="my-1 h-px bg-[#ffffff1e]" />
          <MenuItem>
              <div className='flex justify-start pl-2 mb-0.5 items-center hover:bg-[#213a39] rounded-md'>
              <img src="/sign-out.png" className='rotate-180 size-6 md:size-7' alt="" />
              <button 
                  onClick={handleLogout}
                  className="block w-full text-left hover:brightness-125 transition duration-200 px-4 py-2"
              >
                  Signout
              </button>
              </div>
          </MenuItem>
        </MenuItems>
      </Transition> 
    </Menu>
  )
}

export default UserDropdown