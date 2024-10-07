import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId!: number;
  LoadingTitle: string = 'Loading';
  isLoading: boolean = false;
  errors: any = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      id: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;

    this.studentService.getStudent(this.studentId).subscribe({
      next: (res: any) => {
        this.studentForm.patchValue(res);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching student:', err);
        this.isLoading = false;
      }
    });
  }

  updateCar() {
    if (this.studentForm.invalid) return;

    this.isLoading = true;

    this.studentService.UpdateCar(this.studentForm.value, this.studentId).subscribe({
      
    
      next: (res: any) => {
        
        console.log(res);
        alert('Car updated successfully');
        this.router.navigate(['/students']);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errors = err.error.errors || { server: 'An error occurred while updating the data.' };
        this.isLoading = false;
        console.log(err.error.errors, 'errors');
      }
    });
  }
}
