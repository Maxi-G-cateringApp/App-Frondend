import { Component, OnInit } from '@angular/core';
import { AddEventComponent } from '../add-event/add-event.component';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../../../core/services/master.service';
import { Events } from '../../models/event.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  displayedColumns: string[] = ['eventName', 'action'];
  dataSource: any;
  events: Events[] = [];

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  addEvent() {this.openPopup();}

  deleteEvent(id: number) {
    if(id != null){
      this.masterService.deletEvent(id).subscribe((response)=>{
        this.loadEvents();
      })
    }else{
      console.log('id null')
    }
  }

  openPopup() {
    var _popup = this.dialog.open(AddEventComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadEvents();
    });
  }

  loadEvents(){
    this.masterService.getAllEvents().subscribe((response)=>{
      this.events = response;
      this.dataSource = new MatTableDataSource<Events>(this.events)
    })
  }
}
