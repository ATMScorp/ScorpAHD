import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationEventComponent } from './delete-confirmation-event.component';

describe('DeleteConfirmationEventComponent', () => {
  let component: DeleteConfirmationEventComponent;
  let fixture: ComponentFixture<DeleteConfirmationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmationEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConfirmationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
