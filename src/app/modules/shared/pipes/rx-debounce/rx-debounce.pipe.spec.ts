import { RxDelayPipe } from './rx-debounce.pipe';

describe('RxDelayPipe', () => {
  it('create an instance', () => {
    const pipe = new RxDelayPipe();
    expect(pipe).toBeTruthy();
  });
});
