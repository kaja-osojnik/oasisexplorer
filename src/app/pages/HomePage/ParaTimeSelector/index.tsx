import { FC, memo, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import paratimeSelectorGlow from './images/paratime-selector-glow.svg'
import paratimeSelectorGlobe from './images/paratime-selector-globe.svg'
import { Graph } from './Graph'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { ParaTimeSelectorStep } from './types'
import { ParaTimeSelectorUtils } from './para-time-selector-utils'
import { GraphEndpoint } from './Graph/types'
import ChevronIcon from '../../../icons/ChevronIcon'
import { ArrowDirection } from '../../../icons/types'
import Fade from '@mui/material/Fade'

interface ParaTimeSelectorProps {
  disabled: boolean
}

const ParaTimeSelectorGlow = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !(['disabled'] as (keyof ParaTimeSelectorProps)[]).includes(prop as keyof ParaTimeSelectorProps),
})<ParaTimeSelectorProps>(({ disabled }) => ({
  position: 'relative',
  width: '80vh',
  height: '80vh',
  marginTop: '-17vh',
  backgroundImage: `url("${paratimeSelectorGlow}")`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  ...(disabled
    ? {
        opacity: 0.25,
      }
    : {}),
}))

const ParaTimeSelectorGlobe = styled(Box)(() => ({
  position: 'absolute',
  width: '65%',
  paddingBottom: '65%',
  left: '50%',
  bottom: '8%',
  transform: 'translateX(-50%)',
  backgroundImage: `url("${paratimeSelectorGlobe}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  borderRadius: '50%',
}))

const ExploreBtn = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  width: 'max-content',
}))

const ZoomOutBtn = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
}))

const ZoomOutBtnFade = styled(Fade)(() => ({
  transitionDelay: '500ms !important',
}))

const ParaTimeSelectorCmp: FC<ParaTimeSelectorProps> = ({ disabled }) => {
  const { t } = useTranslation()
  const [step, setStep] = useState<ParaTimeSelectorStep>(ParaTimeSelectorStep.ENABLE_EXPLORE)
  const [selectedGraphEndpoint, setSelectedGraphEndpoint] = useState<GraphEndpoint>(GraphEndpoint.CONSENSUS)

  const onExploreClick = () => {
    setStep(ParaTimeSelectorStep.EXPLORE)
  }

  const onZoomOutClick = () => {
    setSelectedGraphEndpoint(GraphEndpoint.CONSENSUS)
  }

  return (
    <ParaTimeSelectorGlow disabled={disabled}>
      <ParaTimeSelectorGlobe>
        <Graph
          disabled={disabled}
          transparent={ParaTimeSelectorUtils.getIsGraphTransparent(step)}
          selectedGraphEndpoint={selectedGraphEndpoint}
          setSelectedGraphEndpoint={setSelectedGraphEndpoint}
        />
        <ZoomOutBtnFade in={ParaTimeSelectorUtils.showZoomOutBtn(selectedGraphEndpoint)}>
          <ZoomOutBtn
            variant="text"
            color="secondary"
            startIcon={<ChevronIcon arrowDirection={ArrowDirection.LEFT} />}
            onClick={onZoomOutClick}
            disabled={disabled}
          >
            {t('home.zoomOutBtnText')}
          </ZoomOutBtn>
        </ZoomOutBtnFade>
        {ParaTimeSelectorUtils.showExploreBtn(step) && (
          <ExploreBtn
            color="secondary"
            variant="contained"
            onClick={onExploreClick}
            aria-label={t('home.exploreBtnText') ?? undefined}
          >
            {t('home.exploreBtnText')}
          </ExploreBtn>
        )}
      </ParaTimeSelectorGlobe>
    </ParaTimeSelectorGlow>
  )
}

export const ParaTimeSelector = memo(ParaTimeSelectorCmp)
