import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError} from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'
import { Todo } from './toto'
import { User } from './user'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = "https://jsonplaceholder.typicode.com/"

@Injectable({
  providedIn: 'root'
})
export class AppService {

	constructor(private http: HttpClient) { }

	getTodos (userId: number, title: string): Observable<Todo[]> {
		let apiUrl = `${baseUrl}todos?userId=${userId}`
		if (title) apiUrl += '&title=' + title
		return this.http.get<Todo[]>(apiUrl)
			.pipe(
				tap(todos => console.log('Fetch data')),
				catchError(this.handleError)
			)
	}
	getUsers (): Observable<User[]> {
		const apiUrl = `${baseUrl}users`
		return this.http.get<User[]>(apiUrl)
			.pipe(
				map(users => {
					return users.map(user => {
						return {
							id: user.id,
							name: user.name,
						}
					})
				}),
				tap(todos => console.log('Fetch data')),
				catchError(this.handleError)
			)
	}

	addTodo(newTodo: Todo): Observable<Todo> {
		const apiUrl = `${baseUrl}todos`
		return this.http.post<Todo>(apiUrl, newTodo, httpOptions).pipe(
			tap((todo: Todo) => console.log(`added todo w/ id=${todo.id}`)),
			catchError(this.handleError)
		);
	}
	updateTodo(todo: Todo): Observable<Todo> {
		const apiUrl = `${baseUrl}todos/${todo.id}`
		return this.http.put<Todo>(apiUrl, todo, httpOptions).pipe(
			tap((todo: Todo) => console.log(`updated todo w/ id=${todo.id}`)),
			catchError(this.handleError)
		);
	}
	deleteTodo(todoId: number): Observable<Todo> {
		const apiUrl = `${baseUrl}todos/${todoId}`
		return this.http.delete<Todo>(apiUrl, httpOptions).pipe(
			tap((todo: Todo) => console.log(`deleted todo w/ id=${todo}`)),
			catchError(this.handleError)
		);
	}

	private handleError(error: HttpErrorResponse) {
		return throwError('Request error!')
	}


}
