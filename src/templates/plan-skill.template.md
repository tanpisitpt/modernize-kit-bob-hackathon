---
name: mdnkit-plan
description: Generates detailed implementation plan with trackable tasks for modernizing {{projectName}}
version: 1.0.0
author: mdnkit
tags: [planning, migration, tasks, tracking, {{projectName}}]
---

# mdnkit-plan Skill

## Purpose
This skill enables Bob to generate a detailed, trackable implementation plan for modernizing **{{projectName}}**. The plan includes phased tasks with checkboxes that Bob can update as work progresses.

## Project Context

- **Project Name**: {{projectName}}
- **Start Date**: {{startDate}}
- **Estimated Duration**: {{estimatedDuration}}
- **Total Tasks**: {{totalTasks}}
- **Total Phases**: {{totalPhases}}

## When to Use This Skill

- After completing mdnkit-analysis and mdnkit-architecture
- When you need a detailed, step-by-step migration roadmap
- To track progress during modernization
- To coordinate work across team members

## Prerequisites

- Completed **mdnkit-analysis** for {{projectName}}
- Completed **mdnkit-architecture** with target stack defined
- Understanding of project requirements and constraints

## Input Parameters

### Required
- `architecture_design` (object): Output from mdnkit-architecture
- `analysis_results` (object): Output from mdnkit-analysis

### Optional
- `output_file` (string): Plan filename
  - Default: `MIGRATION_PLAN.md`
- `task_granularity` (string): Task size
  - Options: `coarse`, `medium`, `fine`
  - Default: `medium`
- `include_estimates` (boolean): Include time estimates
  - Default: `true`

## Execution Steps

When Bob invokes this skill, the following plan generation will be performed:

### Step 1: Break Down Architecture
```bash
# Convert architecture design into implementable tasks
# Group related tasks into phases
# Identify logical milestones
```
**Output**: Task hierarchy with {{totalTasks}} tasks across {{totalPhases}} phases

### Step 2: Identify Dependencies
```bash
# Map task dependencies
# Identify prerequisites
# Determine execution order
```
**Output**: Dependency graph showing task relationships

### Step 3: Prioritize Tasks
```bash
# Order by risk and impact
# Consider dependencies
# Balance quick wins with foundational work
```
**Output**: Prioritized task list

### Step 4: Estimate Effort
```bash
# Calculate time estimates per task
# Consider complexity and risk
# Add buffer for unknowns
```
**Output**: Time estimates totaling {{estimatedDuration}}

### Step 5: Generate Checklist
```bash
# Create markdown file with checkboxes
# Include task details and acceptance criteria
# Add progress tracking section
```
**Output**: `MIGRATION_PLAN.md` with trackable tasks

## Generated Migration Plan

This skill will generate a `MIGRATION_PLAN.md` file with the following structure:

```markdown
# {{projectName}} Modernization Plan

## Project Overview
- **Project**: {{projectName}}
- **Start Date**: {{startDate}}
- **Estimated Duration**: {{estimatedDuration}}
- **Total Tasks**: {{totalTasks}}

{{#each phases}}
## Phase {{number}}: {{name}} ({{duration}})

{{#each tasks}}
### {{id}} {{title}}
**Priority**: {{priority}}  
**Estimated Time**: {{estimatedTime}}  
**Dependencies**: {{#each dependencies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

- [ ] {{description}}

**Acceptance Criteria**:
{{#each acceptanceCriteria}}
- [ ] {{this}}
{{/each}}

{{/each}}
{{/each}}

## Progress Tracking

### Overall Progress
- Total Tasks: {{totalTasks}}
- Completed: 0
- In Progress: 0
- Remaining: {{totalTasks}}
- Completion: 0%

### Phase Status
{{#each phases}}
- [ ] Phase {{number}}: {{name}} (0/{{taskCount}} tasks)
{{/each}}

## Risk Management

{{#each risks}}
### {{severity}} Risk: {{title}}
- **Description**: {{description}}
- **Mitigation**: {{mitigation}}

{{/each}}

## Success Metrics
{{#each successMetrics}}
- [ ] {{this}}
{{/each}}
```

## Migration Phases

{{#each phases}}
### Phase {{number}}: {{name}}
**Duration**: {{duration}}  
**Tasks**: {{taskCount}}

{{#each tasks}}
#### Task {{id}}: {{title}}
- **Priority**: {{priority}}
- **Effort**: {{estimatedTime}}
- **Dependencies**: {{#if dependencies}}{{#each dependencies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}

{{/each}}

{{/each}}

## Usage Examples

### Example 1: Generate Plan
```markdown
Bob, use mdnkit-plan to create an implementation plan for {{projectName}}
```

**Bob's Actions**:
1. Load analysis and architecture results
2. Break down architecture into tasks
3. Generate MIGRATION_PLAN.md
4. Present plan overview to user

### Example 2: Update Plan Progress
```markdown
Bob, update the migration plan - mark task 1.1 as completed
```

**Bob's Actions**:
1. Read MIGRATION_PLAN.md
2. Find task 1.1
3. Change `[ ]` to `[x]`
4. Update progress tracking section
5. Save updated plan

### Example 3: Review Plan Status
```markdown
Bob, show me the current status of the migration plan
```

**Bob's Actions**:
1. Read MIGRATION_PLAN.md
2. Count completed vs remaining tasks
3. Calculate completion percentage
4. Present summary to user

## Integration with Other Skills

### Before mdnkit-plan
1. **mdnkit-analysis**: Analyze the legacy codebase
   ```markdown
   Bob, analyze {{projectName}} with mdnkit-analysis
   ```

2. **mdnkit-architecture**: Design modern architecture
   ```markdown
   Bob, design architecture for {{projectName}} with mdnkit-architecture
   ```

### After mdnkit-plan
1. **mdnkit-migrate**: Execute migration tasks
   ```markdown
   Bob, use mdnkit-migrate to implement task 1.1 from the plan
   ```

2. **mdnkit-test**: Generate tests for migrated code
   ```markdown
   Bob, use mdnkit-test to generate tests for the migrated features
   ```

## Output Format

The skill generates a `MIGRATION_PLAN.md` file at the project root with:

- **Frontmatter**: Project metadata
- **Phase Breakdown**: Tasks organized by phase
- **Task Details**: Description, estimates, dependencies, acceptance criteria
- **Progress Tracking**: Real-time completion status
- **Risk Management**: Identified risks and mitigations
- **Success Metrics**: Measurable goals

## Task Tracking

Bob can update task status in the plan:

```markdown
# Before
- [ ] Task 1.1: Set up project structure

# After (completed)
- [x] Task 1.1: Set up project structure

# After (in progress)
- [-] Task 1.1: Set up project structure
```

Progress tracking section auto-updates based on checkbox status.

## Risk Management

{{#each risks}}
### {{severity}} Risk: {{title}}
**Description**: {{description}}

**Mitigation Strategy**:
{{mitigation}}

{{/each}}

## Success Criteria

{{#each successMetrics}}
- [ ] {{this}}
{{/each}}

## Performance Metrics

- **Plan Generation Time**: ~{{planGenerationTime}} seconds
- **Total Tasks**: {{totalTasks}}
- **Total Phases**: {{totalPhases}}
- **Estimated Duration**: {{estimatedDuration}}

## Error Handling

### Common Errors

**Error**: `Architecture design not found`
- **Cause**: mdnkit-architecture not run first
- **Solution**: Run mdnkit-architecture before mdnkit-plan

**Error**: `Analysis results missing`
- **Cause**: mdnkit-analysis not completed
- **Solution**: Run mdnkit-analysis first

**Error**: `Invalid task granularity`
- **Cause**: Unsupported granularity option
- **Solution**: Use `coarse`, `medium`, or `fine`

## Best Practices

1. **Review Before Starting**: Review the entire plan before beginning work
2. **Update Regularly**: Mark tasks as completed immediately
3. **Track Blockers**: Note any blockers in task descriptions
4. **Adjust Estimates**: Update time estimates based on actual progress
5. **Communicate Changes**: Share plan updates with team

## Next Steps

1. ✅ Plan generated for {{projectName}}
2. ⏭️ Review all phases and tasks
3. ⏭️ Use **mdnkit-migrate** to start implementing tasks
4. ⏭️ Update plan as work progresses
5. ⏭️ Use **mdnkit-test** to verify migrated code

---

**Plan Status**: ✅ Generated  
**Generated**: {{startDate}}  
**Ready for**: Implementation Phase  
**Output File**: `MIGRATION_PLAN.md`