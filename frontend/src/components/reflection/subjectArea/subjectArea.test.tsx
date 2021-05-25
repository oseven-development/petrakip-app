import { render, act, fireEvent } from '@testing-library/react'

import { SubjectArea } from './subjectArea'

const testTopics = [
  {
    id: 'element-1',
    lable: '1 Fachinhalte',
    describe:
      'Die Lehrperson verfügt über fachwissenschaftliches und fachdidaktisches Wissen, versteht die Inhalte, Strukturen und zentralen Forschungsmethoden ihrer Fachbereiche und sie kann Lernsituationen schaffen, die die fachwissenschaftlichen und fachdidaktischen Aspekte für die Lernenden bedeutsam machen.',
    subListItems: [
      {
        id: 'element-1.1',
        lable: '1.1 Fachwissen und Didaktik',
        done: false,
      },
      {
        id: 'element-1.2',
        lable: '1.2 Fachwissen und Didaktik',
        done: true,
      },
    ],
  },
  {
    id: 'element-2',
    lable: '2 Entwicklungsprozesse',
    describe:
      'Die Lehrperson versteht, wie Kinder und Erwachsene lernen und sich entwickeln, und sie kann Lerngelegenheiten und Lernwege anbieten, welche die kognitive, soziale und persönliche Entwicklung unterstützen.',
    subListItems: [
      {
        id: 'element-2.1',
        lable: '2.1 Entwicklung der Lernenden',
        done: true,
      },
      {
        id: 'element-2.2',
        lable: '2.2 Erfahrungen und Vorwissen',
        done: true,
      },
    ],
  },
]

describe('main suite', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  const selectTopic = (
    <SubjectArea topicList={testTopics} selectValue={() => {}} />
  )

  test('renders without crashing', () => {
    const { container } = render(selectTopic)
    expect(container).toMatchSnapshot()
  })

  test('render sublist when click on element 1', () => {
    const { container } = render(selectTopic)
    const el = container.querySelector('[data-test="element-1"]')
    act(() => {
      if (el) fireEvent.click(el)
    })
    expect(container).toMatchSnapshot()
  })

  test('render sublist when click on element 2', () => {
    const { container } = render(selectTopic)
    const el = container.querySelector('[data-test="element-2"]')
    act(() => {
      if (el) fireEvent.click(el)
    })
    expect(container).toMatchSnapshot()
  })

  test('when click on chose later the function should emit chose later', () => {
    const mockFn = jest.fn()

    const { container } = render(
      <SubjectArea topicList={testTopics} selectValue={mockFn} />,
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
    mainElementId  | subElementId     | result
    ${'element-2'} | ${'element-2.1'} | ${'2.1 Entwicklung der Lernenden'}
    ${'element-2'} | ${'element-2.2'} | ${'2.2 Erfahrungen und Vorwissen'}
  `(
    '`when click on $subElementId the function should emit $result`',
    ({ mainElementId, subElementId, result }) => {
      const mockFn = jest.fn()

      const { container } = render(
        <SubjectArea topicList={testTopics} selectValue={mockFn} />,
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