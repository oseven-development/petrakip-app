import { render, act, fireEvent } from '@testing-library/react'

import { TopicArea } from './reflectionTopicArea'

import testDataSet from '../../../../test/reflectionsetClean'

describe('main suite', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  const selectTopic = (
    <TopicArea topicList={testDataSet} selectValue={() => {}} />
  )

  test('renders without crashing', () => {
    const { container } = render(selectTopic)
    expect(container).toMatchSnapshot()
  })

  test('render sublist when click on 1 Fachinhalte', () => {
    const { container } = render(selectTopic)
    const el = container.querySelector('[data-test="1-fachinhalte"]')
    act(() => {
      if (el) fireEvent.click(el)
    })
    expect(container).toMatchSnapshot()
  })

  test('render sublist when click on 4 Unterrichtsstrategien', () => {
    const { container } = render(selectTopic)
    const el = container.querySelector('[data-test="4-unterrichtsstrategien"]')
    act(() => {
      if (el) fireEvent.click(el)
    })
    expect(container).toMatchSnapshot()
  })

  test('when click on chose later the function should emit chose later', () => {
    const mockFn = jest.fn()

    const { container } = render(
      <TopicArea topicList={testDataSet} selectValue={mockFn} />,
    )

    const el = container.querySelector('[data-test="choseLater"]')
    act(() => {
      if (el) fireEvent.click(el)
    })

    jest.runAllTimers()
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenLastCalledWith('Später wählen')
  })

  test.each`
    mainElementId                  | subElementId                    | result
    ${'5-motivieren-und-anleiten'} | ${'5.3-zeitmanagement'}         | ${{ topic: '5 Motivieren und Anleiten', subTopic: '5.3 Zeitmanagement' }}
    ${'7-planen-und-evaluieren'}   | ${'7.1-leitideen-und-lehrplan'} | ${{ topic: '7 Planen und Evaluieren', subTopic: '7.1 Leitideen und Lehrplan' }}
  `(
    '`when click on $subElementId the function should emit $result`',
    ({ mainElementId, subElementId, result }) => {
      const mockFn = jest.fn()

      const { container } = render(
        <TopicArea topicList={testDataSet} selectValue={mockFn} />,
      )
      const el = container.querySelector(`[data-test="${mainElementId}"]`)
      act(() => {
        if (el) fireEvent.click(el)
      })

      const subClick = container.querySelector(`[data-test="${subElementId}"]`)
      act(() => {
        if (subClick) fireEvent.click(subClick)
      })
      jest.runAllTimers()
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenLastCalledWith(result)
    },
  )
})
