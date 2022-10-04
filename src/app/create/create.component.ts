import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from "ngx-spinner"; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  editorConfig: AngularEditorConfig = {editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]};
  ckeConfig: any;
  title: string;
  content: string;
  @Output('postCreated') postCreated = new EventEmitter();

  constructor(private SpinnerService: NgxSpinnerService, private toastr: ToastrService) { 
    
  }

  ngOnInit() {
    this.createPost()    
        this.ckeConfig = {    
          allowedContent: false,    
          extraPlugins: 'divarea',    
          forcePasteAsPlainText: true    
        };    
  }

  createPost(){

   
    firebase.firestore().collection("posts").add({
      title: this.title, 
      content: this.content,
      owner: firebase.auth().currentUser.uid,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=> {
      console.log(data);
      this.postCreated.emit();
      this.toastr.success('Post created successfully');
    }).catch((error)=>{
      console.log(error);
      this.toastr.error("Post creation failed");
    })

  }

}
