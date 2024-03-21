import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { FoodCombo } from '../../models/combo.model';
import { MasterService } from '../../../../core/services/master.service';
import { MatDialog } from '@angular/material/dialog';
import { setLoadingSpinner } from '../../../../shared/store/shared.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../shared/app.state';
import { MatTableDataSource } from '@angular/material/table';
import { AddFoodComboComponent } from '../add-food-combo/add-food-combo.component';
import { MatPaginator } from '@angular/material/paginator';
2;
@Component({
  selector: 'app-combo-items',
  templateUrl: './combo-items.component.html',
  styleUrl: './combo-items.component.css',
})
export class ComboItemsComponent implements OnInit, AfterContentInit {
  foodCombos!: FoodCombo[];
  comboId!: any;
  displayedColumns: string[] = [
    'comboName',
    'description',
    'comboPrice',
    'action',
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private masterService: MasterService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadFoodComboItems();
  }

  ngAfterContentInit(): void {
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }

  loadFoodComboItems() {
    this.masterService.getAllCombos().subscribe((response) => {
      this.foodCombos = response;
      this.foodCombos.forEach((combo) => {
        this.comboId = combo.id;
      });
      this.dataSource = new MatTableDataSource<FoodCombo>(this.foodCombos);
      this.dataSource.paginator = this.paginator;
    });
  }

  openPopup(id: any, title: any, isEdit: boolean = false) {
    var _popup = this.dialog.open(AddFoodComboComponent, {
      width: '60%',
      data: {
        title: title,
        id: id,
        isEdit: isEdit,
      },
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadFoodComboItems();
    });
  }

  editCombo(id: any) {
    this.openPopup(id, 'Edit Combo', true);
  }
  addCombo() {
    this.openPopup(0, 'Add Combo');
  }
  deleteCombo(id: number) {
    if (id !== null) {
      this.masterService.deleteCombo(id).subscribe((response) => {
        this.loadFoodComboItems();
      });
    } else {
      console.error();
    }
  }
}
