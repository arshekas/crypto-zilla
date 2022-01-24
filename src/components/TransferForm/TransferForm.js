import React from 'react';
import { Formik, Form } from 'formik';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../UI/Form/TextField';
import Button from '../UI/Form/Button';
import Web3 from 'web3';
import { ERC20Abi, ERC721Abi, ERC1155Abi } from '../../contracts/contracts';
import Select from '../UI/Form/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenBalance } from '../../redux/actions/web3_actions';
import transferFormValidation from '../../validations/TransferFormValidation';
import { transferItemsObject } from '../../models/TransferItemsObject';
import { standards } from '../../contracts/standards';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

function TransferForm() {
  const classes = useStyles();
  const { provider, tokenBalance } = useSelector((state) => state.web3);
  const dispatch = useDispatch();

  async function getBalance(contract, contractAddress) {
    const result = await contract.methods.balanceOf(contractAddress).call(); // 29803630997051883414242659
    const format = Web3Client.utils.fromWei(result); // 29803630.997051883414242659
    dispatch(setTokenBalance(format));
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth='md'>
          <div className={classes.formWrapper}>
            <Formik
              initialValues={transferItemsObject}
              enableReinitialize
              validationSchema={transferFormValidation}
              onSubmit={async (values) => {
                const web3 = new Web3(provider);
                const {
                  contractAddress,
                  itemId,
                  amount,
                  tokenStandard,
                  destinationAddress,
                } = values;
                let contract = '';
                if (tokenStandard === 'ERC-721') {
                  contract = new web3.eth.Contract(ERC721Abi, contractAddress);
                  await contract.methods
                    .transfer(contractAddress, itemId, destinationAddress)
                    .call();
                }
                if (tokenStandard === 'ERC-1155') {
                  contract = new web3.eth.Contract(ERC1155Abi, contractAddress);
                  await contract.methods
                    .transfer(
                      contractAddress,
                      itemId,
                      amount,
                      destinationAddress
                    )
                    .call();
                }
                if (tokenStandard === 'ERC-20') {
                  contract = new web3.eth.Contract(ERC20Abi, contractAddress);
                  await contract.methods
                    .transfer(contractAddress, amount, destinationAddress)
                    .call();
                }
                getBalance(contract, contractAddress);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      Transfer Items{' '}
                      <span style={{ float: 'right' }}>
                        {tokenBalance && `Token Balance: ${tokenBalance} ETH`}
                      </span>
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='contractAddress'
                      label='Contract Address'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      name='tokenStandard'
                      label='Token Standard'
                      options={standards}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name='itemId' label='Item ID' />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name='amount' label='Amount' />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name='destinationAddress'
                      label='Destination Address'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button>Submit</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default TransferForm;
