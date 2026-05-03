# mdnkit Hackathon MVP Plan (24-Hour Build)

> **Goal**: Create a working proof of concept that analyzes legacy Node.js/JS/TS apps and generates Bob Skills files

**Time Available**: ~20 hours (leaving 4 hours for testing and video)  
**Target**: Deliverable demo for hackathon judges  
**Focus**: JavaScript/TypeScript modernization (your real use case!)

---

## MVP Scope - What We're Building

### Core Features (Must Have)

1. ✅ **CLI Tool** - Basic `mdnkit init` command
2. ✅ **JavaScript/TypeScript Analyzer** - Analyze legacy JS/TS projects
3. ✅ **Framework Detection** - Detect Express, jQuery, AngularJS 1.x, etc.
4. ✅ **Dependency Analysis** - Parse package.json, detect outdated packages
5. ✅ **Bob Skills Generator** - Generate 4 SKILL.md files with **high-quality prompts**
6. ✅ **3 Sample Legacy Apps** - Realistic examples for demo
7. ✅ **Demo-Ready Output** - Professional markdown with diagrams

### What We're NOT Building (Future Work)

- ❌ PHP/Java/ASP.NET support (just JS/TS for MVP)
- ❌ Deep security scanning (basic vulnerability check only)
- ❌ Interactive prompts (use defaults/config file)
- ❌ Comprehensive testing (basic smoke tests only)
- ❌ Performance optimization (works for small-medium projects)

---

## Why JavaScript/TypeScript is Perfect for MVP

### Advantages

1. **Native Parsing** - Use Node.js built-in tools, no external parsers needed
2. **AST Analysis** - Can use `@babel/parser` or `typescript` compiler API
3. **Your Use Case** - Matches your real modernization needs
4. **Rich Ecosystem** - Easy to detect frameworks and patterns
5. **Fast Development** - We know the ecosystem well

### Common Legacy Patterns We'll Detect

- **jQuery** → Modern React/Vue
- **AngularJS 1.x** → Angular/React/Vue
- **Express 3.x/4.x** → Express 5.x or Fastify
- **CommonJS** → ESM modules
- **Callback Hell** → Async/await
- **Outdated Dependencies** → Latest versions
- **No TypeScript** → TypeScript migration

---

## Simplified Architecture

### Technology Stack (Minimal)

```json
{
  "dependencies": {
    "commander": "^11.0.0",      // CLI framework
    "@babel/parser": "^7.23.0",  // JS/TS parsing (lightweight)
    "fast-glob": "^3.3.0",       // File scanning
    "fs-extra": "^11.0.0",       // File operations
    "chalk": "^5.3.0",           // Terminal colors
    "ora": "^7.0.0",             // Spinners
    "semver": "^7.5.0"           // Version comparison
  }
}
```

**Key Addition**: `@babel/parser` - Perfect for analyzing JS/TS without heavy dependencies!

### Simplified Flow

```
User runs: mdnkit init --source-path /legacy-app
    ↓
1. Scan files (fast-glob) - Find .js, .ts, .jsx, .tsx
    ↓
2. Analyze package.json - Detect frameworks, outdated deps
    ↓
3. Parse JS/TS files (@babel/parser) - Detect patterns
    ↓
4. Detect legacy patterns (jQuery, callbacks, etc.)
    ↓
5. Generate Bob Skills with detailed prompts
    ↓
6. Output to .bob/skills/
```

---

## File Structure (Minimal)

```
mdnkit/
├── src/
│   ├── cli.js                   # CLI entry point
│   ├── scanner.js               # File scanner
│   ├── analyzer.js              # JS/TS analyzer
│   ├── detector.js              # Framework/pattern detector
│   ├── generator.js             # Bob Skills generator
│   ├── templates/               # Skill templates (THE MOST IMPORTANT!)
│   │   ├── analysis.js          # Analysis skill with context
│   │   ├── architecture.js      # Architecture recommendations
│   │   ├── plan.js              # Migration strategy
│   │   └── tasks.js             # Detailed tasks for Bob
│   └── utils.js                 # Utilities
├── examples/                    # 3 sample legacy apps
│   ├── jquery-app/              # Legacy jQuery + Express app
│   ├── angularjs-app/           # AngularJS 1.x app
│   └── callback-hell-app/       # Node.js with callbacks
├── package.json
├── README.md
└── .gitignore
```

**Total: ~10 files** + 3 sample apps

---

## Implementation Plan (20 Hours)

### Hour 1-2: Project Setup
- [x] Initialize npm project
- [x] Install dependencies (@babel/parser, commander, etc.)
- [x] Set up basic CLI with Commander
- [x] Create file structure
- [x] Test CLI runs

### Hour 3-4: File Scanner & Package.json Analysis
- [x] Implement fast-glob file scanning (.js, .ts, .jsx, .tsx)
- [x] Parse package.json
- [x] Detect frameworks (Express, React, Angular, Vue, jQuery)
- [x] Check for outdated dependencies (using semver)
- [x] Count lines of code

### Hour 5-7: JavaScript/TypeScript Analyzer
- [x] Use @babel/parser to parse JS/TS files
- [x] Detect legacy patterns:
  - jQuery usage ($, jQuery)
  - Callback patterns (function(err, data))
  - var declarations (should be let/const)
  - CommonJS (require/module.exports)
  - AngularJS 1.x patterns
- [x] Extract imports/requires
- [x] Detect code structure (classes, functions)

### Hour 8-10: Create 3 Sample Legacy Apps
- [x] **App 1**: jQuery + Express 3.x (e-commerce site)
  - jQuery for DOM manipulation
  - Express 3.x with callbacks
  - MySQL with raw queries
  - No build system
  
- [x] **App 2**: AngularJS 1.x SPA
  - AngularJS 1.5
  - Gulp build system
  - Bower dependencies
  - $http for API calls
  
- [x] **App 3**: Node.js Callback Hell API
  - Express 4.x
  - Nested callbacks (pyramid of doom)
  - No async/await
  - MongoDB with callbacks

### Hour 11-14: Bob Skills Templates (CRITICAL!)
This is where we spend the most time - creating **high-quality prompts** for Bob!

- [x] **analysis/SKILL.md template**
  - Detailed legacy code analysis
  - Framework detection results
  - Dependency audit
  - Code pattern analysis
  - Technical debt assessment
  
- [x] **architecture-design/SKILL.md template**
  - Modern stack recommendations
  - Migration strategy (gradual vs rewrite)
  - Architecture patterns
  - Component design
  - API design
  
- [x] **implementation-plan/SKILL.md template**
  - Phased migration plan
  - Risk mitigation
  - Testing strategy
  - Rollback procedures
  
- [x] **tasks/SKILL.md template**
  - Granular, actionable tasks
  - Clear acceptance criteria
  - Code examples
  - Dependencies between tasks
  - Priority ordering

### Hour 15-16: Skills Generator
- [x] Implement template rendering
- [x] Generate all 4 SKILL.md files
- [x] Add Mermaid diagrams
- [x] Format markdown properly
- [x] Include code snippets from legacy app

### Hour 17-18: Testing & Refinement
- [x] Test with all 3 sample apps
- [x] Refine Bob Skills prompts
- [x] Fix bugs
- [x] Improve output quality
- [x] Test that Bob can understand the skills

### Hour 19: Polish & Documentation
- [x] Update README with examples
- [x] Add demo instructions
- [x] Improve CLI messages
- [x] Add error handling
- [x] Create demo script

### Hour 20: Final Testing & Preparation
- [x] End-to-end test all 3 apps
- [x] Verify Bob Skills quality
- [x] Prepare demo recording
- [x] Test npx installation

---

## JavaScript/TypeScript Analysis Strategy

### What We'll Detect

```javascript
// 1. Framework Detection
const frameworks = {
  jquery: /\$\(|jQuery\(/,
  angularjs: /angular\.module|ng-app/,
  react: /import.*from ['"]react['"]/,
  vue: /new Vue\(|import.*from ['"]vue['"]/,
  express: /require\(['"]express['"]\)/,
};

// 2. Legacy Patterns
const legacyPatterns = {
  callbacks: /function\s*\(\s*err\s*,/,
  var: /\bvar\s+\w+/,
  commonjs: /require\(|module\.exports/,
  jquery: /\$\(|jQuery\(/,
  angularjs: /\$scope|\$http|\$q/,
};

// 3. Modern Patterns (to check if already modernized)
const modernPatterns = {
  asyncAwait: /async\s+function|await\s+/,
  esm: /import\s+.*from|export\s+(default|const|function)/,
  letConst: /\b(let|const)\s+\w+/,
  typescript: /:\s*(string|number|boolean|any)/,
};

// 4. Outdated Dependencies
const checkOutdated = (packageJson) => {
  // Compare versions with latest using semver
  // Flag dependencies > 2 years old
};
```

### Using @babel/parser

```javascript
import { parse } from '@babel/parser';

function analyzeJsFile(code) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
  
  // Walk the AST to find patterns
  // Much more accurate than regex!
}
```

---

## Bob Skills Output (High Quality!)

### Key Focus: Make Skills Bob-Friendly

The skills should:
1. **Provide Context** - Include relevant code snippets
2. **Be Specific** - Exact file paths, line numbers
3. **Be Actionable** - Clear tasks with acceptance criteria
4. **Include Examples** - Show before/after code
5. **Have Dependencies** - Task ordering matters

### Example: tasks/SKILL.md

```markdown
# Implementation Tasks for Legacy App Modernization

## Context
This is a legacy jQuery + Express 3.x application that needs modernization to React + Express 5.x.

**Legacy Stack:**
- Frontend: jQuery 2.1.4, Bootstrap 3
- Backend: Express 3.21.2, Node.js 10
- Database: MySQL with raw queries
- Build: None (manual concatenation)

**Target Stack:**
- Frontend: React 18, Vite, Tailwind CSS
- Backend: Express 5.x, Node.js 20
- Database: PostgreSQL with Prisma ORM
- Build: Vite + TypeScript

---

## Phase 1: Backend Modernization

### Task 1.1: Upgrade Express 3.x → 5.x

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
  app.use(express.cookieParser());
});

app.get('/api/users', function(req, res) {
  db.query('SELECT * FROM users', function(err, results) {
    if (err) return res.send(500, err);
    res.json(results);
  });
});
```

**Target Code:**
```javascript
import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/users', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Steps:**
1. Update package.json: `"express": "^5.0.0"`
2. Replace `app.configure()` with direct middleware
3. Replace `express.bodyParser()` with `express.json()`
4. Convert callbacks to async/await
5. Update error handling to use status codes
6. Test all endpoints

**Acceptance Criteria:**
- [ ] Express 5.x installed and running
- [ ] All middleware updated
- [ ] All routes converted to async/await
- [ ] Error handling uses proper status codes
- [ ] All existing tests pass
- [ ] No deprecation warnings

**Testing:**
```bash
npm test
curl http://localhost:3000/api/users
```

---

### Task 1.2: Replace MySQL Raw Queries with Prisma ORM

**Priority**: High  
**Estimated Time**: 4 hours  
**Dependencies**: Task 1.1

**Description:**
Replace raw MySQL queries with Prisma ORM for better type safety and maintainability.

**Current Code** (`db.js:10-20`):
```javascript
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp'
});

function getUsers(callback) {
  connection.query('SELECT * FROM users', callback);
}
```

**Target Code:**
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getUsers() {
  return await prisma.user.findMany();
}
```

**Steps:**
1. Install Prisma: `npm install @prisma/client`
2. Initialize Prisma: `npx prisma init`
3. Create schema.prisma from existing MySQL schema
4. Generate Prisma Client: `npx prisma generate`
5. Replace all raw queries with Prisma calls
6. Update all database functions to return Promises
7. Add TypeScript types

**Acceptance Criteria:**
- [ ] Prisma installed and configured
- [ ] schema.prisma matches existing database
- [ ] All queries converted to Prisma
- [ ] TypeScript types generated
- [ ] All tests pass
- [ ] No SQL injection vulnerabilities

---

## Phase 2: Frontend Modernization

### Task 2.1: Set Up React + Vite Project

**Priority**: High  
**Estimated Time**: 1 hour  
**Dependencies**: None

**Description:**
Create a new React project with Vite as the build tool.

**Steps:**
1. Create new directory: `mkdir frontend`
2. Initialize Vite: `npm create vite@latest frontend -- --template react-ts`
3. Install dependencies: `cd frontend && npm install`
4. Configure proxy to backend in vite.config.ts
5. Set up folder structure (components, pages, hooks, utils)
6. Install Tailwind CSS
7. Test dev server runs

**Acceptance Criteria:**
- [ ] Vite project created
- [ ] TypeScript configured
- [ ] Tailwind CSS installed
- [ ] Dev server runs on port 5173
- [ ] Proxy to backend works
- [ ] Hot reload works

---

### Task 2.2: Convert jQuery DOM Manipulation to React Components

**Priority**: High  
**Estimated Time**: 6 hours  
**Dependencies**: Task 2.1

**Description:**
Convert jQuery-based UI to React components. Start with the user list page.

**Current Code** (`public/js/users.js:1-30`):
```javascript
$(document).ready(function() {
  $.ajax({
    url: '/api/users',
    success: function(users) {
      users.forEach(function(user) {
        $('#user-list').append(
          '<div class="user-card">' +
            '<h3>' + user.name + '</h3>' +
            '<p>' + user.email + '</p>' +
          '</div>'
        );
      });
    }
  });
  
  $('#add-user-btn').click(function() {
    var name = $('#name-input').val();
    var email = $('#email-input').val();
    $.post('/api/users', { name, email }, function() {
      location.reload();
    });
  });
});
```

**Target Code** (`src/pages/Users.tsx`):
```typescript
import { useState, useEffect } from 'react';
import { UserCard } from '../components/UserCard';
import { AddUserForm } from '../components/AddUserForm';

interface User {
  id: number;
  name: string;
  email: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(name: string, email: string) {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <AddUserForm onSubmit={handleAddUser} />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
```

**Steps:**
1. Create Users page component
2. Create UserCard component
3. Create AddUserForm component
4. Implement state management with useState
5. Implement data fetching with useEffect
6. Add TypeScript interfaces
7. Style with Tailwind CSS
8. Add loading states
9. Add error handling
10. Test all functionality

**Acceptance Criteria:**
- [ ] Users page displays all users
- [ ] Add user form works
- [ ] Loading state shows while fetching
- [ ] Error handling works
- [ ] TypeScript types are correct
- [ ] Styling matches original design
- [ ] No jQuery dependencies

---

[More tasks continue...]

## Summary

**Total Tasks**: 15  
**Estimated Time**: 40 hours  
**Priority Order**: Backend → Frontend → Testing → Deployment

**Critical Path:**
1. Upgrade Express (Task 1.1)
2. Set up React (Task 2.1)
3. Convert jQuery to React (Task 2.2)
4. Add TypeScript (Task 3.1)
5. Deploy (Task 4.1)
```

---

## 3 Sample Legacy Apps

### App 1: jQuery E-commerce Site

```
jquery-ecommerce/
├── server.js              # Express 3.x server
├── package.json           # Old dependencies
├── public/
│   ├── index.html         # jQuery-heavy
│   ├── js/
│   │   ├── jquery.min.js
│   │   ├── products.js    # Product listing
│   │   └── cart.js        # Shopping cart
│   └── css/
│       └── style.css
└── routes/
    ├── products.js        # Callback-based routes
    └── orders.js
```

**Key Legacy Patterns:**
- jQuery for everything
- Express 3.x with callbacks
- No build system
- Inline SQL queries
- No TypeScript

### App 2: AngularJS 1.x Dashboard

```
angularjs-dashboard/
├── server.js              # Express 4.x API
├── package.json
├── bower.json             # Bower dependencies!
├── gulpfile.js            # Gulp build
├── app/
│   ├── index.html
│   ├── app.js             # AngularJS module
│   ├── controllers/
│   │   ├── dashboard.js
│   │   └── users.js
│   ├── services/
│   │   └── api.js         # $http service
│   └── directives/
│       └── chart.js
└── api/
    └── routes.js
```

**Key Legacy Patterns:**
- AngularJS 1.5
- Bower for dependencies
- Gulp for build
- $scope, $http, $q
- No TypeScript

### App 3: Callback Hell API

```
callback-hell-api/
├── server.js              # Express 4.x
├── package.json
├── routes/
│   ├── users.js           # Nested callbacks
│   └── posts.js
├── models/
│   ├── user.js            # MongoDB callbacks
│   └── post.js
└── utils/
    └── db.js              # Connection with callbacks
```

**Key Legacy Patterns:**
- Pyramid of doom (nested callbacks)
- No async/await
- MongoDB native driver with callbacks
- No error handling
- No TypeScript

---

## Demo Strategy

### What to Show Judges (2-minute demo)

1. **Show Legacy App** (15 seconds)
   - "Here's a legacy jQuery e-commerce site from 2015"
   - Show messy jQuery code
   - Show outdated package.json

2. **Run mdnkit** (30 seconds)
   ```bash
   npx mdnkit init --source-path ./jquery-ecommerce
   ```
   - Show nice CLI output with spinners
   - "Analyzing 45 JavaScript files..."
   - "Detected: jQuery 2.1.4, Express 3.21.2"
   - "Generating Bob Skills..."

3. **Show Generated Skills** (45 seconds)
   - Open `.bob/skills/` directory
   - Show analysis/SKILL.md - "Complete analysis of legacy code"
   - Show architecture-design/SKILL.md - "Modern React + Express 5 design"
   - Show tasks/SKILL.md - "15 detailed tasks for Bob"

4. **The Magic** (30 seconds)
   - "Now IBM Bob can read these skills and implement the modernization"
   - Show a task example with before/after code
   - "Bob knows exactly what to do, with context and acceptance criteria"

### Demo Script

```
"Legacy JavaScript apps are everywhere - jQuery, AngularJS 1.x, callback hell.
Modernizing them is hard and time-consuming.

mdnkit solves this by:
1. Analyzing your legacy codebase [run command]
2. Detecting frameworks and patterns [show output]
3. Designing a modern architecture [show skills]
4. Creating detailed tasks for IBM Bob [show tasks]

Now Bob can modernize your app automatically, with full context and clear instructions.

We tested it on 3 different legacy patterns - it works!"
```

---

## Success Criteria

The MVP is successful if:

1. ✅ CLI runs without errors on all 3 sample apps
2. ✅ Analyzes JavaScript/TypeScript projects in < 30 seconds
3. ✅ Generates 4 high-quality SKILL.md files
4. ✅ Skills are detailed enough for Bob to understand
5. ✅ Demo is impressive to judges
6. ✅ Code is clean and well-structured

---

## Risk Mitigation

### Biggest Risks

1. **Time Overrun** - Solution: Focus on 1 sample app if needed
2. **Skills Quality** - Solution: Spend most time on templates (Hours 11-14)
3. **Bugs in Demo** - Solution: Test thoroughly, have backup recording
4. **@babel/parser Issues** - Solution: Fallback to regex if needed

### Backup Plan

If we run out of time:
- Focus on jQuery app only (most common)
- Simplify the analyzer (basic pattern matching)
- Use static templates with minimal customization
- Focus on making the skills look professional

---

## Next Steps

Ready to start building! The plan is:

1. ✅ **Confirmed**: JavaScript/TypeScript focus
2. ✅ **Confirmed**: Create 3 sample legacy apps
3. ✅ **Confirmed**: High-quality Bob Skills (main focus)
4. ✅ **Confirmed**: Support npx for demo
5. ✅ **Confirmed**: Graceful error handling

**Time to switch to Code mode and start building!**

---

**Status**: Ready to Implement  
**Time Remaining**: ~24 hours  
**Next Action**: Switch to Code mode and start Hour 1-2 (Project Setup)