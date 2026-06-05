import iconPdf from '../img/icons/icon-pdf.png';
import iconDocx from '../img/icons/icon-docx.png';
import iconPlaceholder from '../img/docSubmissionImg.png';

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|bmp)$/i;

export function getDocumentPreviewSrc(fileUrl, kind = 'document') {
  if (!fileUrl || typeof fileUrl !== 'string') {
    return kind === 'photo' ? iconPlaceholder : iconPdf;
  }

  const trimmed = fileUrl.trim();
  if (!trimmed || trimmed === 'null' || trimmed === 'undefined') {
    return kind === 'photo' ? iconPlaceholder : iconPdf;
  }

  const lower = trimmed.toLowerCase();
  if (lower.endsWith('.pdf')) {
    return iconPdf;
  }
  if (lower.endsWith('.doc') || lower.endsWith('.docx')) {
    return iconDocx;
  }
  if (IMAGE_EXT.test(lower)) {
    return trimmed;
  }
  if (kind === 'photo' && (lower.includes('/media/') || lower.startsWith('http'))) {
    return trimmed;
  }
  return kind === 'photo' ? iconPlaceholder : iconPdf;
}

export function getDocumentHref(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string') {
    return null;
  }
  const trimmed = fileUrl.trim();
  return trimmed && trimmed !== 'null' ? trimmed : null;
}
