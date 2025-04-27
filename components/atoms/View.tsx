import { Surface as PaperSurface } from 'react-native-paper'

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
