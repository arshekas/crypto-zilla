export const getProviderName = (provider) => {
  switch (provider.chainId) {
    case '0x89':
      return 'Matic Mainnet';
    case '0x38':
      return 'Binance Smart Chain (BSC)';
    case '0x4':
      return 'Rinkeby';
  }
};
