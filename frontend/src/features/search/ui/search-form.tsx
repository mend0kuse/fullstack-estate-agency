import { ActionIcon, Button, Group, MultiSelect, NumberInput, Popover, Text, TextInput } from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import useUrlState from '@ahooksjs/use-url-state';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { TUrlState } from '@/entities/apartment';

export const SearchForm = () => {
    const router = useNavigate();

    const [urlState, setUrlState] = useUrlState<TUrlState>(
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

    const onSearch = () => {
        router(`${ROUTES.CATALOG}/${window.location.search}`);
    };

    return (
        <Group align={'end'} mt={'xs'} style={{ borderRadius: 10 }} p={'xs'} bg={'white'}>
            <MultiSelect
                placeholder='Количество комнат'
                onChange={(newValue) => setUrlState({ rooms: newValue })}
                value={typeof urlState.rooms === 'string' ? urlState.rooms.split(',') : urlState.rooms}
                data={['1', '2', '3', '4']}
            />
            <TextInput
                placeholder='Город'
                onChange={(event) => setUrlState({ city: event.target.value })}
                value={urlState.city}
            />
            <Popover width={250} position='bottom' shadow='md'>
                <Popover.Target>
                    <Button>
                        {urlState.minPrice || 'Минимальная цена'} - {urlState.maxPrice || 'Максимальная цена'}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <Group gap={20}>
                        <Group wrap={'nowrap'}>
                            <Text>От</Text>
                            <NumberInput
                                thousandSeparator=','
                                hideControls
                                onChange={(value) => setUrlState({ minPrice: value })}
                                value={urlState.minPrice}
                            />
                        </Group>
                        <Group wrap={'nowrap'}>
                            <Text>До</Text>
                            <NumberInput
                                thousandSeparator=','
                                hideControls
                                onChange={(value) => setUrlState({ maxPrice: value })}
                                value={urlState.maxPrice}
                            />
                        </Group>
                    </Group>
                </Popover.Dropdown>
            </Popover>
            <ActionIcon onClick={onSearch} size={'lg'}>
                <BiSearch />
            </ActionIcon>
        </Group>
    );
};
