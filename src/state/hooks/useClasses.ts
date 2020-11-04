import { StyledProps, Theme, makeStyles } from '@material-ui/core'
import { Styles } from '@material-ui/styles'

export type MUIStyle = Styles<Theme, Record<string, unknown>, string>
export type MUIClasses = Record<string, string>

const useClasses = (styles: MUIStyle, props?: StyledProps): MUIClasses => {
  const generateClasses = makeStyles(styles)

  return generateClasses(props)
}

export default useClasses
