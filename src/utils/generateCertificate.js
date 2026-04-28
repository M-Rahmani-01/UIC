import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generateCertificate(problemTitle = 'Problem') {
  const certCard = document.getElementById('certificate-card')
  if (!certCard) throw new Error('Certificate card element not found')

  const canvas = await html2canvas(certCard, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#0A0F2C',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth
  const imgHeight = (canvas.height * pageWidth) / canvas.width

  const yOffset = Math.max(0, (pageHeight - imgHeight) / 2)
  pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, Math.min(imgHeight, pageHeight))

  const safeName = problemTitle.replace(/[^a-zA-Z0-9]/g, '_')
  pdf.save(`UIC_${safeName}_Certificate.pdf`)
}