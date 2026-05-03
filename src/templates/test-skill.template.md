---
name: mdnkit-test
description: Generates comprehensive tests for {{projectName}} migrated code, ensuring functionality matches legacy behavior
version: 1.0.0
author: mdnkit
tags: [testing, quality-assurance, verification, {{projectName}}]
---

# mdnkit-test Skill

## Purpose
This skill enables Bob to generate comprehensive tests for **{{projectName}}** migrated code, ensuring functionality matches legacy behavior while following modern testing practices.

## Project Context

- **Project Name**: {{projectName}}
- **Target Path**: {{targetPath}}
- **Test Type**: {{testType}}
- **Framework**: {{testFramework}}
- **Coverage Target**: {{coverageTarget}}%
- **Current Coverage**: {{currentCoverage}}%

## When to Use This Skill

- After migrating code with mdnkit-migrate
- Before starting migration to establish baseline
- To verify functionality matches legacy behavior
- To achieve target test coverage

## Prerequisites

- Migrated code ready for testing
- Test framework configured ({{testFramework}})
- Understanding of expected behavior
- Access to legacy code for behavior comparison

## Input Parameters

### Required
- `target_path` (string): Path to code that needs tests
  - Current: `{{targetPath}}`
  - Can be file, directory, or component
- `test_type` (string): Type of tests to generate
  - Current: `{{testType}}`
  - Options: `unit`, `integration`, `e2e`, `all`

### Optional
- `coverage_target` (number): Target coverage percentage
  - Current: `{{coverageTarget}}%`
  - Default: `80`
- `framework` (string): Test framework to use
  - Current: `{{testFramework}}`
  - Options: `vitest`, `jest`, `playwright`
  - Default: `vitest`
- `legacy_reference` (string): Path to legacy code for behavior comparison
  - Current: `{{legacyReference}}`
  - Used to ensure feature parity

## Execution Steps

When Bob invokes this skill, the following test generation will be performed:

### Step 1: Analyze Code
```bash
# Understand functionality and edge cases
# Identify public APIs and interfaces
# Map data flow and dependencies
# List all scenarios to test
```
**Output**: Test case inventory

### Step 2: Identify Test Cases
```bash
# List happy path scenarios
# Identify edge cases
# Find error conditions
# Document expected behaviors
```
**Output**: Comprehensive test case list

### Step 3: Generate Test Files
```bash
# Create test files with proper structure
# Follow naming conventions
# Set up test fixtures and mocks
```
**Output**: Test file structure

### Step 4: Write Test Code
```bash
# Implement tests with assertions
# Add setup and teardown
# Mock external dependencies
# Cover all identified scenarios
```
**Output**: Complete test implementation

### Step 5: Run Tests
```bash
# Execute all generated tests
# Measure code coverage
# Verify all tests pass
```
**Output**: Test results and coverage report

### Step 6: Generate Report
```bash
# Create test coverage report
# Document uncovered lines
# Suggest additional tests
```
**Output**: Test generation report

## Generated Test Files

### Unit Tests

**File**: `{{unitTestFile}}`

```typescript
import { describe, it, expect, beforeEach } from '{{testFramework}}';
import { {{componentName}} } from '{{componentPath}}';

describe('{{componentName}}', () => {
  beforeEach(() => {
    // Setup
  });

  describe('Happy Path', () => {
    it('should {{happyPathScenario1}}', () => {
      // Arrange
      const input = {{testInput}};
      
      // Act
      const result = {{componentName}}(input);
      
      // Assert
      expect(result).toBe({{expectedOutput}});
    });

    it('should {{happyPathScenario2}}', async () => {
      // Test implementation
    });
  });

  describe('Edge Cases', () => {
    it('should handle {{edgeCase1}}', () => {
      // Test implementation
    });

    it('should handle {{edgeCase2}}', () => {
      // Test implementation
    });
  });

  describe('Error Handling', () => {
    it('should throw error when {{errorCondition}}', () => {
      expect(() => {{componentName}}(invalidInput)).toThrow();
    });
  });
});
```

### Integration Tests

**File**: `{{integrationTestFile}}`

```typescript
import { describe, it, expect } from '{{testFramework}}';
import request from 'supertest';
import { app } from '../app';

describe('{{apiEndpoint}}', () => {
  it('should return {{expectedResponse}}', async () => {
    const response = await request(app)
      .get('{{apiEndpoint}}')
      .expect(200);
      
    expect(response.body).toMatchObject({{expectedShape}});
  });

  it('should require authentication', async () => {
    await request(app)
      .get('{{apiEndpoint}}')
      .expect(401);
  });

  it('should handle {{errorScenario}}', async () => {
    const response = await request(app)
      .get('{{apiEndpoint}}')
      .send({{invalidData}})
      .expect(400);
      
    expect(response.body.error).toBeDefined();
  });
});
```

### E2E Tests

**File**: `{{e2eTestFile}}`

```typescript
import { test, expect } from '@playwright/test';

test('{{userFlow}}', async ({ page }) => {
  // Navigate to page
  await page.goto('{{pageUrl}}');
  
  // Interact with UI
  await page.fill('{{inputSelector}}', '{{testData}}');
  await page.click('{{buttonSelector}}');
  
  // Verify result
  await expect(page.locator('{{resultSelector}}')).toHaveText('{{expectedText}}');
});

test('{{errorFlow}}', async ({ page }) => {
  await page.goto('{{pageUrl}}');
  
  // Trigger error
  await page.click('{{errorTrigger}}');
  
  // Verify error message
  await expect(page.locator('.error')).toBeVisible();
});
```

## Test Coverage Report

### Overall Coverage
- **Statements**: {{statementsCoverage}}% ({{statementsCovered}}/{{statementsTotal}})
- **Branches**: {{branchesCoverage}}% ({{branchesCovered}}/{{branchesTotal}})
- **Functions**: {{functionsCoverage}}% ({{functionsCovered}}/{{functionsTotal}})
- **Lines**: {{linesCoverage}}% ({{linesCovered}}/{{linesTotal}})

### Coverage by File
| File | Statements | Branches | Functions | Lines |
|------|-----------|----------|-----------|-------|
{{#each coverageByFile}}
| {{file}} | {{statements}}% | {{branches}}% | {{functions}}% | {{lines}}% |
{{/each}}

### Uncovered Lines
{{#each uncoveredLines}}
- `{{file}}:{{lineStart}}-{{lineEnd}}` - {{reason}}
{{/each}}

## Behavior Comparison

### Legacy vs Modern Behavior
{{#each behaviorComparison}}
#### {{scenario}}
- **Legacy**: {{legacyBehavior}}
- **Modern**: {{modernBehavior}}
- **Status**: {{#if matches}}✅ Matches{{else}}⚠️ Differs{{/if}}
{{#unless matches}}
- **Note**: {{differenceNote}}
{{/unless}}

{{/each}}

### Improvements
{{#each improvements}}
- ✅ {{this}}
{{/each}}

## Usage Examples

### Example 1: Generate All Tests
```markdown
Bob, use mdnkit-test to generate all tests for {{targetPath}}
```

**Bob's Actions**:
1. Analyze code at {{targetPath}}
2. Generate unit tests
3. Generate integration tests
4. Generate E2E tests
5. Run all tests
6. Generate coverage report

### Example 2: Unit Tests Only
```markdown
Bob, generate unit tests for {{componentName}} using mdnkit-test
```

**Bob's Actions**:
1. Analyze {{componentName}}
2. Identify test cases
3. Generate unit test file
4. Run tests
5. Report coverage

### Example 3: Increase Coverage
```markdown
Bob, use mdnkit-test to add tests for uncovered lines in {{targetPath}}
```

**Bob's Actions**:
1. Read current coverage report
2. Identify uncovered lines
3. Generate tests for uncovered code
4. Run tests
5. Verify coverage increased

### Example 4: Compare with Legacy
```markdown
Bob, use mdnkit-test with legacy_reference={{legacyPath}} to verify behavior matches
```

**Bob's Actions**:
1. Analyze legacy behavior
2. Generate tests based on legacy
3. Run tests against modern code
4. Report any differences

## Integration with Other Skills

### Before mdnkit-test
1. **mdnkit-migrate**: Migrate code first
   ```markdown
   Bob, migrate task 2.1 with mdnkit-migrate, then generate tests with mdnkit-test
   ```

### During mdnkit-test
1. **mdnkit-migrate**: Fix issues found by tests
   ```markdown
   Bob, the tests found an issue - use mdnkit-migrate to fix it
   ```

### After mdnkit-test
1. **mdnkit-plan**: Update plan with test completion
   ```markdown
   Bob, update the migration plan - tests for task 2.1 are complete
   ```

## Test Generation Summary

### Tests Generated
- **Unit Tests**: {{unitTestsGenerated}} tests in {{unitTestFiles}} files
- **Integration Tests**: {{integrationTestsGenerated}} tests in {{integrationTestFiles}} files
- **E2E Tests**: {{e2eTestsGenerated}} tests in {{e2eTestFiles}} files
- **Total**: {{totalTestsGenerated}} tests

### Test Results
- ✅ **Passing**: {{testsPassing}}/{{totalTestsGenerated}}
- ❌ **Failing**: {{testsFailing}}/{{totalTestsGenerated}}
- ⏭️ **Skipped**: {{testsSkipped}}/{{totalTestsGenerated}}

### Coverage Achievement
- **Target**: {{coverageTarget}}%
- **Achieved**: {{currentCoverage}}%
- **Status**: {{#if coverageTargetMet}}✅ Target met{{else}}⚠️ Below target{{/if}}

## Success Criteria

- [x] All test types generated (unit, integration, e2e)
- [x] Coverage target met ({{currentCoverage}}% >= {{coverageTarget}}%)
- [x] All tests passing
- [x] Legacy behavior verified
- [x] Test files follow best practices
- [ ] Ready for production deployment

## Error Handling

### Common Errors

**Error**: `Target path not found`
- **Cause**: Invalid target_path parameter
- **Solution**: Verify {{targetPath}} exists

**Error**: `Test framework not configured`
- **Cause**: {{testFramework}} not installed
- **Solution**: Install test framework: `npm install -D {{testFramework}}`

**Error**: `Tests failing`
- **Cause**: Code doesn't match expected behavior
- **Solution**: Review test assertions or fix code

**Error**: `Low coverage`
- **Cause**: Not enough test cases
- **Solution**: Generate additional tests for uncovered lines

## Best Practices

1. **Test First**: Write tests before or during migration
2. **Cover Edge Cases**: Don't just test happy paths
3. **Mock External Dependencies**: Isolate unit tests
4. **Test Behavior, Not Implementation**: Focus on what, not how
5. **Keep Tests Maintainable**: Clear, concise, well-organized

## Performance Metrics

- **Test Generation Time**: {{testGenerationTime}} seconds
- **Test Execution Time**: {{testExecutionTime}} seconds
- **Tests per Second**: {{testsPerSecond}}
- **Coverage Calculation Time**: {{coverageCalculationTime}} seconds

## Next Steps

1. ✅ Tests generated for {{targetPath}}
2. ⏭️ Review test coverage report
3. ⏭️ Add tests for uncovered lines if needed
4. ⏭️ Integrate tests into CI/CD pipeline
5. ⏭️ Continue with next migration task

---

**Test Status**: {{#if allTestsPassing}}✅ All Passing{{else}}⚠️ Some Failing{{/if}}  
**Coverage**: {{currentCoverage}}% (Target: {{coverageTarget}}%)  
**Tests Generated**: {{totalTestsGenerated}}  
**Ready for**: {{#if coverageTargetMet}}Production{{else}}Additional Testing{{/if}}