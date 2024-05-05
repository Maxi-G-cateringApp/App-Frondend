import { Component, OnInit } from '@angular/core';
import TeamModel from '../teamModels/team.model';
import { KitchenCrewEmpl } from '../teamModels/kitchenCrew.model';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../../../../core/services/master.service';
import { AddKitchenCrewEmployeesComponent } from './add-kitchen-crew-employees/add-kitchen-crew-employees.component';
import { AddKitchenCrewTeamComponent } from './add-kitchen-crew-team/add-kitchen-crew-team.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-kitchen-crew-teams',
  templateUrl: './kitchen-crew-teams.component.html',
  styleUrl: './kitchen-crew-teams.component.css'
})
export class KitchenCrewTeamsComponent implements OnInit{

  displayedColumns: string[] = ['teamName','count', 'action'];
  dataSource: any;
  kitchenCrewTeam!: TeamModel[];
  kitchenCrewEmp!: KitchenCrewEmpl[];

  displayedSEColumns: string[] = ['empName', 'teamName', 'action'];
  dataSourceSE: any;

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadKitchenCrewEmployees();
    this.loadKitchenCrewTeams();
      
  }

  openAddEmplPopup() {
    var _popup = this.dialog.open(AddKitchenCrewEmployeesComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadKitchenCrewTeams();
      this.loadKitchenCrewEmployees();
    });
  }

  openPopup() {
    var _popup = this.dialog.open(AddKitchenCrewTeamComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadKitchenCrewTeams();
    });
  }

  addKitchenCrewTeam(){
    this.openPopup();
  }
  addKitchenCrewEmployees(){
    this.openAddEmplPopup();
  }
  loadKitchenCrewEmployees(){
    this.masterService.getAlllKitchenCrewEmployees().subscribe((response) => {
      console.log(response);
      
      this.kitchenCrewEmp = response;

      this.dataSourceSE = new MatTableDataSource<KitchenCrewEmpl>(this.kitchenCrewEmp);
    });
  }
  loadKitchenCrewTeams(){
    this.masterService.getAllKitchenCrewTeams().subscribe((response) => {
      console.log(response);
      this.kitchenCrewTeam = response;
      this.dataSource = new MatTableDataSource<TeamModel>(this.kitchenCrewTeam);
    });
  }

}
