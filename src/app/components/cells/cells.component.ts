import { Component, Input } from '@angular/core';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.scss']
})
export class CellsComponent {


  @Input() allDays: Date[] = []
  @Input() th?: boolean = false

  constructor(private dateSevice: DateService) { }

  isWeekend(date: Date): boolean {
    return this.dateSevice.isWeekend(date)
  }



}
