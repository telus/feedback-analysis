import { FeedbackAnalysisPage } from './app.po';

describe('feedback-analysis App', function() {
  let page: FeedbackAnalysisPage;

  beforeEach(() => {
    page = new FeedbackAnalysisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
