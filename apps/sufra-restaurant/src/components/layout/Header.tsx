interface HeaderProps {
  fname: string
  activePage: string
}

function Header({fname,activePage}:HeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-2xl ml-2 mb-6">
      <div className="flex flex-col items-start gap-y-1">
        <h1 className="text-2xl text-white font-semibold">Welcome back,{fname}</h1>
        <h1 className="text-xl font-medium font-[Inter] text-[#adadad]">{activePage}</h1>
      </div>
    </header>
  )
}

export default Header