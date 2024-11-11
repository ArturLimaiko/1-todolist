import { AppRootStateType } from '../../../state/state'

export const tasksSelectors = (state: AppRootStateType) => state.tasks

//на всякиий протипизированное
// export const tasksSelectors = (state: AppRootStateType):TasksStateType => state.tasks
