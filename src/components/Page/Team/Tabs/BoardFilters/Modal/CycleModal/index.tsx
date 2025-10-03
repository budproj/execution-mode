import React, { ChangeEvent, useMemo } from 'react'

import { useGetTeamCyclesDate } from 'src/components/TaskManagement/hooks/use-get-team-cycles-date'

import styles from '../../filters.module.css'

interface CycleModalProperties {
  isOpen: boolean
  teamId: string
  value?: {
    year?: string
    quarter?: string
  }
  handleChange: (filter: string) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const CycleModal = ({ isOpen, value, teamId, handleChange }: CycleModalProperties) => {
  const { data: cycles } = useGetTeamCyclesDate(teamId)

  const anualCycles = useMemo(
    () => cycles?.filter((cycle) => cycle.cadence === 'YEARLY') ?? [],
    [cycles],
  )

  const quarterCycles = useMemo(
    () => cycles?.filter((cycle) => cycle.cadence === 'QUARTERLY') ?? [],
    [cycles],
  )

  return isOpen ? (
    <div className={styles.sub_modal_content}>
      <h2 className={styles.sub_modal_title}>Ciclo Anual</h2>
      <div>
        {anualCycles
          ?.sort((a, b) => (a.date_start > b.date_start ? 1 : -1))
          .map((cycle) => (
            <label key={cycle.id} className={styles.checkbox}>
              <input
                type="checkbox"
                name="cycleYearSelector"
                value={cycle.id}
                checked={value?.year === cycle.id}
                onChange={handleChange('cycleYear')}
              />
              <span>{cycle.period}</span>
            </label>
          ))}
      </div>
      {value?.year && (
        <>
          <span className={styles.divider} />
          <h2 className={styles.sub_modal_title}>Trimestre</h2>
          <div>
            {quarterCycles
              .filter((cycle) => cycle.parent === value.year)
              .map((cycle) => (
                <label key={cycle.id} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="cycleMonthSelector"
                    value={cycle.id}
                    checked={value?.quarter === cycle.id}
                    onChange={handleChange('cycleQuarter')}
                  />
                  <span>{cycle.period}</span>
                </label>
              ))}
          </div>
        </>
      )}
    </div>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}
