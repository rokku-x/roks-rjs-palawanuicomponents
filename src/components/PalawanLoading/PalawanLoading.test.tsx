import { render } from '@testing-library/react'
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