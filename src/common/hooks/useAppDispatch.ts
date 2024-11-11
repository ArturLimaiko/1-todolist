import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../state/state'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
