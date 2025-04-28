import { render } from '@testing-library/react-native'
import { PropsWithChildren, ReactElement } from 'react'

import { ThemeProvider } from '@/components'

export function appRender<T>(componentArg: ReactElement<T>) {
  const AppWrapper = ({ children }: PropsWithChildren) => (
    <ThemeProvider>{children}</ThemeProvider>
  )

  return render(componentArg, { wrapper: AppWrapper })
}
