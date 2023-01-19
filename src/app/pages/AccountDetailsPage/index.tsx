import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import { PageLayout } from '../../components/PageLayout'
import { SubPageCard } from '../../components/SubPageCard'
import { Account } from '../../components/Account'
import { Transactions } from '../../components/Transactions'
import { useGetConsensusAccountsAddress } from '../../../oasis-indexer/api'
import { useGetEmeraldTransactions } from '../../../oasis-indexer/api'
import { useGetRosePrice } from '../../../coin-gecko/api'
import { NUMBER_OF_ITEMS_ON_SEPARATE_PAGE } from '../../config'
import { useSearchParamsPagination } from '../../components/Table/useSearchParamsPagination'

export const AccountDetailsPage: FC = () => {
  const { t } = useTranslation()
  const { address } = useParams()
  const txsPagination = useSearchParamsPagination('page')
  const txsOffset = (txsPagination.selectedPage - 1) * NUMBER_OF_ITEMS_ON_SEPARATE_PAGE
  // TODO: switch to Emerald when API is ready
  const accountQuery = useGetConsensusAccountsAddress(address!)
  const account = accountQuery.data?.data
  const rosePriceQuery = useGetRosePrice()
  const transactionsQuery = useGetEmeraldTransactions({
    limit: NUMBER_OF_ITEMS_ON_SEPARATE_PAGE,
    offset: txsOffset,
    rel: address,
  })

  return (
    <PageLayout>
      <SubPageCard featured title={t('account.title')}>
        {accountQuery.isLoading && <Skeleton variant="text" height={30} sx={{ my: 4 }} />}
        {account && (
          <CardContent>
            <Account account={account} roseFiatValue={rosePriceQuery.data} />
          </CardContent>
        )}
      </SubPageCard>
      <Card>
        <CardHeader disableTypography component="h3" title={t('account.transactionsListTitle')} />
        <CardContent>
          <Transactions
            transactions={transactionsQuery.data?.data.transactions}
            isLoading={transactionsQuery.isLoading}
            limit={NUMBER_OF_ITEMS_ON_SEPARATE_PAGE}
            pagination={{
              selectedPage: txsPagination.selectedPage,
              linkToPage: txsPagination.linkToPage,
            }}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}
