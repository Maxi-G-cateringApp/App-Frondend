import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import TeamModel from '../team/teamModels/team.model';
import { MasterService } from '../../../../core/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderProcessing } from '../../models/orderProcessing.model';

@Component({
  selector: 'app-order-processing',
  templateUrl: './order-processing.component.html',
  styleUrl: './order-processing.component.css'
})
export class OrderProcessingComponent implements OnInit{

  inputData!: any;
  servingTeam!: TeamModel[];
  decorationTeam!: TeamModel[];
  kitchenCrew!: TeamModel[];
  orderProcessingForm!: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: string,private masterService: MasterService,
  private ref: MatDialogRef<OrderProcessingComponent>,private fb: FormBuilder,){}

  ngOnInit(): void {
    this.inputData = this.data; 
    console.log(this.inputData.orderId),'order idddd';
    
    this.loadServingTeam();
    this.loadKitchenCrewTeam();
    this.loadDecorationTeam();

    this.orderProcessingForm = this.fb.group({
      kitchenCrewId:['',Validators.required],
      decorationTeamId:['',Validators.required],
      servingTeamId:['',Validators.required]
      
    });
  }

  onOrderProcessingForm(){
    const data: OrderProcessing = {
      orderId: this.inputData.orderId,
      kitchenCrewId: this.orderProcessingForm.value.kitchenCrewId,
      decorationTeamId: this.orderProcessingForm.value.decorationTeamId,
      servingTeamId: this.orderProcessingForm.value.servingTeamId
    }    
   
    this.masterService.orderProcessing(data).subscribe({next: (response)=> {
      console.log(response);
      this.closePopup()
    
    },
  })
  }



  loadServingTeam(){
    this.masterService.getAllServingTeams().subscribe({next: (response)=>{
      this.servingTeam = response;
    }})
  }
  loadDecorationTeam(){
    this.masterService.getAllDecorationTeams().subscribe({next: (response)=>{
      this.decorationTeam = response;
    }})
  }
  loadKitchenCrewTeam(){
    this.masterService.getAllKitchenCrewTeams().subscribe({next: (response)=>{
      this.kitchenCrew = response;
    }})
  }




  closePopup() {
    this.ref.close();
  }


}
