import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { User } from '../../../auth/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  userList?: User[];

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  displayedColumns: string[] = ['name', 'phoneNumber', 'role', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getAllUsers() {
    this.masterService.getAllUsers().subscribe((data) => {
      console.log(data);
      this.userList = data;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }

  onBlock(userId: string) {
    console.log(userId, ' user id');
  }
  addAsPartner(userId: string) {
    console.log(userId, ' user id');
  }
}
