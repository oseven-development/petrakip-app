import { render } from '@testing-library/react'

import { TextVariantCard } from './textCard'

describe('TextVariantCard Component', () => {
  const audioVariantCard = <TextVariantCard variant="text" text="mySource" />

  test('renders without crashing', () => {
    const { container } = render(audioVariantCard)
    expect(container).toMatchSnapshot()
  })
})
