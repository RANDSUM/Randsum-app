import { DiceButtons, DicePool } from '@/components/organisms'
import { MainLayout } from '@/components/templates'

export function DiceRollerPage() {
  return (
    <MainLayout>
      <DicePool />
      <DiceButtons />
    </MainLayout>
  )
}
