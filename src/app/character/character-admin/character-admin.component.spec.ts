import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAdminComponent } from './character-admin.component';

describe('CharacterAdminComponent', () => {
  let component: CharacterAdminComponent;
  let fixture: ComponentFixture<CharacterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
