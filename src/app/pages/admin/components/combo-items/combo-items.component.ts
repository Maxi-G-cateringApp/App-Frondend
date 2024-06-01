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
import { FormGroup } from '@angular/forms';
import { AddComboPicComponent } from '../add-food-combo/add-combo-pic/add-combo-pic.component';
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
    'imageUrl',
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  uploadComboPic!: FormGroup;
  selectedFile!: File;
  comboPictureUrls: { [key: number]: string } = {};
  changeComboBtn: boolean = true;
  formField: boolean = false;
  id!: number;
  selectedComboId: number | null = null;

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


  submitComboPic(id: number) {
    if (this.id) {
      this.masterService
        .updateComboPicture(this.selectedFile, this.id)
        .subscribe((response) => {
          this.formField = false;
          this.changeComboBtn = true;
        });
    }
  }

  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadComboPic.patchValue(this.selectedFile);
  }

  changeComboPicClicked(id: number) {
    this.selectedComboId = id;
    this.id = id;

    this.formField = true;
    this.changeComboBtn = false;
  }
  changeComboPic(id: any) {
    this.openCPPopup(id)
  }

  openCPPopup(id: any) {
    var _popup = this.dialog.open(AddComboPicComponent, {
      width: '30%',
      height:'20%',
      data: {
        id: id,
      },
    });
    _popup.afterClosed().subscribe((data) => {
      this.loadFoodComboItems();
    });
  }

}
