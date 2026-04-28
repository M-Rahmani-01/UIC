// Format code by normalizing indentation and removing trailing whitespace
export function formatCode(code) {
  if (!code) return ''
  return code
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim()
}

// Extract plain text from article markdown for TTS
export function articleToPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, 'code block')
    .replace(/`[^`]+`/g, (m) => m.slice(1, -1))
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Generate a unique certificate ID
export function generateCertId(langId) {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `UIC-${langId.toUpperCase()}-${timestamp}-${random}`
}

// Check if code output matches expected output
export function checkOutput(userOutput, expectedOutput) {
  if (!userOutput || !expectedOutput) return false
  const normalize = (s) => s.trim().replace(/\r\n/g, '\n').replace(/\s+/g, ' ')
  return normalize(userOutput) === normalize(expectedOutput)
}