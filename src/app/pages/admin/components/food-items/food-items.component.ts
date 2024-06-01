import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodItems } from '../../models/foodItems.model';
import { MasterService } from '../../../../core/services/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddItemComponent } from '../add-item/add-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddItemPicComponent } from '../add-item/add-item-pic/add-item-pic.component';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrl: './food-items.component.css',
})
export class FoodItemsComponent implements OnInit {
  foodItems!: FoodItems[];
  displayedColumns: string[] = ['itemName', 'itemPrice', 'action','imageUrl'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private masterService: MasterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFoodItems();
  }

  loadFoodItems() {
    this.masterService.getAllFoodItems().subscribe((response) => {
      this.foodItems = response;
      this.dataSource = new MatTableDataSource<FoodItems>(this.foodItems);
      this.dataSource.paginator = this.paginator;
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

  editItem(id: number) {
    this.openPopup(id, 'Edit Item', true);
  }

  addItem() {
    this.openPopup(0, 'Add Item');
  }
  deleteCombo(id: number) {
    if (id !== null) {
      this.masterService.deleteItem(id).subscribe((response) => {
        this.loadFoodItems();
      });
    } else {
      console.error();
    }
  }

  changeComboPic(id: any) {
    this.openCPPopup(id);
  }

  openCPPopup(id: any) {
    var _popup = this.dialog.open(AddItemPicComponent, {
      width: '40%',
      height: '30%',
      data: {
        id: id,
      },
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadFoodItems();
    });
  }
}
