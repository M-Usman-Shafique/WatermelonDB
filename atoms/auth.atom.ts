import { atom } from 'jotai'

export const isAuthenticatedAtom = atom(false)
export const currentUserAtom = atom<IUser | null>(null)
export const isLoadingAtom = atom(true);