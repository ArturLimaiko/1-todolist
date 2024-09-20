import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
	title: string
	todolistId:string
	filter: FilterValuesType
	tasks: TaskType[]
	removeTask: (taskId: string,todolistId:string) => void
	changeFilter: (filter: FilterValuesType,todolistId:string) => void
	addTask: (title: string,todolistId:string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean,todolistId:string) => void
	removeTodolist:(todolistId:string) => void
	updateTaskTitle:(todolistId: string, taskId: string,updatedTitle: string) => void
	updateTodolistTitle:(todolistId: string,updatedTitle: string)=> void
}

export const Todolist = (props: PropsType) => {
	const {title,
		todolistId,
		filter,
		tasks,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		removeTodolist,
		updateTaskTitle,
		updateTodolistTitle
	} = props

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter,todolistId)
	}

	const  addTaskHandler = (title:string) => {
		addTask(todolistId,title)
	}

	const updateTodolistTitleHandler = (updateTitle: string) => {
		updateTodolistTitle(todolistId,updateTitle)
	}

	const updateTaskTitleHandler = ( taskId:string ,updatedTitle:string) => {
		updateTaskTitle(todolistId, taskId, updatedTitle)
	}

	return (
		<div>
            <h3><EditableSpan oldTitle={title} onClick={updateTodolistTitleHandler}/>
				<IconButton aria-label="delete" size="small" onClick={() => removeTodolist(todolistId)}>
					<DeleteIcon fontSize="inherit" />
				</IconButton>


            </h3>
			<AddItemForm addItem={addTaskHandler}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id,todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue,todolistId)
							}

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan oldTitle={task.title} onClick={(updateTitle) => updateTaskTitleHandler(task.id, updateTitle)}/>
								<IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
									<DeleteIcon fontSize="inherit" />
								</IconButton>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
