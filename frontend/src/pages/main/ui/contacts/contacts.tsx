import { Title, Container, Text } from '@mantine/core';
import classes from './contacts.module.css';
import { ContactIconsList } from './icons';

export const Contacts = () => {
    return (
        <Container className={classes.wrapper} size='lg'>
            <div className={classes.header}>
                <div>
                    <Title className={classes.title}>Frequently Asked Questions</Title>
                    <Title className={classes.titleOverlay} role='presentation'>
                        FAQ
                    </Title>
                </div>

                <div className={classes.contact}>
                    <Text size='xl' fw={500} className={classes.contactTitle}>
                        Contact us
                    </Text>

                    <ContactIconsList />
                </div>
            </div>
        </Container>
    );
};
