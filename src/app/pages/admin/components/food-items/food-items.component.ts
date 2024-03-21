import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { FoodItems } from '../../models/foodItems.model';
import { MasterService } from '../../../../core/services/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { AddItemComponent } from '../add-item/add-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrl: './food-items.component.css',
})
export class FoodItemsComponent implements OnInit, AfterContentInit {
  foodItems!: FoodItems[];
  displayedColumns: string[] = ['itemName', 'itemPrice', 'action'];
  dataSource: any;
  itemId!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private masterService: MasterService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFoodItems();
  }

  ngAfterContentInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }

  loadFoodItems() {
    this.masterService.getAllFoodItems().subscribe((response) => {
      this.foodItems = response;
      this.foodItems.forEach((item)=>{
        this.itemId = item.id;
      });
      this.dataSource = new MatTableDataSource<FoodItems>(this.foodItems);
    });
  }

  openPopup(id: number, title: string, isEdit: boolean = false) {
    var _popup = this.dialog.open(AddItemComponent, {
      width: '60%',
      data: {
        title: title,
        id: id,
        isEdit: isEdit,
      },
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadFoodItems();
    });
  }

  editItem(id: number){
    this.openPopup(id,'Edit Item',true)
  }

  addItem(){
    this.openPopup(0,'Add Item')
  }
  deleteCombo(id: number){
    if(id !== null){
      this.masterService.deleteItem(id).subscribe((response)=>{
        this.loadFoodItems();
      });
    }else{
      console.error();
    }

  }
}

