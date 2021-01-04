import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import ChildTeamsObjectives from './child-teams-objectives'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('loads objectives in our recoil state upon query return', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()

    const fakeQueryData = {
      team: {
        teams: [
          {
            id: faker.random.word(),
            objectives: [objectiveOne, objectiveTwo],
          },
          {
            id: faker.random.word(),
            objectives: [objectiveThree],
          },
        ],
      },
    }

    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const allObjectives = [objectiveOne, objectiveTwo, objectiveThree]
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(allObjectives)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('merges root team and child team objectives in our recoil state upon query return', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()
    const objectiveFour = faker.helpers.userCard()

    const fakeQueryData = {
      team: {
        objectives: [objectiveFour],
        teams: [
          {
            id: faker.random.word(),
            objectives: [objectiveOne, objectiveTwo],
          },
          {
            id: faker.random.word(),
            objectives: [objectiveThree],
          },
        ],
      },
    }

    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const allObjectives = [objectiveFour, objectiveOne, objectiveTwo, objectiveThree]
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(allObjectives)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('removes duplicated objectives, setting them only once', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()

    const fakeQueryData = {
      team: {
        teams: [
          {
            id: faker.random.word(),
            objectives: [objectiveOne, objectiveTwo, objectiveThree],
          },
          {
            id: faker.random.word(),
            objectives: [objectiveThree, objectiveOne],
          },
        ],
      },
    }

    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const allObjectives = [objectiveOne, objectiveTwo, objectiveThree]
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(allObjectives)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not loads objectives if our query is running', () => {
    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ loading: true } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not loads objectives if our query is done, but no data was returned', () => {
    const spy = sinon.spy()
    sinon.stub(apollo, 'useQuery').returns({ loading: false } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    expect(spy.notCalled).toEqual(true)
  })

  it('shows the skeleton if no objectives are yet loaded', () => {
    sinon.stub(apollo, 'useQuery').returns({ loading: false } as any)

    const result = enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const skeleton = result.find('ChildTeamsObjectivesSkeleton')

    expect(skeleton.length).toEqual(1)
  })
})

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('renders only groups that have objectives', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()

    const fakeQueryData = {
      team: {
        teams: [
          {
            id: faker.random.word(),
            objectives: [objectiveOne, objectiveTwo],
          },
          {
            id: faker.random.word(),
            objectives: [objectiveThree],
          },
          {
            id: faker.random.word(),
          },
        ],
      },
    }

    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())

    const result = enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const objectiveGroups = result.find('ObjectiveGroup')

    expect(objectiveGroups.length).toEqual(2)
  })

  it('renders root team objectives first', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()
    const fakeName = faker.random.word()

    const fakeQueryData = {
      team: {
        id: faker.random.word(),
        name: fakeName,
        objectives: [objectiveOne],

        teams: [
          {
            id: faker.random.word(),
            objectives: [objectiveOne, objectiveTwo],
          },
          {
            id: faker.random.word(),
            objectives: [objectiveThree],
          },
        ],
      },
    }

    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())

    const result = enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const objectiveGroups = result.find('ObjectiveGroup').first()

    expect(objectiveGroups.prop('groupTitle')).toEqual(fakeName)
  })

  it('does not render group if objectives are an empty array', () => {
    const objectiveOne = faker.helpers.userCard()
    const objectiveTwo = faker.helpers.userCard()
    const objectiveThree = faker.helpers.userCard()

    const fakeQueryData = {
      team: {
        teams: [
          {
            id: faker.random.word(),
            objectives: [objectiveOne, objectiveTwo],
          },
          {
            id: faker.random.word(),
            objectives: [objectiveThree],
          },
          {
            id: faker.random.word(),
            objectives: [],
          },
        ],
      },
    }

    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())

    const result = enzyme.shallow(<ChildTeamsObjectives rootTeamId={faker.random.word()} />)

    const objectiveGroups = result.find('ObjectiveGroup')

    expect(objectiveGroups.length).toEqual(2)
  })
})
