// Square, single-color versions of the logo artwork (src/assets/logo.svg).
// Used by the SVG favicons (src/pages/favicons/[name].svg.ts) and by the raster
// fallbacks (scripts/make-favicons.mjs).
//
// The artwork can be any single-color SVG with a viewBox, e.g. an Illustrator
// export: its own fill colors are overridden, and it is centered in a square
// because browser tabs (and Google's search-result icon) expect square icons.

/**
 * @param {string} svg The logo artwork's SVG source.
 * @param {object} options
 * @param {string} options.color Fill color.
 * @param {string} [options.darkColor] Fill color when the browser is in dark mode.
 * @param {number} [options.padding] Empty margin on each side, as a fraction of the icon (0 to under 0.5).
 * @param {number} [options.size] Width and height in pixels, for rasterizing; omit for a scalable icon.
 * @returns {string}
 */
export function squareLogoSvg(svg, { color, darkColor, padding = 0, size }) {
  const match = svg.match(/<svg\b[^>]*\bviewBox="([^"]+)"/);
  if (!match) throw new Error('The logo SVG needs a viewBox.');
  const [x, y, width, height] = match[1].trim().split(/[\s,]+/).map(Number);
  const side = Math.max(width, height) / (1 - 2 * padding);
  const viewBox = [x - (side - width) / 2, y - (side - height) / 2, side, side]
    .map((n) => Number(n.toFixed(3)))
    .join(' ');
  const sizeAttributes = size ? ` width="${size}" height="${size}"` : '';
  // CSS outranks the artwork's fill attributes, so these rules recolor every shape.
  const style =
    `*{fill:${color}}` + (darkColor ? `@media (prefers-color-scheme:dark){*{fill:${darkColor}}}` : '');

  return svg
    .replace(/<\?xml[^>]*\?>\s*/, '')
    .replace(/<svg\b[^>]*>/, (tag) =>
      tag
        .replace(/\s(?:viewBox|width|height)="[^"]*"/g, '')
        .replace(/>$/, ` viewBox="${viewBox}"${sizeAttributes}><style>${style}</style>`),
    );
}
