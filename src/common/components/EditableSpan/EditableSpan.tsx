import React, { ChangeEvent, memo, useState } from 'react'

export type Props = {
  oldTitle: string
  onClick: (updateTitle: string) => void
}

export const EditableSpan = memo(({ oldTitle, onClick }: Props) => {
  const [edit, setEdit] = useState(false)
  const [updateTitle, setUpdateTitle] = useState(oldTitle)

  const editHandler = () => {
    setEdit(!edit)
    if (edit) {
      onClick(updateTitle)
    }
  }

  const updateTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(event.currentTarget.value)
  }

  return edit ? (
    <input onBlur={editHandler} value={updateTitle} onChange={updateTitleHandler} autoFocus />
  ) : (
    <span onDoubleClick={editHandler}>{oldTitle}</span>
  )
})
