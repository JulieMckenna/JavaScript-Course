// Remember, we're gonna use strict mode in all scripts now!
'use strict';
//Problem
/*
We work for a company building a smart home therometer.
Our mjust recent task is this: 'Given an array of tempuratures of one day,
calculate the tempurature amplitude. Keep in mind that sometimes there might
be a sensor error`
*/

const tempuratures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) understanding the problem
// - What is temp. amplitude?  The differnce between highest and lowest temp
// - How to compute the max and min temp
// - What's a sensor error? And what do we do?

// 2) Breaking into sub-problems
// - How to ignore errors
// - Find the max value
// - Find the min value
// - Subtract min from max and return it

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 1; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== 'number') continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude(tempuratures);
console.log(amplitude);

// Problem 2
// Function should now take in 2 arrays

// 1) Undertand the problem
// - With 2 arrays, should we implement function twice? Nojust merge arrays

// 2) Break down into sub-problems
// - Merge 2 arrays

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  let max = temps[0];
  let min = temps[0];
  for (let i = 1; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== 'number') continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeNew = calcTempAmplitudeNew([10, -2, 3], [9, 1, 0, 15]);
console.log(amplitudeNew);

const measureKelvin = function () {
  const measurement = {
    type: `temp`,
    unit: `celsius`,
    value: Number(prompt(`Degress celsius:`)),
  };

  console.log(measurement);
  console.table(measurement);

  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());
