import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { EmployeeLayoutComponent } from '../../layouts/employee-layout/employee-layout.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { EmployeeMenuBarComponent } from './components/employee-menu-bar/employee-menu-bar.component';


@NgModule({
  declarations: [
    EmployeeLayoutComponent,
    EmployeeHomeComponent,
    EmployeeMenuBarComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule
  ]
})
export class EmployeesModule { }
