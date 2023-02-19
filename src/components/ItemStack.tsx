import {HoverCard, Button, Avatar, Text, Group, Box} from '@mantine/core';
import {InputItem, Item, ItemStack, OutputItem} from "../__generated__/graphql";
import {IMAGE_BASE_URL} from "../config";
import unraw from 'unraw';

export type ItemStackFull = {
    item: Item,
    probability: number,
    stackSize: number
}

export function itemToItemStackFull(item: Item) {
    return {item: item, probability: 1, stackSize: 1}
}

export function itemStackToItemStackFull(item: ItemStack) {
    return {item: item.item, probability: 1, stackSize: item.stackSize}
}

export function inputItemToItemStackFull(item: InputItem) {
    return {item: item.itemStack.item, probability: 1, stackSize: item.itemStack.stackSize}
}

export function outputItemToItemStackFull(item: OutputItem) {
    return {item: item.itemStack.item, probability: item.probability, stackSize: item.itemStack.stackSize}
}

interface ItemStackDisplayProps {
    item: ItemStackFull,
    onClick: ((leftClick: boolean) => void) | undefined
}

const fixTooltip = (tooltip: string) => {
    try {
        return decodeURIComponent(unraw(tooltip)).replaceAll('\n', '<br/>')
    } catch (e) {
        return tooltip.replaceAll('\\u000a', '<br/>')
    }
}

export const EmptyItem = () => {
    return <Box
        sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            width: '40px', height: '40px',
            padding: '2px',
            borderRadius: theme.radius.md,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            },
        })}
    ></Box>
}

const ItemStackDisplay = ({item, onClick}: ItemStackDisplayProps) => {
    return (
        <HoverCard width={280} shadow="md">
            <HoverCard.Target>
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        textAlign: 'center',
                        width: 'fit-content',
                        padding: '2px',
                        borderRadius: theme.radius.md,
                        cursor: 'pointer',

                        '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                        },
                    })}
                    onClick={() => onClick && onClick(true)}
                    onContextMenu={() => {onClick && onClick(false); return true} }
                >
                    <img
                        src={IMAGE_BASE_URL + item.item.imageFilePath}
                        style={{width: '40px', height: '40px'}}
                    />
                </Box>
            </HoverCard.Target>
            <HoverCard.Dropdown style={{textAlign: 'left'}}>
                <Text size="md">{item.item.localizedName}</Text>
                <Text size="sm" c="dimmed" dangerouslySetInnerHTML={{'__html': fixTooltip(item.item.tooltip)}}></Text>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}
export default ItemStackDisplay;
