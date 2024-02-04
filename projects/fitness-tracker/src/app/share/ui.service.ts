import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UiService {
  isLoading = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}
  openSnackbar(message: string, action: string | undefined, duration: number) {
    this.snackbar.open(message, action, { duration: duration });
  }
}
