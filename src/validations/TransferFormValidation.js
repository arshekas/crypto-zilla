import * as Yup from 'yup';

export default function transferFormValidation() {
  return Yup.object().shape({
    contractAddress: Yup.string().required('Required'),
    itemId: Yup.string().required('Required'),
    amount: Yup.number()
      .typeError('Please enter a valid amount')
      .required('Required'),
    tokenStandard: Yup.string().required('Required'),
    destinationAddress: Yup.string().required('Required'),
  });
}
