import {
  Button,
  Card,
  Surface,
  Text,
  TextInput,
  useAppTheme,
  View
} from '@/components/Themed'
import { ScrollView, StyleSheet } from 'react-native'

export default function Index() {
  const theme = useAppTheme()

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text variant="headlineLarge" style={styles.title}>
          Dice Roller Theme
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Material Design Theme
        </Text>
      </View>

      <Surface style={styles.surface} elevation={1} mode="elevated">
        <Text
          variant="titleMedium"
          theme={{ colors: { onSurface: theme.colors.onPrimaryContainer } }}
        >
          Primary Colors
        </Text>
        <View style={styles.row}>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            style={styles.button}
          >
            Contained
          </Button>
          <Button
            mode="outlined"
            buttonColor="transparent"
            textColor={theme.colors.primary}
            style={[styles.button, { borderColor: theme.colors.primary }]}
          >
            Outlined
          </Button>
          <Button
            mode="text"
            buttonColor="transparent"
            textColor={theme.colors.primary}
            style={styles.button}
          >
            Text
          </Button>
        </View>
      </Surface>

      <Surface style={styles.surface} elevation={1} mode="elevated">
        <Text
          variant="titleMedium"
          theme={{ colors: { onSurface: theme.colors.onSecondaryContainer } }}
        >
          Secondary Colors
        </Text>
        <View style={styles.row}>
          <Button
            mode="contained"
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onSecondary}
            style={styles.button}
          >
            Contained
          </Button>
          <Button
            mode="outlined"
            buttonColor="transparent"
            textColor={theme.colors.secondary}
            style={[styles.button, { borderColor: theme.colors.secondary }]}
          >
            Outlined
          </Button>
          <Button
            mode="text"
            buttonColor="transparent"
            textColor={theme.colors.secondary}
            style={styles.button}
          >
            Text
          </Button>
        </View>
      </Surface>

      <Surface style={styles.surface} elevation={1} mode="elevated">
        <Text
          variant="titleMedium"
          theme={{ colors: { onSurface: theme.colors.onTertiaryContainer } }}
        >
          Tertiary Colors
        </Text>
        <View style={styles.row}>
          <Button
            mode="contained"
            buttonColor={theme.colors.tertiary}
            textColor={theme.colors.onTertiary}
            style={styles.button}
          >
            Contained
          </Button>
          <Button
            mode="outlined"
            buttonColor="transparent"
            textColor={theme.colors.tertiary}
            style={[styles.button, { borderColor: theme.colors.tertiary }]}
          >
            Outlined
          </Button>
          <Button
            mode="text"
            buttonColor="transparent"
            textColor={theme.colors.tertiary}
            style={styles.button}
          >
            Text
          </Button>
        </View>
      </Surface>

      <Card style={styles.card}>
        <Card.Title
          title="Example Card"
          subtitle="Card with content and actions"
        />
        <Card.Content>
          <Text variant="bodyMedium">
            This is an example of a card component with text content, input
            field, and action buttons.
          </Text>
          <TextInput
            label="Enter text here"
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="text"
            buttonColor="transparent"
            textColor={theme.colors.primary}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            Submit
          </Button>
        </Card.Actions>
      </Card>

      <Surface style={styles.surface} elevation={5} mode="elevated">
        <Text
          variant="titleMedium"
          theme={{ colors: { onSurface: theme.colors.onErrorContainer } }}
        >
          Error Colors
        </Text>
        <View style={styles.row}>
          <Button
            mode="contained"
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
            style={styles.button}
          >
            Contained
          </Button>
          <Button
            mode="outlined"
            buttonColor="transparent"
            textColor={theme.colors.error}
            style={[styles.button, { borderColor: theme.colors.error }]}
          >
            Outlined
          </Button>
          <Button
            mode="text"
            buttonColor="transparent"
            textColor={theme.colors.error}
            style={styles.button}
          >
            Text
          </Button>
        </View>
      </Surface>

      <Surface style={styles.surface} elevation={3} mode="elevated">
        <Text
          variant="titleMedium"
          theme={{ colors: { onSurface: theme.colors.onSurfaceVariant } }}
        >
          Elevation Levels
        </Text>
        <View style={styles.row}>
          <Surface style={styles.colorBox} elevation={0} mode="flat">
            <Text variant="labelMedium">Level 0</Text>
          </Surface>
          <Surface style={styles.colorBox} elevation={2} mode="flat">
            <Text variant="labelMedium">Level 2</Text>
          </Surface>
          <Surface style={styles.colorBox} elevation={5} mode="flat">
            <Text variant="labelMedium">Level 5</Text>
          </Surface>
        </View>
      </Surface>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    marginBottom: 16
  },
  surface: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 8
  },
  button: {
    marginHorizontal: 4
  },
  colorBox: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  card: {
    marginBottom: 16
  },
  input: {
    marginTop: 16
  }
})
