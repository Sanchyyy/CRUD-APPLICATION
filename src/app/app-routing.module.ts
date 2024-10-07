import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { AboutPageComponent } from './Pages/about-page/about-page.component';
import { ContactPageComponent } from './Pages/contact-page/contact-page.component';
import { StudentCreateComponent } from './Pages/student-create/student-create.component';
import { StudentPageComponent } from './Pages/student-page/student-page.component';
import { StudentEditComponent } from './Pages/student-edit/student-edit.component';

const routes: Routes = [

  {path : '', component: HomePageComponent , title: 'Home page'},
  {path : 'about-us', component: AboutPageComponent , title: 'About page'},
  {path : 'contact-us', component: ContactPageComponent, title: 'Contact page'}
  ,{path : 'students/create', component: StudentCreateComponent, title: 'STUDENT CREATE '}
  ,{path : 'students', component: StudentPageComponent, title: 'STUDENT Lists '}
  ,{path : 'students/:id/edit', component: StudentEditComponent, title: 'STUDENT EDIT '}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
