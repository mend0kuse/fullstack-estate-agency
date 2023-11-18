import { Card, Text, Group, Center, rem } from '@mantine/core';
import classes from './apartment-preview.module.css';
import { TApartment } from '@/entities/apartment';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { FiEye } from 'react-icons/fi';
import { ImPriceTag } from 'react-icons/im';
type Props = {
    apartment: TApartment;
};
export const ApartmentPreview = ({ apartment }: Props) => {
    const { images, title, views, address, price, id } = apartment;

    return (
        <Card p='lg' shadow='lg' className={classes.card} radius='md' component={Link} to={ROUTES.APARTMENT(id)}>
            <div
                className={classes.image}
                style={{
                    backgroundImage: `url(${images[0].src})`,
                }}
            />
            <div className={classes.overlay} />

            <div className={classes.content}>
                <div>
                    <Text size='lg' className={classes.title} fw={500}>
                        {title}
                    </Text>

                    <Group justify='space-between' gap='xs'>
                        <Text size='sm' className={classes.author}>
                            {address}
                        </Text>

                        <Group gap='lg'>
                            <Center>
                                <FiEye style={{ color: 'white', width: rem(16), height: rem(16) }} />
                                <Text size='sm' className={classes.bodyText}>
                                    {views}
                                </Text>
                            </Center>
                            <Center>
                                <ImPriceTag style={{ color: 'white', width: rem(16), height: rem(16) }} />
                                <Text size='sm' className={classes.bodyText}>
                                    {price} / месяц
                                </Text>
                            </Center>
                        </Group>
                    </Group>
                </div>
            </div>
        </Card>
    );
};
