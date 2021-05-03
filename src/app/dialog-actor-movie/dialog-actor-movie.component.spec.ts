import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActorMovieComponent } from './dialog-actor-movie.component';

describe('DialogActorMovieComponent', () => {
  let component: DialogActorMovieComponent;
  let fixture: ComponentFixture<DialogActorMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActorMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActorMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
