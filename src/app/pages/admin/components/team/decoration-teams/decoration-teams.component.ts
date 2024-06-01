import { Component, OnInit } from '@angular/core';
import { DecorImpl } from '../teamModels/decorEmpl.model';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../../../../core/services/master.service';
import { AddDecorationEmployeesComponent } from './add-decoration-employees/add-decoration-employees.component';
import { AddDecorationTeamComponent } from './add-decoration-team/add-decoration-team.component';
import TeamModel from '../teamModels/team.model';
import { MatTableDataSource } from '@angular/material/table';
import { DecorationMembersComponent } from './decoration-members/decoration-members.component';

@Component({
  selector: 'app-decoration-teams',
  templateUrl: './decoration-teams.component.html',
  styleUrl: './decoration-teams.component.css',
})
export class DecorationTeamsComponent implements OnInit {
  displayedColumns: string[] = ['teamName', 'count', 'action'];
  dataSource: any;
  decorationTeam!: TeamModel[];
  decorationEmp!: DecorImpl[];

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadDecorTeams();
  }

  addDecorTeam() {
    this.openPopup();
  }

  addDecorEmployees() {
    this.openAddEmplPopup();
  }
  openAddEmplPopup() {
    var _popup = this.dialog.open(AddDecorationEmployeesComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadDecorTeams();
    });
  }

  openPopup() {
    var _popup = this.dialog.open(AddDecorationTeamComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadDecorTeams();
    });
  }

  loadDecorTeams() {
    this.masterService.getAllDecorationTeams().subscribe({
      next: (response) => {
        this.decorationTeam = response;
        this.dataSource = new MatTableDataSource<TeamModel>(
          this.decorationTeam
        );
      },
    });
  }
  viewMembers(id: number) {
    this.openMemberPopup(id);
  }

  openMemberPopup(id: number) {
    var _popup = this.dialog.open(DecorationMembersComponent, {
      width: '40%',
      position: {
        top: '10%',
        left: '60%',
      },
      data: {
        id: id,
      },
    });
  }
}
