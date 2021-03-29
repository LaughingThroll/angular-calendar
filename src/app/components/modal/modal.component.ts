import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import DateUtils from 'src/app/utils/DateUtils'
import { findByID, findIndexByID } from 'src/app/utils/forArrays'

import { ID } from 'src/app/interfaces/common'
import { IMember } from 'src/app/interfaces/member'
import { ITeam } from 'src/app/interfaces/team'
import { VacationEnum } from 'src/app/interfaces/enums'
import { IVacation } from 'src/app/interfaces/vacation'
import { TeamsService } from 'src/app/services/teams/teams.service'
import VacationsUtils from 'src/app/utils/VacationsUtils'

enum IDType {
  TEAM_ID = "teamId",
  MEMBER_ID = "memberId"
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  private unsubscriber$: Subject<any> = new Subject()

  private startDay: string = DateUtils.dateKebabFormat(1)
  private endDay: string = DateUtils.dateKebabFormat(8)
  private startDayTimeStamp: number = Date.parse(this.startDay)
  private endDayTimeStamp: number = Date.parse(this.endDay)

  public countDays: number = DateUtils.countDayFromTimeStamp(this.endDayTimeStamp - this.startDayTimeStamp)
  public currentTeamID: ID = this.teams[0].teamId
  public currentMemberID: ID = this.teams[0].members[0].memberId
  public currentMembers: IMember[] = this.teams[0].members
  public isNotValidDays: boolean = false

  public modalForm: FormGroup = new FormGroup({
    inputDays: new FormGroup({
      from: new FormControl(this.startDay),
      to: new FormControl(this.endDay)
    }),
    selectedTeam: new FormControl(this.currentTeamID),
    selectedMember: new FormControl(this.currentMemberID),
    selectedType: new FormControl(VacationEnum.PAID)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public teams: ITeam[],
    private modalRef: MatDialogRef<ModalComponent>,
    private teamsService: TeamsService
  ) { }

  ngOnInit(): void {
    const { inputDays, selectedTeam, selectedMember } = this.modalForm.controls

    inputDays.valueChanges
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (value) => {
          // TODO: должен быть лучший способ сделать валидацию ошибки 
          // я делал с помощью кастомного валидатора но что то идет не так и мне всегда возвращаеться status: INVALID 
          // там не меняються значения которые нужны для вычесления
          const diff = Date.parse(value.to) - Date.parse(value.from)

          if (diff > 0) {
            this.countDays = DateUtils.countDayFromTimeStamp(diff)
            this.isNotValidDays = false
          } else {
            this.isNotValidDays = true
          }
        }
      })

    selectedTeam.valueChanges
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (value) => {
          this.currentMembers = findByID(this.teams, IDType.TEAM_ID, value)!.members
          this.currentMemberID = this.currentMembers[0].memberId
        }
      })

    selectedMember.valueChanges
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (value) => {
          this.currentMemberID = findByID(this.currentMembers, IDType.MEMBER_ID, value)!.memberId
        }
      })
  }


  onSubmit() {
    const separator = '-'
    const inputDaysForm = this.modalForm.get('inputDays')
    const teamIndex = findIndexByID(this.teams, IDType.TEAM_ID, this.currentTeamID)
    const memberIndex = findIndexByID(this.currentMembers, IDType.MEMBER_ID, this.currentMemberID)
    const startDateDTO: string = DateUtils.reverseDate(inputDaysForm?.get('from')?.value.split(separator))
    const endDateDTO: string = DateUtils.reverseDate(inputDaysForm?.get('to')?.value.split(separator))
    const typeDTO: VacationEnum = this.modalForm.get('selectedType')?.value

    const requestVacation: IVacation = {
      startDate: startDateDTO,
      endDate: endDateDTO,
      type: typeDTO
    }

    if (teamIndex === undefined || memberIndex === undefined) {
      window.confirm('Такой команды или участника нету')
      return
    }

    const currentVacations = this.currentMembers[memberIndex]!.vacations
    
    if (!VacationsUtils.vacationIncludesVacation(currentVacations, requestVacation)) {
      currentVacations.push(requestVacation)

      this.teamsService.putVacation(teamIndex, memberIndex, currentVacations.length - 1, requestVacation)
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe({
          error: (err) => {
            console.log(err)
          }
        })


    } else {
      window.confirm('Такой отпуск включает другой отпуск и есть недопустимым в данной системе')
      return
    }

    this.modalRef.close()
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next()
    this.unsubscriber$.complete()
  }
}
