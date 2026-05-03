# mdnkit Implementation Roadmap

> Detailed plan for rebuilding mdnkit to generate executable Bob Skills

## Overview

This document outlines the step-by-step implementation plan for transforming mdnkit from generating static analysis reports to generating **executable Bob Skills** that AI agents can invoke to modernize legacy applications.

## Current State vs Target State

### Current State ❌
- Generates static markdown reports (analysis results, architecture docs)
- Output is informational only, not actionable
- Bob cannot "use" the generated files to perform tasks
- Skills are just documentation, not executable

### Target State ✅
- Generates executable Bob Skills with clear invocation patterns
- Each skill has defined inputs, execution steps, and outputs
- Bob can invoke skills: "Bob, use mdnkit-analysis to analyze ./legacy-app"
- Skills are chainable: analysis → architecture → plan → migrate → test
- Skills include project-specific context and instructions

## Implementation Phases

### Phase 1: Foundation (Current Phase)
**Status**: ✅ Completed

- [x] Understand Bob Skills format (executable vs reports)
- [x] Define 5 core skills (analysis, architecture, plan, migrate, test)
- [x] Create comprehensive skills specification
- [x] Design skill template structure
- [x] Create example skill files for reference

**Deliverables**:
- [`docs/SKILLS_SPECIFICATION.md`](./SKILLS_SPECIFICATION.md)
- [`examples/mdnkit-analysis-skill-example.md`](../examples/mdnkit-analysis-skill-example.md)
- [`examples/mdnkit-architecture-skill-example.md`](../examples/mdnkit-architecture-skill-example.md)

### Phase 2: Architecture Update
**Status**: 🔄 Next

**Tasks**:
1. Update [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) to reflect skill-based approach
2. Document new data flow: scan → analyze → generate skills
3. Define skill generation pipeline
4. Update system diagrams

**Estimated Time**: 1 hour

### Phase 3: Type Definitions
**Status**: ⏳ Pending

**Tasks**:
1. Update [`src/types.ts`](../src/types.ts) with skill-related types:
   ```typescript
   interface SkillMetadata {
     name: string;
     description: string;
     version: string;
     author: string;
     tags: string[];
   }
   
   interface SkillParameter {
     name: string;
     type: 'string' | 'boolean' | 'number' | 'object' | 'array';
     required: boolean;
     default?: any;
     description: string;
   }
   
   interface SkillTemplate {
     metadata: SkillMetadata;
     parameters: SkillParameter[];
     content: string;
   }
   
   interface AnalysisSkillData {
     project: ProjectInfo;
     frameworks: FrameworkDetection;
     legacyPatterns: LegacyPatternResults;
     issues: Issue[];
     recommendations: Recommendation[];
   }
   
   interface ArchitectureSkillData {
     analysisResults: AnalysisSkillData;
     targetStack: TechnologyStack;
     systemArchitecture: string; // Mermaid diagram
     featureMapping: FeatureMap[];
     migrationPhases: Phase[];
   }
   
   interface PlanSkillData {
     architectureDesign: ArchitectureSkillData;
     tasks: Task[];
     phases: Phase[];
     timeline: Timeline;
     risks: Risk[];
   }
   ```

2. Add skill generation types
3. Update existing types to support skill generation

**Estimated Time**: 2 hours

### Phase 4: Skill Templates
**Status**: ⏳ Pending

**Tasks**:
1. Create template files in `src/templates/`:
   - `analysis-skill.template.md`
   - `architecture-skill.template.md`
   - `plan-skill.template.md`
   - `migrate-skill.template.md`
   - `test-skill.template.md`

2. Each template should include:
   - Frontmatter with metadata
   - Purpose and when to use sections
   - Input parameters (project-specific)
   - Execution steps (project-specific)
   - Output format examples
   - Usage examples (project-specific)
   - Integration with other skills

3. Use template variables for dynamic content:
   ```markdown
   ---
   name: mdnkit-analysis
   description: Analyze {{projectName}} legacy codebase
   version: 1.0.0
   ---
   
   # mdnkit-analysis Skill
   
   ## Project Context
   - **Project**: {{projectName}}
   - **Path**: {{projectPath}}
   - **Total Files**: {{totalFiles}}
   - **Total Lines**: {{totalLines}}
   
   ## Detected Frameworks
   {{#each frameworks}}
   - **{{name}}**: {{version}} ({{status}})
   {{/each}}
   ```

**Estimated Time**: 4 hours

### Phase 5: Generator Refactoring
**Status**: ⏳ Pending

**Tasks**:
1. Refactor [`src/generator.ts`](../src/generator.ts):
   ```typescript
   // Old approach (generates reports)
   async function generateAnalysisReport(analysis: AnalysisResult) {
     // Generate static markdown report
   }
   
   // New approach (generates executable skills)
   async function generateAnalysisSkill(analysis: AnalysisResult) {
     const template = await loadTemplate('analysis-skill.template.md');
     const skillData = prepareAnalysisSkillData(analysis);
     const skill = renderTemplate(template, skillData);
     await writeSkillFile('.bob/skills/mdnkit-analysis/SKILL.md', skill);
   }
   ```

2. Implement template rendering engine (use Handlebars or similar)
3. Create skill data preparation functions
4. Update file output structure:
   ```
   .bob/skills/
   ├── mdnkit-analysis/
   │   └── SKILL.md
   ├── mdnkit-architecture/
   │   └── SKILL.md
   ├── mdnkit-plan/
   │   ├── SKILL.md
   │   └── MIGRATION_PLAN.md  (generated by the skill)
   ├── mdnkit-migrate/
   │   └── SKILL.md
   └── mdnkit-test/
       └── SKILL.md
   ```

**Estimated Time**: 6 hours

### Phase 6: CLI Updates
**Status**: ⏳ Pending

**Tasks**:
1. Update [`src/cli.ts`](../src/cli.ts) commands:
   ```typescript
   // Old command
   program
     .command('init')
     .description('Initialize mdnkit analysis')
     .option('--source-path <path>', 'Path to legacy project')
     .action(async (options) => {
       // Generate reports
     });
   
   // New command
   program
     .command('generate-skills')
     .description('Generate Bob Skills for legacy project modernization')
     .option('--source-path <path>', 'Path to legacy project')
     .option('--output-path <path>', 'Output directory', '.bob/skills')
     .option('--skills <skills>', 'Skills to generate (comma-separated)', 'all')
     .action(async (options) => {
       // Generate executable skills
       await generateSkills(options);
     });
   ```

2. Add skill validation
3. Add progress indicators
4. Update help text and examples

**Estimated Time**: 2 hours

### Phase 7: Testing & Examples
**Status**: ⏳ Pending

**Tasks**:
1. Generate skills for `examples/test-legacy-app/`:
   ```bash
   npm run build
   node dist/cli.js generate-skills --source-path ./examples/test-legacy-app
   ```

2. Verify generated skills:
   - Check frontmatter is correct
   - Verify project-specific data is included
   - Ensure execution steps are clear
   - Validate usage examples

3. Create example workflow documentation:
   ```markdown
   # Example: Modernizing test-legacy-app
   
   ## Step 1: Generate Skills
   ```bash
   mdnkit generate-skills --source-path ./examples/test-legacy-app
   ```
   
   ## Step 2: Use Skills with Bob
   ```markdown
   Bob, use the mdnkit-analysis skill to analyze the test-legacy-app
   Bob, use mdnkit-architecture to design a React + Express 5 architecture
   Bob, use mdnkit-plan to create an implementation plan
   Bob, use mdnkit-migrate to implement task 1.1 from the plan
   Bob, use mdnkit-test to generate tests for the migrated code
   ```
   ```

4. Test skill chaining workflow

**Estimated Time**: 3 hours

### Phase 8: Documentation
**Status**: ⏳ Pending

**Tasks**:
1. Update [`README.md`](../README.md):
   - Explain skill-based approach
   - Show skill generation workflow
   - Provide usage examples
   - Document skill invocation patterns

2. Create [`docs/SKILL_USAGE_GUIDE.md`](./SKILL_USAGE_GUIDE.md):
   - How Bob should invoke skills
   - Skill chaining patterns
   - Best practices
   - Troubleshooting

3. Update [`AGENTs.md`](../AGENTs.md):
   - Update for skill-based approach
   - Add skill generation guidelines
   - Update examples

**Estimated Time**: 2 hours

### Phase 9: Integration Testing
**Status**: ⏳ Pending

**Tasks**:
1. Test complete workflow with all 3 example apps:
   - `examples/jquery-app/` (to be created)
   - `examples/angularjs-app/` (to be created)
   - `examples/callback-hell-app/` (to be created)

2. Verify skills are:
   - Executable by Bob
   - Project-specific
   - Chainable
   - Complete with all necessary context

3. Test error handling and edge cases

**Estimated Time**: 4 hours

### Phase 10: Polish & Release
**Status**: ⏳ Pending

**Tasks**:
1. Code review and refactoring
2. Add comprehensive comments
3. Optimize performance
4. Create demo video/GIF
5. Prepare for hackathon presentation

**Estimated Time**: 3 hours

## Total Estimated Time

- **Phase 1**: ✅ Completed (4 hours)
- **Phase 2**: 1 hour
- **Phase 3**: 2 hours
- **Phase 4**: 4 hours
- **Phase 5**: 6 hours
- **Phase 6**: 2 hours
- **Phase 7**: 3 hours
- **Phase 8**: 2 hours
- **Phase 9**: 4 hours
- **Phase 10**: 3 hours

**Total**: ~31 hours (4-5 days of focused work)

## Key Decisions

### 1. Template Engine
**Decision**: Use Handlebars for template rendering
**Rationale**: 
- Simple syntax
- Good TypeScript support
- Handles complex logic (loops, conditionals)
- Widely used and well-documented

### 2. Skill Storage Location
**Decision**: Store skills in `.bob/skills/<skill-name>/SKILL.md`
**Rationale**:
- Follows Bob's convention
- Each skill in its own directory
- Easy to find and manage
- Supports additional files per skill

### 3. Skill Naming Convention
**Decision**: Use `mdnkit-<action>` format (e.g., `mdnkit-analysis`)
**Rationale**:
- Clear namespace (mdnkit)
- Action-oriented names
- Consistent with examples
- Easy to remember and invoke

### 4. Skill Versioning
**Decision**: Include version in frontmatter, start at 1.0.0
**Rationale**:
- Allows skill evolution
- Semantic versioning
- Bob can check compatibility
- Future-proof

### 5. Project-Specific vs Generic
**Decision**: Generate project-specific skills with actual data
**Rationale**:
- More actionable for Bob
- Includes real file paths and patterns
- Context-aware recommendations
- Better than generic templates

## Success Criteria

### Must Have ✅
- [ ] All 5 skills generate correctly
- [ ] Skills include project-specific data
- [ ] Skills are executable by Bob
- [ ] Skills can be chained together
- [ ] Documentation is complete
- [ ] Examples work end-to-end

### Nice to Have 🎯
- [ ] Skills support multiple target stacks (React, Vue, Angular)
- [ ] Skills include Mermaid diagrams
- [ ] Skills have rich usage examples
- [ ] Performance is optimized (<10s for analysis)
- [ ] Error messages are helpful

### Future Enhancements 🚀
- [ ] Add more skills (security, performance, deploy)
- [ ] Support for more legacy frameworks
- [ ] Interactive skill configuration
- [ ] Skill marketplace/sharing
- [ ] AI-powered skill customization

## Risk Management

### Risk 1: Template Complexity
**Risk**: Templates become too complex to maintain
**Mitigation**: Keep templates simple, use helper functions for complex logic

### Risk 2: Project-Specific Data Quality
**Risk**: Analysis doesn't capture enough context for skills
**Mitigation**: Enhance analyzer to capture more details, add validation

### Risk 3: Bob Invocation Patterns
**Risk**: Bob doesn't understand how to invoke skills
**Mitigation**: Clear documentation, examples, and usage patterns in skills

### Risk 4: Skill Chaining
**Risk**: Skills don't pass data correctly between each other
**Mitigation**: Define clear input/output contracts, test chaining thoroughly

## Next Steps

1. **Immediate**: Switch to Code mode to start implementation
2. **Phase 2**: Update architecture documentation
3. **Phase 3**: Implement type definitions
4. **Phase 4**: Create skill templates
5. **Continue**: Follow roadmap phases sequentially

---

**Status**: Ready for Implementation  
**Last Updated**: 2026-05-02  
**Next Review**: After Phase 5 completion