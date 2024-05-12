import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['emp_name', 'expertise', 'action'];
  dataSource: any;
  itemId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  employeeList!: Employee[];

  constructor(
    private masterService: MasterService,
    private dialog: MatDialog,
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
    _popup.afterClosed().subscribe((data)=>{
      this.getAllEmployees();
    })
  }

  getAllEmployees() {
    this.masterService.getAllEmployees().subscribe((data) => {
      this.employeeList = data;
      this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
      this.dataSource.paginator = this.paginator
    });
      
    
  }

  removeEmp(id: number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.masterService.deleteEmp(id).subscribe((res)=>{
          this.getAllEmployees();
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    
  }
}
