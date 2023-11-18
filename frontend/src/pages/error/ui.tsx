import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './ui.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';

export const NothingFound = () => (
    <Container className={classes.root}>
        <div className={classes.inner}>
            <Illustration className={classes.image} />
            <div className={classes.content}>
                <Title className={classes.title}>Nothing to see here</Title>
                <Text c='dimmed' size='lg' ta='center' className={classes.description}>
                    Page you are trying to open does not exist. You may have mistyped the address, or the page has been
                    moved to another URL. If you think this is an error contact support.
                </Text>
                <Group justify='center'>
                    <Button component={Link} to={ROUTES.MAIN} size='md'>
                        Take me back to home page
                    </Button>
                </Group>
            </div>
        </div>
    </Container>
);
