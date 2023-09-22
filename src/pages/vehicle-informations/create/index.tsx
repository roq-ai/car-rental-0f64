import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createVehicleInformation } from 'apiSdk/vehicle-informations';
import { vehicleInformationValidationSchema } from 'validationSchema/vehicle-informations';
import { VehicleInterface } from 'interfaces/vehicle';
import { getVehicles } from 'apiSdk/vehicles';
import { VehicleInformationInterface } from 'interfaces/vehicle-information';

function VehicleInformationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VehicleInformationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVehicleInformation(values);
      resetForm();
      router.push('/vehicle-informations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VehicleInformationInterface>({
    initialValues: {
      maintenance_history: '',
      vehicle_color: '',
      model: (router.query.model as string) ?? null,
    },
    validationSchema: vehicleInformationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Vehicle Informations',
              link: '/vehicle-informations',
            },
            {
              label: 'Create Vehicle Information',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Vehicle Information
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.maintenance_history}
            label={'Maintenance History'}
            props={{
              name: 'maintenance_history',
              placeholder: 'Maintenance History',
              value: formik.values?.maintenance_history,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.vehicle_color}
            label={'Vehicle Color'}
            props={{
              name: 'vehicle_color',
              placeholder: 'Vehicle Color',
              value: formik.values?.vehicle_color,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<VehicleInterface>
            formik={formik}
            name={'model'}
            label={'Select Vehicle'}
            placeholder={'Select Vehicle'}
            fetcher={getVehicles}
            labelField={'make'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/vehicle-informations')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'vehicle_information',
    operation: AccessOperationEnum.CREATE,
  }),
)(VehicleInformationCreatePage);
