import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../material.module';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, MaterialModule, PageNotFoundRoutingModule],
})
export class PageNotFoundModule {}
