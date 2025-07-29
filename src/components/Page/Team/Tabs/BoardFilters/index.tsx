import { Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import ChevronDownIcon from 'src/components/Icon/ChevronDown'
import { useTeamKRData } from 'src/components/KeyResult/hooks/use-get-team-key-result'
import { useGetTeamCyclesDate } from 'src/components/TaskManagement/hooks/use-get-team-cycles-date'

import styles from './filters.module.css'
import messages from './messages'

interface BoardFiltersProperties {
  teamId: string
}

interface CycleFilter {
  year: string | undefined
  quarter: string | undefined
}

interface FiltersData {
  kr: string | undefined
  cycle: CycleFilter | undefined
  showDone: string | undefined
}

interface MenuController {
  isModalOpen: boolean
  isKrOpen: boolean
  isCycleOpen: boolean
  isDoneOpen: boolean
}

export const BoardFilters = ({ teamId }: BoardFiltersProperties) => {
  const intl = useIntl()
  const router = useRouter()

  const [cycleYears, setCycleYears] = useState<Record<string, string[]>>()
  const defaultCycle = {
    year: new Date().getFullYear().toString(),
    quarter: Math.ceil((new Date().getMonth() + 1) / 3).toString(),
  }

  const [filterData, setFilterData] = useState<FiltersData>({
    kr: undefined,
    cycle: {
      year: defaultCycle.year,
      quarter: defaultCycle.quarter,
    },
    showDone: undefined,
  })

  const [modalController, setModalController] = useState<MenuController>({
    isModalOpen: false,
    isKrOpen: false,
    isCycleOpen: false,
    isDoneOpen: false,
  })

  const handleAction = (modal: string) => {
    switch (modal) {
      case 'modal':
        setModalController((previousValue) => {
          return {
            ...previousValue,
            isModalOpen: !previousValue.isModalOpen,
            isKrOpen: previousValue.isModalOpen ? previousValue.isKrOpen : false,
            isCycleOpen: previousValue.isModalOpen ? previousValue.isCycleOpen : false,
            isDoneOpen: previousValue.isModalOpen ? previousValue.isDoneOpen : false,
          }
        })
        break
      case 'kr':
        setModalController((previousValue) => {
          return {
            ...previousValue,
            isKrOpen: !previousValue.isKrOpen,
            isCycleOpen: false,
            isDoneOpen: false,
          }
        })
        break
      case 'cycle':
        setModalController((previousValue) => {
          return {
            ...previousValue,
            isCycleOpen: !previousValue.isCycleOpen,
            isKrOpen: false,
            isDoneOpen: false,
          }
        })
        break
      case 'done':
        setModalController((previousValue) => {
          return {
            ...previousValue,
            isDoneOpen: !previousValue.isDoneOpen,
            isKrOpen: false,
            isCycleOpen: false,
          }
        })
        break
      default:
        break
    }
  }

  const checkValue = (oldValue: string | undefined, newValue: string) => {
    return oldValue === newValue ? undefined : newValue
  }

  const handleChange = (filter: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFilterData((previousValue) => {
      const data = event.target.value
      if (filter === 'kr') {
        handleQuery('key_result_id__id', checkValue(previousValue.kr, data))
        return {
          ...previousValue,
          kr: checkValue(previousValue.kr, data),
        }
      }

      if (filter === 'cycleYear') {
        handleQuery('cy', `${data} + ${previousValue.cycle?.quarter ?? ''}`)
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

  const { data: KeyResultData, isFetching: krFetching } = useTeamKRData(teamId)
  const { data: cycles } = useGetTeamCyclesDate(teamId)

  const handleQuery = (key: string, newValue?: string) => {
    router.query[key] = newValue === 'none' ? undefined : newValue
    router.push(router, undefined, { shallow: true })
    return true
  }

  useEffect(() => {
    if (cycles) {
      const result: Record<string, string[]> = {}
      for (const item of cycles) {
        if (!result[item.year]) {
          result[item.year] = []
        }

        result[item.year].push(item.quarter)
      }

      setCycleYears(result)
    }
  }, [cycles])

  const checkQuery = (index: string) => {
    return router.query[index] === '' || router.query[index] === 'none'
      ? undefined
      : (router.query[index] as string)
  }

  useEffect(() => {
    const cycle = checkQuery('cy')

    setFilterData({
      kr: checkQuery('key_result_id__id'),
      cycle: {
        year:
          cycle && cycle.length > 0 ? cycle.split('+')[0].replace(/\s/g, '') : defaultCycle.year,
        quarter:
          cycle && cycle.length > 1 ? cycle.split('+')[1].replace(/\s/g, '') : defaultCycle.quarter,
      },
      showDone: checkQuery('show_done'),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <div>
      <button
        className={styles.modal_button}
        style={{ backgroundColor: modalController.isModalOpen ? '#F1F1FF' : 'transparent' }}
        type="button"
        onClick={() => handleAction('modal')}
      >
        <p className={styles.modal_text}>Filtros</p>
        <ChevronDownIcon
          desc={intl.formatMessage(messages.iconChevronUpDesc)}
          fontSize="xs"
          stroke="brand.500"
          transition="0.2s all ease-in"
        />
      </button>
      {modalController.isModalOpen && (
        <div className={styles.modal_content}>
          {/* KR */}
          <button
            type="button"
            className={styles.modal_inner_button}
            style={{ backgroundColor: modalController.isKrOpen ? '#F3F5FA' : 'transparent' }}
            onClick={() => handleAction('kr')}
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
          {modalController.isKrOpen && (
            <div className={styles.sub_modal_content}>
              <SearchBar marginBottom="10px" placeholder="Buscar resultado-chave" />
              {krFetching ? (
                <Spinner size="xl" color="black.100" />
              ) : KeyResultData?.length === 0 ? (
                <h1 className={styles.no_kr_text}>Nenhum Resultado-chave Encontrado</h1>
              ) : (
                KeyResultData?.map((kr) => (
                  <label key={kr.id} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="krSelector"
                      value={kr.id}
                      checked={filterData.kr === kr.id}
                      onChange={handleChange('kr')}
                    />
                    <span>{kr.title}</span>
                  </label>
                ))
              )}
            </div>
          )}

          {/* CYCLE */}
          <button
            type="button"
            className={styles.modal_inner_button}
            style={{ backgroundColor: modalController.isCycleOpen ? '#F3F5FA' : 'transparent' }}
            onClick={() => handleAction('cycle')}
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
          {modalController.isCycleOpen && (
            <div className={styles.sub_modal_content}>
              <h2 className={styles.sub_modal_title}>Ciclo Anual</h2>
              <div>
                {cycleYears &&
                  Object.keys(cycleYears).map((cycle) => (
                    <label key={cycle} className={styles.checkbox}>
                      <input
                        type="radio"
                        name="cycleYearSelector"
                        value={cycle}
                        checked={filterData.cycle?.year === cycle}
                        onChange={handleChange('cycleYear')}
                      />
                      <span>{cycle}</span>
                    </label>
                  ))}
              </div>
              {filterData.cycle?.year && (
                <>
                  <span className={styles.divider} />
                  <h2 className={styles.sub_modal_title}>Trimestre</h2>
                  <div>
                    {cycleYears?.[filterData?.cycle?.year].map((cycle) => (
                      <label key={cycle} className={styles.checkbox}>
                        <input
                          type="checkbox"
                          name="cycleMonthSelector"
                          value={cycle}
                          checked={filterData.cycle?.quarter === cycle}
                          onChange={handleChange('cycleQuarter')}
                        />
                        <span>Q{cycle}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <button
            type="button"
            className={styles.modal_inner_button}
            style={{ backgroundColor: modalController.isDoneOpen ? '#F3F5FA' : 'transparent' }}
            onClick={() => handleAction('done')}
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
          {modalController.isDoneOpen && (
            <div className={styles.sub_modal_content}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="donePeriod"
                  value="1w"
                  checked={filterData.showDone === '1w'}
                  onChange={handleChange('showDone')}
                />
                <span>Semana atual</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="donePeriod"
                  value="2w"
                  checked={filterData.showDone === '2w'}
                  onChange={handleChange('showDone')}
                />
                <span>Quinzena atual</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="donePeriod"
                  value="4w"
                  checked={filterData.showDone === '4w'}
                  onChange={handleChange('showDone')}
                />
                <span>Mês atual</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="donePeriod"
                  value="none"
                  checked={filterData.showDone === undefined}
                  onChange={handleChange('showDone')}
                />
                <span>Ver todas</span>
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
