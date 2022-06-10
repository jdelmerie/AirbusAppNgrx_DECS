import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectCountAlertAircrafts } from 'src/app/ngrx/aircrafts.selectors';
import {
  AircraftsState,
  AircraftsStateEnum,
} from 'src/app/ngrx/aircrafts.state';
import { selectIsConnected } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: ['./aircrafts.component.css'],
})
export class AircraftsComponent implements OnInit {
  aircraftsState$: Observable<AircraftsState> | null = null;
  readonly aircraftsStateEnum = AircraftsStateEnum;
  countAlertAircfrats$: Observable<number> | undefined;
  isAuth$: Observable<Boolean> | null = null;

  constructor(private store: Store<any>, private router: Router) {
    this.countAlertAircfrats$ = store.select(selectCountAlertAircrafts);
    this.isAuth$ = store.select(selectIsConnected);
  }

  ngOnInit(): void {
    this.aircraftsState$ = this.store.pipe(
      map((state) => state.airbusState)
    );
  }

  toAlert() {
    this.router.navigateByUrl('aircrafts-alert');
  }
}
