import { Component, OnInit } from '@angular/core';
import { DecorImpl } from '../teamModels/decorEmpl.model';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../../../../core/services/master.service';
import { AddDecorationEmployeesComponent } from './add-decoration-employees/add-decoration-employees.component';
import { AddDecorationTeamComponent } from './add-decoration-team/add-decoration-team.component';
import TeamModel from '../teamModels/team.model';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decoration-teams',
  templateUrl: './decoration-teams.component.html',
  styleUrl: './decoration-teams.component.css',
})
export class DecorationTeamsComponent implements OnInit {
  displayedColumns: string[] = ['teamName','count', 'action'];
  dataSource: any;
  decorationTeam!: TeamModel[];
  decorationEmp!: DecorImpl[];

  displayedDEColumns: string[] = ['empName', 'teamName'];
  dataSourceDE: any;

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadDecorTeams();
    this.loadDecorEmployees();
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
      this.loadDecorEmployees();
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

  loadDecorEmployees() {
    this.masterService.getAllDecorationEmployees().subscribe({
      next: (response) => {
        this.decorationEmp = response;
        this.dataSourceDE = new MatTableDataSource<DecorImpl>(this.decorationEmp);
      },
    });
  }

  deleteTeam(id: number){
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
        this.masterService.deleteDecorationTeam(id).subscribe((respose)=>{
          this.loadDecorEmployees()
          this.loadDecorTeams()
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
