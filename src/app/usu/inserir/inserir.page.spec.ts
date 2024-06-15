import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InserirPage } from './inserir.page';

describe('InserirPage', () => {
  let component: InserirPage;
  let fixture: ComponentFixture<InserirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
