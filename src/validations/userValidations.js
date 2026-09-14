import * as Yup from 'yup';

const reviewFormSchema = Yup.object().shape({
  star: Yup.string().required('Please tap to Add Ratings'),
  description: Yup.string().required('Description is required').min(4).max(200),
});

const estimateFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});

export default {
  reviewFormSchema,
  estimateFormSchema,
};
