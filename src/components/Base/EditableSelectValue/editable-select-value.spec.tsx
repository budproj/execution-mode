import { MenuItemOption } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import EditableSelectValue from './editable-select-value'

describe('component interactions', () => {
  it('should change the color of the text upon mouse hover', () => {
    const wrapper = enzyme.shallow(
      <EditableSelectValue value={faker.random.word()} onChange={sinon.fake()}>
        <MenuItemOption>{faker.random.word()}</MenuItemOption>
      </EditableSelectValue>,
    )

    const menuButton = wrapper.find('MenuButton')
    menuButton.simulate('mouseEnter')

    const newMenuButton = wrapper.find('MenuButton')

    expect(newMenuButton.prop('color')).toEqual('brand.500')
  })

  it('should show the pen icon upon mouse hover', () => {
    const wrapper = enzyme.shallow(
      <EditableSelectValue value={faker.random.word()} onChange={sinon.fake()}>
        <MenuItemOption>{faker.random.word()}</MenuItemOption>
      </EditableSelectValue>,
    )

    const menuButton = wrapper.find('MenuButton')
    menuButton.simulate('mouseEnter')

    const penIcon = wrapper.find('PenIcon')

    expect(penIcon.prop('opacity')).toEqual(1)
  })

  it('should hide the pen icon upon mouse leave', () => {
    const wrapper = enzyme.shallow(
      <EditableSelectValue value={faker.random.word()} onChange={sinon.fake()}>
        <MenuItemOption>{faker.random.word()}</MenuItemOption>
      </EditableSelectValue>,
    )

    const menuButton = wrapper.find('MenuButton')
    menuButton.simulate('mouseEnter')
    menuButton.simulate('mouseLeave')

    const penIcon = wrapper.find('PenIcon')

    expect(penIcon.prop('opacity')).toEqual(0)
  })

  it('should change back the color upon mouse leave', () => {
    const wrapper = enzyme.shallow(
      <EditableSelectValue value={faker.random.word()} onChange={sinon.fake()}>
        <MenuItemOption>{faker.random.word()}</MenuItemOption>
      </EditableSelectValue>,
    )

    const menuButton = wrapper.find('MenuButton')
    menuButton.simulate('mouseEnter')
    menuButton.simulate('mouseLeave')

    const newMenuButton = wrapper.find('MenuButton')

    expect(newMenuButton.prop('color')).toEqual('black.900')
  })
})

describe('fallback value', () => {
  it('should change the color if no value is provided', () => {
    const wrapper = enzyme.shallow(
      <EditableSelectValue onChange={sinon.fake()}>
        <MenuItemOption>{faker.random.word()}</MenuItemOption>
      </EditableSelectValue>,
    )

    const newMenuButton = wrapper.find('MenuButton')

    expect(newMenuButton.prop('color')).toEqual('gray.400')
  })

  it('should render the provided fallback value', () => {
    const customFallback = faker.random.word()
    const wrapper = enzyme.shallow(
      <EditableSelectValue customFallbackPlaceholder={customFallback} onChange={sinon.fake()}>
        <MenuItemOption>{faker.random.word()}</MenuItemOption>
      </EditableSelectValue>,
    )

    const newMenuButton = wrapper.find('MenuButton')

    expect(newMenuButton.text()).toEqual(`${customFallback}<PenIcon />`)
  })
})
