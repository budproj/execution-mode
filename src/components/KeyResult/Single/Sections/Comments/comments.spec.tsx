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
    expect.assertions(numberOfFakeReports)

    const fakeReports = [...new Array(numberOfFakeReports)].map(() => ({
      id: faker.random.uuid(),
      comment: faker.helpers.userCard(),
    }))

    sinon.stub(recoil, 'useRecoilValue').returns(fakeReports)

    const result = enzyme.shallow(<KeyResultSectionComments />)

    const comments = result.find('KeyResultSectionCommentsComment')

    comments.map((comment, index) => {
      const relatedReport = fakeReports[index]

      return expect(comment.key()).toEqual(relatedReport.id)
    })
  })

  it('ignores all reports without comments', () => {
    const numberOfFakeReportsWithComment = faker.random.number({ min: 1, max: 100 })
    const numberOfFakeReportsWithoutComment = faker.random.number({ min: 1, max: 100 })

    expect.assertions(numberOfFakeReportsWithComment)

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

    const comments = result.find('KeyResultSectionCommentsComment')

    comments.map((comment, index) => {
      const relatedReport = fakeReportsWithComment[index]

      return expect(comment.key()).toEqual(relatedReport.id)
    })
  })

  it('creates three skeleton comments while loading', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionComments />)

    const comments = result.find('KeyResultSectionCommentsComment')

    expect(comments.length).toEqual(3)
  })
})
