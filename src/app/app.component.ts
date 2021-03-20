import { Component, OnDestroy, OnInit } from '@angular/core'
import { MediaObserver } from '@angular/flex-layout'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { combineLatest } from 'rxjs'
import { tap } from 'rxjs/operators'
import { SubSink } from 'subsink'
import { AuthService } from './auth/auth.service'


@Component({
  selector: 'app-root',
  template: `
  <div class="app-container">
    <mat-toolbar *ngIf="{
      status: authService.authStatus$ | async,
      user: authService.currentUser$ | async
    } as auth;" color="primary" fxLayoutGap="8px">
      <button mat-icon-button><mat-icon>menu</mat-icon></button>
      <a mat-button routerLink="/home">
        <mat-icon svgIcon="lemon"></mat-icon>
        <span class="mat-h2">LemonMart</span>
      </a>
      <span class="flex-spacer"></span>
      <button *ngIf="auth?.status?.isAuthenticated" mat-mini-fab routerLink="/user/profile" matTooltip="Profile" aria-label="User Profile">
        <img *ngIf="auth?.user?.picture" class="image-cropper" [src]="auth?.user?.picture" />
        <mat-icon *ngIf="!auth?.user?.picture">account_circle</mat-icon>
      </button>
      <button *ngIf="auth?.status?.isAuthenticated" mat-mini-fab routerLink="/user/logout" matTooltip="Logout" aria-label="Logout">
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <mat-sidenav-container class="app-sidenav-container">
      <mat-sidenav #sidenav
      [mode]="media.isActive('xs') ? 'over' : 'side'"
      [fixedInViewport]="media.isActive('xs')"
      fixedToGap="56" [(opened)]="opened"
      >
      <app-navigation-menu></app-navigation-menu>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'lemon-mart'
  private subs = new SubSink()
  opened: boolean

  constructor(
    public authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public media: MediaObserver
  ) {
    this.opened = false;
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    )
  }

  ngOnInit(): void {
    this.subs.sink = combineLatest([
      this.media.asObservable(),
      this.authService.authStatus$
    ])
    .pipe(
      tap(([mediaValue, authStatus]) => {
        if (!authStatus?.isAuthenticated) {
          this.opened = false
        } else {
          if (mediaValue[0].mqAlias === 'xs') {
            this.opened = false
          } else {
            this.opened = true
          }
        }
      })
    )
    .subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
