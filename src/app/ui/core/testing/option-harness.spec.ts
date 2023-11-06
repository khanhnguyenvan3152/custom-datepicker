import {MatOptionModule, MatOption} from '../core';
import {runHarnessTests} from './option-shared.spec';
import {MatOptionHarness} from './option-harness';

describe('Non-MDC-based MatOptionHarness', () => {
  runHarnessTests(MatOptionModule, MatOptionHarness, MatOption);
});
