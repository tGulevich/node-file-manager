import { cpus } from 'node:os';

export function getCPUsInfo() {
  const cpusData = cpus(); // Get CPU details
  const numOfCPUs = cpusData.length; // Total number of CPUs

  console.log(`Total number of CPUs: ${numOfCPUs}`);
  cpusData.forEach((cpu, index) => {
    const model = cpu.model;
    const clockRateGHz = (cpu.speed / 1000).toFixed(2); // Convert speed from MHz to GHz
    console.log(`CPU ${index + 1}: ${model}, ${clockRateGHz} GHz`);
  });
}