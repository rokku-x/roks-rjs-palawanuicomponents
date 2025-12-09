# roks-rjs-palawanuicomponents

A React component library for Palawan UI needs

## Requirements

- React >= 17.0.0
- React DOM >= 17.0.0

## Installation

npm install roks-rjs-palawanuicomponents

## Usage

```tsx
import { PalawanLoading } from 'roks-rjs-palawanuicomponents';
import 'roks-rjs-palawanuicomponents/style.css';

function App() {
  return <PalawanLoading />;
}
```

## Development

npm run dev

npm run build

## CLI: render-logo

This project provides a small CLI to render logo components to SVG and PNG from the TSX components.

- Script: `scripts/render-logo.js`
- Npm script: `npm run render:logo -- <ComponentName> [flags]`
- When the package is published, the bin is exposed as `render-logo` and can be run via `npx`.

Default behavior
- If `--out` is not provided, outputs are written to `./logoOutput/` in the current working directory. The PNG will be `logoOutput/<ComponentName>.png` and the SVG (if written) will be `logoOutput/<ComponentName>.svg`.

Flags
- `--out <file>`: Output file (PNG or SVG). If extension is `.svg` the script writes SVG and skips rasterizing.
- `--svg-out <file>`: Write rendered SVG to this path.
- `--write-svg`: Derive an SVG path from `--out` and write the SVG too.
- `--height <n>` / `--width <n>`: Size passed to the component and to the rasterizer.
- `--prop key=value`: Single prop to pass to the component (coerces numbers and booleans).
- `--props '{"key":value,...}'`: JSON props object.

Examples

1) Render PNG + SVG into `logoOutput` (defaults):

```bash
node ./scripts/render-logo.js PalawanPayLogo --height 1000 --write-svg
# writes logoOutput/PalawanPayLogo.png and logoOutput/PalawanPayLogo.svg
```

2) Explicit paths:

```bash
node ./scripts/render-logo.js PEPPLogo --height 800 --out logoOutput/PEPPLogo.png --svg-out logoOutput/PEPPLogo.svg
```

3) Multiple props via JSON:

```bash
node ./scripts/render-logo.js PEPPLogo --props '{"height":800,"maskOverlapping":true,"greenShade":"#31713C"}' --out logoOutput/PEPPLogo.png
```

4) Use npm script (pass args after `--`):

```bash
npm run render:logo -- PalawanPayLogo --height 1000 --prop greenShade=#00ff00 --write-svg
```

5) Test npx locally (from repo root):

```bash
npx . PalawanPayLogo --height 200 --write-svg
```

Notes
- The script uses `esbuild-register` to import TSX components at runtime; install dev dependencies before running locally (`npm install`).
- When published, `npx roks-rjs-palawanuicomponents render-logo ...` will be available.
 - The script uses `esbuild-register` to import TSX components at runtime; install dev dependencies before running locally (`npm install`).
 - When published, `npx roks-rjs-palawanuicomponents render-logo ...` will be available.

Note about PNG / `sharp` when using `npx`
 - The CLI uses `sharp` to rasterize SVG -> PNG. When running via `npx` (remote package), devDependencies like `sharp` are not installed by default, so you may see "Cannot find module 'sharp'".
 - Workarounds:
  1. Install `sharp` locally and run the CLI from the project or globally: `npm install --save sharp` then run the command.
  2. Use `npx` to pull `sharp` on-the-fly with the `-p` flag: 
    ```bash
    npx -p sharp -p roks-rjs-palawanuicomponents -- render-logo PalawanPayLogo --height 1000 --out logo.png
    ```
    This temporarily installs `sharp` into the runner environment so PNG output works.
  3. If you prefer not to install `sharp`, instruct the CLI to write SVG only (it will fall back to writing an SVG file instead of a PNG):
    ```bash
    npx . PalawanPayLogo --out logoOutput/PalawanPayLogo.svg
    ```

Quick npx commands (copy-paste)

- Run the CLI from the local repository (no publish required):

```bash
# from the repo root
npx . render-logo PalawanPayLogo --height 200 --write-svg
# or directly with node
node ./scripts/render-logo.js PalawanPayLogo --height 200 --write-svg
```

- Run the published package via npx and pull `sharp` on-the-fly so PNGs work:

```bash
npx -p sharp -p roks-rjs-palawanuicomponents -- render-logo PalawanPayLogo --height 1000 --out logo.png
```

- Run the GitHub repo directly (no publish) and pull `sharp` on-the-fly:

```bash
npx -p sharp -p github:rokku-x/roks-rjs-palawanuicomponents -- render-logo PalawanPayLogo --height 1000 --out logo.png
```

- Remote npx (without `sharp`) — write SVG only (PNG will be skipped):

```bash
npx roks-rjs-palawanuicomponents PalawanPayLogo --height 200 --out logoOutput/PalawanPayLogo.svg
```

Notes:
- Published `npx` users who want PNG output without passing `-p sharp` will need `sharp` in the package `dependencies` (currently it is a `devDependency` in this repo).
- For quick local testing, `npx .` is the simplest approach.

## Library Components

This package exports multiple React logo components (each has a default export). All components accept the base `LogoProps` plus component-specific props where noted. `LogoProps` includes:

- `id?: string`
- `className?: string`
- `style?: React.CSSProperties`
- `variant?: number` (component-specific variants; see component docs)
- `width?: number | string`
- `height?: number | string`

Available components

- `PalawanPayLogo` — main PalawanPay logo. Extra props: `greenShade`, `goldShade`, `subGoldShade`, `blocksShade`, `outlineShade`, `maskOverlapping` (see source for color defaults). Use `height` or `width` to control size.
- `PEPPLogo` — PEPP logo. Accepts `height` / `width`.
- `PGCLogo` — PGC logo. Accepts `height` / `width`.
- `PPSLogo` — PPS logo. Accepts `height` / `width`.
- `PPayText` — Pay text variant component. Accepts `height` / `width`.
- `PPSPEPPLogo` — PPS-PEPP composite logo. Accepts `height` / `width`.
- `PPSPEPPPPayLogo` — PPS-PEPP pay variant. Accepts `height` / `width`.
- `PalawanLoading` — small loading spinner component. Accepts `height` / `width`.

- `PalawanLoading` — animated loading spinner with configurable styling and animation controls.
  - Props (all optional):
    - `size: number | string` — visual size of the component (default: `100`). Controls container width/height via CSS.
    - `isGreen: boolean` — switch theme to green (true) or gold (false). Default: `false`.
    - `speed: number` — speed multiplier for spin and animations (default: `1`). Higher = faster.
    - `hasGlow: boolean` — whether glow animation is applied (default: `true`).
    - `hasShadow: boolean` — whether drop-shadows are applied (default: `true`).
    - `stopSpin: boolean` — if true, stops rotation animations and leaves artwork static (default: `false`).
    - `stopStarAnim: boolean` — if true, disables the star stroke-draw animation (default: `false`).
    - `useRawCircleElements: boolean` — if true, renders circle elements instead of stroked arc paths; useful for precise rasterization or editing (default: `false`).

  - Styling / CSS variables
    - The component imports `index.css` and exposes CSS variables to control theme colors and animation speed. Key variables:
      - `--pgc-speed-multiplier` — controls all spin/draw timings (set via the `speed` prop).
      - Color tokens are provided and switched by theme classes (`pgc-gold` / `pgc-green`) and include `--pgc-base-rgb`, `--pgc-warm-rgb`, `--pgc-soft-rgb`, `--pgc-bright-rgb`.

  - Behavior
    - The component composes several rotating rings and a star-shaped stroke animation. Rotation classes `rot-fast`, `rot-mid`, and `rot-slow` are applied to different groups; these respect `--pgc-speed-multiplier`.
    - `has-glow` and `has-shadow` classes toggle glow and shadow effects (driven by `hasGlow` and `hasShadow` props).
    - Use `stopSpin` to freeze all rotation and `stopStarAnim` to stop the star drawing animation (useful for paused states or screenshots).

  - Example usage

  ```tsx
  import PalawanLoading from 'roks-rjs-palawanuicomponents/PalawanLoading';

  // basic
  <PalawanLoading size={120} />

  // green, faster, no glow
  <PalawanLoading size={160} isGreen={true} speed={1.5} hasGlow={false} />

  // static (no spin), save SVG-friendly shapes
  <PalawanLoading size={200} stopSpin={true} useRawCircleElements={true} />
  ```

Import examples

```tsx
import PalawanPayLogo from 'roks-rjs-palawanuicomponents/PalawanPayLogo';
import PEPPLogo from 'roks-rjs-palawanuicomponents/PEPPLogo';

function Example() {
  return (
    <div>
      <PalawanPayLogo height={120} greenShade="#31713C" />
      <PEPPLogo height={80} />
    </div>
  );
}
```

If you need a detailed prop reference per component, open the component file under `src/components/<ComponentName>/index.tsx` — each component documents its own custom props (for colors, masks, or other variants).

