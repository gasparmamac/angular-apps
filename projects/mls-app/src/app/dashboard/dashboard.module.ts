import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'projects/fitness-tracker/src/app/material.module';
import { TkComponent } from './tk/tk.component';
import { KpiComponent } from './kpi/kpi.component';

@NgModule({
  declarations: [DashboardComponent, TkComponent, KpiComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
})
export class DashboardModule {}
