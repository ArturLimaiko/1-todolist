import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/state'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
