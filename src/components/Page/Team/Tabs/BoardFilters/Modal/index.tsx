/* eslint-disable react/jsx-no-useless-fragment */
import React, { ChangeEvent, useState } from 'react'
import { useIntl } from 'react-intl'

import ChevronDownIcon from 'src/components/Icon/ChevronDown'

import { FiltersData } from '..'
import styles from '../filters.module.css'
import messages from '../messages'

import { CycleModal } from './CycleModal'
import { DoneModal } from './DoneModal'
import { KeyResultModal } from './KeyResultModal'

interface FilterModalProperties {
  isOpen: boolean
  teamId: string
  filterData: FiltersData
  setFilterData: React.Dispatch<React.SetStateAction<FiltersData>>
  handleQuery: (key: string, newValue?: string) => boolean
}

const checkValue = (oldValue: string | undefined, newValue: string) => {
  return oldValue === newValue ? undefined : newValue
}

export const FilterModal = ({
  isOpen,
  filterData,
  setFilterData,
  teamId,
  handleQuery,
}: FilterModalProperties) => {
  const intl = useIntl()

  const [isKrOpen, setIsKrOpen] = useState<boolean>(false)
  const [isCycleOpen, setIsCycleOpen] = useState<boolean>(false)
  const [isDoneOpen, setIsDoneOpen] = useState<boolean>(false)

  const closeAll = () => {
    setIsKrOpen(false)
    setIsCycleOpen(false)
    setIsDoneOpen(false)
  }

  const handleChange = (filter: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFilterData((previousValue) => {
      const data = event.target.value
      if (filter === 'kr') {
        handleQuery('key_result_id', checkValue(previousValue.kr, data))
        return {
          ...previousValue,
          kr: checkValue(previousValue.kr, data),
        }
      }

      if (filter === 'cycleYear') {
        handleQuery(
          'cy',
          `${checkValue(previousValue.cycle?.year, data) ?? ''} + ${
            previousValue.cycle?.quarter ?? ''
          }`,
        )
        return {
          ...previousValue,
          cycle: {
            year: checkValue(previousValue.cycle?.year, data),
            quarter: previousValue.cycle?.quarter,
          },
        }
      }

      if (filter === 'cycleQuarter') {
        handleQuery(
          'cy',
          `${previousValue.cycle?.year ?? ''} + ${
            checkValue(previousValue.cycle?.quarter, data) ?? ''
          }`,
        )
        return {
          ...previousValue,
          cycle: {
            quarter: checkValue(previousValue.cycle?.quarter, data),
            year: previousValue.cycle?.year,
          },
        }
      }

      if (filter === 'showDone') {
        handleQuery('show_done', data)

        return {
          ...previousValue,
          showDone: data === 'none' ? undefined : data,
        }
      }

      return previousValue
    })
  }

  return (
    <>
      {isOpen && (
        <div className={styles.modal_content}>
          {/* KR */}
          <button
            type="button"
            className={styles.modal_inner_button}
            style={{ backgroundColor: isKrOpen ? '#F3F5FA' : 'transparent' }}
            onClick={() => {
              closeAll()
              setIsKrOpen(true)
            }}
          >
            <p className={styles.modal_inner_button_text}>Resultado-chave</p>
            <ChevronDownIcon
              desc={intl.formatMessage(messages.iconChevronUpDesc)}
              fontSize="xs"
              stroke="gray.500"
              fill="gray.500"
              borderColor="gray.500"
              transition="0.2s all ease-in"
              transform="rotate(-90deg)"
            />
          </button>
          <KeyResultModal
            isOpen={isKrOpen}
            teamId={teamId}
            cycleFilter={`${filterData.cycle?.year ?? ''} + ${filterData.cycle?.quarter ?? ''}`}
            value={filterData.kr}
            handleChange={handleChange}
          />

          {/* CYCLE */}
          <button
            type="button"
            className={styles.modal_inner_button}
            style={{ backgroundColor: isCycleOpen ? '#F3F5FA' : 'transparent' }}
            onClick={() => {
              closeAll()
              setIsCycleOpen(true)
            }}
          >
            <p className={styles.modal_inner_button_text}>Ciclo</p>
            <ChevronDownIcon
              desc={intl.formatMessage(messages.iconChevronUpDesc)}
              fontSize="xs"
              stroke="gray.500"
              fill="gray.500"
              borderColor="gray.500"
              transition="0.2s all ease-in"
              transform="rotate(-90deg)"
            />
          </button>
          <CycleModal
            isOpen={isCycleOpen}
            teamId={teamId}
            value={filterData.cycle}
            handleChange={handleChange}
          />

          {/* DONE */}
          <button
            type="button"
            className={styles.modal_inner_button}
            style={{ backgroundColor: isDoneOpen ? '#F3F5FA' : 'transparent' }}
            onClick={() => {
              closeAll()
              setIsDoneOpen(true)
            }}
          >
            <p className={styles.modal_inner_button_text}>Exibir concluidos</p>
            <ChevronDownIcon
              desc={intl.formatMessage(messages.iconChevronUpDesc)}
              fontSize="xs"
              stroke="gray.500"
              fill="gray.500"
              borderColor="gray.500"
              transition="0.2s all ease-in"
              transform="rotate(-90deg)"
            />
          </button>
          <DoneModal isOpen={isDoneOpen} value={filterData.showDone} handleChange={handleChange} />
        </div>
      )}
    </>
  )
}
