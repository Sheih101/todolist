import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {EditableSpan} from '../components/EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    title: 'asd',
    callBack: action('edit called'),
};
