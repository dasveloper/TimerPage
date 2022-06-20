import { ClockIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Layout from '@/components/layout'
import { getHomepageLinks, toMs } from '@/utils/timer'

export default function Timer({ homepageLinks }) {
  const router = useRouter()
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const handleInputChange = e => {
    const { name, value } = e.target
    setTimer(prev => ({
      ...prev,
      [name]: value ? Math.trunc(value) : value,
    }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    const ms = toMs(timer)
    router.push(`/${ms}`)
  }
  return (
    <Layout>
      <main className="mt-12">
        <section>
          <div className="max-w-7xl text-center">
            <h1 className="text-3xl tracking-tight font-extrabold sm:text-5xl">
              Create a countdown timer
              <br />
              for any duration
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:max-w-3xl">
              Enter your timer duration in days, hours, minutes, and seconds and Timer Page will generate a sharable
              countdown timer for you, or browse our premade online countdown timers.
            </p>
          </div>
          <div className="py-12 xs:py-16">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-center gap-4">
                <div>
                  <label htmlFor="days" className="block mb-2 text-sm font-medium ">
                    Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    id="days"
                    name="days"
                    value={timer.days}
                    onChange={handleInputChange}
                    className="block p-4 w-full rounded-lg border sm:text-md "
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="block mb-2 text-sm font-medium ">
                    Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    id="hours"
                    name="hours"
                    value={timer.hours}
                    onChange={handleInputChange}
                    className="block p-4 w-full rounded-lg border sm:text-md "
                  />
                </div>
                <div>
                  <label htmlFor="minutes" className="block mb-2 text-sm font-medium ">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    id="minutes"
                    name="minutes"
                    value={timer.minutes}
                    onChange={handleInputChange}
                    className="block p-4 w-full rounded-lg border sm:text-md "
                  />
                </div>
                <div>
                  <label htmlFor="seconds" className="block mb-2 text-sm font-medium">
                    Seconds
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    id="seconds"
                    name="seconds"
                    value={timer.seconds}
                    onChange={handleInputChange}
                    className="block p-4 w-full rounded-lg border sm:text-md "
                  />
                </div>
              </div>
              <div className="mt-12 flex items-center justify-center">
                <button
                  type="submit"
                  className="w-full xs:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                >
                  <ClockIcon className="-ml-1 mr-3 h-6 w-6" aria-hidden="true" />
                  Create timer
                </button>
              </div>
            </form>
          </div>
        </section>
        <aside className="mt-2">
          <div className="pb-4 border-b">
            <h2 className="text-lg leading-6 font-medium">Seconds timers</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homepageLinks.seconds.map(link => (
              <Link key={link.ms} href={`/${link.ms}`}>
                <a className="hover:underline">{link.readable}</a>
              </Link>
            ))}
          </div>
          <div className="mt-16 pb-4 border-b">
            <h2 className="text-lg leading-6 font-medium">Minutes timers</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homepageLinks.minutes.map(link => (
              <Link key={link.ms} href={`/${link.ms}`}>
                <a className="hover:underline">{link.readable}</a>
              </Link>
            ))}
          </div>
          <div className="mt-16 pb-4 border-b">
            <h2 className="text-lg leading-6 font-medium">Hours timers</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homepageLinks.hours.map(link => (
              <Link key={link.ms} href={`/${link.ms}`}>
                <a className="hover:underline">{link.readable}</a>
              </Link>
            ))}
          </div>
          <div className="mt-16 pb-4 border-b">
            <h2 className="text-lg leading-6 font-medium">Days timers</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homepageLinks.days.map(link => (
              <Link key={link.ms} href={`/${link.ms}`}>
                <a className="hover:underline">{link.readable}</a>
              </Link>
            ))}
          </div>
        </aside>
      </main>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const homepageLinks = getHomepageLinks()

  return {
    props: {
      homepageLinks,
    },
    revalidate: 10,
  }
}
