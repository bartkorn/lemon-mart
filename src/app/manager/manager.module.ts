import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manger-home/manger-home.component';
import { ManagerComponent } from './manager.component'
import { MaterialModule } from '../material.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';

@NgModule({
  declarations: [ManagerHomeComponent, ManagerComponent, UserManagementComponent, ReceiptLookupComponent],
  imports: [CommonModule, ManagerRoutingModule, MaterialModule],
})
export class ManagerModule {}
