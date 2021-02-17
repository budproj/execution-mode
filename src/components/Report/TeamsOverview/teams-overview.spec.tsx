import { MockedProvider } from '@apollo/client/testing'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { RecoilRoot } from 'recoil'

import { waitForComponentToPaint } from 'lib/jest/setup'

import queries from './queries.gql'
import TeamsOverview from './teams-overview'

describe('data exibition', () => {
  it('renders a single line for each ranked teams provided', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 100 })
    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 0, max: 100 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    expect(lines.length).toEqual(fakeCompany.teamsRanking.length)
  })

  it('displays the correct team name on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 0, max: 100 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const renderedName = line
        .find('TeamsOverviewBodyTableBodyColumnNameAndOrder')
        .find('h3')
        .text()

      return expect(renderedName).toEqual(relatedTeam.name)
    })
  })

  it('displays the correct team order on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 0, max: 100 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const renderedOrderComponent = line.find('TeamsOverviewBodyTableBodyColumnNameAndOrder')

      return expect(renderedOrderComponent.prop('order')).toEqual(index + 1)
    })
  })

  it('displays the correct team progress bar value on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 0, max: 100 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const slider = line.find('TeamsOverviewBodyTableBodyColumnProgress').find('Slider')

      return expect(slider.prop('value')).toEqual(relatedTeam.progress)
    })
  })

  it('displays the correct team progress bar color on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 0, max: 100 }),
        confidence: faker.helpers.randomize([20, 50, 100]),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const expectedColors: Record<number, string> = {
      20: 'red.500',
      50: 'yellow.500',
      100: 'green.500',
    }

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const sliderFilledTrack = line
        .find('TeamsOverviewBodyTableBodyColumnProgress')
        .find('SliderFilledTrack')
      const expectedColor = expectedColors[relatedTeam.confidence]

      return expect(sliderFilledTrack.prop('bg')).toEqual(expectedColor)
    })
  })

  it('displays the correct team progress text value on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 0, max: 100 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const textComponent = line.find('TeamsOverviewBodyTableBodyColumnProgress').find('Text')

      return expect(textComponent.text()).toEqual(`${relatedTeam.progress}%`)
    })
  })

  it('displays the correct team progress increase, for positive values with 2 digits, on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 10, max: 100 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const textComponent = line
        .find('TeamsOverviewBodyTableBodyColumnProgressIncrease')
        .find('Tag')

      return expect(textComponent.text()).toEqual(
        `+${relatedTeam.progressIncreaseSinceLastWeek}%increased by`,
      )
    })
  })

  it('displays the correct team progress increase, for positive values different than 0 and with 1 digit, on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: 1, max: 9 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const textComponent = line
        .find('TeamsOverviewBodyTableBodyColumnProgressIncrease')
        .find('Tag')

      return expect(textComponent.text()).toEqual(
        `+0${relatedTeam.progressIncreaseSinceLastWeek}%increased by`,
      )
    })
  })

  it('displays the correct team progress increase, for negative values different than 0 and with 1 digit, on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: -9, max: -1 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const textComponent = line
        .find('TeamsOverviewBodyTableBodyColumnProgressIncrease')
        .find('Tag')

      return expect(textComponent.text()).toEqual(
        `-0${Math.abs(relatedTeam.progressIncreaseSinceLastWeek)}%decreased by`,
      )
    })
  })

  it('displays the correct team progress increase, for negative values with 2 digits, on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: faker.random.number({ min: -100, max: -10 }),
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line, index) => {
      const relatedTeam = fakeCompany.teamsRanking[index]
      const textComponent = line
        .find('TeamsOverviewBodyTableBodyColumnProgressIncrease')
        .find('Tag')

      return expect(textComponent.text()).toEqual(
        `-${Math.abs(relatedTeam.progressIncreaseSinceLastWeek)}%decreased by`,
      )
    })
  })

  it('displays the correct team progress increase, for values equal 0, on each line', async () => {
    const numberOfFakeTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfFakeTeams)

    const fakeCompany = {
      id: faker.random.uuid(),
      teamsRanking: [...new Array(numberOfFakeTeams)].map(() => ({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        progress: faker.random.number({ min: 0, max: 100 }),
        progressIncreaseSinceLastWeek: 0,
        confidence: faker.random.number({ min: 0, max: 100 }),
      })),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_COMPANY_TEAMS,
        },
        result: {
          data: {
            teams: [fakeCompany],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <TeamsOverview />
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const lines = wrapper
      .find('TeamsOverviewBodyTableBody')
      .find('TeamsOverviewBodyTableLineTemplate')

    lines.map((line) => {
      const textComponent = line
        .find('TeamsOverviewBodyTableBodyColumnProgressIncrease')
        .find('Tag')

      return expect(textComponent.text()).toEqual('0%')
    })
  })
})
