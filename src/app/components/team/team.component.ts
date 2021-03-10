import { Component, Input, OnInit } from '@angular/core';

import { THEMES } from 'src/app/constant';

import { TThemes } from 'src/app/interfaces/utils';
import { ITeam } from '../../interfaces/DB'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input() allDays: Date[] = []
  @Input() team?: ITeam
  @Input() teamIndex: number = 0 

  public THEMES: TThemes[] = THEMES 

  constructor() { }

  ngOnInit(): void {
  }

}
