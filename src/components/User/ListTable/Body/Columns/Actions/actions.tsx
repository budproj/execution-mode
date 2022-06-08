import { Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { DangerousActionConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/DangerousAction/wrapper'
import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { useDeleteCycle } from 'src/components/Cycle/hooks'
import { Cycle } from 'src/components/Cycle/types'
import TreeDotsIcon from 'src/components/Icon/TreeDots'
import buildPartialSelector from 'src/state/recoil/cycle/build-partial-selector'
import { cyclesEditModalViewMode } from 'src/state/recoil/cycle/cycle-edit-modal-view-mode'

import messages from './messages'

export interface CyclesListBodyColumnActionsProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}

const cyclePeriodSelector = buildPartialSelector<Cycle['period']>('period')
const CyclesListBodyColumnActions = ({
  id,
}: CyclesListBodyColumnActionsProperties): ReactElement => {
  const intl = useIntl()
  const { deleteCycle, loading, error } = useDeleteCycle()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isOpened, setIsOpened] = useRecoilState(cyclesEditModalViewMode)

  const cyclePeriod = useRecoilValue(cyclePeriodSelector(id))

  const toast = useToast()

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isDialogOpen) setIsDialogOpen(true)
  }

  const handleOpenModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsOpened({ isOpened: true, cycleId: id })
  }

  const handleCloseModal = () => {
    if (isOpened) setIsOpened({ isOpened: false, cycleId: '' })
  }

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  const handleDelete = async () => {
    await deleteCycle({ variables: { cycleID: id } })
  }

  // UseEffect(() => {
  //   if (loading && !error) {
  //     toast({
  //       title: intl.formatMessage(messages.deleteCycleSuccessToastMessage, {
  //         period: cyclePeriod,
  //       }),
  //       status: 'success',
  //     })
  //   }
  // }, [loading, error, toast, intl, cyclePeriod])

  return (
    <>
      <CyclesListBodyColumnBase preventLineClick>
        <Menu isLazy placement="auto-end" variant="action-list">
          <MenuButton
            ml={2.5}
            color="new-gray.500"
            _hover={{
              color: 'brand.500',
            }}
          >
            <TreeDotsIcon
              fill="currentColor"
              fontSize="2xl"
              style={{ transform: 'rotate(90deg)' }}
              desc={intl.formatMessage(messages.optionsButtonDesc)}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleOpenModal}>
              {intl.formatMessage(messages.firstMenuItemOption)}
            </MenuItem>
            <MenuItem onClick={handleClick}>
              {intl.formatMessage(messages.secondMenuItemOption)}
            </MenuItem>
          </MenuList>
        </Menu>
      </CyclesListBodyColumnBase>
      <DangerousActionConfirmationDialog
        isOpen={isDialogOpen}
        keyword={intl.formatMessage(messages.deleteDialogKeyword)}
        firstStageTitle={intl.formatMessage(messages.deleteDialogFirstStageTitle, {
          period: cyclePeriod,
        })}
        firstStageDescription={intl.formatMessage(messages.deleteDialogFirstStageDescription)}
        secondStageTitle={intl.formatMessage(messages.deleteDialogSecondStageTitle, {
          breakline: <br />,
        })}
        secondStageDescription={intl.formatMessage(messages.deleteDialogSecondStageDescription, {
          period: cyclePeriod,
        })}
        confirmationLabel={intl.formatMessage(messages.deleteDialogConfirmationLabel)}
        onConfirm={handleDelete}
        onClose={handleClose}
      />
    </>
  )
}

export default CyclesListBodyColumnActions
