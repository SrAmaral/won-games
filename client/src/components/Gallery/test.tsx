import 'match-media-mock'
import { fireEvent, render, screen } from '@testing-library/react'

import Gallery from '.'
import { renderWithTheme } from 'utils/tests/helpers'

import mockItems from './mock'
import { NONAME } from 'dns'

describe('<Gallery />', () => {
  it('should render the thumbnails as buttons', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    expect(
      screen.getByRole('button', { name: /thumb - gallery image 1/i })
    ).toHaveAttribute('src', mockItems[0].src)
    expect(
      screen.getByRole('button', { name: /thumb - gallery image 2/i })
    ).toHaveAttribute('src', mockItems[1].src)
  })

  it('should open modal with selected image', async () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)

    // clicar no thumbnail
    fireEvent.click(
      screen.getByRole('button', { name: /Thumb - Gallery Image 2/i })
    )

    // espero que a imagem da thumbnail seja aberta
    const img = await screen.findByRole('img', { name: /Gallery Image 2/i })
    expect(img.parentElement?.parentElement).toHaveClass('slick-active')
  })

  it('should render open modal', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)
    // selecionar o nosso modal
    const modal = screen.getByLabelText('modal')

    // verificar se o Gallery tá escondido
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0, pointerEvents: 'none' })

    // clicar no botão de abrir o Gallery e verificar se ele abriu
    fireEvent.click(
      screen.getByRole('button', { name: /thumb - Gallery Image 1/i })
    )
    expect(modal.getAttribute('aria-hidden')).toBe('false')
    expect(modal).toHaveStyle({ opacity: 1 })
  })

  it('should render close modal when overlay or button clicked', () => {
    renderWithTheme(<Gallery items={mockItems.slice(0, 2)} />)
    // selecionar o nosso modal
    const modal = screen.getByLabelText('modal')

    // clicar no botão de abrir o Gallery e verificar se ele abriu
    fireEvent.click(
      screen.getByRole('button', { name: /thumb - Gallery Image 1/i })
    )

    //clical para fechar o modal
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }))
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })

  it('should render close modal when esc button is pressed', () => {
    const { container } = renderWithTheme(
      <Gallery items={mockItems.slice(0, 2)} />
    )
    // selecionar o nosso modal
    const modal = screen.getByLabelText('modal')

    // clicar no botão de abrir o Gallery e verificar se ele abriu
    fireEvent.click(
      screen.getByRole('button', { name: /thumb - Gallery Image 1/i })
    )

    //clical para fechar o modal
    fireEvent.keyUp(container, { key: 'Escape' })
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })
})
