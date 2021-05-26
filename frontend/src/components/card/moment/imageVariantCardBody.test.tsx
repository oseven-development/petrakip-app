import { render } from '@testing-library/react'

import { ImageVariantCardBody } from './imageVariantCardBody'

describe('ImageVariantCard Component', () => {
  const audioVariantCard = (
    <ImageVariantCardBody variant="image" imageSrc="mySource" />
  )

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
