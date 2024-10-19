import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Employee {
  name: string;
  dateOfBirth: any; // We'll handle conversion in the template
  city: string;
  salary: number;
  gender: string;
  email: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent {
  private firestore: Firestore = inject(Firestore);
  employees$: Observable<Employee[]>;

  constructor() {
    const employeesCollection = collection(this.firestore, 'employees');
    this.employees$ = collectionData(employeesCollection, { idField: 'id' }) as Observable<Employee[]>;
  }
}
