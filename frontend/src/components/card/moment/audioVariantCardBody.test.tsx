import { render } from '@testing-library/react'

import { AudioVariantCardBody } from './audioVariantCardBody'

describe('AudioVariantCard Component', () => {
  const audioVariantCard = (
    <AudioVariantCardBody variant="audio" audioSrc="mySource" />
  )

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
