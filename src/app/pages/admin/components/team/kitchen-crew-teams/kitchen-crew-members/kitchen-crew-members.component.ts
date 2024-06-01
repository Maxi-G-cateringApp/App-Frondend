import { Component, Inject } from '@angular/core';
import { KitchenCrewEmpl } from '../../teamModels/kitchenCrew.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from '../../../../../../core/services/master.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-kitchen-crew-members',
  templateUrl: './kitchen-crew-members.component.html',
  styleUrl: './kitchen-crew-members.component.css',
})
export class KitchenCrewMembersComponent {
  displayedSEColumns: string[] = ['empName', 'teamName'];
  dataSourceSE: any;
  inputData: any;
  kitchenCrew!: KitchenCrewEmpl[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.getTeamMemberByTeamName(this.inputData.id);
  }

  getTeamMemberByTeamName(id: number) {
    this.masterService.getKitchenMembersByTeamId(id).subscribe((data) => {
      this.kitchenCrew = data;
      this.dataSourceSE = new MatTableDataSource<KitchenCrewEmpl>(
        this.kitchenCrew
      );
    });
  }
}
