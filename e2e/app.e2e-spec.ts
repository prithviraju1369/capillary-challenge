import { CapillaryPage } from './app.po';

describe('capillary App', () => {
  let page: CapillaryPage;

  beforeEach(() => {
    page = new CapillaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
