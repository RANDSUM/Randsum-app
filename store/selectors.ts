import { StoreApi, UseBoundStore } from 'zustand'

/**
 * Type helper for creating a store with selectors
 * Extends the store with a `use` property containing auto-generated selectors
 */
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

/**
 * Creates type-safe selectors for a Zustand store
 * This allows for better type inference and autocompletion when accessing store values
 *
 * @param _store The Zustand store to create selectors for
 * @returns The original store enhanced with auto-generated selectors
 */
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  type StateType = ReturnType<(typeof _store)['getState']>
  type UseStoreType = { [K in keyof StateType]: () => StateType[K] }

  const store = _store as WithSelectors<typeof _store>
  store.use = {} as UseStoreType

  for (const k of Object.keys(store.getState())) {
    ;(store.use as Record<string, () => unknown>)[k] = () =>
      store((s) => s[k as keyof typeof s])
  }

  return store
}
