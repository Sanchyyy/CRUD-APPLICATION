import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {
  studentForm: FormGroup;
  LoadingTitle: string = 'Loading';
  isLoading: boolean = false;
  errors: any = [];

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      id: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  get formControls() {
    return this.studentForm.controls;
  }

  saveCar() {
    if (this.studentForm.invalid) {
      this.errors = { form: 'Please fill all required fields correctly.' };
      return;
    }

    this.isLoading = true;
    this.LoadingTitle = 'Saving';

    const inputData = this.studentForm.value;
    console.log(inputData);

    this.studentService.saveCar(inputData).subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        alert('Car saved successfully');
        this.studentForm.reset();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errors = err.error.errors || { server: 'An error occurred while saving the data.' };
        this.isLoading = false;
        console.log(err.error.errors, 'errors');
      }
    });
  }
}
