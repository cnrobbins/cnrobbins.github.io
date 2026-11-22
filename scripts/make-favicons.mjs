// Regenerates the raster favicon fallbacks from the logo (src/assets/logo.svg).
// Run from the repo root after changing the logo:  node scripts/make-favicons.mjs
//
//   public/favicon.ico           16, 32 and 48 px PNGs in one .ico (browsers
//                                without SVG favicons, and search crawlers)
//   public/apple-touch-icon.png  180 px, logo on a white square (iOS home
//                                screen; iOS rounds the corners itself)
//
// Both use the active palette's logo color. Modern browsers use the SVG
// favicons built from the same logo (src/pages/favicons/[name].svg.ts).
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { squareLogoSvg } from '../src/lib/logo-svg.mjs';
import { ACTIVE_PALETTE, PALETTES } from '../src/theme.config.ts';

const COLOR = PALETTES[ACTIVE_PALETTE].logo.light;
const TOUCH_BACKGROUND = '#ffffff';
const TOUCH_PADDING = 0.15; // empty margin on each side of the iOS icon

const logo = await readFile('src/assets/logo.svg', 'utf8');

// Render at 4x the target size, then downscale, for clean small icons.
const png = (size, { padding = 0, background } = {}) => {
  const svg = squareLogoSvg(logo, { color: COLOR, padding, size: size * 4 });
  let image = sharp(Buffer.from(svg)).resize(size, size);
  if (background) image = image.flatten({ background });
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
await writeFile(
  'public/apple-touch-icon.png',
  await png(180, { padding: TOUCH_PADDING, background: TOUCH_BACKGROUND }),
);
console.log(`wrote public/favicon.ico (${sizes.join(', ')} px) and public/apple-touch-icon.png (180 px)`);
