import { render } from '@testing-library/react'

import { MomentCard } from './momentCard'

describe('MomentCard Component', () => {
  test.each`
    variant    | propType      | context
    ${'text'}  | ${'text'}     | ${'this is my text'}
    ${'image'} | ${'imageSrc'} | ${'https://imageSrc.de'}
    ${'video'} | ${'videoSrc'} | ${'https://videoSrc.de'}
    ${'audio'} | ${'audioSrc'} | ${'https://audioSrc.de'}
  `(
    '`when provide $variant variant the card should render a $variant card`',
    ({ variant, propType, context }) => {
      const title = ''
      const momentId = 123
      const { container } = render(
        //@ts-ignoreu
        <MomentCard {...{ title, momentId, variant, [propType]: context }} />,
      )
      expect(container).toMatchSnapshot()
    },
  )
})
