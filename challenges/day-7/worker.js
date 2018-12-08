// UTF-16 code for A is 65, and increments by 1 for each subsequent capital letter
// In this example, A's value is 1, and increments by 1 for each subsequent capital letter
const CHARACTER_OFFSET_VALUE = 64;

class Worker {

  constructor(baseTime) {
    this.taskBaseTime = baseTime;
    this.task = null;
  }

  addTask(task) {
    this.task = new Task(task, this.taskBaseTime);
  }

  work() {
    if (this.task) {
      this.task.tick();

      return {
        name: this.task.taskName,
        isReady: this.task.isReady
      };
    }
  }

  isFree() {
    return !this.task || this.task.isReady;
  }
}

class Task {
  constructor(task, baseTime) {
    this.taskName = task;
    this.timeToCompletion = baseTime + this.getTaskDuration(task);
    this.isReady = false;
  }

  getTaskDuration(task) {
    // task is a capital letter between A and Z
    return task.charCodeAt(0) - CHARACTER_OFFSET_VALUE;
  }

  tick() {
    if (this.timeToCompletion > 0) {
      this.timeToCompletion--;
    }
    if (this.timeToCompletion === 0) {
      this.isReady = true;
    }
  }
}

export default Worker;
