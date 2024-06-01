import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../../../../../core/services/master.service';
import { User } from '../../../../auth/models/user.model';
import { ViewUserComponent } from '../../view-user/view-user.component';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.css',
})
export class PartnerListComponent implements OnInit {
  partnerUserList?: User[];

  constructor(
    private masterService: MasterService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['name', 'phoneNumber', 'role', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getPartnerUsers();
  }

  getPartnerUsers() {
    this.masterService.getAllPartnerUsers().subscribe((data) => {
      this.partnerUserList = data;
      this.dataSource = new MatTableDataSource<User>(this.partnerUserList);
      this.dataSource.paginator = this.paginator;
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
}
