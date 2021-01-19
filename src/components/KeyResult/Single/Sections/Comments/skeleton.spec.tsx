import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionCommentsSkeleton from './skeleton'

describe('component expectations', () => {
  it('creates skeleton with a given number of lines', () => {
    const noOfSkeletons = faker.random.number({ max: 100 })

    const result = enzyme.shallow(<KeyResultSectionCommentsSkeleton noOfLines={noOfSkeletons} />)

    const comments = result.find('KeyResultSectionCommentsComment')

    expect(comments.length).toEqual(noOfSkeletons)
  })
})
