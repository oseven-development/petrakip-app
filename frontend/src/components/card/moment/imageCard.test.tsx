import { render } from '@testing-library/react'

import { ImageVariantCard } from './imageCard'

describe('ImageVariantCard Component', () => {
  const audioVariantCard = (
    <ImageVariantCard variant="image" imageSrc="mySource" />
  )

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
