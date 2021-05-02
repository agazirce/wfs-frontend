import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDetailedComponent } from './actor-detailed.component';

describe('ActorDetailedComponent', () => {
  let component: ActorDetailedComponent;
  let fixture: ComponentFixture<ActorDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
