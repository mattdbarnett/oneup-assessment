export const findOdd = (xs: number[]): number => {

  /**
   * Create array counting each instance of each number
   */
  const xsCounts: { [key: number]: number } = {};
  for (const num of xs) {
    xsCounts[num] = xsCounts[num] ? xsCounts[num] + 1 : 1;
  }

  /**
   * Get the odd number
   */
  for (const countKey in xsCounts) {
    var countVal = xsCounts[countKey];
    if (countVal % 2 === 1) {
      return parseInt(countKey);
    }
  }

  return 0;
};