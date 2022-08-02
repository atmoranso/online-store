import { ResetSettings } from '../components/reset-settings';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

describe('When resetSettingsButton created', () => {
    const parentElement = document.body;
    const resetSettingsButton = new ResetSettings(parentElement);

    it('resetSettingsButton.node should be added to parentElement', () => {
        expect(parentElement).toContainElement(resetSettingsButton.node);
    });
});
