import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '../../../../../../core/services/master.service';
import { DecorImpl } from '../../teamModels/decorEmpl.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-decoration-members',
  templateUrl: './decoration-members.component.html',
  styleUrl: './decoration-members.component.css'
})
export class DecorationMembersComponent implements OnInit{


  inputData: any;
  displayedSEColumns: string[] = ['empName', 'teamName','action'];
  dataSourceSE: any;
  decorationEmpl!: DecorImpl[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private masterService: MasterService){}


  displayedDEColumns: string[] = ['empName', 'teamName'];
  dataSourceDE: any;


  ngOnInit(): void {
      
  }



  getTeamMemberByTeamName(id: number){
    this.masterService.getDecorationMembersByTeamId(id).subscribe((data)=>{
      console.log(data);
      this.decorationEmpl = data;
      this.dataSourceSE = new MatTableDataSource<DecorImpl>(this.decorationEmpl);
      
    })
  }
}


