import { FirstNWordsPipe } from './first-nwords.pipe';

describe('FirstNWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstNWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
