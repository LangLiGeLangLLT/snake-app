import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type State = {
  score: number
  record: number
  restart: boolean
}

export type Actions = {
  updateScore: (score: number) => void
  updateRecord: (score: number) => void
  updateRestart: (restart: boolean) => void
}
export const useStore = create(
  immer<State & Actions>((set) => ({
    score: 0,
    record: 0,
    restart: false,
    updateScore: (score: number) =>
      set((state) => {
        state.score = score
      }),
    updateRecord: (score: number) =>
      set((state) => {
        if (state.record < score) {
          state.record = score
        }
      }),
    updateRestart: (restart: boolean) =>
      set((state) => {
        state.restart = restart
      }),
  }))
)
