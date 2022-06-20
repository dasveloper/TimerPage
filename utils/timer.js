const format = value => String(value).padStart(2, '0')
const converters = {
  days: value => value * 864e5,
  hours: value => value * 36e5,
  minutes: value => value * 6e4,
  seconds: value => value * 1e3,
}

export const getTimerString = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) =>
  `${format(Math.max(0, days))}:${format(Math.max(0, hours))}:${format(Math.max(0, minutes))}:${format(
    Math.max(0, seconds),
  )}`

export const getReadableString = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
  let str = ''
  if (days > 0) str += `${days} day `
  if (hours > 0) str += `${hours} hour `
  if (minutes > 0) str += `${minutes} minute `
  if (seconds > 0) str += `${seconds} second `
  str += 'timer'
  return str
}

export const getHighestUnit = ({ days = 0, hours = 0, minutes = 0 }) => {
  if (days > 0) return 'days'
  if (hours > 0) return 'hours'
  if (minutes > 0) return 'minutes'
  return 'seconds'
}

export const toMs = timeObj => {
  let ms = 0
  for (const [key, value] of Object.entries(timeObj)) {
    const converter = converters[key]
    ms += converter(value)
  }

  return ms
}

export const parseMs = ms => ({
  days: Math.floor(ms / 86400000),
  hours: Math.floor(ms / 3600000) % 24,
  minutes: Math.floor(ms / 60000) % 60,
  seconds: Math.floor(ms / 1000) % 60,
})

export const getRelatedString = (unit, modifier) => {
  if (unit === 'minutes') {
    return `${modifier} minute`
  }
  if (unit === 'hours') {
    return `${modifier} hour`
  }
  if (unit === 'days') {
    return `${modifier} day`
  }
  return ''
}

export const getHomepageLinks = () => ({
  seconds: Array(12)
    .fill()
    .map((_, i) => ({
      ms: toMs({ seconds: (i + 1) * 5 }),
      readable: getReadableString({ seconds: (i + 1) * 5 }),
    })),
  minutes: Array(12)
    .fill()
    .map((_, i) => ({
      ms: toMs({ minutes: (i + 1) * 5 }),
      readable: getReadableString({ minutes: (i + 1) * 5 }),
    })),
  hours: Array(24)
    .fill()
    .map((_, i) => ({
      ms: toMs({ hours: i + 1 }),
      readable: getReadableString({ hours: i + 1 }),
    })),
  days: Array(7)
    .fill()
    .map((_, i) => ({
      ms: toMs({ days: i + 1 }),
      readable: getReadableString({ days: i + 1 }),
    })),
})

export const getRelatedLinks = (unit, modifier) => {
  if (unit === 'seconds') {
    return Array(60)
      .fill()
      .map((_, i) => ({
        ms: toMs({ seconds: i + 1 }),
        readable: getReadableString({ seconds: i + 1 }),
      }))
  }
  if (unit === 'minutes') {
    return Array(60)
      .fill()
      .map((_, i) => ({
        ms: toMs({ minutes: modifier, seconds: i }),
        readable: getReadableString({ minutes: modifier, seconds: i }),
      }))
  }
  if (unit === 'hours') {
    return Array(60)
      .fill()
      .map((_, i) => ({
        ms: toMs({ hours: modifier, minutes: i }),
        readable: getReadableString({ hours: modifier, minutes: i }),
      }))
  }
  if (unit === 'days') {
    return Array(24)
      .fill()
      .map((_, i) => ({
        ms: toMs({ days: modifier, hours: i }),
        readable: getReadableString({ days: modifier, hours: i }),
      }))
  }
  return []
}
