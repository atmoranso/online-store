import Observer from '../control/observer';
import '@testing-library/jest-dom';

describe('When observer created', () => {
    const observer = new Observer<string>();
    const testFunc = jest.fn(() => {});
    it('add method should return undefined', () => {
        expect(observer.add(testFunc)).toBeUndefined();
    });
    it('listeners should contain testFunc', () => {
        expect(observer['listeners']).toContain(testFunc);
    });
    it('emit method should call testFunc', () => {
        expect(observer.emit('test param')).toBeUndefined();
        expect(testFunc).toHaveBeenCalledWith('test param');
    });
    it('remove method should remove testFunc from listeners array', () => {
        expect(observer.remove(testFunc)).toBeUndefined();
        expect(observer['listeners']).not.toContain(testFunc);
    });
});
