import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [MaterialModule, FlexLayoutModule, CommonModule, FormsModule],
  exports: [MaterialModule, FlexLayoutModule, CommonModule, FormsModule],
})
export class SharedModule {}
