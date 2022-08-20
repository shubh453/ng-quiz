import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DialogComponent } from './dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatIconModule,
  MatDividerModule,
  MatStepperModule,
  ScrollingModule,
  MatDialogModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    modules
  ],
  exports: [modules]
})
export class SharedModule { }
