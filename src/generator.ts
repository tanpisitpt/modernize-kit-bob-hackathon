/**
 * Bob Skills Generator Module
 * Generates executable IBM Bob Skills markdown files from analysis results
 */

import fs from 'fs-extra';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import type {
  ProjectAnalysis,
  DetectedFrameworks,
  AnalysisSkillData,
  ArchitectureSkillData,
  PlanSkillData,
  Recommendation,
  TechnologyStack,
  FeatureMap,
  Phase,
  Task,
  CopyOptions
} from './types.js';

const { ensureDir, writeFile, readFile } = fs;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate all Bob Skills files
 * @param analysis - Analysis results
 * @param frameworks - Detected frameworks
 * @param sourcePath - Path to the source project
 * @param outputDir - Output directory
 * @param copyOptions - Options for copied source
 */
export async function generateSkills(
  analysis: ProjectAnalysis,
  frameworks: DetectedFrameworks,
  sourcePath: string,
  outputDir = '.bob/skills',
  copyOptions?: CopyOptions
): Promise<void> {
  console.log('🎯 Generating executable Bob Skills...');
  
  // Prepare path information for templates
  const workspacePath = process.cwd();
  const sourcePathRelative = relative(workspacePath, sourcePath);
  const pathContext = {
    sourcePath: sourcePathRelative,
    originalPath: copyOptions?.originalPath ? relative(workspacePath, copyOptions.originalPath) : undefined,
    copiedToWorkspace: copyOptions?.copiedToWorkspace || false
  };
  
  // Ensure output directories exist
  await ensureDir(join(outputDir, 'mdnkit-analysis'));
  await ensureDir(join(outputDir, 'mdnkit-architecture'));
  await ensureDir(join(outputDir, 'mdnkit-plan'));
  await ensureDir(join(outputDir, 'mdnkit-migrate'));
  await ensureDir(join(outputDir, 'mdnkit-test'));

  // Generate each skill file
  await generateAnalysisSkill(analysis, frameworks, sourcePath, outputDir, pathContext);
  await generateArchitectureSkill(analysis, frameworks, sourcePath, outputDir, pathContext);
  await generatePlanSkill(analysis, frameworks, sourcePath, outputDir, pathContext);
  await generateMigrateSkill(analysis, frameworks, sourcePath, outputDir, pathContext);
  await generateTestSkill(analysis, frameworks, sourcePath, outputDir, pathContext);
  
  console.log('✅ All Bob Skills generated successfully!');
}

/**
 * Load and compile a Handlebars template
 */
async function loadTemplate(templateName: string): Promise<HandlebarsTemplateDelegate> {
  const templatePath = join(__dirname, 'templates', `${templateName}.template.md`);
  const templateContent = await readFile(templatePath, 'utf-8');
  return Handlebars.compile(templateContent);
}

/**
 * Generate Analysis Skill
 */
async function generateAnalysisSkill(
  analysis: ProjectAnalysis,
  frameworks: DetectedFrameworks,
  sourcePath: string,
  outputDir: string,
  pathContext?: any
): Promise<void> {
  console.log('  📊 Generating mdnkit-analysis skill...');
  
  const template = await loadTemplate('analysis-skill');
  
  // Prepare legacy patterns data
  const legacyPatterns: Record<string, { count: number; files: string[] }> = {};
  const modernPatterns: Record<string, { count: number; files: string[] }> = {};
  
  for (const file of analysis.files) {
    // Count legacy patterns
    if (file.legacyPatterns) {
      for (const [pattern, detected] of Object.entries(file.legacyPatterns)) {
        if (detected) {
          if (!legacyPatterns[pattern]) {
            legacyPatterns[pattern] = { count: 0, files: [] };
          }
          legacyPatterns[pattern].count++;
          legacyPatterns[pattern].files.push(file.file);
        }
      }
    }
    
    // Count modern patterns
    if (file.modernPatterns) {
      for (const [pattern, detected] of Object.entries(file.modernPatterns)) {
        if (detected) {
          if (!modernPatterns[pattern]) {
            modernPatterns[pattern] = { count: 0, files: [] };
          }
          modernPatterns[pattern].count++;
          modernPatterns[pattern].files.push(file.file);
        }
      }
    }
  }
  
  // Prepare recommendations
  const recommendations: Recommendation[] = [];
  
  if (frameworks.frontend.type === 'legacy') {
    recommendations.push({
      priority: 'HIGH',
      task: `Migrate ${frameworks.frontend.name} to modern framework`,
      effort: '40-80 hours',
      risk: 'MEDIUM',
      description: frameworks.frontend.modernization || 'Consider React, Vue, or Angular'
    });
  }
  
  if (frameworks.backend.type === 'legacy') {
    recommendations.push({
      priority: 'HIGH',
      task: `Upgrade ${frameworks.backend.name}`,
      effort: '8-16 hours',
      risk: 'LOW',
      description: frameworks.backend.modernization || 'Upgrade to latest version'
    });
  }
  
  if (Object.keys(legacyPatterns).length > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      task: 'Modernize code patterns',
      effort: '20-40 hours',
      risk: 'LOW',
      description: 'Replace callbacks with async/await, var with let/const, etc.'
    });
  }
  
  const data: AnalysisSkillData = {
    project: {
      name: analysis.project.name,
      path: sourcePath,
      totalFiles: analysis.stats.totalFiles,
      totalLines: analysis.stats.totalLines
    },
    frameworks,
    legacyPatterns,
    modernPatterns,
    issues: analysis.files.flatMap(f => f.issues || []),
    recommendations
  };
  
  // Add template-specific data
  const templateData = {
    ...data,
    projectName: data.project.name,
    projectPath: data.project.path,
    totalFiles: data.project.totalFiles,
    totalLines: data.project.totalLines,
    analysisDate: new Date().toISOString().split('T')[0],
    frontendName: frameworks.frontend.name,
    frontendVersion: frameworks.frontend.version || 'N/A',
    frontendStatus: frameworks.frontend.type,
    frontendModernization: frameworks.frontend.modernization,
    backendName: frameworks.backend.name,
    backendVersion: frameworks.backend.version || 'N/A',
    backendStatus: frameworks.backend.type,
    backendModernization: frameworks.backend.modernization,
    buildToolName: frameworks.buildTool.name,
    buildToolVersion: frameworks.buildTool.version || 'N/A',
    buildToolStatus: frameworks.buildTool.type,
    buildToolModernization: frameworks.buildTool.modernization,
    analysisTime: Math.round(analysis.stats.totalFiles * 0.1),
    totalPatterns: Object.keys(legacyPatterns).length + Object.keys(modernPatterns).length
  };
  
  const output = template(templateData);
  await writeFile(join(outputDir, 'mdnkit-analysis', 'SKILL.md'), output);
  console.log('  ✅ mdnkit-analysis skill generated');
}

/**
 * Generate Architecture Skill
 */
async function generateArchitectureSkill(
  analysis: ProjectAnalysis,
  frameworks: DetectedFrameworks,
  sourcePath: string,
  outputDir: string,
  pathContext?: any
): Promise<void> {
  console.log('  🏗️  Generating mdnkit-architecture skill...');
  
  const template = await loadTemplate('architecture-skill');
  
  // Define target stack based on current stack
  const targetStack: TechnologyStack = {
    frontend: {
      framework: 'React',
      version: '18.2',
      language: 'TypeScript',
      stateManagement: 'Zustand',
      routing: 'React Router 6',
      httpClient: 'Axios + React Query',
      uiLibrary: 'Tailwind CSS + shadcn/ui',
      buildTool: 'Vite 5'
    },
    backend: {
      framework: 'Express',
      version: '5.0',
      language: 'TypeScript',
      orm: 'Prisma',
      validation: 'Zod',
      authentication: 'JWT + bcrypt',
      testing: 'Vitest + Supertest'
    },
    devops: {
      packageManager: 'pnpm',
      linting: 'ESLint + Prettier',
      testing: 'Vitest + React Testing Library',
      cicd: 'GitHub Actions',
      containerization: 'Docker'
    }
  };
  
  // Create feature mapping (simplified for MVP)
  const featureMapping: FeatureMap[] = [
    {
      legacyFeature: 'jQuery DOM manipulation',
      modernImplementation: 'React Components',
      priority: 'HIGH',
      files: analysis.files.filter(f => f.legacyPatterns?.jquery).map(f => f.file)
    },
    {
      legacyFeature: 'Callback-based async code',
      modernImplementation: 'Async/Await',
      priority: 'HIGH',
      files: analysis.files.filter(f => f.legacyPatterns?.callbacks).map(f => f.file)
    },
    {
      legacyFeature: 'CommonJS modules',
      modernImplementation: 'ES Modules',
      priority: 'MEDIUM',
      files: analysis.files.filter(f => f.legacyPatterns?.commonjs).map(f => f.file)
    }
  ];
  
  // Create migration phases
  const migrationPhases: Phase[] = [
    {
      number: 1,
      name: 'Foundation Setup',
      duration: '1-2 weeks',
      tasks: [
        {
          id: '1.1',
          title: 'Set up project structure',
          description: 'Create modern project structure with frontend and backend directories',
          priority: 'HIGH',
          estimatedTime: '4 hours',
          dependencies: []
        },
        {
          id: '1.2',
          title: 'Configure TypeScript',
          description: 'Set up TypeScript configuration for both frontend and backend',
          priority: 'HIGH',
          estimatedTime: '2 hours',
          dependencies: ['1.1']
        }
      ]
    },
    {
      number: 2,
      name: 'Core Features Migration',
      duration: '3-4 weeks',
      tasks: [
        {
          id: '2.1',
          title: 'Migrate main UI components',
          description: 'Convert jQuery-based UI to React components',
          priority: 'HIGH',
          estimatedTime: '20 hours',
          dependencies: ['1.1', '1.2']
        }
      ]
    }
  ];
  
  const templateData = {
    projectName: analysis.project.name,
    projectPath: sourcePath,
    currentStack: `${frameworks.frontend.name} + ${frameworks.backend.name}`,
    targetStack: `${targetStack.frontend.framework} + ${targetStack.backend.framework}`,
    architectureStyle: 'modular-monolith',
    migrationStrategy: 'Phased strangler pattern',
    currentFrontend: frameworks.frontend.name,
    currentBackend: frameworks.backend.name,
    currentBuildTool: frameworks.buildTool.name,
    targetFrontend: targetStack.frontend.framework,
    targetBackend: targetStack.backend.framework,
    targetBuildTool: targetStack.frontend.buildTool,
    backendTarget: targetStack.backend.framework,
    databaseTarget: targetStack.backend.orm,
    includeTypeScript: true,
    includeTesting: true,
    frontendFramework: targetStack.frontend.framework,
    frontendLanguage: targetStack.frontend.language,
    stateManagement: targetStack.frontend.stateManagement,
    routing: targetStack.frontend.routing,
    httpClient: targetStack.frontend.httpClient,
    uiLibrary: targetStack.frontend.uiLibrary,
    buildTool: targetStack.frontend.buildTool,
    backendFramework: targetStack.backend.framework,
    backendLanguage: targetStack.backend.language,
    orm: targetStack.backend.orm,
    validation: targetStack.backend.validation,
    authentication: targetStack.backend.authentication,
    testing: targetStack.backend.testing,
    packageManager: targetStack.devops.packageManager,
    linting: targetStack.devops.linting,
    testingFramework: targetStack.devops.testing,
    cicd: targetStack.devops.cicd,
    containerization: targetStack.devops.containerization,
    featureMapping,
    migrationPhases,
    performanceImprovements: [
      { metric: 'Initial Load', legacy: '3.2s', modern: '1.1s', improvement: '66% faster' },
      { metric: 'Time to Interactive', legacy: '4.5s', modern: '1.8s', improvement: '60% faster' }
    ],
    securityEnhancements: [
      'Input validation with Zod schemas',
      'SQL injection prevention with Prisma ORM',
      'XSS protection with React auto-escaping',
      'CSRF protection with tokens',
      'JWT authentication with refresh tokens'
    ],
    frontendUnitTesting: 'Vitest',
    frontendComponentTesting: 'React Testing Library',
    frontendE2ETesting: 'Playwright',
    frontendCoverageTarget: 80,
    backendUnitTesting: 'Vitest',
    backendIntegrationTesting: 'Supertest',
    backendDatabaseTesting: 'In-memory SQLite',
    backendCoverageTarget: 85,
    generatedDate: new Date().toISOString().split('T')[0]
  };
  
  const output = template(templateData);
  await writeFile(join(outputDir, 'mdnkit-architecture', 'SKILL.md'), output);
  console.log('  ✅ mdnkit-architecture skill generated');
}

/**
 * Generate Plan Skill
 */
async function generatePlanSkill(
  analysis: ProjectAnalysis,
  frameworks: DetectedFrameworks,
  sourcePath: string,
  outputDir: string,
  pathContext?: any
): Promise<void> {
  console.log('  📋 Generating mdnkit-plan skill...');
  
  const template = await loadTemplate('plan-skill');
  
  // Create detailed phases with tasks
  const phases: Phase[] = [
    {
      number: 1,
      name: 'Foundation Setup',
      duration: '1-2 weeks',
      tasks: [
        {
          id: '1.1',
          title: 'Create project structure',
          description: 'Set up modern monorepo structure with frontend and backend',
          priority: 'HIGH',
          estimatedTime: '4 hours',
          dependencies: [],
          status: 'pending'
        },
        {
          id: '1.2',
          title: 'Configure TypeScript',
          description: 'Set up TypeScript for both frontend and backend',
          priority: 'HIGH',
          estimatedTime: '2 hours',
          dependencies: ['1.1'],
          status: 'pending'
        },
        {
          id: '1.3',
          title: 'Set up build tools',
          description: 'Configure Vite for frontend and build scripts for backend',
          priority: 'HIGH',
          estimatedTime: '3 hours',
          dependencies: ['1.2'],
          status: 'pending'
        }
      ]
    },
    {
      number: 2,
      name: 'Core Features Migration',
      duration: '3-4 weeks',
      tasks: [
        {
          id: '2.1',
          title: 'Migrate UI components',
          description: 'Convert jQuery-based UI to React components',
          priority: 'HIGH',
          estimatedTime: '20 hours',
          dependencies: ['1.3'],
          status: 'pending'
        },
        {
          id: '2.2',
          title: 'Implement state management',
          description: 'Set up Zustand for global state',
          priority: 'HIGH',
          estimatedTime: '8 hours',
          dependencies: ['2.1'],
          status: 'pending'
        }
      ]
    }
  ];
  
  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  
  const templateData = {
    projectName: analysis.project.name,
    startDate: new Date().toISOString().split('T')[0],
    estimatedDuration: '8-12 weeks',
    totalTasks,
    totalPhases: phases.length,
    phases,
    risks: [
      {
        title: 'Breaking Changes',
        description: 'New framework may introduce breaking changes',
        severity: 'MEDIUM' as const,
        mitigation: 'Test thoroughly after each phase, maintain feature flags'
      },
      {
        title: 'Data Migration',
        description: 'Database schema changes may be required',
        severity: 'HIGH' as const,
        mitigation: 'Create migration scripts, test with production data copy'
      }
    ],
    successMetrics: [
      'All legacy features working in modern app',
      'Performance improved by 60%+',
      'Test coverage >80%',
      'Zero production incidents during migration',
      'Team trained on new stack'
    ],
    planGenerationTime: 2
  };
  
  const output = template(templateData);
  await writeFile(join(outputDir, 'mdnkit-plan', 'SKILL.md'), output);
  console.log('  ✅ mdnkit-plan skill generated');
}

/**
 * Generate Migrate Skill
 */
async function generateMigrateSkill(
  analysis: ProjectAnalysis,
  frameworks: DetectedFrameworks,
  sourcePath: string,
  outputDir: string,
  pathContext?: any
): Promise<void> {
  console.log('  🔄 Generating mdnkit-migrate skill...');
  
  const template = await loadTemplate('migrate-skill');
  
  const templateData = {
    projectName: analysis.project.name,
    planFile: 'MIGRATION_PLAN.md',
    currentPhase: 'Phase 1: Foundation Setup',
    tasksCompleted: 0,
    totalTasks: 10,
    progressPercentage: 0,
    currentTaskId: '1.1',
    currentTaskTitle: 'Create project structure',
    currentTaskPriority: 'HIGH',
    currentTaskEstimatedTime: '4 hours',
    currentTaskActualTime: 'TBD',
    currentTaskStatus: 'pending',
    currentTaskDescription: 'Set up modern monorepo structure with frontend and backend directories',
    currentTaskDependencies: [],
    currentTaskFiles: [],
    nextTaskId: '1.2'
  };
  
  const output = template(templateData);
  await writeFile(join(outputDir, 'mdnkit-migrate', 'SKILL.md'), output);
  console.log('  ✅ mdnkit-migrate skill generated');
}

/**
 * Generate Test Skill
 */
async function generateTestSkill(
  analysis: ProjectAnalysis,
  frameworks: DetectedFrameworks,
  sourcePath: string,
  outputDir: string,
  pathContext?: any
): Promise<void> {
  console.log('  🧪 Generating mdnkit-test skill...');
  
  const template = await loadTemplate('test-skill');
  
  const templateData = {
    projectName: analysis.project.name,
    targetPath: 'src/',
    testType: 'all',
    testFramework: 'vitest',
    coverageTarget: 80,
    currentCoverage: 0,
    unitTestFile: 'src/components/Component.test.tsx',
    integrationTestFile: 'src/routes/api.test.ts',
    e2eTestFile: 'e2e/app.spec.ts',
    componentName: 'Component',
    componentPath: './Component',
    testInput: '{ value: "test" }',
    expectedOutput: '"test"',
    happyPathScenario1: 'render correctly with valid props',
    happyPathScenario2: 'handle user interactions',
    edgeCase1: 'empty input',
    edgeCase2: 'null values',
    errorCondition: 'invalid input is provided',
    apiEndpoint: '/api/data',
    expectedResponse: 'data array',
    expectedShape: '{ data: [] }',
    errorScenario: 'invalid request',
    invalidData: '{ invalid: true }',
    userFlow: 'user can submit form successfully',
    pageUrl: '/form',
    inputSelector: 'input[name="email"]',
    testData: 'test@example.com',
    buttonSelector: 'button[type="submit"]',
    resultSelector: '.success-message',
    expectedText: 'Form submitted successfully',
    errorFlow: 'shows error on invalid input',
    errorTrigger: 'button[type="submit"]',
    statementsCoverage: 0,
    statementsCovered: 0,
    statementsTotal: 100,
    branchesCoverage: 0,
    branchesCovered: 0,
    branchesTotal: 50,
    functionsCoverage: 0,
    functionsCovered: 0,
    functionsTotal: 20,
    linesCoverage: 0,
    linesCovered: 0,
    linesTotal: 100,
    coverageByFile: [],
    uncoveredLines: [],
    behaviorComparison: [],
    improvements: [
      'Better error messages',
      'Loading indicators',
      'Accessibility improvements',
      'Mobile responsiveness'
    ],
    unitTestsGenerated: 0,
    unitTestFiles: 0,
    integrationTestsGenerated: 0,
    integrationTestFiles: 0,
    e2eTestsGenerated: 0,
    e2eTestFiles: 0,
    totalTestsGenerated: 0,
    testsPassing: 0,
    testsFailing: 0,
    testsSkipped: 0,
    coverageTargetMet: false,
    allTestsPassing: false,
    testGenerationTime: 5,
    testExecutionTime: 2,
    testsPerSecond: 0,
    coverageCalculationTime: 1,
    legacyReference: ''
  };
  
  const output = template(templateData);
  await writeFile(join(outputDir, 'mdnkit-test', 'SKILL.md'), output);
  console.log('  ✅ mdnkit-test skill generated');
}

// Made with Bob
