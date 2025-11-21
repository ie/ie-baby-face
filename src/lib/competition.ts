export function getCompetitionStatus(): 'coming-soon' | 'active' | 'ended' {
  const now = new Date()
  const currentDate = parseInt(
    now.toLocaleDateString('en-au').split('/').reverse().join('')
  )

  const startDate = parseInt(
    process.env.NEXT_PUBLIC_COMPETITION_START || '20251117'
  )
  const endDate = parseInt(
    process.env.NEXT_PUBLIC_COMPETITION_END || '20251130'
  )

  if (currentDate < startDate) {
    return 'coming-soon'
  }

  if (currentDate > endDate) {
    return 'ended'
  }

  return 'active'
}

export function getCompetitionDates() {
  const startDate = process.env.NEXT_PUBLIC_COMPETITION_START || '20251117'
  const endDate = process.env.NEXT_PUBLIC_COMPETITION_END || '20251130'

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  }
}

function formatDate(dateString: string): string {
  // Convert YYYYMMDD to readable format
  const year = dateString.substring(0, 4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)
  
  const date = new Date(`${year}-${month}-${day}`)
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
