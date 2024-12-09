import { RootState } from 'app/store'

export const tasksSelectors = (state: RootState) => state.tasks

//на всякиий протипизированное
// export const tasksSelectors = (state: RootState):TasksStateType => state.tasks
