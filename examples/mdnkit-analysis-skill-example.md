---
name: mdnkit-analysis
description: Analyzes legacy codebases to identify technical debt, legacy patterns, and modernization opportunities
version: 1.0.0
author: mdnkit
tags: [analysis, legacy, modernization, technical-debt]
---

# mdnkit-analysis Skill

## Purpose
This skill enables Bob to perform comprehensive analysis of legacy JavaScript/TypeScript applications, identifying outdated patterns, technical debt, and providing actionable modernization recommendations.

## When to Use This Skill
- When encountering a legacy codebase that needs modernization
- Before starting a modernization project to understand scope
- To identify technical debt and prioritize refactoring efforts
- To generate a baseline assessment for modernization planning

## Prerequisites
- Access to the legacy project source code
- Node.js 18+ installed
- Read permissions for all project files

## Input Parameters

### Required
- `source_path` (string): Path to the legacy project root directory
  - Example: `./examples/jquery-app`
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

## Execution Steps

### Step 1: Scan Project Structure
```bash
# Bob will execute internally:
mdnkit scan --source-path <source_path>
```
**Output**: File inventory with categorization (JS, TS, JSX, TSX, config files)

### Step 2: Analyze Dependencies
```bash
# Bob will check:
- package.json for outdated dependencies
- Detect framework versions (jQuery, AngularJS, Express, etc.)
- Identify security vulnerabilities
```
**Output**: Dependency report with upgrade paths

### Step 3: Detect Legacy Patterns
```bash
# Bob will scan for:
- jQuery usage ($(), jQuery())
- Callback-based code (function(err, data))
- var declarations
- CommonJS (require/module.exports)
- AngularJS patterns ($scope, $http)
- Global variables
- Inline SQL queries
```
**Output**: Pattern detection report with file locations and line numbers

### Step 4: Calculate Complexity
```bash
# Bob will measure:
- Cyclomatic complexity per file
- Lines of code
- Function length
- Nesting depth
```
**Output**: Complexity metrics with hotspots

### Step 5: Generate Recommendations
```bash
# Bob will provide:
- Prioritized modernization tasks
- Estimated effort (hours/days)
- Risk assessment
- Suggested migration paths
```
**Output**: Actionable modernization roadmap

## Output Format

The skill generates a structured analysis report in the following format:

```json
{
  "project": {
    "name": "legacy-app",
    "path": "./examples/jquery-app",
    "totalFiles": 45,
    "totalLines": 15000
  },
  "frameworks": {
    "frontend": { "name": "jQuery", "version": "2.1.4", "status": "legacy" },
    "backend": { "name": "Express", "version": "3.21.2", "status": "outdated" }
  },
  "legacyPatterns": {
    "jquery": { "count": 127, "files": ["public/js/products.js", "..."] },
    "callbacks": { "count": 43, "files": ["server.js", "routes/api.js"] },
    "var": { "count": 89, "files": ["..."] }
  },
  "issues": [
    {
      "severity": "HIGH",
      "type": "jquery",
      "file": "public/js/products.js",
      "line": 15,
      "message": "jQuery usage detected",
      "recommendation": "Replace with fetch API or modern framework"
    }
  ],
  "recommendations": [
    {
      "priority": "HIGH",
      "task": "Upgrade Express 3.x to 5.x",
      "effort": "4 hours",
      "risk": "MEDIUM"
    }
  ]
}
```

## Usage Examples

### Example 1: Quick Analysis
```markdown
Bob, use the mdnkit-analysis skill to analyze the project at ./examples/jquery-app with quick depth.
```

**Bob's Actions**:
1. Invoke mdnkit-analysis skill
2. Scan ./examples/jquery-app
3. Generate quick analysis report
4. Present findings to user

### Example 2: Deep Security Analysis
```markdown
Bob, analyze ./legacy-ecommerce using mdnkit-analysis, focusing on security and dependencies.
```

**Bob's Actions**:
1. Invoke mdnkit-analysis skill with focus=["security", "dependencies"]
2. Scan for security vulnerabilities
3. Check all dependencies for CVEs
4. Generate security-focused report

### Example 3: Full Modernization Assessment
```markdown
Bob, perform a comprehensive analysis of ./old-dashboard to prepare for modernization.
```

**Bob's Actions**:
1. Invoke mdnkit-analysis skill with depth=deep
2. Analyze all aspects (patterns, dependencies, complexity, security)
3. Generate detailed modernization roadmap
4. Create prioritized task list

## Integration with Other Skills

This skill works in conjunction with:

1. **mdnkit-architecture**: Use analysis results to design modern architecture
   ```markdown
   Bob, after analyzing with mdnkit-analysis, use mdnkit-architecture to design the new system.
   ```

2. **mdnkit-migrate**: Use analysis to guide step-by-step migration
   ```markdown
   Bob, based on mdnkit-analysis results, use mdnkit-migrate to start modernizing the jQuery code.
   ```

3. **mdnkit-test**: Generate tests based on detected patterns
   ```markdown
   Bob, use mdnkit-analysis findings to create tests with mdnkit-test before refactoring.
   ```

## Error Handling

### Common Errors

**Error**: `Source path not found`
- **Cause**: Invalid source_path parameter
- **Solution**: Verify path exists and is accessible

**Error**: `Not a JavaScript/TypeScript project`
- **Cause**: No package.json or JS/TS files found
- **Solution**: Ensure you're pointing to a valid project root

**Error**: `Permission denied`
- **Cause**: Insufficient file read permissions
- **Solution**: Check file permissions or run with appropriate access

## Performance Considerations

- **Small projects** (<100 files): ~5 seconds
- **Medium projects** (100-1000 files): ~30 seconds
- **Large projects** (1000+ files): ~2-5 minutes

For very large projects, consider using `depth=quick` for initial assessment.

## Skill Metadata

```yaml
skill_type: analysis
category: modernization
complexity: medium
estimated_time: 5-300 seconds
requires_user_input: false
modifies_files: false
generates_output: true
```

## Version History

- **1.0.0** (2026-05-02): Initial release
  - Basic pattern detection
  - Dependency analysis
  - Framework detection
  - Complexity metrics

## Related Documentation

- [mdnkit Architecture](../mdnkit-architecture/SKILL.md)
- [mdnkit Migration Guide](../mdnkit-migrate/SKILL.md)
- [Legacy Pattern Reference](../../docs/LEGACY_PATTERNS.md)

---

**Note**: This skill is designed to be invoked by Bob or other AI agents. It provides structured, actionable analysis that can be used to make informed modernization decisions.