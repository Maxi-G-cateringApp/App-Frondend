import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../../../core/services/master.service';
import { User } from '../../../auth/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from '../view-user/view-user.component';
import { CreatePartnerComponent } from '../create-partner/create-partner.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  userList?: User[];
  partnerUserList?: User[];

  constructor(
    private masterService: MasterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getPartnerUsers();
  }

  displayedColumns: string[] = ['name', 'phoneNumber', 'role', 'action'];
  dataSource: any;
  displayedPartnerColumns: string[] = ['name', 'phoneNumber', 'action'];
  dataSourcePartner: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getAllUsers() {
    this.masterService.getAllUsers().subscribe((data) => {
      console.log(data);
      this.userList = data;
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }
  getPartnerUsers() {
    this.masterService.getAllPartnerUsers().subscribe((data) => {
      console.log(data);
      this.partnerUserList = data;
      this.dataSourcePartner = new MatTableDataSource<User>(
        this.partnerUserList
      );
      this.dataSourcePartner.paginator = this.paginator;
    });
  }

  viewUser(userId: string) {
    this.openPopup(userId);
  }

  openPopup(userId: string) {
    this.dialog.open(ViewUserComponent, {
      width: '40%',
      data: {
        id: userId,
      },
    });
  }

  createPartnerPopup() {
    var _popup = this.dialog.open(CreatePartnerComponent, {
      width: '30%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.getPartnerUsers();
    });
  }

  createPartner() {
    this.createPartnerPopup();
  }
}
