import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import alanBtn from "@alan-ai/alan-sdk-web";
import { AlanButton } from '@alan-ai/alan-sdk-web/dist/AlanButton';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  alanBtnInstance: AlanButton;
  loggedIn: boolean = false;
  user: any;
  photoURL: any;
  username: any;
  users: any={};
  
  constructor(public authService: AuthService, public activatedRoute: ActivatedRoute, private toastr:ToastrService, private spinner:NgxSpinnerService) {
    
    this.alanBtnInstance = alanBtn({
      key: 'b3a5ea51************************************8fdd0dc/stage',
      onCommand: (commandData: { command: string }) => {
        console.log(commandData);
        if (commandData.command === 'command-example') {
          document.getElementById('rocket').style.transform = 'rotate(270deg)';
        }
      }
    });
    this.user = firebase.auth().currentUser;
      if(this.user){
        this.loggedIn = true;
      }else{
        this.loggedIn=false;
      }

      firebase.auth().onAuthStateChanged((user) =>{

        if(user){
          this.loggedIn=true;
        }else{
          this.loggedIn=false;
        }
        
        
      })
      
   }

  ngOnInit() {
   
  }
  logout(){
    this.spinner.show();
    firebase.auth().signOut();
    this.toastr.info('Logged out');
    this.spinner.hide();

  }

  getProfile(id: string){
    this.spinner.show();
    firebase.firestore().collection("users").doc(id).get().then((documentSnapshot)=>{
      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName;
      this.user.id = documentSnapshot.id;
      this.spinner.hide();
    }).catch((error)=>{
      this.spinner.hide();
      console.log(error);
      this.toastr.error('Error getting profile');
    })
  }


}
