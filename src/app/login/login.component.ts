import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Role } from '../auth/auth.enum';
import { AuthService } from '../auth/auth.service';
import { UiService } from '../common/ui.service';
import { EmailValidation, PassworkdValidation } from '../common/validations'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .error {
        color: red;
      }
    `,
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `
  ]
})
export class LoginComponent implements OnInit {

  private subs = new SubSink()
  loginForm: FormGroup
  loginError = ''
  redirectUrl: string

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.redirectUrl = ''
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PassworkdValidation],
    })
    this.subs.sink = route.paramMap.subscribe(
      params => (this.redirectUrl = params.get('redirectUrl') ?? '')
    )
  }

  ngOnInit(): void {
    this.authService.logout()
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(
        submittedForm.value.email,
        submittedForm.value.password
      )
      .subscribe({
        error: err => {
          this.loginError = err
          this.authService.logout()
        }
      })
    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$
    ])
      .pipe(
        filter(
          ([authStatus, user]) =>
            authStatus.isAuthenticated && user?._id !== ''
        ),
        tap(
          ([authStatus, user]) => {
            this.uiService.showToast(
              `Welcome ${user.fullName}! Role: ${user.role}`
            )
            this.router.navigate([this.redirectUrl || this.homeRoutePerRole(user.role as Role)])
          }
        )
      )
      .subscribe()
  }

  private homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Cashier:
        return '/pos'
      case Role.Clerk:
        return '/inventory'
      case Role.Manager:
        return '/manager'
      default:
        return '/user/profile'
    }
  }

}
