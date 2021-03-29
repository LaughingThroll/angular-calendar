import { Component, Input } from '@angular/core';
import { ITeam } from 'src/app/interfaces/team';
import TeamUtils from 'src/app/utils/TeamUtils'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  @Input() team: ITeam | null = null
  @Input() allDays: Date[] = []

  getPercentageOfAbsentCount(team: ITeam): number {
    return TeamUtils.getPercentageOfAbsentCount(team, this.allDays[0])
  }

}
