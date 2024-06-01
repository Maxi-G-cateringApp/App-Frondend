import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'emp_name',
    'expertise',
    'email',
    'phoneNumber',
    'action',
  ];
  dataSource: any;
  itemId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  employeeList!: Employee[];

  constructor(
    private masterService: MasterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  addEmpl() {
    this.openPopup();
  }

  openPopup() {
    var _popup = this.dialog.open(AddEmployeeComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.getAllEmployees();
    });
  }

  getAllEmployees() {
    this.masterService.getAllEmployees().subscribe((data) => {
      this.employeeList = data;

      this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
      this.dataSource.paginator = this.paginator;
    });
  }

  inactiveEmp(id: number) {
    this.masterService.inactivateEmp(id).subscribe((res) => {
      this.getAllEmployees();
    });
  }

  activeEmp(id: number) {
    this.masterService.activateEmp(id).subscribe((res) => {
      this.getAllEmployees();
    });
  }

}
