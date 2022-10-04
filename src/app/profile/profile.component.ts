import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any ={};
  posts: any[] =[];
  constructor(public activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private toastr:ToastrService) { 

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProfile(id);
    this.getUsersPosts(id);

  }

  ngOnInit() {
  }

  getProfile(id: string){
    this.spinner.show();
    firebase.firestore().collection("users").doc(id).get().then((documentSnapshot)=>{
      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      this.user.hobbies = this.user.hobbies.split(",");
      this.spinner.hide();
    }).catch((error)=>{
      this.spinner.hide();
      console.log(error);
      this.toastr.error('Error getting profile');
    })
  }

  getUsersPosts(id: string){
    this.spinner.show();
    firebase.firestore().collection("posts").where("owner","==",id).get().then((data)=>{
      this.posts = data.docs;
      this.spinner.hide();
    })
  }

}
