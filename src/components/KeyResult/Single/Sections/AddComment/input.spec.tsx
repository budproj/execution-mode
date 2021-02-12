import enzyme from 'enzyme'
import faker from 'faker'
import * as formik from 'formik'
import React from 'react'
import sinon from 'sinon'

import KeyResultSectionAddCommentInput from './input'

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('should use a full rounded box when the input has a single line', () => {
    const fakeText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const box = wrapper.find('Box')

    expect(box.prop('borderRadius')).toEqual('full')
  })

  it('should descrease the border radius based on the number of lines of the input', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const fakeContext = {
      rowHeight: 10,
    }
    const newHeight = 100
    const textArea = wrapper.find('ForwardRef(TextareaAutosize)')
    textArea.simulate('heightChange', newHeight, fakeContext)

    const box = wrapper.find('Box')

    expect(box.prop('borderRadius')).toEqual(6)
  })

  it('should change the border color if the input is focused', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const textArea = wrapper.find('ForwardRef(TextareaAutosize)')
    textArea.simulate('focus')

    const box = wrapper.find('Box')

    expect(box.prop('borderColor')).toEqual('brand.400')
  })

  it('should change the box shadow if the input is focused', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const textArea = wrapper.find('ForwardRef(TextareaAutosize)')
    textArea.simulate('focus')

    const box = wrapper.find('Box')

    expect(box.prop('boxShadow')).toEqual('0 0 0 1px #6F6EFF')
  })

  it('should keep the same border color if the input is not focused', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const textArea = wrapper.find('ForwardRef(TextareaAutosize)')
    textArea.simulate('blur')

    const box = wrapper.find('Box')

    expect(box.prop('borderColor')).toEqual('gray.300')
  })

  it('should not have a box shadow if the input is not focused', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const textArea = wrapper.find('ForwardRef(TextareaAutosize)')
    textArea.simulate('blur')

    const box = wrapper.find('Box')

    expect(box.prop('boxShadow')).toEqual('none')
  })

  it('should keep the same border color if the input was focused, but it is not anymore', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const textArea = wrapper.find('ForwardRef(TextareaAutosize)')
    textArea.simulate('focus')
    textArea.simulate('blur')

    const box = wrapper.find('Box')

    expect(box.prop('borderColor')).toEqual('gray.300')
  })

  it('should not have a box shadow if the input was focused, but it is not anymore', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const textArea = wrapper.find('ForwardRef(TextareaAutosize)')
    textArea.simulate('focus')
    textArea.simulate('blur')

    const box = wrapper.find('Box')

    expect(box.prop('boxShadow')).toEqual('none')
  })

  it('should display a spinner if the component is being loaded', () => {
    const fakeOriginalText = faker.random.word()
    sinon.stub(formik, 'useFormikContext').returns({ values: { text: fakeOriginalText } } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput isLoading />)

    const iconButton = wrapper.find('IconButton')
    const icon = iconButton.prop<any>('icon')

    expect(icon.type.displayName).toEqual('Spinner')
  })

  it('should display a spinner if the user submitted the form', () => {
    const fakeOriginalText = faker.random.word()
    sinon
      .stub(formik, 'useFormikContext')
      .returns({ values: { text: fakeOriginalText }, isSubmitting: true } as any)

    const wrapper = enzyme.shallow(<KeyResultSectionAddCommentInput />)

    const iconButton = wrapper.find('IconButton')
    const icon = iconButton.prop<any>('icon')

    expect(icon.type.displayName).toEqual('Spinner')
  })
})
