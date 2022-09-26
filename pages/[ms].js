import { PauseIcon, PlayIcon, RefreshIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import Confetti from 'react-confetti'
import { useCountdownTimer } from 'use-countdown-timer'

import Layout from '@/components/layout'
import Meta from '@/components/meta'
import Share from '@/components/share'
import {
  getHighestUnit,
  getNumberWordString,
  getPluralizedString,
  getReadableString,
  getRelatedLinks,
  getRelatedString,
  getTimerString,
  parseMs,
  toMs,
} from '@/utils/timer'
import useWindowSize from '@/utils/useWindowSize'

export default function Timer({ ms, relatedLinks, relatedString }) {
  const size = useWindowSize()

  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: ms,
    resetOnExpire: false,
  })

  useEffect(() => {
    reset()
  }, [ms])

  const { days, hours, minutes, seconds } = parseMs(ms)
  const readableString = getReadableString({ days, hours, minutes, seconds })
  const numberWordString = getNumberWordString({ days, hours, minutes, seconds, suffix: 'online countdown timer' })
  const readableStringSimple = getPluralizedString({ days, hours, minutes, seconds, suffix: '' })

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
      {countdown === 0 && <Confetti width={size.width} height={size.height} />}
      <main className="mt-12">
        <section>
          <div className="pb-4 border-b flex flex-col xs:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl leading-6 font-bold md:text-4xl">{readableString}</h1>
              <h2 className="text-base text-gray-500">
                Set timer for {readableStringSimple} using this {numberWordString}
              </h2>
            </div>
            <Share url={`https://timerpage.com/${ms}`} title={readableString} />
          </div>
          <div className="py-28">
            {' '}
            {countdown === 0 && <p className="text-center text-3xl mb-6 font-bold">Finished!</p>}
            <h3 className="text-center font-mono leading-none font-medium text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              {timerString}
            </h3>
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
          <div className="mt-14">
            <p className="text-sm text-center max-w-2xl mx-auto text-gray-500">
              Press start to begin a <b>{readableString}</b>. You can pause the countdown timer at any time by clicking
              pause. You can reset the {readableString} by clicking on the reset button.
            </p>
          </div>
        </section>
        <aside className="mt-14">
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
  const paths = []
  // 1 - 59 seconds
  for (let i = 1; i < 60; i += 1) {
    paths.push({ params: { ms: toMs({ seconds: i }).toString() } })
  }

  // 1 - 59 minutes with 5 seconds intervals
  for (let i = 1; i < 60; i += 1) {
    for (let j = 0; j < 60; j += 5) {
      paths.push({ params: { ms: toMs({ minutes: i, seconds: j }).toString() } })
    }
  }

  // 1 - 23 hours with 5 minute intervals
  for (let i = 1; i < 24; i += 1) {
    for (let j = 0; j < 60; j += 5) {
      paths.push({ params: { ms: toMs({ hours: i, minutes: j }).toString() } })
    }
  }

  // 1 - 7 hours days
  for (let i = 1; i <= 7; i += 1) {
    paths.push({ params: { ms: toMs({ days: i }).toString() } })
  }

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
