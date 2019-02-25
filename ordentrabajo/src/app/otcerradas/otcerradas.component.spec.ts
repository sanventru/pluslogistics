import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcerradasComponent } from './otcerradas.component';

describe('OtcerradasComponent', () => {
  let component: OtcerradasComponent;
  let fixture: ComponentFixture<OtcerradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtcerradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcerradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
