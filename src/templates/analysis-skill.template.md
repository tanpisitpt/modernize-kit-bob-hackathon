---
name: mdnkit-analysis
description: Analyzes {{projectName}} legacy codebase to identify technical debt, legacy patterns, and modernization opportunities
version: 1.0.0
author: mdnkit
tags: [analysis, legacy, modernization, technical-debt, {{projectName}}]
---

# mdnkit-analysis Skill

## Purpose
This skill enables Bob to perform comprehensive analysis of the **{{projectName}}** legacy application, identifying outdated patterns, technical debt, and providing actionable modernization recommendations.

## Project Context

- **Project Name**: {{projectName}}
- **Project Path**: {{projectPath}}
- **Total Files**: {{totalFiles}}
- **Total Lines of Code**: {{totalLines}}
- **Analysis Date**: {{analysisDate}}

## When to Use This Skill

- When you need to understand the current state of {{projectName}}
- Before planning modernization efforts
- To identify technical debt and prioritize refactoring
- To generate a baseline assessment for the modernization project

## Prerequisites

- Access to the {{projectName}} source code at `{{projectPath}}`
- Node.js 18+ installed
- Read permissions for all project files

## Input Parameters

### Required
- `source_path` (string): Path to the legacy project root
  - Current: `{{projectPath}}`
  - Must contain package.json or be a valid JavaScript/TypeScript project

### Optional
- `output_path` (string): Where to save analysis results
  - Default: `./.bob/skills/analysis-results/`
- `depth` (string): Analysis depth level
  - Options: `quick`, `standard`, `deep`
  - Default: `standard`
- `focus` (array): Specific areas to analyze
  - Options: `["dependencies", "patterns", "security", "performance"]`
  - Default: All areas

## Detected Technology Stack

### Frontend Framework
- **Name**: {{frontendName}}
- **Version**: {{frontendVersion}}
- **Status**: {{frontendStatus}}
{{#if frontendModernization}}
- **Modernization Path**: {{frontendModernization}}
{{/if}}

### Backend Framework
- **Name**: {{backendName}}
- **Version**: {{backendVersion}}
- **Status**: {{backendStatus}}
{{#if backendModernization}}
- **Modernization Path**: {{backendModernization}}
{{/if}}

### Build Tool
- **Name**: {{buildToolName}}
- **Version**: {{buildToolVersion}}
- **Status**: {{buildToolStatus}}
{{#if buildToolModernization}}
- **Modernization Path**: {{buildToolModernization}}
{{/if}}

## Legacy Patterns Detected

{{#each legacyPatterns}}
### {{@key}}
- **Occurrences**: {{this.count}}
- **Files Affected**:
{{#each this.files}}
  - `{{this}}`
{{/each}}
{{/each}}

{{#unless legacyPatterns}}
✅ No legacy patterns detected in this project.
{{/unless}}

## Modern Patterns Detected

{{#each modernPatterns}}
### {{@key}}
- **Occurrences**: {{this.count}}
- **Files Using**:
{{#each this.files}}
  - `{{this}}`
{{/each}}
{{/each}}

{{#unless modernPatterns}}
⚠️ No modern patterns detected. This codebase needs significant modernization.
{{/unless}}

## Critical Issues

{{#each issues}}
### {{severity}}: {{pattern}}
- **File**: `{{file}}`
- **Type**: {{type}}
- **Message**: {{message}}
- **Recommendation**: {{recommendation}}

{{/each}}

{{#unless issues}}
✅ No critical issues detected.
{{/unless}}

## Execution Steps

When Bob invokes this skill, the following analysis will be performed:

### Step 1: Project Structure Scan
```bash
# Scan all JavaScript/TypeScript files
# Categorize by type (JS, TS, JSX, TSX)
# Identify entry points
```
**Output**: File inventory with {{totalFiles}} files

### Step 2: Dependency Analysis
```bash
# Analyze package.json
# Check for outdated dependencies
# Identify security vulnerabilities
# Detect framework versions
```
**Output**: Dependency report with upgrade recommendations

### Step 3: Legacy Pattern Detection
```bash
# Scan for jQuery usage
# Detect callback-based code
# Find var declarations
# Identify CommonJS modules
# Check for AngularJS patterns
```
**Output**: Pattern detection report with file locations

### Step 4: Complexity Calculation
```bash
# Measure cyclomatic complexity
# Count lines of code
# Analyze function length
# Check nesting depth
```
**Output**: Complexity metrics with hotspots

### Step 5: Generate Recommendations
```bash
# Prioritize modernization tasks
# Estimate effort (hours/days)
# Assess risk levels
# Suggest migration paths
```
**Output**: Actionable modernization roadmap

## Recommendations

{{#each recommendations}}
### {{priority}} Priority: {{task}}
- **Effort**: {{effort}}
- **Risk**: {{risk}}
{{#if description}}
- **Description**: {{description}}
{{/if}}

{{/each}}

## Usage Examples

### Example 1: Re-run Analysis
```markdown
Bob, use mdnkit-analysis to re-analyze {{projectName}} with deep depth
```

### Example 2: Focus on Security
```markdown
Bob, analyze {{projectName}} using mdnkit-analysis, focusing on security and dependencies
```

### Example 3: Quick Assessment
```markdown
Bob, perform a quick analysis of {{projectName}} with mdnkit-analysis
```

## Integration with Other Skills

After completing this analysis, proceed with:

1. **mdnkit-architecture**: Design modern architecture based on these findings
   ```markdown
   Bob, use mdnkit-architecture to design a modern system for {{projectName}}
   ```

2. **mdnkit-plan**: Create implementation plan
   ```markdown
   Bob, use mdnkit-plan to create a migration plan for {{projectName}}
   ```

## Output Format

This skill generates a structured analysis report containing:

```json
{
  "project": {
    "name": "{{projectName}}",
    "path": "{{projectPath}}",
    "totalFiles": {{totalFiles}},
    "totalLines": {{totalLines}}
  },
  "frameworks": {
    "frontend": { "name": "{{frontendName}}", "version": "{{frontendVersion}}", "status": "{{frontendStatus}}" },
    "backend": { "name": "{{backendName}}", "version": "{{backendVersion}}", "status": "{{backendStatus}}" }
  },
  "legacyPatterns": { /* pattern counts and files */ },
  "issues": [ /* list of issues */ ],
  "recommendations": [ /* prioritized recommendations */ ]
}
```

## Performance Metrics

- **Analysis Time**: ~{{analysisTime}} seconds
- **Files Scanned**: {{totalFiles}}
- **Patterns Detected**: {{totalPatterns}}

## Success Criteria

- [x] All files scanned successfully
- [x] Legacy patterns identified with file locations
- [x] Dependencies analyzed for vulnerabilities
- [x] Actionable recommendations generated
- [x] Results ready for architecture design phase

## Error Handling

### Common Errors

**Error**: `Source path not found`
- **Cause**: Invalid source_path parameter
- **Solution**: Verify `{{projectPath}}` exists and is accessible

**Error**: `Not a JavaScript/TypeScript project`
- **Cause**: No package.json or JS/TS files found
- **Solution**: Ensure you're pointing to a valid project root

**Error**: `Permission denied`
- **Cause**: Insufficient file read permissions
- **Solution**: Check file permissions for `{{projectPath}}`

## Next Steps

1. ✅ Analysis complete for {{projectName}}
2. ⏭️ Review findings and recommendations
3. ⏭️ Use **mdnkit-architecture** to design modern system
4. ⏭️ Use **mdnkit-plan** to create implementation roadmap

---

**Analysis Status**: ✅ Complete  
**Generated**: {{analysisDate}}  
**Ready for**: Architecture Design Phase