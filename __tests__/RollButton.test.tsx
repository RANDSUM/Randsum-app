import RollButtonInline from '@/components/RollButtonInline'
import { appRender } from '@/test/appRender'
import { screen } from '@testing-library/react-native'

const elements = {
  rollButton: () => screen.getByText('Roll')
}

describe('<RollButtonInline />', () => {
  test('renders the Roll button', () => {
    appRender(<RollButtonInline />)

    expect(elements.rollButton()).toBeTruthy()
  })
})
