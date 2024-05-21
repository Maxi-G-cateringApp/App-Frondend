import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { MasterService } from '../../../../core/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShowSalesReportComponent } from '../show-sales-report/show-sales-report.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
  public chart: any;
  public allTimeSalesChart: any;
  salesdata: any;
  showReportForm!: FormGroup;
  salesReport!: any;
  timePeriodList: string[] = ['WEEKLY', 'MONTHLY', 'YEARLY'];

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.showReportForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.registerChart();
    this.onShowGraph({ target: { value: 'MONTHLY' } });
    this.fetchGraphData();
  }
  onShowReport() {
    if(this.showReportForm.valid){
    const dates = {
      startDate: this.showReportForm.value.startDate,
      endDate: this.showReportForm.value.endDate
    }
    this.masterService.getSalesReportByDates(dates).subscribe((data)=>{
      this.openPopupS(data,dates)
      
    })
  }
  }
  openPopupS(saleData: any, dates: any) {
    this.dialog.open(ShowSalesReportComponent, {
      width: '80%',
      data: {
        saleData: saleData,
        dates: dates,
      },
    });
  }

  onSubmitTimePeriod(event: any) {
    const timePeriod = event.target.value;
    this.masterService.getSalesReport(timePeriod).subscribe((data) => {
      this.openPopup(data, timePeriod);
    });
  }
  openPopup(saleData: any, timePeriod: string) {
    this.dialog.open(ShowSalesReportComponent, {
      width: '80%',
      data: {
        saleData: saleData,
        selectedTimeperiod: timePeriod,
      },
    });
  }

  createChart() {
    if (!this.salesdata || !this.salesdata.dailyOrderCounts) {
      console.error('Sales data is not available');
      return;
    }
    const labels = Object.keys(this.salesdata.dailyOrderCounts).sort();
    const data = labels.map((key) => this.salesdata.dailyOrderCounts[key]);

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Order Counts',
            data: data,
            borderWidth: 1,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              maxRotation: 90,
              minRotation: 0,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  onShowGraph(event: any) {
    const selectedPeriod = event.target.value;
    this.masterService.showGraph(selectedPeriod).subscribe((data) => {
      this.salesdata = data;
      this.createChart();
    });
  }

  createAllTimeChart(data: any): void {
    const months = data.monthlyLabels;
    months.sort();
    const amounts = data.monthlyAmounts;

    this.allTimeSalesChart = new Chart('allTimeSalesChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'All Time Sales',
            data: amounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  fetchGraphData(): void {
    this.masterService.showAllTimeGraph().subscribe(
      (data) => {
        console.log(data);

        this.createAllTimeChart(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  registerChart() {
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend,
      LineController,
      LineElement,
      PointElement
    );
  }
}
