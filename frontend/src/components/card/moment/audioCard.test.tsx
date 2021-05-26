import { render } from '@testing-library/react'

import { AudioVariantCard } from './audioCard'

describe('AudioVariantCard Component', () => {
  const audioVariantCard = (
    <AudioVariantCard variant="audio" audioSrc="mySource" />
  )

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
