---
name: mdnkit-architecture
description: Designs modern application architecture for {{projectName}} maintaining feature parity while improving maintainability, performance, and security
version: 1.0.0
author: mdnkit
tags: [architecture, design, modernization, migration, {{projectName}}]
---

# mdnkit-architecture Skill

## Purpose
This skill enables Bob to design a modern application architecture for **{{projectName}}** that maintains all existing features while improving maintainability, enhancing performance, and strengthening security.

## Project Context

- **Project Name**: {{projectName}}
- **Current Stack**: {{currentStack}}
- **Target Stack**: {{targetStack}}
- **Architecture Style**: {{architectureStyle}}
- **Migration Strategy**: {{migrationStrategy}}

## When to Use This Skill

- After completing mdnkit-analysis for {{projectName}}
- When planning a modernization project
- To design a migration strategy from legacy to modern stack
- To create technical specifications for development teams

## Prerequisites

- Completed **mdnkit-analysis** of {{projectName}}
- Understanding of current system features and requirements
- Access to legacy codebase for reference at `{{projectPath}}`

## Input Parameters

### Required
- `analysis_results` (object): Output from mdnkit-analysis skill
  - Contains legacy patterns, frameworks, and technical debt
- `target_stack` (string): Desired modern technology stack
  - Current: `{{targetStack}}`
  - Options: `react`, `vue`, `angular`, `svelte`, `vanilla-modern`

### Optional
- `backend_target` (string): Target backend framework
  - Current: `{{backendTarget}}`
  - Options: `express-5`, `fastify`, `nestjs`, `koa`
- `database_target` (string): Target database approach
  - Current: `{{databaseTarget}}`
  - Options: `prisma`, `typeorm`, `sequelize`, `raw-sql`
- `architecture_style` (string): Overall architecture pattern
  - Current: `{{architectureStyle}}`
  - Options: `monolith`, `microservices`, `modular-monolith`
- `include_typescript` (boolean): Use TypeScript
  - Current: `{{includeTypeScript}}`
- `include_testing` (boolean): Include testing strategy
  - Current: `{{includeTesting}}`

## Execution Steps

When Bob invokes this skill, the following architecture design will be performed:

### Step 1: Analyze Legacy Features
```bash
# Map all routes/endpoints from legacy app
# Identify all UI components and pages
# Document business logic and workflows
# List all integrations and dependencies
```
**Output**: Complete feature inventory for {{projectName}}

### Step 2: Design Modern Architecture
```bash
# Create component hierarchy (for frontend)
# Design API structure (for backend)
# Define data models and relationships
# Plan state management approach
# Design authentication/authorization flow
```
**Output**: Architecture diagrams and specifications

### Step 3: Define Migration Strategy
```bash
# Plan phased migration approach (strangler pattern)
# Determine feature-by-feature migration order
# Design parallel running strategy
# Define rollback procedures
```
**Output**: Migration roadmap

### Step 4: Create Technical Specifications
```bash
# Document file structure
# Define naming conventions
# Specify code organization
# Plan build and deployment process
```
**Output**: Technical specification document

### Step 5: Generate Architecture Diagrams
```bash
# Create system architecture diagram (Mermaid)
# Design component relationship diagram
# Map data flow diagram
# Plan deployment architecture
```
**Output**: Visual architecture documentation

## System Architecture

### Current Architecture

```mermaid
graph TD
    A[{{projectName}} Legacy] --> B[{{currentFrontend}}]
    A --> C[{{currentBackend}}]
    A --> D[{{currentBuildTool}}]
    B --> E[Legacy Patterns]
    C --> F[Callback-based Code]
```

### Target Architecture

```mermaid
graph TD
    A[{{projectName}} Modern] --> B[{{targetFrontend}}]
    A --> C[{{targetBackend}}]
    A --> D[{{targetBuildTool}}]
    B --> E[Component Library]
    B --> F[State Management]
    B --> G[API Client]
    C --> H[RESTful API]
    C --> I[Database Layer]
    C --> J[Business Logic]
```

## Technology Stack

### Frontend
- **Framework**: {{frontendFramework}}
- **Language**: {{frontendLanguage}}
- **State Management**: {{stateManagement}}
- **Routing**: {{routing}}
- **HTTP Client**: {{httpClient}}
- **UI Library**: {{uiLibrary}}
- **Build Tool**: {{buildTool}}

### Backend
- **Framework**: {{backendFramework}}
- **Language**: {{backendLanguage}}
- **ORM**: {{orm}}
- **Validation**: {{validation}}
- **Authentication**: {{authentication}}
- **Testing**: {{testing}}

### DevOps
- **Package Manager**: {{packageManager}}
- **Linting**: {{linting}}
- **Testing**: {{testingFramework}}
- **CI/CD**: {{cicd}}
- **Containerization**: {{containerization}}

## File Structure

```
{{projectName}}-modern/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Reusable UI components
│   │   │   └── features/     # Feature-specific components
│   │   ├── pages/            # Route pages
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── store/            # State management
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/           # Express routes
│   │   ├── controllers/      # Route controllers
│   │   ├── services/         # Business logic
│   │   ├── models/           # Data models
│   │   ├── middleware/       # Express middleware
│   │   ├── utils/            # Utility functions
│   │   └── types/            # TypeScript types
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
└── shared/
    └── types/                # Shared TypeScript types
```

## Feature Mapping

| Legacy Feature | Modern Implementation | Priority | Files |
|----------------|----------------------|----------|-------|
{{#each featureMapping}}
| {{legacyFeature}} | {{modernImplementation}} | {{priority}} | {{#each files}}{{this}}{{#unless @last}}, {{/unless}}{{/each}} |
{{/each}}

## Migration Phases

{{#each migrationPhases}}
### Phase {{number}}: {{name}} ({{duration}})

{{#each tasks}}
#### Task {{id}}: {{title}}
- **Priority**: {{priority}}
- **Effort**: {{estimatedTime}}
- **Dependencies**: {{#if dependencies}}{{#each dependencies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None{{/if}}
- **Description**: {{description}}

{{/each}}

{{/each}}

## Performance Improvements

| Metric | Legacy | Modern | Improvement |
|--------|--------|--------|-------------|
{{#each performanceImprovements}}
| {{metric}} | {{legacy}} | {{modern}} | {{improvement}} |
{{/each}}

## Security Enhancements

{{#each securityEnhancements}}
{{@index}}. {{this}}
{{/each}}

## Testing Strategy

### Frontend Testing
- **Unit Tests**: {{frontendUnitTesting}} for utilities and hooks
- **Component Tests**: {{frontendComponentTesting}}
- **E2E Tests**: {{frontendE2ETesting}}
- **Coverage Target**: {{frontendCoverageTarget}}%

### Backend Testing
- **Unit Tests**: {{backendUnitTesting}} for services
- **Integration Tests**: {{backendIntegrationTesting}} for routes
- **Database Tests**: {{backendDatabaseTesting}}
- **Coverage Target**: {{backendCoverageTarget}}%

## Rollback Strategy

1. **Parallel Running**: Run legacy and modern apps side-by-side
2. **Feature Flags**: Toggle between old and new features
3. **Database Compatibility**: Maintain backward compatibility
4. **Gradual Rollout**: Percentage-based user routing
5. **Quick Rollback**: One-command rollback procedure

## Usage Examples

### Example 1: Basic Architecture Design
```markdown
Bob, use mdnkit-architecture to design a modern React + Express architecture for {{projectName}}
```

**Bob's Actions**:
1. Load mdnkit-analysis results for {{projectName}}
2. Design React component structure
3. Plan Express 5 API routes
4. Create architecture diagrams
5. Generate migration roadmap

### Example 2: Microservices Architecture
```markdown
Bob, design a microservices architecture for {{projectName}} using mdnkit-architecture with architecture_style=microservices
```

**Bob's Actions**:
1. Analyze {{projectName}} monolith boundaries
2. Identify service boundaries
3. Design inter-service communication
4. Plan data partitioning
5. Create deployment strategy

### Example 3: Vue.js Migration
```markdown
Bob, use mdnkit-architecture to design a Vue 3 + Fastify architecture for {{projectName}}
```

**Bob's Actions**:
1. Map current components to Vue 3
2. Design Composition API structure
3. Plan Fastify routes
4. Create migration strategy
5. Document differences from current stack

## Integration with Other Skills

### Before mdnkit-architecture
1. **mdnkit-analysis**: Analyze legacy codebase first
   ```markdown
   Bob, analyze {{projectName}} with mdnkit-analysis, then design modern architecture with mdnkit-architecture
   ```

### After mdnkit-architecture
1. **mdnkit-plan**: Create implementation plan
   ```markdown
   Bob, use mdnkit-plan to create a detailed migration plan based on this architecture
   ```

2. **mdnkit-migrate**: Implement the designed architecture
   ```markdown
   Bob, implement the architecture using mdnkit-migrate
   ```

3. **mdnkit-test**: Generate tests based on architecture
   ```markdown
   Bob, create tests for the new architecture using mdnkit-test
   ```

## Success Criteria

- [x] Complete feature mapping from legacy to modern
- [x] Architecture diagrams generated
- [x] Technology stack defined with versions
- [x] Migration phases planned with timelines
- [x] Performance and security improvements documented
- [ ] Ready for implementation planning phase

## Error Handling

### Common Errors

**Error**: `Analysis results not found`
- **Cause**: mdnkit-analysis not run first
- **Solution**: Run mdnkit-analysis before mdnkit-architecture

**Error**: `Unsupported target stack`
- **Cause**: Invalid target_stack parameter
- **Solution**: Use supported options: react, vue, angular, svelte

**Error**: `Incompatible architecture style`
- **Cause**: Chosen style doesn't fit project size
- **Solution**: Use modular-monolith for small/medium projects

## Best Practices

1. **Start Simple**: Begin with modular-monolith, not microservices
2. **Maintain Features**: Ensure 100% feature parity
3. **Incremental Migration**: Use strangler pattern
4. **Test Coverage**: Write tests before migrating
5. **Documentation**: Document all architectural decisions

## Next Steps

1. ✅ Architecture designed for {{projectName}}
2. ⏭️ Review architecture with stakeholders
3. ⏭️ Use **mdnkit-plan** to create implementation roadmap
4. ⏭️ Use **mdnkit-migrate** to start implementation
5. ⏭️ Use **mdnkit-test** to verify migrated code

---

**Architecture Status**: ✅ Complete  
**Generated**: {{generatedDate}}  
**Ready for**: Implementation Planning Phase  
**Target Stack**: {{targetStack}}