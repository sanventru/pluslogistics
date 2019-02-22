import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarotComponent } from './cerrarot.component';

describe('CerrarotComponent', () => {
  let component: CerrarotComponent;
  let fixture: ComponentFixture<CerrarotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
