import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user: any={};
  photoURL : any;
  posts: any[] = [];
  constructor(private spinner:NgxSpinnerService, private toastr:ToastrService) { 
    this.user = firebase.auth().currentUser;
    this.photoURL = this.user.photoURL;
    this.getPosts();
  }

  ngOnInit() {
  }

  getPosts(){
    this.spinner.show();
    firebase.firestore().collection("posts")
    .orderBy("created", "desc")
    .get().then((querySnapshot) => {

      console.log(querySnapshot.docs);
      this.posts = querySnapshot.docs;
      this.spinner.hide();
    }).catch((err) => {
      this.spinner.hide();
      console.log(err);
      this.toastr.error('Error retrieving posts');
    })

  }
 
  onPostCreated(){
    this.spinner.show();
    this.posts=[];
    this.getPosts();
    this.spinner.hide();
  }
  onDelete(){
    this.spinner.show();
    this.posts=[];
    this.getPosts();
    this.spinner.hide();
  }

}
