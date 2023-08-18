import type { Meta, StoryObj } from '@storybook/react';
import { TamplateEditor } from "./index";

const meta = {
    title: 'Tamplate.Editor/TamplateEditor',
    component: TamplateEditor
} satisfies Meta<typeof TamplateEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args:{
        params :[
            'namedsf1',
            'namfe2',
            'namefdsfs3',
            'namfe2',
            'namefdsfs3',
            'namfe2',
            'namefdsfs3',
            'namfe2',
            'namefdsfs3',
            'namfe2',
            'namefdsfs3',
            'namfe2',
            'namefdsfs3',
        ],
        tamplate:{
            First:"123456",
            Last:{First:"67890"},
            IFblocks:[
                {
                    ifConditionParam:"isactve",
                    Then:{First:"one"},
                    Else:{First:"two"},
                },
            ]
        }
    }
};

