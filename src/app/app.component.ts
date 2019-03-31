import { Component, ViewChild, Inject } from '@angular/core';
import { AppService } from './app.service'
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { MatTable } from '@angular/material'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from './toto'
import { User } from './user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  	title = 'totos-demo'
	displayedColumns: string[] = ['id',  'title', 'completed', 'actions']
	data: Todo[] = []
	todoDataSource = new MatTableDataSource<Todo>(this.data)
	isLoading = true
	currentUser: User
	users: User[] = []
	searchKey: ''

	constructor(private appService: AppService, private dialog: MatDialog) { }
	@ViewChild(MatTable) todoTable: MatTable<any>
	@ViewChild(MatPaginator) paginator: MatPaginator

	ngOnInit () {
		this.initUsers()
	}
	initUsers () {
		this.appService.getUsers()
			.subscribe(res => {
				this.users = res || []
				if (this.users.length) {
					this.currentUser = this.users[0]
					this.getTodosByUser(this.currentUser.id)
				}
			}, err => {
				console.log(err);
			})
	}
	getTodosByUser (userId: number) {
		this.isLoading = true
		this.appService.getTodos(userId, this.searchKey)
			.subscribe(res => {
				const sample = res.slice(0, 10)
				this.data = sample
				this.todoDataSource.data = this.data
				this.isLoading = false
				this.refreshTable()
			}, err => {
				console.log(err);
				this.isLoading = false
			})
	}
	onSearchEnter () {
		this.getTodosByUser(this.currentUser.id)
	}
	openNewTodoModal () {
		let newTodo: Todo = {
			id: undefined,
			userId: this.currentUser.id,
			title: '',
			completed: false
		}
		const dialogRef = this.dialog.open(DialogTodo, {
			width: '300px',
			data: newTodo
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.addNewTodo(result)
			}
		})
		
		
	}
	addNewTodo (todo: Todo) {
		this.appService.addTodo(todo)
			.subscribe(res => {
				this.data.unshift(res)
				this.refreshTable()
			})
	}
	updateTodoStatus (todo: Todo) {
		console.log('On change: ', todo)
		this.appService.updateTodo(todo)
			.subscribe(res => {
				console.log('updated: ', res)
			})
	}
	deleteTodo (todoId: number) {
		confirm('Are you sure that you want to delete this item? ') &&
		this.appService.deleteTodo(todoId)
			.subscribe(res => {
				console.log('deleted result: ', res)
				const deletedIndex = this.data.findIndex(item => {return item.id === todoId})
				this.data.splice(deletedIndex, 1)
				this.refreshTable()
			})
	}

	openModalEdit (todo: Todo) {
		const dialogRef = this.dialog.open(DialogTodo, {
			width: '300px',
			data: todo
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.updateTodoStatus(result)
			}
		})
	}

	refreshTable () {
		this.todoTable.renderRows()
		this.todoDataSource.paginator = this.paginator
	}
}

@Component({
	selector: 'dialog-todo-form',
	templateUrl: 'dialog-todo.html',
})
export class DialogTodo {
	title: any
	constructor(
		public dialogRef: MatDialogRef<DialogTodo>,
		@Inject(MAT_DIALOG_DATA) public data: Todo) { 
			this.title = new FormControl(data.title, [Validators.required])
		}

	cancel(): void {
		this.dialogRef.close()
	}
	save(): void {
		if (!this.title.invalid) {
			this.data.title = this.title.value
			this.dialogRef.close(this.data)
		}
	}
 }
