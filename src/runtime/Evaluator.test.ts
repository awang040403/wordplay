import { expect, test } from "vitest";
import Project from "../models/Project";
import Source from "../models/Source";

test.each([
    0,
    1,
    10,
    15
])("Step back %i", (steps: number) => {
    const code = `
        ƒ fib (n•#) •# n ≤ 1 ? n fib(n - 1) + fib(n - 2)
        fib(5)
    `
    const source = new Source("test", code);
    const project = new Project("test", source, []);
    project.evaluate();
    const stepIndex = project.evaluator.getStepIndex();

    // Step back
    project.evaluator.stepBack(-steps);

    // Expect to be back precisely that many steps
    expect(project.evaluator.getStepIndex() === stepIndex - steps);

    // Back to the future
    project.evaluator.stepTo(stepIndex);
    expect(project.evaluator.getStepIndex() === stepIndex);

});