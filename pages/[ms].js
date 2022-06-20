import { PauseIcon, PlayIcon, RefreshIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { useCountdownTimer } from 'use-countdown-timer'

import Layout from '@/components/layout'
import Meta from '@/components/meta'
import {
  getHighestUnit,
  getReadableString,
  getRelatedLinks,
  getRelatedString,
  getTimerString,
  parseMs,
} from '@/utils/timer'

export default function Timer({ ms, relatedLinks, relatedString }) {
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: ms,
    resetOnExpire: false,
  })

  useEffect(() => {
    reset()
  }, [ms])

  const readableString = getReadableString(parseMs(ms))
  const timerString = useMemo(() => getTimerString(parseMs(countdown)), [countdown])

  return (
    <Layout>
      <Meta
        title={`${readableString} | Timer Page`}
        description={`Online countdown ${readableString}. Easily count down from ${readableString.replace(
          ' timer',
          's',
        )}, or select from other related ${relatedString} timers.`}
      />
      <main className="mt-12">
        <section>
          <div className="pb-4 border-b">
            <h1 className="text-lg leading-6 font-bold md:text-3xl">{readableString}</h1>
          </div>
          <div className="py-28">
            <h2 className="text-center font-mono leading-none font-medium text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              {timerString}
            </h2>
          </div>
          <div className="flex flex-col xs:flex-row items-center justify-center gap-4">
            <button
              disabled={isRunning}
              type="button"
              className="disabled:opacity-30 disabled:pointer-events-none inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
              onClick={start}
            >
              <PlayIcon className="-ml-1 mr-3 h-6 w-6" aria-hidden="true" />
              Start
            </button>
            <button
              disabled={!isRunning}
              type="button"
              className="disabled:opacity-30 disabled:pointer-events-none inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
              onClick={pause}
            >
              <PauseIcon className="-ml-1 mr-3 h-6 w-6" aria-hidden="true" />
              Pause
            </button>
            <button
              type="button"
              className="disabled:opacity-30  disabled:pointer-events-none inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
              onClick={reset}
            >
              <RefreshIcon className="-ml-1 mr-3 h-6 w-6" aria-hidden="true" />
              Reset
            </button>
          </div>
        </section>
        <aside className="mt-24">
          <div className="pb-4 border-b">
            <h2 className="text-lg leading-6 font-medium">Other {relatedString} timers</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedLinks.map(link => (
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

export const getStaticPaths = async () => {
  const paths = [].map(({ _id }) => ({ params: { timer: _id.toString() } }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const { ms } = params
  const parsed = parseMs(ms)
  const highest = getHighestUnit(parsed)
  const relatedLinks = getRelatedLinks(highest, parsed[highest])
  const relatedString = getRelatedString(highest, parsed[highest])
  return {
    props: {
      ms,
      relatedLinks,
      relatedString,
    },
    revalidate: 10,
  }
}
