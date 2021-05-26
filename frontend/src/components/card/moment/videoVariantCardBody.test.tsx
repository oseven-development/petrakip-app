import { render } from '@testing-library/react'

import { VideoVariantCardBody } from './videoVariantCardBody'

describe('VideoVariantCard Component', () => {
  const audioVariantCard = (
    <VideoVariantCardBody variant="video" videoSrc="mySource" />
  )

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
