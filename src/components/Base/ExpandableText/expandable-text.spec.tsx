import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ExpandableText from './expandable-text'

describe('component expectations', () => {
  it('displays only the first 240 characters of a big text', () => {
    const length = faker.random.number({ min: 241 })
    const text = faker.lorem.words(length)
    const chars = text.slice(0, length)

    const result = enzyme.mount(<ExpandableText text={chars} />)

    const textComponent = result.find('Text')

    const expectedText = `${text.slice(0, 240)}...`
    expect(textComponent.text()).toEqual(expectedText)
  })

  it('does not display the expand button if the original text has less than 240 characters', () => {
    const length = faker.random.number({ max: 240 })
    const text = faker.lorem.words(length)
    const chars = text.slice(0, length)

    const result = enzyme.mount(<ExpandableText text={chars} />)

    const button = result.find('Button')

    expect(button.length).toEqual(0)
  })

  it('displays the expand button if the original text has 241 characters of more', () => {
    const length = faker.random.number({ min: 241 })
    const text = faker.lorem.words(length)
    const chars = text.slice(0, length)

    const result = enzyme.mount(<ExpandableText text={chars} />)

    const button = result.find('Button')

    expect(button.length).toEqual(1)
  })

  it('displays the entire text after clicking on the expand button', () => {
    const length = faker.random.number({ min: 241 })
    const text = faker.lorem.words(length)
    const chars = text.slice(0, length)

    const result = enzyme.mount(<ExpandableText text={chars} />)

    const button = result.find('Button')
    button.simulate('click')

    const textComponent = result.find('Text')

    expect(textComponent.text()).toEqual(chars)
  })

  it('collapses again when clicking on the same button after expanding it', () => {
    const length = faker.random.number({ min: 241 })
    const text = faker.lorem.words(length)
    const chars = text.slice(0, length)

    const result = enzyme.mount(<ExpandableText text={chars} />)

    const expandButton = result.find('Button')
    expandButton.simulate('click')

    const collapseButton = result.find('Button')
    collapseButton.simulate('click')

    const textComponent = result.find('Text')

    const expectedText = `${text.slice(0, 240)}...`
    expect(textComponent.text()).toEqual(expectedText)
  })

  it('renders a single paragraph for each new line', () => {
    const numberOfParagraphs = faker.random.number({ min: 2, max: 10 })
    const paragraphs = [...new Array(numberOfParagraphs)].map(() => faker.lorem.paragraph())
    const text = paragraphs.join('\n')

    const result = enzyme.mount(<ExpandableText text={text} />)

    const expandButton = result.find('Button')
    expandButton.simulate('click')

    const textComponents = result.find('Text')

    expect(textComponents.length).toEqual(numberOfParagraphs)
  })
})

describe('component customizations', () => {
  it('should be able to customize the maximum allowed chars', () => {
    const maxAllowedChars = faker.random.number({ min: 241, max: 1000 })
    const length = faker.random.number({ min: maxAllowedChars + 1 })
    const text = faker.lorem.words(length)
    const chars = text.slice(0, length)

    const result = enzyme.mount(
      <ExpandableText text={chars} maxCollapsedLength={maxAllowedChars} />,
    )

    const textComponent = result.find('Text')

    const expectedText = `${text.slice(0, maxAllowedChars)}...`
    expect(textComponent.text()).toEqual(expectedText)
  })
})
