import Instruction from './instruction';

class ConsecutiveInstructionSet {

  constructor() {
    this.instructions = {};
    this.stepNames = new Set();
    this.completedStepNames = new Set();
  }

  add({ name, dependentStep }) {
    const savedInstruction = this.instructions[name];
    if (savedInstruction) {
      savedInstruction.addDependent(dependentStep);
    } else {
      const instruction = new Instruction(name, dependentStep);
      this.instructions[name] = instruction;
    }
    this.stepNames.add(name);
    this.stepNames.add(dependentStep);
  }

  sortSteps() {
    const independentSteps = this.findIndependentStepNames();
    const firstStep = independentSteps.shift();
    this.completedStepNames.add(firstStep);

    let stepNames = new Set([...independentSteps, ...Object.keys(this.instructions)]);
    while (stepNames.size) {
      const nextStepName = this.findNextStepName(stepNames);
      this.completedStepNames.add(nextStepName);
      stepNames.delete(nextStepName);
    }
    return [...this.completedStepNames.values()].join('');
  }

  findIndependentStepNames() {
    let candidates = [];
    for(let name of [...this.stepNames.values()]) {
      if (!this.instructions[name]) {
        candidates.push(name);
      }
    }
    return candidates.sort();
  }

  findNextStepName(stepNames) {
    const sortedStepNames = [...stepNames.values()].sort();
    for (let name of sortedStepNames) {
      const instruction = this.instructions[name];
      if (!instruction) {
        // this is an independent step
        return name;
      }

      const dependentSteps = [...instruction.dependsOn.values()];
      if (dependentSteps.every(stepName => this.completedStepNames.has(stepName))) {
        return name;
      }
    }
  }

}

export default ConsecutiveInstructionSet;
