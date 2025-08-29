import { ChangeEvent } from 'react';

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export const preloadImage = (imgLink: string): void => {
  const myImage = new Image();
  myImage.src = imgLink;
};

export const parseCSV = (csvFile: string) => {
  const lines = csvFile.split('\n');
  const headers = lines[0]
    .split(',')
    .map((header) =>
      header
        .toLowerCase()
        .replace(/\s(\w)/, (_, firstLetter: string) =>
          firstLetter.toUpperCase()
        )
    );
  // Remove header row and index header
  lines.shift();
  headers.shift();

  return lines.map((line: string) => {
    const dataLine = line.split(',');
    dataLine.shift();
    return dataLine.reduce(
      (accum: Record<string, string>, nextString, index) => ({
        ...accum,
        [headers[index]]: nextString,
      }),
      {}
    );
  });
};

export const promisifySuspense = (isDataReceived: boolean) => {
  let externalResolve: (value: unknown) => void = () => {};
  const customPromise = new Promise((res) => {
    externalResolve = res;
  });
  if (isDataReceived) {
    externalResolve?.(true);
  } else {
    throw customPromise;
  }
};

export const handleBetRange = (
  event: ChangeEvent<HTMLInputElement>,
  setBetValue: (arg: number | string) => void,
  { maxBet, minBet }: { maxBet: number; minBet: number }
) => {
  const inputValue = event.target.value;
  const numberInputValue = Number(
    (Number(inputValue) > maxBet && maxBet) ||
      (Number(inputValue) < minBet && minBet) ||
      inputValue
  );
  const resultValue = Number(inputValue) ? numberInputValue : inputValue;
  setBetValue(resultValue);
};
