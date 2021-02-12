import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import Alert from './alert'

describe('component expectations', () => {
  it('can customize the padding options', () => {
    const fakePadding = faker.random.number()

    const wrapper = enzyme.mount(
      <Alert
        wrapperPadding={fakePadding}
        title={faker.random.word()}
        description={faker.random.word()}
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
      />,
    )

    const box = wrapper.find('Box')

    expect(box.prop('p')).toEqual(fakePadding)
  })

  it('can customize the padding bottom options', () => {
    const fakePadding = faker.random.number()

    const wrapper = enzyme.mount(
      <Alert
        wrapperPaddingBottom={fakePadding}
        title={faker.random.word()}
        description={faker.random.word()}
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
      />,
    )

    const box = wrapper.find('Box')

    expect(box.prop('pb')).toEqual(fakePadding)
  })

  it('uses the provided padding options if no padding bottom is provided', () => {
    const fakePadding = faker.random.number()

    const wrapper = enzyme.mount(
      <Alert
        wrapperPadding={fakePadding}
        title={faker.random.word()}
        description={faker.random.word()}
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
      />,
    )

    const box = wrapper.find('Box')

    expect(box.prop('pb')).toEqual(fakePadding)
  })

  it('uses a given title', () => {
    const fakeTitle = faker.random.word()

    const wrapper = enzyme.mount(
      <Alert
        title={fakeTitle}
        description={faker.random.word()}
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
      />,
    )

    const alertTitle = wrapper.find('div.chakra-alert__title')

    expect(alertTitle.text()).toEqual(fakeTitle)
  })

  it('uses a given description', () => {
    const fakeDesc = faker.random.word()

    const wrapper = enzyme.mount(
      <Alert
        title={faker.random.word()}
        description={fakeDesc}
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
      />,
    )

    const alertDesc = wrapper.find('div.chakra-alert__desc')

    expect(alertDesc.text()).toEqual(fakeDesc)
  })
})

describe('component lifecycle', () => {
  it('asks to close the alert after the expected amount of seconds if it is open', async () => {
    const spy = sinon.spy()

    enzyme.mount(
      <Alert
        isOpen
        title={faker.random.word()}
        description={faker.random.word()}
        autoHideTTLInMilliseconds={500}
        onClose={spy}
      />,
    )

    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 500)
    })

    expect(spy.called).toEqual(true)
  })
})
