import { range, without } from 'ramda';

import Instruction from './instruction';
import Worker from './worker';

class ParallelInstructionSet {

  constructor(constantStepTime, numWorkers) {
    this.instructions = {};

    this.stepNames = new Set();
    this.completedStepNames = new Set();
    this.stepsAvailableForWork = new Set();

    this.completed = false;
    this.timeToComplete = 0;
    this.workers = this.engageWorkers(constantStepTime, numWorkers);
  }

  engageWorkers(constantStepTime, numWorkers) {
    return range(0, numWorkers).map(() => {
      return new Worker(constantStepTime);
    });
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

  calculateTimeToCompletion() {
    const independentSteps = this.findIndependentStepNames();
    independentSteps.forEach(step => this.stepsAvailableForWork.add(step));

    let stepNames = Object.keys(this.instructions);

    this.startTicks(stepNames);
    return this.timeToComplete;
  }

  findIndependentStepNames() {
    return [...this.stepNames.values()].reduce((result, name) => {
      if (!this.instructions[name]) {
        return [...result, name];
      } else {
        return result;
      }
    }, []).sort();
  }

  startTicks(stepNames) {
    while (!this.completed) {
      stepNames = this.tick(stepNames);
    }
  }

  tick(stepNames) {
    const availableSteps = this.findNextAvailableSteps(stepNames);
    availableSteps.forEach(step => this.stepsAvailableForWork.add(step));

    if (stepNames.length || this.stepsAvailableForWork.size || this.areWorkersEngaged()) {
      this.passTasksToWorkers();
      this.performWork();

      this.timeToComplete++;

      return without(availableSteps, stepNames);
    } else {
      this.completed = true;
    }
  }

  passTasksToWorkers() {
    const freeWorkers = this.workers.filter(worker => worker.isFree());
    const tasks = [...this.stepsAvailableForWork.values()];
    for (let worker of freeWorkers) {
      if (tasks.length) {
        const task = tasks.shift();
        worker.addTask(task);
        this.stepsAvailableForWork.delete(task);
      }
    }
  }

  performWork() {
    const completedTasks = this.workers
      .filter(worker => !worker.isFree())
      .map(worker => worker.work())
      .filter(task => task.isReady)
      .map(task => task.name);

    completedTasks.forEach(task => this.completedStepNames.add(task));
  }

  areWorkersEngaged() {
    return this.workers.some(worker => !worker.isFree());
  }

  findNextAvailableSteps(stepNames) {
    const sortedStepNames = [...stepNames.values()].sort();
    return sortedStepNames.reduce((result, name) => {
      const instruction = this.instructions[name];
      const dependentSteps = [...instruction.dependsOn.values()];
      if (dependentSteps.every(stepName => this.completedStepNames.has(stepName))) {
        return [...result, name];
      } else {
        return result;
      }
    }, []);
  }

}

export default ParallelInstructionSet;
