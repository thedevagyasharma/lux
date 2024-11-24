const generateUniqueRatios = () => {
    const ratios = new Set<number>();
    const uniqueRatios = [];
  
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        const ratio = i / j;
        if (!ratios.has(ratio)) {
          ratios.add(ratio);
          uniqueRatios.push({ a: i, b: j });
        }
      }
    }
  
    // Sort the unique ratios based on their value
    uniqueRatios.sort((r1, r2) => (r1.a / r1.b) - (r2.a / r2.b));
  
    return uniqueRatios;
  };
  
  export const uniqueRatios = generateUniqueRatios();