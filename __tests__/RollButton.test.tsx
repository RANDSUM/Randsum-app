import RollButtonInline from '@/components/RollButtonInline'
import { appRender } from '@/test/appRender'
import { screen } from '@testing-library/react-native'

describe('<RollButtonInline />', () => {
  test('renders the Roll button', () => {
    appRender(<RollButtonInline />)

    const rollButton = screen.getByText('Roll')

    expect(rollButton).toBeTruthy()
  })
})
