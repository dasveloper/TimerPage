import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import Logo from '@/components/logo'

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="flex justify-between items-center container">
      <Link href="/">
        <a className="flex justify-center items-center gap-3">
          <Logo width={34} />
          <span className="sr-only sm:not-sr-only font-bold text-xl">Timer Page</span>
        </a>
      </Link>

      <button
        type="button"
        className="inline-flex items-center p-1.5 border text-xs font-medium rounded  focus:outline-none focus:ring-2 focus:ring-offset-2 "
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <span className="sr-only">Toggle dark mode</span>
        {resolvedTheme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      </button>
    </header>
  )
}
