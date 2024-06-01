import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../../../core/services/master.service';

@Component({
  selector: 'app-show-sales-report',
  templateUrl: './show-sales-report.component.html',
  styleUrl: './show-sales-report.component.css',
})
export class ShowSalesReportComponent implements OnInit {
  inputData: any;
  saleReportData: any;
  totalSales!: number;
  orderCount!: number;
  timePeriod!: string;
  dates: any;
  constructor(
    private ref: MatDialogRef<ShowSalesReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterService: MasterService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.saleReportData = this.inputData.saleData.orderList;
    this.orderCount = this.inputData.saleData.orderCount;
    this.totalSales = this.inputData.saleData.totalSales;
    this.timePeriod = this.inputData.selectedTimeperiod;
    this.dates = this.inputData.dates;
  }
  downloadPdf() {
    this.masterService.downloadPDF(this.timePeriod).subscribe((res) => {});
  }
  downloadPdfBydates() {
    this.masterService.downloadPDFBydates(this.dates).subscribe((res) => {});
  }
  closePopup() {
    this.ref.close();
  }
}
