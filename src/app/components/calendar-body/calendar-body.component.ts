import { Component, Input } from '@angular/core';

import { THEMES } from 'src/app/constant';

import { ITeam } from 'src/app/interfaces/DB';
import { TThemes } from 'src/app/interfaces/utils';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent {

  public THEMES: TThemes[] = THEMES
  @Input() teams: ITeam[] = []
  @Input() allDays: Date[] = [] 


  constructor() { }

}
