import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../../../../../core/services/master.service';
import { User } from '../../../../auth/models/user.model';
import { ViewUserComponent } from '../../view-user/view-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phoneNumber', 'role', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userList?: User[];
  constructor(
    private masterService: MasterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.masterService.getAllUsers().subscribe((data) => {
      this.userList = data;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }

  viewUser(userId: string) {
    this.openPopup(userId);
  }

  openPopup(userId: string) {
    var _pop = this.dialog.open(ViewUserComponent, {
      width: '40%',
      data: {
        id: userId,
      },
    });
    _pop.afterClosed().subscribe((data) => {
      this.getAllUsers();
    });
  }
}
