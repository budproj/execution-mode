import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditableTextAreaValue from './editable-text-area-value'

describe('component interactions', () => {
  it('should change the color of the text upon mouse hover', () => {
    const wrapper = enzyme.mount(<EditableTextAreaValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')

    const textComponent = wrapper.find('Stack').find('Text')

    expect(textComponent.prop('color')).toEqual('brand.500')
  })

  it('should show the pen icon upon mouse hover', () => {
    const wrapper = enzyme.mount(<EditableTextAreaValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')

    const penIcon = wrapper.find('Pen')

    expect(penIcon.prop('opacity')).toEqual(1)
  })

  it('should hide the pen icon upon mouse leave', () => {
    const wrapper = enzyme.mount(<EditableTextAreaValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')
    stack.simulate('mouseLeave')

    const penIcon = wrapper.find('Pen')

    expect(penIcon.prop('opacity')).toEqual(0)
  })

  it('should change back the color upon mouse leave', () => {
    const wrapper = enzyme.mount(<EditableTextAreaValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')
    stack.simulate('mouseLeave')

    const textComponent = wrapper.find('Stack').find('Text')

    expect(textComponent.prop('color')).toEqual('black.900')
  })

  it('should show the textarea input when the user tries to edit', () => {
    const wrapper = enzyme.mount(<EditableTextAreaValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('click')

    const textArea = wrapper.find('Textarea')

    expect(textArea.length).toEqual(1)
  })

  it('should leave the edit mode upon blur', () => {
    const wrapper = enzyme.mount(<EditableTextAreaValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('click')

    const textArea = wrapper.find('Textarea')
    textArea.simulate('blur')

    const newTextAreaValue = wrapper.find('Textarea')

    expect(newTextAreaValue.length).toEqual(0)
  })
})

describe('fallback value', () => {
  it('should change the color if no value is provided', () => {
    const wrapper = enzyme.mount(<EditableTextAreaValue />)

    const textComponent = wrapper.find('Stack').find('Text')

    expect(textComponent.prop('color')).toEqual('gray.400')
  })

  it('should render the provided fallback value', () => {
    const customFallback = faker.random.word()
    const wrapper = enzyme.mount(<EditableTextAreaValue customFallbackValue={customFallback} />)

    const textComponent = wrapper.find('Stack').find('Text')

    expect(textComponent.text()).toEqual(customFallback)
  })
})
