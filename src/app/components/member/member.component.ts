import { Component, Input } from '@angular/core';

import { THEMES }from '../../constant' 

import { IMember } from '../../interfaces/DB'
import { TThemes } from '../../interfaces/utils'


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {

  public THEMES: TThemes[] = THEMES
  
  @Input() member?: IMember 
  @Input() allDays: Date[] = []
  @Input() teamIndex: number = 0


  constructor() { }

}
