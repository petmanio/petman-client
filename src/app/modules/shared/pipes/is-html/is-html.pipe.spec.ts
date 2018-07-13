import { IsHtmlPipe } from './is-html.pipe';

describe('IsHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new IsHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
