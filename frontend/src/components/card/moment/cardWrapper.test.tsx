import { render } from '@testing-library/react'

import { CardWrapper } from './cardWrapper'

describe('CardWrapper Component', () => {
  const myFalse: false = false
  const cardWrapper = (
    <CardWrapper title="Headline" momentId={123}>
      {myFalse}
      <h1>IAM A children</h1>
    </CardWrapper>
  )

  test('renders without crashing', () => {
    const { container } = render(cardWrapper)
    expect(container).toMatchSnapshot()
  })
})
