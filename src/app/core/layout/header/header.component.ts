import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log('changes are reflected?');
    window.location.href = `http://192.168.99.101/oauth/authorize?client_id=${environment.clientId}&redirect_uri=http://192.168.0.212:8080/callback/gitlab&response_type=code&scope=openid profile email read_api`;
  }
}
