import { types } from '@storybook/addons';
const addonId = 'taffy';

export default {
    title: 'Taffy',
    addonId,
    paramKey: addonId,
    panelId: `${addonId}/panel`,
    viewModes: [
        'story',
        'docs'
    ],
    type: types.TOOL,
    presets: [
        {
            id: 'small',
            title: 'Small',
            label: 'S',
            min: 320,
            max: 767
        },
        {
            id: 'medium',
            title: 'Medium',
            label: 'M',
            min: 768,
            max: 1023
        },
        {
            id: 'large',
            title: 'Large',
            label: 'L',
            min: 1024,
            max: 1920
        }
    ],
    minWrapperWidth: 320,
    resizeHandleWidth: '14px',
    wrapperWidthChangeEvent: `${addonId}/wrapperWidthChangeEvent`,
    wrapperMaxWidthChangeEvent: `${addonId}/wrapperMaxWidthChangeEvent`,
    toolWidthChangeEvent: `${addonId}/toolWidthChangeEvent`
};