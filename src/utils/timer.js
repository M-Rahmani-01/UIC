// Timer utility functions

// Format seconds as MM:SS
export function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Format seconds as human-readable string
export function formatDuration(totalSeconds) {
  if (totalSeconds < 60) return `${totalSeconds}s`
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  if (secs === 0) return `${mins}m`
  return `${mins}m ${secs}s`
}

// Calculate percentage elapsed
export function timerPercentage(remaining, total) {
  return Math.max(0, Math.min(100, ((total - remaining) / total) * 100))
}

// Check if timer is in warning zone (< 5 minutes)
export function isWarningZone(remaining) {
  return remaining < 300
}

// Check if timer is critical (< 1 minute)
export function isCritical(remaining) {
  return remaining < 60
}