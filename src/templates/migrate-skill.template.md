---
name: mdnkit-migrate
description: Executes migration tasks for {{projectName}}, refactoring legacy code to modern patterns while maintaining functionality
version: 1.0.0
author: mdnkit
tags: [migration, refactoring, implementation, {{projectName}}]
---

# mdnkit-migrate Skill

## Purpose
This skill enables Bob to execute migration tasks from the implementation plan for **{{projectName}}**, refactoring legacy code to modern patterns while maintaining all functionality.

## Project Context

- **Project Name**: {{projectName}}
- **Migration Plan**: {{planFile}}
- **Current Phase**: {{currentPhase}}
- **Tasks Completed**: {{tasksCompleted}}/{{totalTasks}}
- **Progress**: {{progressPercentage}}%

## When to Use This Skill

- After creating implementation plan with mdnkit-plan
- To execute specific migration tasks
- To refactor legacy code to modern patterns
- To implement new architecture incrementally

## Prerequisites

- Completed **mdnkit-plan** with MIGRATION_PLAN.md file
- Understanding of the task to be implemented
- Access to both legacy and target codebases
- Tests in place (or ready to write)

## Input Parameters

### Required
- `plan_file` (string): Path to MIGRATION_PLAN.md
  - Current: `{{planFile}}`
- `task_id` (string): Task identifier to implement
  - Format: "phase.task" (e.g., "1.1", "2.3")
  - Current task: `{{currentTaskId}}`

### Optional
- `dry_run` (boolean): Preview changes without applying
  - Default: `false`
- `auto_test` (boolean): Run tests after migration
  - Default: `true`
- `backup` (boolean): Create backup before changes
  - Default: `true`

## Current Task Details

### Task {{currentTaskId}}: {{currentTaskTitle}}

**Priority**: {{currentTaskPriority}}  
**Estimated Time**: {{currentTaskEstimatedTime}}  
**Actual Time**: {{currentTaskActualTime}}  
**Status**: {{currentTaskStatus}}

**Description**:
{{currentTaskDescription}}

**Dependencies**:
{{#if currentTaskDependencies}}
{{#each currentTaskDependencies}}
- {{this}}
{{/each}}
{{else}}
None
{{/if}}

**Files Affected**:
{{#if currentTaskFiles}}
{{#each currentTaskFiles}}
- `{{this}}`
{{/each}}
{{else}}
To be determined during implementation
{{/if}}

## Execution Steps

When Bob invokes this skill for task {{currentTaskId}}, the following migration will be performed:

### Step 1: Load Task Details
```bash
# Read task from MIGRATION_PLAN.md
# Verify dependencies are completed
# Load current code for affected files
```
**Output**: Task context and requirements

### Step 2: Analyze Current Code
```bash
# Understand legacy implementation
# Identify patterns to replace
# Map data flow and dependencies
```
**Output**: Analysis of current implementation

### Step 3: Generate Modern Code
```bash
# Create equivalent modern implementation
# Follow target architecture patterns
# Maintain feature parity
```
**Output**: New code following modern patterns

### Step 4: Apply Changes
```bash
# Create backup if enabled
# Write new files or refactor existing ones
# Update imports and dependencies
```
**Output**: Modified codebase

### Step 5: Run Tests
```bash
# Execute unit tests
# Run integration tests
# Verify functionality
```
**Output**: Test results and coverage

### Step 6: Update Plan
```bash
# Mark task as completed in MIGRATION_PLAN.md
# Update progress tracking
# Note any issues or blockers
```
**Output**: Updated migration plan

## Migration Examples

### Example: jQuery to React Component

**Before (Legacy jQuery)**:
```javascript
// public/js/products.js
$(document).ready(function() {
  $.ajax({
    url: '/api/products',
    success: function(data) {
      var html = '';
      data.forEach(function(product) {
        html += '<div class="product">' + product.name + '</div>';
      });
      $('#products').html(html);
    },
    error: function(err) {
      $('#products').html('<div class="error">Failed to load products</div>');
    }
  });
});
```

**After (Modern React)**:
```typescript
// frontend/src/components/ProductList.tsx
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/productService';

export function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div className="error">Failed to load products</div>;

  return (
    <div className="products">
      {data?.map(product => (
        <div key={product.id} className="product">
          {product.name}
        </div>
      ))}
    </div>
  );
}
```

### Example: Callbacks to Async/Await

**Before (Callback Hell)**:
```javascript
// server.js
app.get('/api/user/:id', function(req, res) {
  db.getUser(req.params.id, function(err, user) {
    if (err) return res.status(500).json({ error: err.message });
    
    db.getUserPosts(user.id, function(err, posts) {
      if (err) return res.status(500).json({ error: err.message });
      
      db.getUserComments(user.id, function(err, comments) {
        if (err) return res.status(500).json({ error: err.message });
        
        res.json({ user, posts, comments });
      });
    });
  });
});
```

**After (Async/Await)**:
```typescript
// backend/src/routes/users.ts
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await db.getUser(req.params.id);
    const [posts, comments] = await Promise.all([
      db.getUserPosts(user.id),
      db.getUserComments(user.id)
    ]);
    
    res.json({ user, posts, comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Usage Examples

### Example 1: Execute Single Task
```markdown
Bob, use mdnkit-migrate to implement task 1.1 from the migration plan
```

**Bob's Actions**:
1. Load MIGRATION_PLAN.md
2. Find task 1.1 details
3. Analyze current code
4. Generate modern implementation
5. Apply changes
6. Run tests
7. Update plan with completion status

### Example 2: Dry Run
```markdown
Bob, use mdnkit-migrate with dry_run=true to preview changes for task 2.3
```

**Bob's Actions**:
1. Load task 2.3
2. Generate modern code
3. Show diff without applying
4. Present preview to user

### Example 3: Continue After Failure
```markdown
Bob, retry task 1.2 with mdnkit-migrate after fixing the test failures
```

**Bob's Actions**:
1. Load task 1.2
2. Check previous attempt notes
3. Apply fixes
4. Re-run tests
5. Update plan

## Migration Report

After completing task {{currentTaskId}}, this skill generates:

```markdown
# Migration Report: Task {{currentTaskId}} - {{currentTaskTitle}}

## Task Details
- **Task ID**: {{currentTaskId}}
- **Description**: {{currentTaskDescription}}
- **Estimated Time**: {{currentTaskEstimatedTime}}
- **Actual Time**: {{actualTime}}
- **Status**: ✅ Completed

## Changes Made

### Files Created
{{#each filesCreated}}
{{@index}}. `{{this}}` ({{lineCount}} lines)
{{/each}}

### Files Modified
{{#each filesModified}}
{{@index}}. `{{this}}`
{{/each}}

### Files Deleted
{{#each filesDeleted}}
{{@index}}. `{{this}}` (legacy code)
{{/each}}

## Code Comparison

### Before (Legacy)
```{{legacyLanguage}}
{{legacyCode}}
```

### After (Modern)
```{{modernLanguage}}
{{modernCode}}
```

## Test Results
- ✅ Unit tests: {{unitTestsPassed}}/{{unitTestsTotal}} passed
- ✅ Integration tests: {{integrationTestsPassed}}/{{integrationTestsTotal}} passed
- ✅ E2E tests: {{e2eTestsPassed}}/{{e2eTestsTotal}} passed
- ✅ Coverage: {{coverage}}%

## Performance Impact
{{#each performanceImpact}}
- **{{metric}}**: {{before}} → {{after}} ({{improvement}})
{{/each}}

## Next Steps
- [ ] Update plan file to mark task {{currentTaskId}} as complete
- [ ] Proceed to task {{nextTaskId}}
- [ ] Monitor production metrics

---

**Migration completed successfully** ✅
```

## Integration with Other Skills

### Before mdnkit-migrate
1. **mdnkit-analysis**: Understand the codebase
2. **mdnkit-architecture**: Design target architecture
3. **mdnkit-plan**: Create implementation plan

### During mdnkit-migrate
1. **mdnkit-test**: Generate tests for migrated code
   ```markdown
   Bob, use mdnkit-test to generate tests for the ProductList component
   ```

### After mdnkit-migrate
1. **mdnkit-test**: Verify migrated code
   ```markdown
   Bob, run tests for task {{currentTaskId}} with mdnkit-test
   ```

2. **mdnkit-plan**: Update progress
   ```markdown
   Bob, update the migration plan to mark task {{currentTaskId}} as completed
   ```

## Success Criteria

- [x] Task {{currentTaskId}} implemented correctly
- [x] All tests passing
- [x] Code follows modern best practices
- [x] Performance maintained or improved
- [x] Plan file updated with completion status
- [ ] Ready for next task

## Error Handling

### Common Errors

**Error**: `Task dependencies not completed`
- **Cause**: Trying to implement task before dependencies
- **Solution**: Complete dependency tasks first

**Error**: `Tests failing after migration`
- **Cause**: Functionality changed or tests need updating
- **Solution**: Review changes, update tests if needed

**Error**: `Merge conflicts`
- **Cause**: Files modified by multiple tasks
- **Solution**: Resolve conflicts manually, re-run migration

**Error**: `Plan file not found`
- **Cause**: MIGRATION_PLAN.md doesn't exist
- **Solution**: Run mdnkit-plan first

## Best Practices

1. **One Task at a Time**: Complete and test each task before moving to next
2. **Backup First**: Always create backup before major changes
3. **Test Thoroughly**: Run all tests after each migration
4. **Update Plan**: Mark tasks as completed immediately
5. **Document Issues**: Note any blockers or deviations in plan

## Rollback Procedure

If migration fails or causes issues:

```bash
# 1. Restore from backup
git checkout -- <affected-files>

# 2. Mark task as failed in plan
# Update MIGRATION_PLAN.md with failure notes

# 3. Analyze failure
# Review error messages and test failures

# 4. Fix issues
# Address root cause

# 5. Retry migration
# Use mdnkit-migrate again with fixes
```

## Next Steps

1. ✅ Task {{currentTaskId}} completed
2. ⏭️ Update MIGRATION_PLAN.md
3. ⏭️ Proceed to task {{nextTaskId}}
4. ⏭️ Continue until all tasks completed

---

**Migration Status**: {{currentTaskStatus}}  
**Completed**: {{tasksCompleted}}/{{totalTasks}} tasks  
**Progress**: {{progressPercentage}}%  
**Next Task**: {{nextTaskId}}