import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '../../../../../../core/services/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { ServingEmpl } from '../../teamModels/servingEmpl.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit {
  inputData: any;
  displayedSEColumns: string[] = ['empName', 'teamName', 'action'];
  dataSourceSE: any;
  servingEmp!: ServingEmpl[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.getTeamMenberByTeamName(this.inputData.id);
  }

  getTeamMenberByTeamName(id: number) {
    this.masterService.getKitchenMembersByTeamId(id).subscribe((data) => {
      this.servingEmp = data;
      this.dataSourceSE = new MatTableDataSource<ServingEmpl>(this.servingEmp);
    });
  }

  removeMembers(id: number) {
    this.masterService.inactiveMemberFromTeam(id).subscribe((res) => {
      this.getTeamMenberByTeamName(this.inputData.id);
    });
  }
}
