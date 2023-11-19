import { Button, Group, MultiSelect, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { TUrlState } from '@/entities/apartment';
import useUrlState from '@ahooksjs/use-url-state';

type Props = {
    onApply: () => void;
};

const orderMap = {
    asc: 'По возрастанию',
    desc: 'По убыванию',
};

const sortMap = {
    views: 'По просмотрам',
    createdAt: 'По дате создания',
    price: 'По цене',
};

export const Filters = ({ onApply }: Props) => {
    const [urlState, setUrlParams] = useUrlState<TUrlState>(
        {},
        {
            parseOptions: {
                arrayFormat: 'comma',
            },
            stringifyOptions: {
                arrayFormat: 'comma',
            },
        }
    );

    return (
        <Stack gap={20}>
            <Select
                placeholder='Sort'
                style={{ maxWidth: 250 }}
                onChange={(newValue) => setUrlParams({ sort: newValue })}
                value={urlState.sort}
                data={Object.entries(sortMap).map(([key, value]) => ({ value: key, label: value }))}
            />
            <Select
                placeholder='Order'
                style={{ maxWidth: 250 }}
                onChange={(newValue) => setUrlParams({ order: newValue })}
                value={urlState.order}
                data={Object.entries(orderMap).map(([key, value]) => ({ value: key, label: value }))}
            />
            <MultiSelect
                placeholder='Choose a room'
                style={{ maxWidth: 250 }}
                onChange={(newValue) => setUrlParams({ rooms: newValue })}
                value={typeof urlState.rooms === 'string' ? urlState.rooms.split(',') : urlState.rooms}
                data={['1', '2', '3', '4']}
            />
            <TextInput
                placeholder='City'
                onChange={(event) => setUrlParams({ city: event.target.value })}
                value={urlState.city}
            />
            <Group wrap={'nowrap'}>
                <Text>От</Text>
                <NumberInput
                    thousandSeparator=','
                    hideControls
                    onChange={(value) => setUrlParams({ minPrice: Number(value) })}
                    value={urlState.minPrice}
                />
            </Group>
            <Group wrap={'nowrap'}>
                <Text>До</Text>
                <NumberInput
                    thousandSeparator=','
                    hideControls
                    onChange={(value) => setUrlParams({ maxPrice: Number(value) })}
                    value={urlState.maxPrice}
                />
            </Group>
            <Button onClick={onApply}>Apply</Button>
        </Stack>
    );
};
