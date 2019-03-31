import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent, DialogTodo } from './app.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule,
	MatButtonModule,
	MatSelectModule,
	MatCardModule,
	MatCheckboxModule,
	MatDialogModule,
	MatInputModule
} from '@angular/material'
import { MatFormFieldModule } from '@angular/material/form-field'
@NgModule({
	entryComponents: [DialogTodo],
  declarations: [
	AppComponent,
	DialogTodo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	NoopAnimationsModule,
	HttpClientModule,
	MatTableModule,
	MatPaginatorModule,
	MatButtonModule,
	MatFormFieldModule,
	MatSelectModule,
	FormsModule,
	ReactiveFormsModule,
	MatCheckboxModule,
	MatCardModule,
	MatDialogModule,
	  MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
