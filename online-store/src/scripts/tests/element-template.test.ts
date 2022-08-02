import '@testing-library/jest-dom';
import ElementTemplate from '../view/element-template';

describe('When testElement created', () => {
    const parentElement = document.body;
    const testElement = new ElementTemplate<HTMLElement>(parentElement, 'div', 'myClass', 'some content');
    it('testElement should append new element to parent', () => {
        expect(parentElement).toContainElement(testElement.node);
    });
    it('testElement.node should has class "myClass"', () => {
        expect(testElement.node).toHaveClass('myClass');
    });
    it('testElement.node should be "DIV"', () => {
        expect(testElement.node.tagName).toBe('DIV');
    });
    it('testElement.node should has "some content" inside', () => {
        expect(testElement.node).toContainHTML('some content');
    });
    it('delete method should delete testElement.node from DOM', () => {
        testElement.delete();
        expect(parentElement).not.toContainElement(testElement.node);
    });
});
