import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultListHead from './head'
import messages from './messages'

const AVAILABLE_TEST_COLUMNS = [
  'key-result',
  'objective',
  'confidence-level',
  'progress',
  'cycle',
  'owner',
  'confidence-level-color',
]

describe('component customizations', () => {
  it('uses the proper message for each column based on provided column name', () => {
    expect.assertions(AVAILABLE_TEST_COLUMNS.length)

    const testColumnMessages = {
      [AVAILABLE_TEST_COLUMNS[0]]: messages.listHeadKeyResult,
      [AVAILABLE_TEST_COLUMNS[1]]: messages.listHeadObjective,
      [AVAILABLE_TEST_COLUMNS[2]]: messages.listHeadConfidenceLevel,
      [AVAILABLE_TEST_COLUMNS[3]]: messages.listHeadProgress,
      [AVAILABLE_TEST_COLUMNS[4]]: messages.listHeadCycle,
      [AVAILABLE_TEST_COLUMNS[5]]: messages.listHeadOwner,
      [AVAILABLE_TEST_COLUMNS[6]]: messages.listHeadConfidenceLevelColor,
    }

    const result = enzyme.shallow(
      <KeyResultListHead
        templateColumns=""
        borderColor=""
        columns={AVAILABLE_TEST_COLUMNS as any}
        headProperties={{}}
      />,
    )

    const columns = result.find('ForwardRef')

    columns.map((column, index) => {
      const expectedColumnName = AVAILABLE_TEST_COLUMNS[index]
      const expectedColumMessage = testColumnMessages[expectedColumnName]

      const expectedText = expectedColumMessage.defaultMessage
      const text = column.find('Text').text()

      return expect(text).toEqual(expectedText)
    })
  })

  it('can hide a given column', () => {
    expect.assertions(1)

    const testCustomizedColumn = faker.helpers.randomize(AVAILABLE_TEST_COLUMNS)
    const fakeHeadProperties = {
      [testCustomizedColumn]: {
        hidden: true,
      },
    }

    const result = enzyme.shallow(
      <KeyResultListHead
        templateColumns=""
        borderColor=""
        columns={AVAILABLE_TEST_COLUMNS as any}
        headProperties={fakeHeadProperties}
      />,
    )

    const columns = result.find('ForwardRef')

    // eslint-disable-next-line array-callback-return
    columns.map((column, index) => {
      const expectedColumnName = AVAILABLE_TEST_COLUMNS[index]
      if (expectedColumnName === testCustomizedColumn) {
        const text = column.find('Text')

        return expect(text.prop('hidden')).toEqual(true)
      }
    })
  })
})
