import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionComments from './comments'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('creates a single component for each report with comment', () => {
    const numberOfFakeReports = faker.random.number({ min: 1, max: 100 })
    const fakeReports = [...new Array(numberOfFakeReports)].map(() => ({
      id: faker.random.uuid(),
      comment: faker.helpers.userCard(),
    }))

    sinon.stub(recoil, 'useRecoilValue').returns(fakeReports)

    const result = enzyme.shallow(<KeyResultSectionComments />)

    const commentList = result.find('KeyResultSectionsCommentsList')

    expect(commentList.prop('comments')).toEqual(fakeReports)
  })

  it('ignores all reports without comments', () => {
    const numberOfFakeReportsWithComment = faker.random.number({ min: 1, max: 100 })
    const numberOfFakeReportsWithoutComment = faker.random.number({ min: 1, max: 100 })

    const fakeReportsWithComment = [...new Array(numberOfFakeReportsWithComment)].map(() => ({
      id: faker.random.uuid(),
      comment: faker.helpers.userCard(),
    }))

    const fakeReportsWithoutComment = [...new Array(numberOfFakeReportsWithoutComment)].map(() => ({
      id: faker.random.uuid(),
    }))

    const fakeReports = [...fakeReportsWithComment, fakeReportsWithoutComment]

    sinon.stub(recoil, 'useRecoilValue').returns(fakeReports)

    const result = enzyme.shallow(<KeyResultSectionComments />)
    const commentList = result.find('KeyResultSectionsCommentsList')

    expect(commentList.prop('comments')).toEqual(fakeReportsWithComment)
  })

  it('creates a skeleton while loading', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionComments />)

    const skeleton = result.find('KeyResultSectionsCommentsSkeleton')

    expect(skeleton.length).toEqual(1)
  })
})
