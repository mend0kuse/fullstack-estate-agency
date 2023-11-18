import { Image, Card, Text, Group, Button, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './apartment-card.module.css';
import { TApartment } from '../../model';
import { GrView } from 'react-icons/gr';
import { UserPreview } from '@/entities/user';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';

type Props = {
    apartment: TApartment;
};

export const ApartmentCard = ({
    apartment: { user, createdAt, address, price, title, views, description, id, images },
}: Props) => {
    const slides = images.map((image, index) => (
        <Carousel.Slide key={index}>
            <Image src={image.src} height={220} />
        </Carousel.Slide>
    ));

    return (
        <Card className={classes.card} radius='md' withBorder padding='xl'>
            <Card.Section>
                <Carousel
                    withIndicators
                    loop
                    classNames={{
                        root: classes.carousel,
                        controls: classes.carouselControls,
                        indicator: classes.carouselIndicator,
                    }}
                >
                    {slides}
                </Carousel>
            </Card.Section>

            <Text mt={'lg'} className={classes.title} fw={500} fz='lg'>
                {title} - {address}
            </Text>

            <Text fz='sm' c='dimmed' mt='sm'>
                {description}
            </Text>

            <Group justify='space-between' my='sm'>
                <Text fz='sm' c='dimmed'>
                    {new Date(createdAt).toDateString()}
                </Text>

                <Group gap={5}>
                    <GrView />
                    <Text fz='sm' c='dimmed'>
                        {views}
                    </Text>
                </Group>
            </Group>

            <UserPreview user={user} />

            <Group mt={'auto'} justify='space-between'>
                <Box>
                    <Text fz='xl' span fw={500} className={classes.price}>
                        {price}{' '}
                    </Text>
                    <Text span fz='sm' c='dimmed'>
                        / month
                    </Text>
                </Box>

                <Button to={ROUTES.APARTMENT(id)} component={Link} radius='md'>
                    Book now
                </Button>
            </Group>
        </Card>
    );
};
