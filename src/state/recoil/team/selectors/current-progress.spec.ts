import faker from 'faker'
import sinon from 'sinon'

import * as selector from './current-progress'

describe('getter', () => {
  afterEach(() => sinon.restore())

  it('returns the current progress in percentage being the same as a key result if the team has only one active key result', () => {
    const fakeGoal = faker.random.number()
    const fakeTeam = {
      teams: [
        {
          keyResults: [
            {
              format: 'NUMBER',
              goal: fakeGoal,
              progressReports: [
                {
                  valueNew: faker.random.float({ max: fakeGoal }),
                },
              ],
            },
          ],
        },
      ],
    }
    const getStub = sinon.stub().returns(fakeTeam)
    const currentProgressSelector = selector.getCurrentProgress(faker.random.word())

    const result = currentProgressSelector({ get: getStub })

    const expectedResult = Math.ceil(
      (fakeTeam.teams[0].keyResults[0].progressReports[0].valueNew / fakeGoal) * 100,
    )

    expect(result).toEqual(expectedResult)
  })

  it('returns the current progress in percentage being the average of all key results of all child teams if they are all NUMBER formatted', () => {
    const fakeTeam = {
      teams: [
        {
          keyResults: [
            {
              format: 'NUMBER',
              goal: 700,
              progressReports: [
                {
                  valueNew: 350,
                },
              ],
            },

            {
              format: 'NUMBER',
              goal: 7000,
              progressReports: [
                {
                  valueNew: 3500,
                },
              ],
            },
          ],
        },

        {
          keyResults: [
            {
              format: 'NUMBER',
              goal: 700,
              progressReports: [
                {
                  valueNew: 350,
                },
              ],
            },
          ],
        },
      ],
    }
    const getStub = sinon.stub().returns(fakeTeam)
    const currentProgressSelector = selector.getCurrentProgress(faker.random.word())

    const result = currentProgressSelector({ get: getStub })

    const expectedResult = 50

    expect(result).toEqual(expectedResult)
  })

  it('returns the current progress in percentage being the average of all key results of all child teams if they are all COIN_BRL formatted', () => {
    const fakeTeam = {
      teams: [
        {
          keyResults: [
            {
              format: 'COIN_BRL',
              goal: 700,
              progressReports: [
                {
                  valueNew: 350,
                },
              ],
            },

            {
              format: 'COIN_BRL',
              goal: 7000,
              progressReports: [
                {
                  valueNew: 3500,
                },
              ],
            },
          ],
        },

        {
          keyResults: [
            {
              format: 'COIN_BRL',
              goal: 700,
              progressReports: [
                {
                  valueNew: 350,
                },
              ],
            },
          ],
        },
      ],
    }
    const getStub = sinon.stub().returns(fakeTeam)
    const currentProgressSelector = selector.getCurrentProgress(faker.random.word())

    const result = currentProgressSelector({ get: getStub })

    const expectedResult = 50

    expect(result).toEqual(expectedResult)
  })

  it('returns the current progress in percentage being the average of all key results of all child teams if they are all PERCENTAGE formatted', () => {
    const fakeTeam = {
      teams: [
        {
          keyResults: [
            {
              format: 'PERCENTAGE',
              goal: 100,
              progressReports: [
                {
                  valueNew: 50,
                },
              ],
            },

            {
              format: 'PERCENTAGE',
              goal: 100,
              progressReports: [
                {
                  valueNew: 50,
                },
              ],
            },
          ],
        },

        {
          keyResults: [
            {
              format: 'PERCENTAGE',
              goal: 100,
              progressReports: [
                {
                  valueNew: 50,
                },
              ],
            },
          ],
        },
      ],
    }
    const getStub = sinon.stub().returns(fakeTeam)
    const currentProgressSelector = selector.getCurrentProgress(faker.random.word())

    const result = currentProgressSelector({ get: getStub })

    const expectedResult = 50

    expect(result).toEqual(expectedResult)
  })

  it('returns the current progress in percentage being the average of all key results of all child teams if they have mixed formats', () => {
    const fakeTeam = {
      teams: [
        {
          keyResults: [
            {
              format: 'PERCENTAGE',
              goal: 100,
              progressReports: [
                {
                  valueNew: 50,
                },
              ],
            },

            {
              format: 'NUMBER',
              goal: 700,
              progressReports: [
                {
                  valueNew: 350,
                },
              ],
            },
          ],
        },

        {
          keyResults: [
            {
              format: 'COIN_BRL',
              goal: 1000,
              progressReports: [
                {
                  valueNew: 500,
                },
              ],
            },
          ],
        },
      ],
    }
    const getStub = sinon.stub().returns(fakeTeam)
    const currentProgressSelector = selector.getCurrentProgress(faker.random.word())

    const result = currentProgressSelector({ get: getStub })

    const expectedResult = 50

    expect(result).toEqual(expectedResult)
  })
})
