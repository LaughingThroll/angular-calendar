import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import DateUtils from 'src/app/utils/DateUtils'

import { ID } from 'src/app/interfaces/common'
import { IMember } from 'src/app/interfaces/member'
import { ITeam } from 'src/app/interfaces/team'
import { VacationEnum } from 'src/app/interfaces/enums'
import { IVacation } from 'src/app/interfaces/vacation'
import { TeamsService } from 'src/app/services/teams/teams.service'
import VacationsUtils from 'src/app/utils/VacationsUtils'

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarModalComponent implements OnInit, OnDestroy {
  private unsubscriber$: Subject<any> = new Subject()

  private startDay: string = DateUtils.dateKebabFormat(1)
  private endDay: string = DateUtils.dateKebabFormat(8)
  private startDayTimeStamp: number = Date.parse(this.startDay)
  private endDayTimeStamp: number = Date.parse(this.endDay)

  public countDays: number = DateUtils.countDayFromTimeStamp(this.endDayTimeStamp - this.startDayTimeStamp)
  public teamID: ID = this.teams[0].id
  public memberID: ID = this.teams[0].members[0].id
  public currentMembers: IMember[] = this.teams[0].members
  public isNotValidDays: boolean = false
  public isDisabled: boolean = false

  public modalForm: FormGroup = new FormGroup({
    inputDays: new FormGroup({
      from: new FormControl(this.startDay),
      to: new FormControl(this.endDay)
    }),
    selectedTeam: new FormControl(this.teamID),
    selectedMember: new FormControl(this.memberID),
    selectedType: new FormControl(VacationEnum.PAID)
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public teams: ITeam[],
    private modalRef: MatDialogRef<CalendarModalComponent>,
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
            this.isNotValidDays = this.isDisabled = false
          } else {
            this.isNotValidDays = this.isDisabled = true
          }
        }
      })

    selectedTeam.valueChanges
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (value) => {
          const currentTeam = this.teams.find(({ id }) => id === value)
          this.teamID = currentTeam!.id 
          this.currentMembers = currentTeam!.members
          this.memberID = this.currentMembers[0].id
        }
      })

    selectedMember.valueChanges
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (value) => {
          this.memberID = this.currentMembers.find(({id}) => id === value)!.id
        }
      })
  }


  onSubmit() {
    const separator = '-'
    const inputDaysForm = this.modalForm.get('inputDays')
    const startDateDTO: string = DateUtils.reverseDate(inputDaysForm?.get('from')?.value.split(separator))
    const endDateDTO: string = DateUtils.reverseDate(inputDaysForm?.get('to')?.value.split(separator))
    const typeDTO: VacationEnum = this.modalForm.get('selectedType')?.value

    const requestVacation: IVacation = {
      startDate: startDateDTO,
      endDate: endDateDTO,
      type: typeDTO
    }

    const currentVacations = this.currentMembers.find(({id}) => id === this.memberID)!.vacations
    const containsExistVacation = currentVacations.map(currVac => VacationsUtils.vacationIncludesVacation(currVac, requestVacation))

    if (!containsExistVacation.some(Boolean)) {
      const { memberID, teamID } = this
      currentVacations.push(requestVacation)
      
      this.isDisabled = true
      this.teamsService.putVacation({ teamID, memberID }, requestVacation)
        .pipe(takeUntil(this.unsubscriber$)) 
        .subscribe({
          next: (res) => {
            if (res) {
              this.modalRef.close()
              this.isDisabled = false
            }
          },
          error: (err) => {
            console.log(err)
          }
        })


    } else {
      window.alert('Такой отпуск включает другой отпуск и есть недопустимым в данной системе')
      return
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next()
    this.unsubscriber$.complete()
  }
}
