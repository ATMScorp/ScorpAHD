import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-event',
  templateUrl: './delete-confirmation-event.component.html',
  styleUrls: ['./delete-confirmation-event.component.scss']
})
export class DeleteConfirmationEventComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationEventComponent>) { }

}

