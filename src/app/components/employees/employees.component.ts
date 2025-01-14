import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { AddEmployeeModalComponent } from '../add-employee-modal/add-employee-modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'age', 'email', 'position', 'salary', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchSubject = new Subject<string>();
  loading: boolean = true ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.employeeService.fetchEmployees().subscribe(
      (employees) => {
        this.dataSource.data = employees;
        this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Set the default page size for the paginator
    this.paginator.pageSize = 10;
        console.log(this.dataSource);
        this.loading = false; 
      },
      (error) => {
        console.error('Error fetching employees:', error);
        this.toastr.error('Failed to load employees', 'Error');
        this.loading = false; // Turn off loader on error
      }
    );

    // Handle search with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.applyFilter(searchTerm);
    });
  }



  // Handle search input
  onSearch(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }

  // Apply filter logic
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
  }

  // Open modal for adding employees
  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeModalComponent, {
      width: '400px',
      disableClose: true,
      panelClass:"custom-dialog-container"
    });

    dialogRef.afterClosed().subscribe((newEmployee) => {
      if (newEmployee) {
        this.dataSource.data = [...this.dataSource.data, { ...newEmployee, id: Date.now() }];
        this.toastr.success('The employee is added successfully', 'Success', {
          positionClass: 'toast-bottom-right',
          titleClass: 'custom-title',
          toastClass: 'custom-toast',
        });
      }
    });
  }

  // Delete an employee with confirmation
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.dataSource.data = this.dataSource.data.filter((e: any) => e.id !== id);
      this.toastr.success('The employee is deleted successfully', 'Deleted', {
        positionClass: 'toast-bottom-right',
        titleClass: 'custom-title',
        toastClass: 'custom-toast',
      });
    }
  }
}