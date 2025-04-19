import { StyleSheet } from 'react-native'
import { Text, View, useAppTheme } from './Themed'

export default function Footer() {
  const theme = useAppTheme()

  return (
    <View style={[styles.footer, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.footerText}>Made with 👹 by RANDSUM</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7
  }
})
