import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';



@NgModule({
  exports: [ 
    OverlayPanelModule,
    ButtonModule,
    SidebarModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ChipsModule
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PrimeNgModules { }
