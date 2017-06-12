import { NgxPaginationDemoPage } from './app.po';

describe('ngx-pagination-demo App', () => {
  let page: NgxPaginationDemoPage;

  beforeEach(() => {
    page = new NgxPaginationDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
