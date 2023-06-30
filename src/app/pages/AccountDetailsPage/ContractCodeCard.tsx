import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { LinkableDiv } from '../../components/PageLayout/LinkableDiv'
import { useAccount } from './hook'
import { useRequiredScopeParam } from '../../hooks/useScopeParam'
import { useLoaderData } from 'react-router-dom'
import { CardEmptyState } from './CardEmptyState'
import Typography from '@mui/material/Typography'
import { ScrollableDataDisplay } from '../../components/ScrollableDataDisplay'
import Box from '@mui/material/Box'
import { CopyToClipboard } from '../../components/CopyToClipboard'
import { useScreenSize } from '../../hooks/useScreensize'

export const contractCodeContainerId = 'code'

const CodeDisplay: FC<{ code: string | undefined; label: string; extraTopPadding?: boolean }> = ({
  code,
  label,
  extraTopPadding,
}) => {
  const { t } = useTranslation()
  const { isMobile } = useScreenSize()
  return code === undefined ? null : (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 3,
          pt: extraTopPadding ? 4 : 0,
        }}
      >
        <Typography variant="h4" component="h4">
          {label}
        </Typography>
        <CopyToClipboard
          value={code}
          label={isMobile ? t('common.copy') : t('contract.copyButton', { subject: label })}
        />
      </Box>

      <ScrollableDataDisplay data={code} />
    </>
  )
}

export const ContractCodeCard: FC = () => {
  const { t } = useTranslation()
  const scope = useRequiredScopeParam()
  const address = useLoaderData() as string

  const { isFetched, account } = useAccount(scope, address)
  const contract = account?.evm_contract
  const noCode = isFetched && !contract?.creation_bytecode && !contract?.runtime_bytecode
  return (
    <Card>
      <LinkableDiv id={contractCodeContainerId}>
        {noCode && <CardEmptyState label={t('contract.noCode')} />}
        {contract && (contract.creation_bytecode || contract.runtime_bytecode) && (
          <CardContent>
            <CodeDisplay code={contract.creation_bytecode} label={t('contract.creationByteCode')} />
            <CodeDisplay
              code={contract.runtime_bytecode}
              label={t('contract.runtimeByteCode')}
              extraTopPadding={!!contract.creation_bytecode}
            />
          </CardContent>
        )}
      </LinkableDiv>
    </Card>
  )
}
