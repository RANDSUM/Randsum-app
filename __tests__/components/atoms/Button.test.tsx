import { screen } from '@testing-library/react-native'

import { Button } from '@/components/atoms'
import { appRender } from '@/test/appRender'

describe('<Button />', () => {
  test('renders with text', () => {
    appRender(<Button>Test Button</Button>)
    expect(screen.getByText('Test Button')).toBeTruthy()
  })

  test('renders with icon', () => {
    appRender(<Button icon="dice-d20">Icon Button</Button>)
    expect(screen.getByText('Icon Button')).toBeTruthy()
  })

  test('applies custom styles', () => {
    const { getByText } = appRender(
      <Button style={{ width: 200 }}>Styled Button</Button>
    )
    const button = getByText('Styled Button')
    expect(button.props.style).toBeTruthy()
  })

  test('applies custom colors', () => {
    const { getByText } = appRender(
      <Button buttonColor="#FF0000" textColor="#FFFFFF">
        Colored Button
      </Button>
    )
    const button = getByText('Colored Button')
    expect(button.props.style).toBeTruthy()
  })

  test('renders in disabled state', () => {
    const { getByText } = appRender(<Button disabled>Disabled Button</Button>)
    expect(getByText('Disabled Button')).toBeTruthy()
  })
})
