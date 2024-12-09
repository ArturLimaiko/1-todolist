import { RootState } from 'app/state'
import { useSelector } from 'react-redux'

export const useAppSelector = useSelector.withTypes<RootState>()
