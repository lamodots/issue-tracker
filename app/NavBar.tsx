'use client';
import Link from "next/link"
import classNames from "classnames";
import { usePathname } from "next/navigation"

function NavBar() {
  const currentPath = usePathname()
  console.log(currentPath)
    const links = [
        {label: 'Dasboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ]
  return (
    <nav className="flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center ">
        <Link href=".">Logo</Link>
        <ul className="flex space-x-6">
            {
                links.map(link => <Link key={link.label} className={classNames({
                    'text-zinc-900': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true
                })}  href={link.href}>
                    {link.label}
                </Link> 
            )}
           
        </ul>
    </nav>
  )
}

export default NavBar