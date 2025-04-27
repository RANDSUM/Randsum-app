import Index from '@/app/(drawer)/index'
import { appRender } from '@/test/appRender'

describe('<Index />', () => {
  test('renders the Roll button', () => {
    const { getByText } = appRender(<Index />)

    const rollButton = getByText('Roll')

    expect(rollButton).toBeTruthy()
  })
})
