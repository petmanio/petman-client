import { RxDelayPipe } from './is-html.pipe';

describe('IsHtml', () => {
  it('create an instance', () => {
    const pipe = new RxDelayPipe();
    expect(pipe).toBeTruthy();
  });
});
