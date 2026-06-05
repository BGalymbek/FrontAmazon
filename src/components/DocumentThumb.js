import React from 'react';
import { getDocumentHref, getDocumentPreviewSrc } from '../utils/documentPreview';

export default function DocumentThumb({ fileUrl, label, kind = 'document' }) {
  const href = getDocumentHref(fileUrl);
  const src = getDocumentPreviewSrc(fileUrl, kind);
  const content = (
    <img src={src} alt={label} className="doc-thumb-img" />
  );

  if (!href) {
    return (
      <div className="doc-thumb doc-thumb-missing" title={label}>
        {content}
        <span className="doc-thumb-badge">{label}</span>
      </div>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="doc-thumb" title={label}>
      {content}
    </a>
  );
}
