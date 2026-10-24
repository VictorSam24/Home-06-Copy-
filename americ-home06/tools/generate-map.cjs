// One-off generator for public/img/world-map.svg (dotted footer map).
// Run: node tools/generate-map.cjs
const fs = require('fs');
const path = require('path');
const DottedMap = require('dotted-map').default;

const map = new DottedMap({ height: 44, grid: 'diagonal' });
const svg = map.getSVG({ radius: 0.22, color: '#3a4a4f', shape: 'circle', backgroundColor: 'transparent' });
fs.writeFileSync(path.join(__dirname, '..', 'public', 'img', 'world-map.svg'), svg);

// Pin positions (as % of the map box) for the six office markers
const offices = { England: [51.5, -0.1], France: [48.9, 2.35], Spain: [40.4, -3.7], Belgium: [50.85, 4.35], Poland: [52.2, 21], Italy: [41.9, 12.5] };
const { width, height } = map.image;
for (const [name, [lat, lng]] of Object.entries(offices)) {
  const p = map.getPin({ lat, lng });
  console.log(name, ((p.x / width) * 100).toFixed(1) + '%', ((p.y / height) * 100).toFixed(1) + '%');
}
