# AGENTS.md

> **Instructions and context for AI coding agents working on mdnkit**

This document provides the essential context, conventions, and guidelines that AI coding agents (including IBM Bob) need to effectively work on the mdnkit project.

---

## Project Overview

**mdnkit** is an AI-powered legacy application modernization toolkit designed to analyze legacy JavaScript/TypeScript applications and generate IBM Bob Skills files for automated modernization.

**Core Purpose**: Bridge the gap between legacy codebases and modern architectures by creating structured, actionable modernization plans that AI agents can execute.

**Target Users**: Development teams modernizing legacy Node.js, jQuery, AngularJS 1.x, and callback-based applications.

---

## ⚠️ CRITICAL SAFETY RULES

### File System Access Restrictions

**NEVER access, read, write, or modify files outside these approved locations:**

1. ✅ **Current Workspace**: `c:/Users/ASUS/works/expertise/ibm-bob-hackathon/`
2. ✅ **Test Directory**: `c:/Users/ASUS/works/expertise/test-legacy-apps/`
3. ✅ **Workspace Subdirectories**: Any directory within the workspace (examples/, tests/, src/, etc.)

**FORBIDDEN locations (NEVER touch these):**
- ❌ User's Desktop (`C:/Users/ASUS/Desktop`)
- ❌ User's Documents
- ❌ User's Downloads
- ❌ System directories
- ❌ Any location outside workspace and test-legacy-apps

### Testing Guidelines

**For testing external path copy functionality:**
1. Use `c:/Users/ASUS/works/expertise/test-legacy-apps/` as the external test path
2. Create test fixtures in `examples/` directory within workspace
3. Use temporary test directories within workspace for unit tests
4. NEVER use real user directories (Desktop, Documents, etc.) for testing

### Safe Test Paths

```bash
# ✅ SAFE: Test with workspace examples
mdnkit init --source-path ./examples/test-legacy-app

# ✅ SAFE: Create temp test dirs in workspace
mkdir -p ./test-temp/sample-app
mdnkit init --source-path ./test-temp/sample-app

# ❌ FORBIDDEN: Never use user directories
mdnkit init --source-path C:/Users/ASUS/Desktop  # NEVER DO THIS
```

### Consequences of Violations

Breaking these rules can:
- Copy sensitive user files to the project
- Expose private data in git commits
- Violate user privacy and trust
- Create security vulnerabilities

**If you need to test with external paths, ALWAYS use the designated test directory.**


---

## Project Structure

```
mdnkit/
├── src/                    # Source code (to be created)
│   ├── cli.js             # CLI entry point
│   ├── scanner.js         # File scanner
│   ├── analyzer.js        # JS/TS analyzer
│   ├── detector.js        # Framework detector
│   ├── generator.js       # Bob Skills generator
│   ├── templates/         # Skill templates
│   └── utils.js           # Utilities
├── examples/              # Sample legacy apps (to be created)
│   ├── jquery-app/        # Legacy jQuery + Express
│   ├── angularjs-app/     # AngularJS 1.x
│   └── callback-hell-app/ # Node.js callbacks
├── tests/                 # Test files (to be created)
├── .bob/                  # Bob workspace
│   └── skills/            # Generated skills directory
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md
│   ├── HACKATHON_MVP_PLAN.md
│   └── TECHNICAL_REFERENCE.md
├── AGENTs.md              # This file
├── README.md              # User-facing documentation
└── package.json           # Dependencies (to be created)
```

---

## Technology Stack

### Runtime & Language
- **Node.js 18+** - Core runtime
- **JavaScript (ES6+)** - Implementation language (no TypeScript for MVP speed)

### Core Dependencies
```json
{
  "commander": "^11.0.0",      // CLI framework
  "@babel/parser": "^7.23.0",  // JS/TS AST parsing
  "fast-glob": "^3.3.0",       // File scanning
  "fs-extra": "^11.0.0",       // File operations
  "chalk": "^5.3.0",           // Terminal colors
  "ora": "^7.0.0",             // Progress spinners
  "semver": "^7.5.0"           // Version comparison
}
```

### Development Dependencies
```json
{
  "vitest": "^1.0.0"           // Testing framework
}
```

---

## Build & Development

### Initial Setup
```bash
# Initialize project (if not done)
npm init -y

# Install dependencies
npm install commander @babel/parser fast-glob fs-extra chalk ora semver

# Install dev dependencies
npm install -D vitest

# Create directory structure
mkdir -p src/templates examples tests .bob/skills
```

### Development Workflow
```bash
# Run CLI locally
node src/cli.js init --source-path ./examples/jquery-app

# Run tests
npm test

# Test with npx (requires npm link first)
npm link
npx mdnkit init --source-path ./examples/jquery-app
```

### Testing Strategy
- **Unit Tests**: Test individual functions (scanner, analyzer, detector)
- **Integration Tests**: Test full workflow (init command end-to-end)
- **Fixture Tests**: Test with sample legacy apps
- **Target Coverage**: 70%+ (MVP), 80%+ (production)

---

## Code Conventions

### File Naming
- Use kebab-case for files: `file-scanner.js`, `skill-generator.js`
- Use PascalCase for classes: `class SkillGenerator {}`
- Use camelCase for functions: `function analyzeFile() {}`

### Code Style
```javascript
// Use modern JavaScript features
const files = await scanFiles(path);

// Prefer async/await over callbacks
async function analyzeProject(sourcePath) {
  const files = await scanFiles(sourcePath);
  const analysis = await analyzeFiles(files);
  return analysis;
}

// Use destructuring
const { name, version, dependencies } = packageJson;

// Use template literals
const message = `Analyzing ${fileCount} files...`;

// Use arrow functions for callbacks
files.map(file => analyzeFile(file));
```

### Error Handling
```javascript
// Always use try-catch for async operations
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error(chalk.red(`Error: ${error.message}`));
  // Continue with graceful degradation
  return defaultValue;
}

// Validate inputs
function analyzeFile(filePath) {
  if (!filePath) {
    throw new Error('File path is required');
  }
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  // ... proceed with analysis
}
```

### Comments
```javascript
// Use JSDoc for functions
/**
 * Analyzes a JavaScript file for legacy patterns
 * @param {string} filePath - Path to the file
 * @param {Object} options - Analysis options
 * @returns {Promise<Object>} Analysis results
 */
async function analyzeFile(filePath, options = {}) {
  // Implementation
}

// Use inline comments for complex logic
// Detect jQuery usage by checking for $ or jQuery identifiers
const hasJQuery = /\$\(|jQuery\(/.test(code);
```

---

## Key Implementation Details

### 1. File Scanner (`src/scanner.js`)

**Purpose**: Scan project directory and categorize files

**Key Functions**:
```javascript
async function scanFiles(sourcePath, options = {}) {
  // Use fast-glob to find all JS/TS files
  // Exclude node_modules, dist, build
  // Return categorized file list
}

function categorizeFiles(files) {
  // Group by extension: .js, .ts, .jsx, .tsx
  // Identify entry points (index.js, server.js, app.js)
  // Count lines of code
}
```

**Output Format**:
```javascript
{
  files: {
    javascript: ['src/app.js', 'src/utils.js'],
    typescript: ['src/types.ts'],
    jsx: ['src/components/App.jsx'],
    tsx: ['src/components/Button.tsx']
  },
  stats: {
    totalFiles: 45,
    totalLines: 15000,
    entryPoints: ['src/index.js', 'server.js']
  }
}
```

### 2. Analyzer (`src/analyzer.js`)

**Purpose**: Analyze JavaScript/TypeScript files for legacy patterns

**Key Functions**:
```javascript
async function analyzeFile(filePath) {
  const code = await fs.readFile(filePath, 'utf-8');
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  
  return {
    legacyPatterns: detectLegacyPatterns(ast, code),
    modernPatterns: detectModernPatterns(ast, code),
    complexity: calculateComplexity(ast),
    imports: extractImports(ast)
  };
}

function detectLegacyPatterns(ast, code) {
  return {
    jquery: /\$\(|jQuery\(/.test(code),
    callbacks: /function\s*\(\s*err\s*,/.test(code),
    var: /\bvar\s+\w+/.test(code),
    commonjs: /require\(|module\.exports/.test(code),
    angularjs: /angular\.module|\$scope|\$http/.test(code)
  };
}
```

**Output Format**:
```javascript
{
  file: 'src/app.js',
  legacyPatterns: {
    jquery: true,
    callbacks: true,
    var: true,
    commonjs: true,
    angularjs: false
  },
  modernPatterns: {
    asyncAwait: false,
    esm: false,
    letConst: false,
    typescript: false
  },
  complexity: 15,
  issues: [
    {
      type: 'legacy-pattern',
      pattern: 'jquery',
      line: 10,
      suggestion: 'Replace jQuery with modern DOM APIs or React'
    }
  ]
}
```

### 3. Framework Detector (`src/detector.js`)

**Purpose**: Detect frameworks and libraries used in the project

**Key Functions**:
```javascript
async function detectFrameworks(sourcePath, packageJson) {
  const frameworks = {
    frontend: detectFrontendFramework(packageJson, sourcePath),
    backend: detectBackendFramework(packageJson, sourcePath),
    buildTool: detectBuildTool(packageJson, sourcePath),
    testing: detectTestingFramework(packageJson)
  };
  
  return frameworks;
}

function detectFrontendFramework(packageJson, sourcePath) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  if (deps.jquery) return { name: 'jQuery', version: deps.jquery };
  if (deps.angular && !deps['@angular/core']) return { name: 'AngularJS', version: deps.angular };
  if (deps.react) return { name: 'React', version: deps.react };
  if (deps.vue) return { name: 'Vue.js', version: deps.vue };
  
  // Check for framework-specific files
  if (fs.existsSync(path.join(sourcePath, 'angular.json'))) return { name: 'Angular', version: 'detected' };
  
  return { name: 'None', version: null };
}
```

### 4. Bob Skills Generator (`src/generator.js`)

**Purpose**: Generate IBM Bob Skills markdown files

**Key Functions**:
```javascript
async function generateSkills(analysis, architecture, plan, tasks) {
  await ensureDir('.bob/skills/analysis');
  await ensureDir('.bob/skills/architecture-design');
  await ensureDir('.bob/skills/implementation-plan');
  await ensureDir('.bob/skills/tasks');
  
  await generateAnalysisSkill(analysis);
  await generateArchitectureSkill(architecture);
  await generatePlanSkill(plan);
  await generateTasksSkill(tasks);
}

async function generateAnalysisSkill(analysis) {
  const content = renderTemplate('analysis', analysis);
  await fs.writeFile('.bob/skills/analysis/SKILL.md', content);
}
```

**Template Structure**:
Each template should include:
- Clear context and background
- Detailed findings with code examples
- Specific file paths and line numbers
- Actionable recommendations
- Mermaid diagrams where helpful

---

## Bob Skills Format

### Critical Requirements for Bob Skills

1. **Be Specific**: Include exact file paths, line numbers, and code snippets
2. **Provide Context**: Explain why changes are needed, not just what to change
3. **Show Examples**: Include before/after code examples
4. **Define Success**: Clear acceptance criteria for each task
5. **Order Tasks**: Specify dependencies and execution order

### Example Task Format

```markdown
## Task 1.1: Upgrade Express 3.x → 5.x

**Priority**: High  
**Estimated Time**: 2 hours  
**Dependencies**: None

**Description:**
Upgrade Express from 3.21.2 to 5.x. Express 5 has breaking changes that need to be addressed.

**Current Code** (`server.js:1-15`):
```javascript
var express = require('express');
var app = express();

app.configure(function() {
  app.use(express.bodyParser());
});
```

**Target Code:**
```javascript
import express from 'express';
const app = express();

app.use(express.json());
```

**Steps:**
1. Update package.json: `"express": "^5.0.0"`
2. Replace `app.configure()` with direct middleware
3. Replace `express.bodyParser()` with `express.json()`
4. Test all endpoints

**Acceptance Criteria:**
- [ ] Express 5.x installed and running
- [ ] All middleware updated
- [ ] All existing tests pass
- [ ] No deprecation warnings
```

---

## Sample Legacy Apps

### Purpose
Create 3 realistic legacy applications to test mdnkit and demonstrate its capabilities.

### App 1: jQuery E-commerce (`examples/jquery-app/`)

**Stack**: jQuery 2.1.4, Express 3.x, MySQL  
**Patterns**: jQuery DOM manipulation, callback-based routes, inline SQL

**Key Files**:
```
jquery-app/
├── server.js              # Express 3.x server with callbacks
├── package.json           # Old dependencies
├── public/
│   ├── index.html         # jQuery-heavy
│   ├── js/
│   │   ├── jquery.min.js
│   │   ├── products.js    # Product listing with $.ajax
│   │   └── cart.js        # Shopping cart
│   └── css/
│       └── style.css
└── routes/
    ├── products.js        # Callback-based routes
    └── orders.js
```

**Legacy Patterns to Include**:
- `$.ajax()` for API calls
- jQuery DOM manipulation (`$('#element').html()`)
- Callback-based Express routes
- Raw SQL queries
- `var` declarations
- No build system

### App 2: AngularJS Dashboard (`examples/angularjs-app/`)

**Stack**: AngularJS 1.5, Express 4.x, Gulp, Bower  
**Patterns**: AngularJS controllers, $scope, $http, Gulp build

**Key Files**:
```
angularjs-app/
├── server.js              # Express 4.x API
├── package.json
├── bower.json             # Bower dependencies
├── gulpfile.js            # Gulp build
├── app/
│   ├── index.html
│   ├── app.js             # AngularJS module
│   ├── controllers/
│   │   ├── dashboard.js   # $scope usage
│   │   └── users.js
│   ├── services/
│   │   └── api.js         # $http service
│   └── directives/
│       └── chart.js
└── api/
    └── routes.js
```

**Legacy Patterns to Include**:
- `angular.module()` definition
- `$scope` for data binding
- `$http` for API calls
- `$q` for promises
- Bower for dependencies
- Gulp for build

### App 3: Callback Hell API (`examples/callback-hell-app/`)

**Stack**: Express 4.x, MongoDB native driver, nested callbacks  
**Patterns**: Pyramid of doom, no async/await, no error handling

**Key Files**:
```
callback-hell-app/
├── server.js              # Express 4.x
├── package.json
├── routes/
│   ├── users.js           # Nested callbacks (5+ levels)
│   └── posts.js
├── models/
│   ├── user.js            # MongoDB callbacks
│   └── post.js
└── utils/
    └── db.js              # Connection with callbacks
```

**Legacy Patterns to Include**:
- Nested callbacks (pyramid of doom)
- No async/await
- MongoDB native driver with callbacks
- Poor error handling
- No TypeScript

---

## Testing Guidelines

### Unit Tests

Test individual functions in isolation:

```javascript
// tests/scanner.test.js
import { describe, it, expect } from 'vitest';
import { scanFiles, categorizeFiles } from '../src/scanner.js';

describe('File Scanner', () => {
  it('should scan JavaScript files', async () => {
    const files = await scanFiles('./examples/jquery-app');
    expect(files.javascript.length).toBeGreaterThan(0);
  });
  
  it('should exclude node_modules', async () => {
    const files = await scanFiles('./examples/jquery-app');
    const hasNodeModules = files.javascript.some(f => f.includes('node_modules'));
    expect(hasNodeModules).toBe(false);
  });
});
```

### Integration Tests

Test full workflows:

```javascript
// tests/integration.test.js
import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('CLI Integration', () => {
  it('should run init command successfully', () => {
    const output = execSync('node src/cli.js init --source-path ./examples/jquery-app', {
      encoding: 'utf-8'
    });
    expect(output).toContain('Analysis complete');
  });
  
  it('should generate Bob Skills files', () => {
    execSync('node src/cli.js init --source-path ./examples/jquery-app');
    expect(fs.existsSync('.bob/skills/analysis/SKILL.md')).toBe(true);
    expect(fs.existsSync('.bob/skills/tasks/SKILL.md')).toBe(true);
  });
});
```

---

## Common Pitfalls & Solutions

### 1. File Path Issues
**Problem**: Paths work on one OS but not another  
**Solution**: Always use `path.join()` and normalize paths
```javascript
const filePath = path.join(sourcePath, 'src', 'app.js');
```

### 2. Large File Handling
**Problem**: Running out of memory on large codebases  
**Solution**: Process files in batches, use streams
```javascript
const files = await scanFiles(sourcePath);
const batches = chunk(files, 100); // Process 100 files at a time
for (const batch of batches) {
  await Promise.all(batch.map(analyzeFile));
}
```

### 3. Parser Errors
**Problem**: @babel/parser fails on some files  
**Solution**: Wrap in try-catch, fallback to regex
```javascript
try {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  return analyzeAST(ast);
} catch (error) {
  console.warn(`Failed to parse ${filePath}, using regex fallback`);
  return analyzeWithRegex(code);
}
```

### 4. Outdated Dependencies
**Problem**: Detecting truly outdated vs intentionally old versions  
**Solution**: Check last publish date, not just version
```javascript
const isOutdated = (version, publishDate) => {
  const age = Date.now() - new Date(publishDate).getTime();
  const twoYears = 2 * 365 * 24 * 60 * 60 * 1000;
  return age > twoYears;
};
```

---

## Performance Targets

### MVP (Hackathon)
- Analyze 100 files in < 10 seconds
- Generate skills in < 5 seconds
- Memory usage < 200MB
- Support projects up to 10,000 lines

### Production (Future)
- Analyze 1,000 files in < 30 seconds
- Generate skills in < 10 seconds
- Memory usage < 500MB
- Support projects up to 100,000 lines

---

## Debugging Tips

### Enable Verbose Logging
```javascript
// Add --verbose flag to CLI
if (options.verbose) {
  console.log(chalk.gray(`Scanning: ${filePath}`));
  console.log(chalk.gray(`Found patterns: ${JSON.stringify(patterns)}`));
}
```

### Test Individual Components
```javascript
// Test scanner only
node -e "require('./src/scanner.js').scanFiles('./examples/jquery-app').then(console.log)"

// Test analyzer only
node -e "require('./src/analyzer.js').analyzeFile('./examples/jquery-app/public/js/products.js').then(console.log)"
```

### Inspect Generated Skills
```bash
# View generated skills
cat .bob/skills/analysis/SKILL.md
cat .bob/skills/tasks/SKILL.md

# Check file structure
tree .bob/skills
```

---

## Contributing Guidelines for Agents

When working on mdnkit:

1. **Read the Plan First**: Check [`docs/HACKATHON_MVP_PLAN.md`](docs/HACKATHON_MVP_PLAN.md) for current priorities
2. **Follow the Timeline**: Respect the hour-by-hour implementation plan
3. **Test Incrementally**: Test each component as you build it
4. **Focus on Skills Quality**: The Bob Skills templates are the most important part
5. **Keep It Simple**: This is an MVP - avoid over-engineering
6. **Document Decisions**: Add comments explaining non-obvious choices
7. **Update This File**: If you discover new conventions or patterns, update AGENTS.md

---

## Quick Reference

### Most Important Files
1. `docs/HACKATHON_MVP_PLAN.md` - Implementation roadmap
2. `src/templates/` - Bob Skills templates (critical!)
3. `examples/` - Sample legacy apps for testing
4. `src/cli.js` - Entry point

### Most Important Functions
1. `scanFiles()` - File discovery
2. `analyzeFile()` - Pattern detection
3. `detectFrameworks()` - Framework identification
4. `generateSkills()` - Bob Skills generation

### Most Important Patterns to Detect
1. jQuery usage
2. Callback-based code
3. AngularJS patterns
4. CommonJS vs ESM
5. Outdated dependencies

---

## Questions or Issues?

If you encounter issues or need clarification:

1. Check [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for detailed design
2. Check [`docs/HACKATHON_MVP_PLAN.md`](docs/HACKATHON_MVP_PLAN.md) for implementation details
3. Review sample legacy apps in `examples/`
4. Test with the provided sample apps first
5. Ask for human review if uncertain

---

**Last Updated**: 2026-05-02  
**Version**: 1.0 (Hackathon MVP)  
**Status**: Ready for Implementation