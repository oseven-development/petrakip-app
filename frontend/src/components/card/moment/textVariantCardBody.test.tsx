import { render } from '@testing-library/react'

import { TextVariantCardBody } from './textVariantCardBody'

describe('TextVariantCard Component', () => {
  const audioVariantCard = (
    <TextVariantCardBody variant="text" text="mySource" />
  )

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
