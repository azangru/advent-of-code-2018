import ConsecutiveInstructionSet from './consecutive-instruction-set';
import ParallelInstructionSet from './parallel-instruction-set';

export function getCorrectSequenceOfSteps(instructions) {
  const instructionSet = buildConsecutiveInstructionSet(instructions);
  return instructionSet.sortSteps();
}

export function calculateTimeForParallelWork(instructions, constantStepTime, numWorkers) {
  const instructionSet = buildParallelInstructionSet(instructions, constantStepTime, numWorkers);
  return instructionSet.calculateTimeToCompletion();
}

function parseInstructions(instructions) {
  const regex = /Step (\w{1}) must be finished before step (\w{1}) can begin./;
  return instructions.map(instruction => {
    const [, dependentStep, currentStep] = regex.exec(instruction);
    return [dependentStep, currentStep];
  });
}

function buildConsecutiveInstructionSet(instructions) {
  const instructionSet = new ConsecutiveInstructionSet();

  const parsedInstructions = parseInstructions(instructions);
  parsedInstructions.forEach(([dependentStep, currentStep]) => {
    instructionSet.add({ name: currentStep, dependentStep });
  });

  return instructionSet;
}

function buildParallelInstructionSet(instructions, constantStepTime, numWorkers) {
  const instructionSet = new ParallelInstructionSet(constantStepTime, numWorkers);

  const parsedInstructions = parseInstructions(instructions);
  parsedInstructions.forEach(([dependentStep, currentStep]) => {
    instructionSet.add({ name: currentStep, dependentStep });
  });

  return instructionSet;
}
