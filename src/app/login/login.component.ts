import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string = '';
  recuerdame: boolean = false;
  auth2: any;

tokenC: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJVU0VSX1JPTEUiLCJnb29nbGUiOnRydWUsIl9pZCI6IjViOTJlNjBhNDdiNTdiNjIyODVhZjZjZSIsIm5vbWJyZSI6ImRpZWdvIHJvbGRhbiIsImVtYWlsIjoiZGFybC44OTEwQGdtYWlsLmNvbSIsImltZyI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tOHFocWphSngybUkvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQjgveU1sRVA0dl9pTUEvczk2LWMvcGhvdG8uanBnIiwicGFzc3dvcmQiOiI6KSIsIl9fdiI6MH0sImlhdCI6MTUzNjM1NTU2NywiZXhwIjoxNTM2MzY5OTY3fQ.sgM4o_nKH5V04QcIgIdweLnhySLgFzMZDVIKMCQQRyA';

  @ViewChild('buttonGoogle')
  btnGoogle: ElementRef;

  constructor(private _router: Router,
    private _service: UsuarioService) {
    }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '26873964219-9184f8pvobn3rd862c1q98g4nq5r4ogm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      // this.attachSingnin(document.getElementById('btnGoogle'));
      this.attachSingnin(this.btnGoogle);
    });
  }

  attachSingnin(element: ElementRef) {
    this.auth2.attachClickHandler(element.nativeElement, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      // this._service.googleLogin(token)
      //   .subscribe(() => this._router.navigate(['/']));
      this._service.googleLogin(token).subscribe(() => window.location.href = '#/dashboard');

    });
  }

  ingresar(forma: NgForm) {
    // this._router.navigate(['/dashboard']);
    if (forma.invalid) {
      return;
    }
    this._service.login(new Usuario('', forma.value.email, forma.value.password), this.recuerdame)
      .subscribe(correcto => this._router.navigate(['/dashboard']));
  }

}
