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
  decorationEmpl!: DecorImpl[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private masterService: MasterService){}


  displayedDEColumns: string[] = ['emp_name', 'teamName'];
  dataSourceDE: any;


  ngOnInit(): void {
    this.inputData = this.data
      this.getTeamMemberByTeamName(this.inputData.id)
  }



  getTeamMemberByTeamName(id: number){
    this.masterService.getDecorationMembersByTeamId(id).subscribe((data)=>{
      this.decorationEmpl = data;
      this.dataSourceDE = new MatTableDataSource<DecorImpl>(this.decorationEmpl);
      
    })
  }
}


