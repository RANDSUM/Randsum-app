import { screen } from '@testing-library/react-native'

import { Text } from '@/components/atoms'
import { MainLayout } from '@/components/templates'
import { appRender } from '@/test/appRender'

describe('<MainLayout />', () => {
  test('renders children correctly', () => {
    appRender(
      <MainLayout>
        <Text>Test Content</Text>
      </MainLayout>
    )

    expect(screen.getByText('Test Content')).toBeTruthy()
  })
})
