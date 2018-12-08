class Instruction {
  constructor(name, dependentStep) {
    this.name = name;
    this.dependsOn = new Set([dependentStep]);
  }

  addDependent(dependentStep) {
    this.dependsOn.add(dependentStep);
  }
}

export default Instruction;
