import {HoverCard, Button, Avatar, Text, Group, Box} from '@mantine/core';
import {InputItem, Item, ItemStack, OutputItem} from "../__generated__/graphql";
import {IMAGE_BASE_URL} from "../config";
import unraw from 'unraw';

export type ItemStackFull = {
    item: Item,
    probability: number,
    stackSize: number
}

function isItemStackFull(item: ItemStackFull | Item | InputItem | OutputItem): item is ItemStackFull {
    return (item as ItemStackFull).item !== undefined &&
        (item as ItemStackFull).probability !== undefined &&
        (item as ItemStackFull).stackSize !== undefined;
}

function isInputItem(item: ItemStackFull | Item | InputItem | OutputItem): item is InputItem {
    return (item as InputItem).__typename === "InputItem";
}

function isOutputItem(item: ItemStackFull | Item | InputItem | OutputItem): item is OutputItem {
    return (item as OutputItem).__typename === "OutputItem";
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

const normalizeItemStack = (item: ItemStackFull | Item | InputItem | OutputItem): ItemStackFull => {
    if (isItemStackFull(item)) {
        return item
    }
    if (isInputItem(item)) {
        return inputItemToItemStackFull(item)
    }
    if (isOutputItem(item)) {
        return outputItemToItemStackFull(item)
    }
    return itemToItemStackFull(item)
}

interface ItemStackDisplayProps {
    item: ItemStackFull | Item | InputItem | OutputItem
    onClick: ((leftClick: boolean, item: Item) => void) | undefined
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

const ItemStackDisplay = ({item: inputItem, onClick}: ItemStackDisplayProps) => {
    const item = normalizeItemStack(inputItem)
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
                    onClick={() => onClick && onClick(true, item.item)}
                    onContextMenu={(e) => {onClick && onClick(false, item.item); e.preventDefault(); e.stopPropagation(); return false} }
                >
                    <img
                        src={IMAGE_BASE_URL + item.item.imageFilePath}
                        style={{width: '40px', height: '40px'}}
                    />
                    {item.stackSize > 1 && (<Text size="sm" style={{position: 'absolute', bottom: '0', right: '0'}}>{item.stackSize}</Text>)}
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
