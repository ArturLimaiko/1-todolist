import { AppRootStateType } from '../../state/state'
import { useSelector } from 'react-redux'

export const useAppSelector = useSelector.withTypes<AppRootStateType>()
