import {SxProps} from "@mui/material";

export const FilterButtonContainerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px'
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1
})