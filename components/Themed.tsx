import { CustomDarkTheme } from '@/constants/Theme'
import {
  MD3Theme,
  ActivityIndicator as PaperActivityIndicator,
  Appbar as PaperAppbar,
  Button as PaperButton,
  Card as PaperCard,
  Dialog as PaperDialog,
  FAB as PaperFAB,
  IconButton as PaperIconButton,
  Modal as PaperModal,
  Portal as PaperPortal,
  Provider as PaperProvider,
  Snackbar as PaperSnackbar,
  Surface as PaperSurface,
  Text as PaperText,
  TextInput as PaperTextInput,
  useTheme
} from 'react-native-paper'

export function useAppTheme() {
  return useTheme<MD3Theme>(CustomDarkTheme)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <PaperProvider theme={CustomDarkTheme}>{children}</PaperProvider>
}

export const Text = PaperText
export const Surface = PaperSurface
export function Button(props: React.ComponentProps<typeof PaperButton>) {
  const theme = useTheme<MD3Theme>()

  const getDefaultButtonColor = () => {
    if (props.mode === 'outlined') {
      return 'transparent'
    }
    return props.mode === 'contained' ? theme.colors.primary : 'transparent'
  }

  const getDefaultTextColor = () => {
    if (props.mode === 'outlined') {
      return theme.colors.primary
    }
    return props.mode === 'contained'
      ? theme.colors.onPrimary
      : theme.colors.primary
  }

  return (
    <PaperButton
      buttonColor={props.buttonColor || getDefaultButtonColor()}
      textColor={props.textColor || getDefaultTextColor()}
      mode={props.mode || 'text'}
      {...props}
      style={[{ elevation: 2, borderRadius: 4 }, props.style]}
    />
  )
}
export const TextInput = PaperTextInput
export const Card = PaperCard
export const Appbar = PaperAppbar
export const IconButton = PaperIconButton
export const Modal = PaperModal
export const Portal = PaperPortal
export const ActivityIndicator = PaperActivityIndicator
export const FAB = PaperFAB
export const FABGroup = PaperFAB.Group
export const Dialog = PaperDialog
export const Snackbar = PaperSnackbar

export function View(props: React.ComponentProps<typeof PaperSurface>) {
  const { style, ...otherProps } = props
  return (
    <PaperSurface
      style={[{ backgroundColor: 'transparent' }, style]}
      elevation={0}
      {...otherProps}
    />
  )
}
