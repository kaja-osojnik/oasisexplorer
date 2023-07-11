import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import Tooltip from '@mui/material/Tooltip'
import { tooltipDelay } from '../../../styles/theme'
import { UnknownIcon } from './../CustomIcons/Unknown'
import { TransferIcon } from './../CustomIcons/Transfer'
import { COLORS } from '../../../styles/theme/colors'
import StreamIcon from '@mui/icons-material/Stream'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import ApprovalIcon from '@mui/icons-material/Approval'

const getTokenTransferLabel = (t: TFunction, name: string | undefined): string => {
  switch (name) {
    case undefined:
      return t('tokens.transferEventType.unavailable')
    case 'Transfer':
      return t('tokens.transferEventType.transfer')
    case 'Approval':
      return t('tokens.transferEventType.approval')
    case 'Minting':
      return t('tokens.transferEventType.minting')
    case 'Burning':
      return t('tokens.transferEventType.burning')
    default:
      return t('tokens.transferEventType.unknown', { name })
  }
}

const iconStyles = { fontSize: '40px' }
const getTokenTransferIcon = (name: string | undefined) => {
  switch (name) {
    case undefined:
      // Method may be undefined if the transaction was malformed.
      return <UnknownIcon sx={iconStyles} />
    case 'Transfer':
      return <TransferIcon sx={iconStyles} />
    case 'Approval':
      return <ApprovalIcon sx={iconStyles} htmlColor={COLORS.eucalyptus} />
    case 'Minting':
      return <StreamIcon sx={iconStyles} htmlColor={COLORS.eucalyptus} />
    case 'Burning':
      return <LocalFireDepartmentIcon sx={iconStyles} htmlColor={COLORS.eucalyptus} />
    default:
      return <UnknownIcon sx={iconStyles} />
  }
}

type TokenTransferLabelProps = {
  /**
   * The event name
   */
  name: string | undefined
}

export const TokenTransferLabel: FC<TokenTransferLabelProps> = ({ name }) => {
  const { t } = useTranslation()

  return <>{getTokenTransferLabel(t, name)}</>
}

export const TokenTransferIcon: FC<TokenTransferLabelProps> = ({ name }) => {
  const { t } = useTranslation()

  return (
    <Tooltip
      arrow
      placement="top"
      title={getTokenTransferLabel(t, name)}
      enterDelay={tooltipDelay}
      enterNextDelay={tooltipDelay}
    >
      <span>{getTokenTransferIcon(name)}</span>
    </Tooltip>
  )
}
