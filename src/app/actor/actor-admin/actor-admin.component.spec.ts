import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorAdminComponent } from './actor-admin.component';

describe('ActorAdminComponent', () => {
  let component: ActorAdminComponent;
  let fixture: ComponentFixture<ActorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
