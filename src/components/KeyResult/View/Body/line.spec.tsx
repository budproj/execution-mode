import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import Line from './line'

describe('component side-effects', () => {
  afterEach(() => sinon.restore())

  it('does not render the row if the given key result is not loaded', () => {
    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])

    const result = enzyme.shallow(
      <Line id={faker.random.number()} index={faker.random.number()} remoteKeyResult={{} as any} />,
    )

    const lineComponent = result.find('DraggableGrid')

    expect(lineComponent.length).toEqual(0)
  })

  it('renders the line after the key result is loaded', () => {
    sinon.stub(recoil, 'useRecoilState').returns([faker.random.word(), sinon.fake()])

    const result = enzyme.shallow(
      <Line id={faker.random.number()} index={faker.random.number()} remoteKeyResult={{} as any} />,
    )

    const lineComponent = result.find('DraggableGrid')

    expect(lineComponent.length).toEqual(1)
  })

  it('sets the key result after it was fetched by our remote source', () => {
    const remoteKeyResult = faker.random.word()
    const spy = sinon.spy()
    sinon.stub(recoil, 'useRecoilState').returns([undefined, spy])

    enzyme.shallow(
      <Line
        id={faker.random.number()}
        index={faker.random.number()}
        remoteKeyResult={remoteKeyResult as any}
      />,
    )

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(remoteKeyResult)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
