import { Component, OnInit,Input, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  user: any={};
  photoURL : any;
  posts: any[] = [];
constructor(public activatedRoute: ActivatedRoute, public ngZone: NgZone, private spinner:NgxSpinnerService, private toastr:ToastrService) {
  this.user = firebase.auth().currentUser;
  this.photoURL = this.user.photoURL;
  this.getPosts();
}

  ngOnInit(): void {
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
      this.toastr.error('Error getting posts');
    })
  
  }
}
