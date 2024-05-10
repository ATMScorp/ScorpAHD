import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent {
  zoomValue: number = 1;

  constructor(
    public dialogRef: MatDialogRef<PhotoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const minZoom = 0.5;
    const maxZoom = 2;
  
    if (event.deltaY > 0) {
      this.zoomValue = Math.max(minZoom, this.zoomValue - 0.1);
    } else {
      this.zoomValue = Math.min(maxZoom, this.zoomValue + 0.1);
    }
  }
}
