import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: any ={};
  message:string;
  photoURL = '';
  constructor(private spinner: NgxSpinnerService, private notify: NotificationService, private toastr:ToastrService) { 
    this.getProfile();
  }

  ngOnInit() {
  }
  getProfile(){
    
    let userId = firebase.auth().currentUser.uid;
    this.spinner.show();
    firebase.firestore().collection("users").doc(userId).get().then((documentSnapshot)=>{
      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      this.spinner.hide();
    }).catch((error)=>{
      console.log(error);
      this.spinner.hide();
    })
  }

  update(){
    
    this.message = "Updating Profile...";
    this.toastr.info('Updating profile..');
    this.spinner.show();
    firebase.auth().currentUser.updateProfile({
      displayName: this.user.displayName, photoURL: this.user.photoUrl
    }).then(() => {
      let userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).update({
        first_name: this.user.displayName.split(' ')[0],
        last_name: this.user.displayName.split(' ')[1],
        photoURL: this.user.photoURL,
        hobbies: this.user.hobbies,
        interests: this.user.interests,
        bio: this.user.bio,
      }).then(() => {
        this.spinner.hide();
        this.toastr.success('Profile Updated Successfully');
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      this.spinner.hide();
      this.toastr.error('Error updating profile');
      console.log(error)
    })

  }
  onFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event) => { 
        this.user.photoURL = event.target.result;
      }
    }
  }
  public delete(){
    this.spinner.show();
    this.user.photoURL = null;
    this.spinner.hide();
  }

}
