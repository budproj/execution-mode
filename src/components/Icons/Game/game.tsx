import { SvgIcon, SvgIconProps } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { AcessibleIconProps } from 'components/Icons/types'

export interface GameIconProperties extends SvgIconProps, AcessibleIconProps {}

const Game = ({ title, desc, ...rest }: GameIconProperties): ReactElement => (
  <SvgIcon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      opacity="0.4"
      d="M13.3048 5.88218V6.06523C12.8142 6.05559 12.3235 6.05559 11.8328 6.05559V5.89182C11.8328 5.22709 11.2734 4.68759 10.6061 4.68759H9.63458C8.52565 4.68759 7.6228 3.80128 7.6228 2.72229C7.6228 2.32731 7.95646 1.99976 8.35882 1.99976C8.77099 1.99976 9.09483 2.32731 9.09483 2.72229C9.09483 3.01131 9.34017 3.24252 9.63458 3.24252H10.6061C12.088 3.25215 13.295 4.43711 13.3048 5.88218"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1638 6.08206C15.4789 6.08638 15.7947 6.09071 16.1116 6.09396C19.5169 6.09396 21.9998 8.52168 21.9998 11.8742V16.1806C21.9998 19.5331 19.5169 21.9609 16.1116 21.9609C14.7475 21.9898 13.3835 21.9994 12.0096 21.9994C10.6357 21.9994 9.25196 21.9898 7.88788 21.9609C4.48258 21.9609 1.99976 19.5331 1.99976 16.1806V11.8742C1.99976 8.52168 4.48258 6.09396 7.8977 6.09396C9.18327 6.07469 10.4983 6.05542 11.8329 6.05542C12.3236 6.05542 12.8143 6.05542 13.305 6.06505C13.9236 6.06505 14.5422 6.07354 15.1638 6.08206ZM10.8515 14.7453H9.82103V15.7665C9.82103 16.1615 9.48737 16.489 9.08502 16.489C8.67285 16.489 8.349 16.1615 8.349 15.7665V14.7453H7.30876C6.90641 14.7453 6.57275 14.4274 6.57275 14.0228C6.57275 13.6278 6.90641 13.3002 7.30876 13.3002H8.349V12.2887C8.349 11.8937 8.67285 11.5662 9.08502 11.5662C9.48737 11.5662 9.82103 11.8937 9.82103 12.2887V13.3002H10.8515C11.2538 13.3002 11.5875 13.6278 11.5875 14.0228C11.5875 14.4274 11.2538 14.7453 10.8515 14.7453ZM15.0224 13.1177H15.1205C15.5229 13.1177 15.8565 12.7998 15.8565 12.3951C15.8565 12.0002 15.5229 11.6726 15.1205 11.6726H15.0224C14.6102 11.6726 14.2864 12.0002 14.2864 12.3951C14.2864 12.7998 14.6102 13.1177 15.0224 13.1177ZM16.7001 16.4312H16.7983C17.2006 16.4312 17.5343 16.1132 17.5343 15.7086C17.5343 15.3136 17.2006 14.9861 16.7983 14.9861H16.7001C16.288 14.9861 15.9641 15.3136 15.9641 15.7086C15.9641 16.1132 16.288 16.4312 16.7001 16.4312Z"
    />
  </SvgIcon>
)

Game.defaultProps = {
  htmlColor: 'black',
}

export default Game
