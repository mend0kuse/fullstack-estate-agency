import { Layout } from '@/layout';
import { useForm } from '@mantine/form';
import { TApartmentCreate } from '@/entities/apartment';
import {
    Button,
    Fieldset,
    Group,
    LoadingOverlay,
    NumberInput,
    Stack,
    Switch,
    Textarea,
    TextInput,
    Text,
} from '@mantine/core';
import { DropzoneButton } from '@/shared/ui/dropzone';
import { DEFAULT_FORM_VALUES } from './config';
import { useCreateApartment } from './lib';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';

export const CreateApartment = () => {
    const form = useForm<TApartmentCreate>({
        initialValues: DEFAULT_FORM_VALUES,
    });

    const { createApartment, isPending, error } = useCreateApartment();

    const onSubmit = (apartment: TApartmentCreate) => {
        createApartment(convertToFormData(apartment));
    };

    return (
        <Layout>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack pos={'relative'}>
                    <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                    <Fieldset legend='Common'>
                        <TextInput {...form.getInputProps('title')} withAsterisk label='Title' />
                        <TextInput {...form.getInputProps('address')} withAsterisk label='Address' />
                        <Textarea {...form.getInputProps('description')} withAsterisk label='Description' />
                        <NumberInput {...form.getInputProps('rooms')} withAsterisk label='Rooms' />
                        <TextInput {...form.getInputProps('city')} withAsterisk label='City' />
                    </Fieldset>

                    <Fieldset legend='Payement'>
                        <NumberInput {...form.getInputProps('price')} withAsterisk label='Price per month' />
                        <NumberInput {...form.getInputProps('prepayment')} withAsterisk label='Prepaymment' />
                        <NumberInput {...form.getInputProps('pledge')} withAsterisk label='Pledge' />
                        <Switch
                            defaultChecked
                            label='Коммунальные услуги включены в оплату'
                            {...form.getInputProps('communalIncluded')}
                        />
                    </Fieldset>

                    <Fieldset legend='Characteristic'>
                        <TextInput {...form.getInputProps('characteristic.square')} withAsterisk label='Square' />
                        <TextInput {...form.getInputProps('characteristic.kitchen')} withAsterisk label='Kitchen' />
                        <Textarea {...form.getInputProps('characteristic.live')} withAsterisk label='Live' />
                        <Textarea {...form.getInputProps('characteristic.year')} withAsterisk label='Year' />
                        <Textarea {...form.getInputProps('characteristic.floor')} withAsterisk label='Floor' />
                    </Fieldset>

                    <Fieldset legend='Images'>
                        <DropzoneButton files={form.values.images} setFiles={(images) => form.setValues({ images })} />
                    </Fieldset>

                    <Group gap={10} mt='xl'>
                        <Button type='submit' radius='xl'>
                            Create
                        </Button>
                        {error && <Text c={'red'}>{transformAxiosError(error)}</Text>}
                    </Group>
                </Stack>
            </form>
        </Layout>
    );
};
