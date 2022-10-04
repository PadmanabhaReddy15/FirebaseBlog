import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CapitalizePipe } from './capitalize.pipe';
import { MenuComponent } from './menu/menu.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';
import { NgxEditorModule } from 'ngx-editor';
import { AuthService } from './auth.service';
import { CKEditorModule } from 'ng2-ckeditor';  
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { NgxTextEditorModule } from 'ngx-text-editor';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppCreateComponent } from './app-create/app-create.component';
import { BlogComponent } from './blog/blog.component';

let firebaseConfig = {
  apiKey: "A***********************GDo",
  authDomain: "******************.com",
  databaseURL: "https://********************.firebaseio.com",
  projectId: "********-***********",
  storageBucket: "********************.com",
  messagingSenderId: "*******************",
  appId: "1:***************:web:******************",
  measurementId: "G-**************"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
   
    SignupComponent,
   
    LoginComponent,
   
    HomeComponent,
   
    CapitalizePipe,
   
    MenuComponent,
   
    MyblogsComponent,
   
    ProfileComponent,
   
    CreateComponent,
   
    PostComponent,
   
    ViewComponent,
   
    CommentsComponent,
   
    EditProfileComponent,
   
    AppCreateComponent,
   
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEditorModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,  
    NgxTextEditorModule,
    HttpClientModule,
    NgxSpinnerModule,
    RichTextEditorModule,
    AngularEditorModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
