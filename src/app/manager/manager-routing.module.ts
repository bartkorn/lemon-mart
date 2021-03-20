import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManagerComponent } from './manager.component'
import { ManagerHomeComponent } from './manger-home/manger-home.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { AuthGuard } from '../auth/auth-guard.service'
import { Role } from '../auth/auth.enum'

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: '/manager/home', pathMatch: 'full' },
      {
        path: 'home',
        component: ManagerHomeComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: Role.Manager
        }
       },
      {
        path: 'users',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: Role.Manager
        } },
      {
        path: 'receipts',
        component: ReceiptLookupComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: Role.Manager
        } },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
