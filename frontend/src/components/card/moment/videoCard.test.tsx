import { render } from '@testing-library/react'

import { VideoVariantCard } from './videoCard'

describe('VideoVariantCard Component', () => {
  const audioVariantCard = (
    <VideoVariantCard variant="video" videoSrc="mySource" />
  )

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
