import { Text, ThemeIcon, Stack, rem } from '@mantine/core';
import classes from './icons.module.css';
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaAddressCard, FaClock, FaMapPin, FaPhone } from 'react-icons/fa';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: typeof FaMapPin;
    title: React.ReactNode;
    description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
    return (
        <div className={classes.wrapper} {...others}>
            <ThemeIcon size={40} radius='md' className={classes.icon}>
                <Icon style={{ width: rem(24), height: rem(24) }} />
            </ThemeIcon>

            <div>
                <Text size='xs' className={classes.title}>
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    );
}

const MOCK_DATA = [
    { title: 'Email', description: 'hello@mantine.dev', icon: MdEmail },
    { title: 'Phone', description: '+49 (800) 335 35 35', icon: FaPhone },
    { title: 'Address', description: '844 Morris Park avenue', icon: FaAddressCard },
    { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: FaClock },
];

export const ContactIconsList = () => {
    const items = MOCK_DATA.map((item, index) => <ContactIcon key={index} {...item} />);
    return <Stack>{items}</Stack>;
};
