import { Component, OnInit } from '@angular/core';
import alanBtn from "@alan-ai/alan-sdk-web";
import { AlanButton } from '@alan-ai/alan-sdk-web/dist/AlanButton';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alanBtnInstance: AlanButton;
  name: string = 'Phoenix';
  amount: number = 1999;
  dateOfBirth = new Date();
  constructor() { 
    this.alanBtnInstance = alanBtn({
      key: 'b3a5ea*******************************38fdd0dc/stage',
      onCommand: (commandData: { command: string }) => {
        console.log(commandData);
        if (commandData.command === 'command-example') {
          document.getElementById('rocket').style.transform = 'rotate(270deg)';
        }
      }
    });

  }

  ngOnInit(): void {
  }

}
