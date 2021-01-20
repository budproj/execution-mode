import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionsCommentsList from './list'

describe('component expectations', () => {
  it('renders one comment for each provided item in the comment list', () => {
    const noOfComments = faker.random.number({ max: 100 })
    const fakeComments = [...new Array(noOfComments)].map(() => ({
      id: faker.random.uuid(),
    }))

    expect.assertions(noOfComments)

    const result = enzyme.shallow(<KeyResultSectionsCommentsList comments={fakeComments as any} />)
    const comments = result.find('KeyResultSectionCommentsComment')

    comments.map((comment, index) => {
      const relatedFakeComment = fakeComments[index]

      return expect(comment.key()).toEqual(relatedFakeComment.id)
    })
  })

  it('renders the empty state if no comments where provided', () => {
    const result = enzyme.shallow(<KeyResultSectionsCommentsList />)
    const emptyState = result.find('EmptyState')

    expect(emptyState.length).toEqual(1)
  })

  it('renders the empty state if we have a list of empty comments', () => {
    const result = enzyme.shallow(<KeyResultSectionsCommentsList comments={[]} />)
    const emptyState = result.find('EmptyState')

    expect(emptyState.length).toEqual(1)
  })
})
