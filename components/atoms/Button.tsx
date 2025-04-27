import { MD3Theme, Button as PaperButton, useTheme } from 'react-native-paper'

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
