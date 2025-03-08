import { Fingerprint } from 'lucide-react';

const svgElement = Fingerprint({ size: 32 });
const blob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
const url = URL.createObjectURL(blob);
const link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/svg+xml';
link.href = url;
document.head.appendChild(link);