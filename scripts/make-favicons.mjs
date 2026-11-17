// Regenerates the raster favicon fallbacks from the SVG favicon.
// Run from the repo root after changing the SVG:  node scripts/make-favicons.mjs
//
//   public/favicon.ico           16, 32 and 48 px PNGs in one .ico (browsers
//                                without SVG favicons, and search crawlers)
//   public/apple-touch-icon.png  180 px full-bleed square (iOS home screen;
//                                iOS rounds the corners itself)
//
// Modern browsers keep using the SVG (see the icon links in Layout.astro).
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const SVG = 'public/favicons/blue.svg';
const SVG_VIEWBOX = 32; // the SVG's viewBox width
const CORNER_FILL = '#325fbf'; // the SVG's background color; fills the rounded corners on iOS

const svg = await readFile(SVG);

// Render at 4x the target size, then downscale, for clean small icons.
const png = (size, flatten) => {
  let image = sharp(svg, { density: (72 * size * 4) / SVG_VIEWBOX }).resize(size, size);
  if (flatten) image = image.flatten({ background: flatten });
  return image.png().toBuffer();
};

// .ico = 6-byte header, one 16-byte entry per image, then the PNG data.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => png(size)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type 1 = icon
header.writeUInt16LE(images.length, 4);
let offset = header.length + 16 * images.length;
const entries = images.map((data, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizes[i], 0); // width
  entry.writeUInt8(sizes[i], 1); // height
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += data.length;
  return entry;
});

await writeFile('public/favicon.ico', Buffer.concat([header, ...entries, ...images]));
await writeFile('public/apple-touch-icon.png', await png(180, CORNER_FILL));
console.log(`wrote public/favicon.ico (${sizes.join(', ')} px) and public/apple-touch-icon.png (180 px)`);
