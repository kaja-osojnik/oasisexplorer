import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { NUMBER_OF_ITEMS_ON_SEPARATE_PAGE } from '../../config'
import { ErrorBoundary } from '../../components/ErrorBoundary'
import { LinkableDiv } from '../../components/PageLayout/LinkableDiv'
import { CardEmptyState } from './CardEmptyState'
import { useAccount } from './hook'
import { useTokenTransfers } from '../TokenDashboardPage/hook'
import { TokenTransfers } from '../../components/Tokens/TokenTransfers'
import { AccountDetailsContext } from './index'

export const accountTokenTransfersContainerId = 'transfers'

export const AccountTokenTransfersCard: FC<AccountDetailsContext> = ({ scope, address }) => {
  const { t } = useTranslation()
  return (
    <Card>
      <LinkableDiv id={accountTokenTransfersContainerId}>
        <CardHeader disableTypography component="h3" title={t('tokens.transfers')} />
      </LinkableDiv>
      <CardContent>
        <ErrorBoundary light={true}>
          <AccountTokenTransfers scope={scope} address={address} />
        </ErrorBoundary>
      </CardContent>
    </Card>
  )
}

const AccountTokenTransfers: FC<AccountDetailsContext> = ({ scope, address }) => {
  const { t } = useTranslation()

  const { isLoading, isFetched, results } = useTokenTransfers(scope, address)

  const { account } = useAccount(scope, address)
  const transfers = results.data

  return (
    <>
      {isFetched && !transfers?.length && <CardEmptyState label={t('account.emptyTokenTransferList')} />}
      <TokenTransfers
        transfers={transfers}
        ownAddress={account?.address_eth}
        isLoading={isLoading}
        limit={NUMBER_OF_ITEMS_ON_SEPARATE_PAGE}
        pagination={results.tablePaginationProps}
        differentTokens
      />
    </>
  )
}
