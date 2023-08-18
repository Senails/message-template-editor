import type { Meta, StoryObj } from '@storybook/react';
import { TamplateBlock } from "./index";

const meta = {
    title: 'Tamplate.Editor/components/TamplateBlock',
    component: TamplateBlock
} satisfies Meta<typeof TamplateBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const primary: Story = {
    args:{
        tamplate:{
            First:"123456",
            Last:{First:"67890"},
            IFblocks:{
                ifConditionParam:"isactve",
                Then:{First:"one"},
                Else:{First:"two"},
            }
        },
        path:[]
    }
};
