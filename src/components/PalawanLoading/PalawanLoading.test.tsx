// Ensure a DOM is available when running tests under environments
// (like `bun test`) that don't provide `document` by default.
if (typeof document === 'undefined') {
    // Lazily require jsdom to avoid adding runtime cost elsewhere
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM('<!doctype html><html><body></body></html>')
    // copy common window properties to global
    // @ts-ignore
    global.window = dom.window
    // @ts-ignore
    global.document = dom.window.document
    // @ts-ignore
    global.navigator = { userAgent: 'node.js' }
    try {
        // assign common globals used by testing libraries
        // @ts-ignore
        global.HTMLElement = dom.window.HTMLElement
        // @ts-ignore
        global.Element = dom.window.Element
        // @ts-ignore
        global.Node = dom.window.Node
        // @ts-ignore
        global.Event = dom.window.Event
        // @ts-ignore
        global.CustomEvent = dom.window.CustomEvent
        // @ts-ignore
        global.getComputedStyle = dom.window.getComputedStyle
        // provide a basic requestAnimationFrame
        // @ts-ignore
        global.requestAnimationFrame = dom.window.requestAnimationFrame ? dom.window.requestAnimationFrame.bind(dom.window) : (cb) => setTimeout(cb, 0)
    } catch (err) {
        // ignore assignment errors in restrictive runtimes
    }
}

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import PalawanLoading from './index'

describe('PalawanLoading', () => {
    it('renders without crashing', () => {
        const { container } = render(<PalawanLoading />)
        const svg = container.querySelector('svg')
        expect(svg).toBeInTheDocument()
    })

    it('applies custom size', () => {
        const { container } = render(<PalawanLoading size="100px" />)
        const containerDiv = container.firstChild
        expect(containerDiv).toHaveStyle({ maxWidth: '100px' })
    })

    it('applies green variant', () => {
        const { container } = render(<PalawanLoading isGreen={true} />)
        const svg = container.querySelector('svg')
        expect(svg).toHaveClass('pgc-green')
    })
})