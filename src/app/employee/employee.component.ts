import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { Router, RouterLink } from "@angular/router";
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule]
})
export class EmployeeComponent {
  private builder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  employeeForm = this.builder.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    salary: [0, Validators.required],
    gender: ['', Validators.pattern('^[MFX]$')],
    email: ['', Validators.email]
  });

  get name(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('name'); }
  get dateOfBirth(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('dateOfBirth'); }
  get city(): AbstractControl<string> { return <AbstractControl>this.employeeForm.get('city'); }
  get salary(): AbstractControl<number> { return <AbstractControl<number>>this.employeeForm.get('salary'); }
  get gender(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('gender'); }
  get email(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('email'); }

  onSubmit() {
    const employeeData = {
      name: this.name.value,
      dateOfBirth: new Date(this.dateOfBirth.value),
      city: this.city.value,
      salary: this.salary.value,
      gender: this.gender.value,
      email: this.email.value
    };

    const employeesCollection = collection(this.firestore, 'employees');
    addDoc(employeesCollection, employeeData)
      .then(() => {
        this.employeeForm.reset();
        this.router.navigate(['/employees']).then(() => { });
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    this.employeeForm.reset();
    this.router.navigate(['/employees']).then(() => { });
  }
}
