import styled from '@emotion/styled'
import React, { ReactElement } from 'react'

const StyledTeamWrapper = styled.div`
  max-height: 250px;
  overflow-y: auto;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cecece;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
`

type StyledTeamSelectWrapperProperties = {
  children: ReactElement[]
  hasScroll?: boolean
}

export const StyledTeamSelectWrapper = ({
  hasScroll,
  children,
}: StyledTeamSelectWrapperProperties) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return hasScroll ? <StyledTeamWrapper>{children}</StyledTeamWrapper> : <>{children}</>
}
