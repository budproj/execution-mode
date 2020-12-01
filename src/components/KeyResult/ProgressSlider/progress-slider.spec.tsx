import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { mountWithIntl, actWait } from 'lib/enzyme'

import ProgressSlider from './progress-slider'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('opens the popover as soon as the provided ID was marked as open', async () => {
    sinon.stub(recoil, 'useRecoilState').returns([true, sinon.fake()])

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <ProgressSlider id={faker.random.number()} />
      </recoil.RecoilRoot>,
    )
    await actWait()

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(true)
  })

  it('keeps the popover closed when needed', async () => {
    sinon.stub(recoil, 'useRecoilState').returns([false, sinon.fake()])

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <ProgressSlider id={faker.random.number()} />
      </recoil.RecoilRoot>,
    )
    await actWait()

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(false)
  })
})
