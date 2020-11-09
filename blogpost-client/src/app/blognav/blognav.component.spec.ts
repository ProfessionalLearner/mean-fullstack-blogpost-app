import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlognavComponent } from './blognav.component';

describe('BlognavComponent', () => {
  let component: BlognavComponent;
  let fixture: ComponentFixture<BlognavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlognavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlognavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
