import { Component, OnInit } from '@angular/core';
import { AddServingTeamComponent } from './add-serving-team/add-serving-team.component';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../../../../core/services/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddServingEmployeesComponent } from './add-serving-employees/add-serving-employees.component';
import { ServingEmpl } from '../teamModels/servingEmpl.model';
import TeamModel from '../teamModels/team.model';

@Component({
  selector: 'app-serving-teams',
  templateUrl: './serving-teams.component.html',
  styleUrl: './serving-teams.component.css',
})
export class ServingTeamsComponent implements OnInit {
  
  displayedColumns: string[] = ['teamName','count', 'action'];
  dataSource: any;
  servingTeam!: TeamModel[];
  servingEmp!: ServingEmpl[];

  displayedSEColumns: string[] = ['empName', 'teamName', 'action'];
  dataSourceSE: any;

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadServingTeams();
    this.loadServingEmployees();
  }

  addServeTeam() {
    this.openPopup();
  }

  addServingEmployees() {
    this.openAddEmplPopup();
  }

  openAddEmplPopup() {
    var _popup = this.dialog.open(AddServingEmployeesComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadServingEmployees();
      this.loadServingTeams();
    });
  }

  openPopup() {
    var _popup = this.dialog.open(AddServingTeamComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadServingTeams();
    });
  }

  loadServingTeams() {
    this.masterService.getAllServingTeams().subscribe((response) => {
      this.servingTeam = response;
      this.dataSource = new MatTableDataSource<TeamModel>(this.servingTeam);
    });
  }

  loadServingEmployees() {
    this.masterService.getAllServingEmployees().subscribe((response) => {
      this.servingEmp = response;
      console.log(this.servingEmp);
      
      this.dataSourceSE = new MatTableDataSource<ServingEmpl>(this.servingEmp);
    });
  }
}
