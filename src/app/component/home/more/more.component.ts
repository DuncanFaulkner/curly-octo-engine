import { Component, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MoreComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    console.log('bottom sheet', this.data.data);
  }

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
}
