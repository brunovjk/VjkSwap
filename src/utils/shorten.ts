export const shortenAddress = (address: any) => {
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};

export const shortenNumber = (number: any) => {
  if (number.length < 10) {
    return number;
  } else {
    return `${number.slice(0, 5)}...${number.slice(number.length - 4)}`;
  }
};
