import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';
import { MasterService } from '../../../../core/services/master.service';
import { MatTableDataSource } from '@angular/material/table';
import { Categories } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['categoriesName', 'action'];
  dataSource: any;
  categories!: Categories[];

  constructor(
    private dialog: MatDialog,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

 
  loadCategories() {
    this.masterService.getAllcategories().subscribe((response) => {
      this.categories = response;
      this.dataSource = new MatTableDataSource<Categories>(this.categories);
    });
  }


  addCategory() {
    this.openPopup();
  }
  
  openPopup() {
    var _popup = this.dialog.open(AddCategoriesComponent, {
      width: '40%',
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadCategories();
    });
  }

  deleteCategories(id: number) {
    if (id != null) {
      this.masterService.deletCategories(id).subscribe((response) => {
        this.loadCategories();
      });
    } else {
      console.error();
    }
  }
}
