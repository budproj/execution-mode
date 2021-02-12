import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import sinon from 'sinon'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultDrawerIntlDeletedEntryType } from 'src/state/recoil/key-result/drawer'

import KeyResultDrawerDeleteAlert from './delete-alert'

interface TestDeletedEntryTypeController {
  keyResultID: KeyResult['id']
  entryType?: string
}

const TestDeletedEntryTypeController = ({
  keyResultID,
  entryType,
}: TestDeletedEntryTypeController) => {
  const setDeletedEntryType = useSetRecoilState(keyResultDrawerIntlDeletedEntryType(keyResultID))

  const handleClick = () => {
    setDeletedEntryType(entryType)
  }

  return <button type="button" id="control-deleted-entry-type" onClick={handleClick} />
}

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('sets the alert to be open if there is an entry that was deleted', () => {
    const fakeID = faker.random.uuid()

    sinon.stub(console, 'error').returns(sinon.fake() as any)

    const wrapper = enzyme.mount(
      <RecoilRoot>
        <TestDeletedEntryTypeController keyResultID={fakeID} entryType={faker.random.word()} />
        <KeyResultDrawerDeleteAlert keyResultID={fakeID} />
      </RecoilRoot>,
    )

    const controlEntryTypeButton = wrapper.find('#control-deleted-entry-type')
    controlEntryTypeButton.simulate('click')

    const collapse = wrapper.find('Alert').find('Collapse')

    expect(collapse.prop('in')).toEqual(true)
  })

  it('sets the alert to be closed if there is not deleted entry', () => {
    const fakeID = faker.random.uuid()

    sinon.stub(console, 'error').returns(sinon.fake() as any)

    const wrapper = enzyme.mount(
      <RecoilRoot>
        <KeyResultDrawerDeleteAlert keyResultID={fakeID} />
      </RecoilRoot>,
    )

    const collapse = wrapper.find('Alert').find('Collapse')

    expect(collapse.prop('in')).toEqual(false)
  })
})

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('resets the deleted entry state upon alert close', () => {
    const fakeID = faker.random.uuid()

    sinon.stub(console, 'error').returns(sinon.fake() as any)

    const wrapper = enzyme.mount(
      <RecoilRoot>
        <TestDeletedEntryTypeController keyResultID={fakeID} entryType={faker.random.word()} />
        <KeyResultDrawerDeleteAlert keyResultID={fakeID} />
      </RecoilRoot>,
    )

    const controlEntryTypeButton = wrapper.find('#control-deleted-entry-type')
    controlEntryTypeButton.simulate('click')

    const closeButton = wrapper.find('CloseButton')
    closeButton.simulate('click')

    const collapse = wrapper.find('Alert').find('Collapse')

    expect(collapse.prop('in')).toEqual(false)
  })
})
