import { ApolloProvider } from '@apollo/client'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { mountWithIntl, actWait } from 'lib/enzyme'

import ProgressSlider from './progress-slider'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('opens the popover as soon as the provided ID was marked as open', async () => {
    const stub = sinon.stub(recoil, 'useRecoilState')
    const popoverOpenSelectorMatcher = sinon.match((selector: recoil.RecoilState<boolean>) => {
      return selector.key.includes('POPOVER_OPEN')
    })
    stub.withArgs(popoverOpenSelectorMatcher).returns([true, sinon.fake()])
    stub.callThrough()

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <ApolloProvider client={sinon.fake() as any}>
          <ProgressSlider id={faker.random.number()} />
        </ApolloProvider>
      </recoil.RecoilRoot>,
    )
    await actWait()

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(true)
  })

  it('keeps the popover closed when needed', async () => {
    const stub = sinon.stub(recoil, 'useRecoilState')
    const popoverOpenSelectorMatcher = sinon.match((selector: recoil.RecoilState<boolean>) => {
      return selector.key.includes('POPOVER_OPEN')
    })
    stub.withArgs(popoverOpenSelectorMatcher).returns([false, sinon.fake()])
    stub.callThrough()

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <ApolloProvider client={sinon.fake() as any}>
          <ProgressSlider id={faker.random.number()} />
        </ApolloProvider>
      </recoil.RecoilRoot>,
    )
    await actWait()

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(false)
  })

  it('reverts the current progress if we close the popover', async () => {
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useRecoilState')
    const oldProgressReport = faker.random.number()
    const currentProgressSelectorMatcher = sinon.match((selector: recoil.RecoilState<boolean>) => {
      return selector.key.includes('CURRENT_PROGRESS')
    })
    stub.withArgs(currentProgressSelectorMatcher).onCall(0).returns([oldProgressReport, spy])
    stub.withArgs(currentProgressSelectorMatcher).returns([faker.random.number(), spy])
    stub.callThrough()

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <ApolloProvider client={sinon.fake() as any}>
          <ProgressSlider id={faker.random.number()} />
        </ApolloProvider>
      </recoil.RecoilRoot>,
    )
    await actWait()

    const closeButton = result.find('PopoverCloseButton').find('button')
    closeButton.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(oldProgressReport)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('reverts the current confidence if we close the popover', async () => {
    const spy = sinon.spy()
    const stub = sinon.stub(recoil, 'useRecoilState')
    const oldConfidenceReport = faker.random.number()
    const currentConfidenceSelectorMatcher = sinon.match(
      (selector: recoil.RecoilState<boolean>) => {
        return selector.key.includes('CURRENT_CONFIDENCE')
      },
    )
    stub.withArgs(currentConfidenceSelectorMatcher).onCall(0).returns([oldConfidenceReport, spy])
    stub.withArgs(currentConfidenceSelectorMatcher).returns([faker.random.number(), spy])
    stub.callThrough()

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <ApolloProvider client={sinon.fake() as any}>
          <ProgressSlider id={faker.random.number()} />
        </ApolloProvider>
      </recoil.RecoilRoot>,
    )
    await actWait()

    const closeButton = result.find('PopoverCloseButton').find('button')
    closeButton.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(oldConfidenceReport)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
