import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {UniversalInput} from '../components/UniversalInput';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLISTS/UniversalInput',
    component: UniversalInput,
    argTypes: {
        callBack: {
            description: 'button clicked inside form'
        },
    },
} as ComponentMeta<typeof UniversalInput>;

const Template: ComponentStory<typeof UniversalInput> = (args) => <UniversalInput {...args}/>;

export const UniversalInputStories = Template.bind({});
UniversalInputStories.args = {
    callBack: action('button clicked inside form')
};
