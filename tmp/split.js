const fs = require('fs');
const svg = fs.readFileSync('public/right-side.svg', 'utf8');
const lines = svg.split('\n');
const line7 = lines[6]; // 0-indexed
const chunkSize = 40000;
for (let i = 0; i < line7.length; i += chunkSize) {
  fs.writeFileSync(`tmp/part${Math.floor(i / chunkSize) + 1}.txt`, line7.substring(i, i + chunkSize));
}
