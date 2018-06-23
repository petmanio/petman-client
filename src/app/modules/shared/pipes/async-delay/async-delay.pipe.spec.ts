import { AsyncDelayPipe } from './async-delay.pipe';

describe('AsyncDelayPipe', () => {
  it('create an instance', () => {
    const pipe = new AsyncDelayPipe();
    expect(pipe).toBeTruthy();
  });
});
