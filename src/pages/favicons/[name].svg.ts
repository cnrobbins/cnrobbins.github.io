// Browser-tab icons: the logo (src/assets/logo.svg) in each palette's and page
// theme's colors, built as /favicons/<name>.svg. Layout.astro links the one for
// the current page; each icon switches to its dark color in a dark-mode browser.
import type { APIRoute, GetStaticPaths } from 'astro';
import logo from '../../assets/logo.svg?raw';
import { squareLogoSvg } from '../../lib/logo-svg.mjs';
import { FAVICON_COLORS } from '../../theme.config';

export const getStaticPaths = (() =>
  Object.keys(FAVICON_COLORS).map((name) => ({ params: { name } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const { light, dark } = FAVICON_COLORS[params.name as string];
  return new Response(squareLogoSvg(logo, { color: light, darkColor: dark }), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
};
