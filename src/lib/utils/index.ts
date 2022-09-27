export const sliceAddressString = (_address: string): string => {
  return _address.substring(0, 12) + '...' + _address.substring(38);
};
