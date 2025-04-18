import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
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
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant="headlineLarge" style={styles.title}>
          Spooky Theme Showcase
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Welcome to the dark side...
        </Text>
      </View>

      {/* Primary Color Section */}
      <Surface
        style={[
          styles.surface,
          { backgroundColor: theme.colors.elevation.level1 }
        ]}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onPrimaryContainer }}
        >
          Primary Colors
        </Text>
        <View style={styles.row}>
          <Button mode="contained" style={styles.button}>
            Primary Button
          </Button>
          <Button mode="outlined" style={styles.button}>
            Outlined
          </Button>
          <Button mode="text" style={styles.button}>
            Text
          </Button>
        </View>
      </Surface>

      {/* Secondary Color Section */}
      <Surface
        style={[
          styles.surface,
          { backgroundColor: theme.colors.elevation.level2 }
        ]}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onSecondaryContainer }}
        >
          Secondary Colors
        </Text>
        <View style={styles.row}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: theme.colors.secondary }
            ]}
          >
            <Text style={{ color: theme.colors.onSecondary }}>Secondary</Text>
          </View>
          <IconButton
            icon="ghost"
            size={24}
            iconColor={theme.colors.secondary}
            onPress={() => {}}
          />
        </View>
      </Surface>

      {/* Tertiary Color Section */}
      <Surface
        style={[
          styles.surface,
          { backgroundColor: theme.colors.elevation.level3 }
        ]}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onTertiaryContainer }}
        >
          Tertiary Colors
        </Text>
        <View style={styles.row}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: theme.colors.tertiary }
            ]}
          >
            <Text style={{ color: theme.colors.onTertiary }}>Tertiary</Text>
          </View>
          <ActivityIndicator
            animating={true}
            color={theme.colors.tertiary}
            size="large"
          />
        </View>
      </Surface>

      {/* Card Example */}
      <Card style={styles.card}>
        <Card.Title
          title="Haunted Card"
          subtitle="Something wicked this way comes"
        />
        <Card.Content>
          <Text variant="bodyMedium">
            The souls of the damned wander these halls, forever trapped in the
            void between worlds.
          </Text>
          <TextInput
            label="Enter your darkest fear"
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button mode="contained">Submit</Button>
        </Card.Actions>
      </Card>

      {/* Error Section */}
      <Surface
        style={[
          styles.surface,
          { backgroundColor: theme.colors.elevation.level5 }
        ]}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onErrorContainer }}
        >
          Error Colors
        </Text>
        <View style={styles.row}>
          <View
            style={[styles.colorBox, { backgroundColor: theme.colors.error }]}
          >
            <Text style={{ color: theme.colors.onError }}>Error</Text>
          </View>
          <IconButton
            icon="skull"
            size={24}
            iconColor={theme.colors.error}
            onPress={() => {}}
          />
        </View>
      </Surface>

      {/* Background Section */}
      <Surface
        style={[
          styles.surface,
          { backgroundColor: theme.colors.elevation.level3 }
        ]}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Elevation Levels
        </Text>
        <View style={styles.row}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: theme.colors.elevation.level0 }
            ]}
          >
            <Text style={{ color: theme.colors.onSurface }}>Level 0</Text>
          </View>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: theme.colors.elevation.level2 }
            ]}
          >
            <Text style={{ color: theme.colors.onSurface }}>Level 2</Text>
          </View>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: theme.colors.elevation.level5 }
            ]}
          >
            <Text style={{ color: theme.colors.onSurface }}>Level 5</Text>
          </View>
        </View>
      </Surface>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212' // Material Design dark background
  },
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
    borderRadius: 0
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
    borderRadius: 0
  },
  card: {
    marginBottom: 16
  },
  input: {
    marginTop: 16
  }
})
