import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators  , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-employee-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css'],
})
export class AddEmployeeModalComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeModalComponent>
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      age: ['', [Validators.required, Validators.min(18)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
    });
   
  }

  submit(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }
}