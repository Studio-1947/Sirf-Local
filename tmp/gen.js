const fs = require('fs');

const svgLines = fs.readFileSync('public/right-side.svg', 'utf8').split('\n').filter(l => l.trim());

const heroPhotos = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2072&auto=format&fit=crop"
];

// Line index 5 is the background path with 4 segments
const quadrantPathLine = svgLines[5];
const quadrantPaths = quadrantPathLine.match(/d="([^"]+)"/)[1].split('ZM').map((p, i, a) => {
  let path = p;
  if (i > 0) path = 'M' + path; // MUST add M back!
  if (i < a.length - 1 && !path.endsWith('Z')) path = path + 'Z';
  return path;
});

// collect all paths except the quadrant one.
const otherLines = svgLines.filter((l, i) => i !== 5 && !l.trim().startsWith('<svg') && !l.trim().startsWith('</svg>'));

// Fix SVG attributes in otherLines
const fixedOtherLines = otherLines.map(line => 
  line
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/stop-opacity=/g, 'stopOpacity=')
    .replace(/xmlns:xlink=/g, 'xmlnsXlink=')
    .replace(/xml:space=/g, 'xmlSpace=')
).join('\n');

const header = '"use client";\n\nimport React from \'react\';\nimport { motion } from \'framer-motion\';\n\nconst heroPhotos = [\n  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",\n  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",\n  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",\n  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2072&auto=format&fit=crop"\n];\n\nexport const HeroFigure = () => {\n  return (\n    <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:ml-auto">\n      <svg viewBox="0 0 183 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">\n        <defs>\n';

const patterns = heroPhotos.map((photo, i) => 
  '            <pattern key={' + i + '} id="hero-photo-' + i + '" patternUnits="objectBoundingBox" width="1" height="1">\n' +
  '              <image href="' + photo + '" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />\n' +
  '            </pattern>'
).join('\n');

const defsFooter = '\n          <linearGradient id="paint0_linear_24_31" x1="126.009" y1="-15.1475" x2="91.8384" y2="86.902" gradientUnits="userSpaceOnUse">\n            <stop stopColor="white"/>\n            <stop offset="1" stopColor="white" stopOpacity="0.5"/>\n          </linearGradient>\n        </defs>\n\n        <g opacity="0.9">\n';

const quadrants = quadrantPaths.map((path, i) => 
  '          <motion.path\n' +
  '            initial={{ opacity: 0, scale: 0.8 }}\n' +
  '            animate={{ opacity: 1, scale: 1 }}\n' +
  '            transition={{ duration: 0.6, delay: ' + (0.1 + i * 0.1) + ' }}\n' +
  '            d="' + path + '"\n' +
  '            fill="url(#hero-photo-' + i + ')"\n' +
  '          />'
).join('\n');

const footer = '\n        </g>\n\n        {/* Overlay other elements */}\n' + fixedOtherLines + '\n      </svg>\n    </div>\n  );\n};\n';

fs.writeFileSync('components/HeroFigure.tsx', header + patterns + defsFooter + quadrants + footer);
