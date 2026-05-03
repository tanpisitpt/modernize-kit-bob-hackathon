/**
 * Type definitions for mdnkit
 */

export interface ScanOptions {
  verbose?: boolean;
  exclude?: string[];
}

export interface CopyOptions {
  originalPath?: string;
  copiedToWorkspace?: boolean;
}

export interface FileCategories {
  javascript: string[];
  typescript: string[];
  jsx: string[];
  tsx: string[];
  json: string[];
  config: string[];
  test: string[];
}

export interface ScanStats {
  totalFiles: number;
  totalLines: number;
  entryPoints: string[];
}

export interface ScanResult {
  files: FileCategories;
  stats: ScanStats;
}

export interface LegacyPatterns {
  jquery: boolean;
  callbacks: boolean;
  var: boolean;
  commonjs: boolean;
  angularjs: boolean;
  promiseThen: boolean;
  globalVariables: boolean;
  documentWrite: boolean;
  eval: boolean;
  with: boolean;
}

export interface ModernPatterns {
  asyncAwait: boolean;
  esm: boolean;
  letConst: boolean;
  arrowFunctions: boolean;
  templateLiterals: boolean;
  destructuring: boolean;
  spread: boolean;
  classes: boolean;
  typescript: boolean;
}

export interface ImportInfo {
  type: 'esm' | 'commonjs';
  module: string;
}

export interface Issue {
  type: string;
  pattern: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  file: string;
}

export interface AnalysisResult {
  file: string;
  legacyPatterns: LegacyPatterns;
  modernPatterns: ModernPatterns;
  complexity: number;
  imports: ImportInfo[];
  issues: Issue[];
  error?: string;
  parseError?: boolean;
}

export interface AnalyzeOptions {
  verbose?: boolean;
}

export interface FrameworkInfo {
  name: string;
  version: string | null;
  type: 'legacy' | 'modern' | 'unknown';
  modernization?: string | null;
}

export interface TestingFramework {
  name: string;
  version: string | null;
}

export interface StylingFramework {
  name: string;
  version: string | null;
}

export interface StateManagement {
  name: string;
  version: string | null;
  type: 'modern' | 'unknown';
}

export interface DetectedFrameworks {
  frontend: FrameworkInfo;
  backend: FrameworkInfo;
  buildTool: FrameworkInfo;
  testing: TestingFramework[];
  styling: StylingFramework[];
  stateManagement: StateManagement;
}

export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: any;
}

export interface OutdatedDependency {
  package: string;
  current: string;
  recommended: string;
}

export interface ProjectAnalysis {
  files: AnalysisResult[];
  stats: ScanStats;
  project: PackageJson;
}

// Skill Generation Types

export interface SkillMetadata {
  name: string;
  description: string;
  version: string;
  author: string;
  tags: string[];
}

export interface SkillParameter {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'object' | 'array';
  required: boolean;
  default?: any;
  description: string;
  options?: string[];
}

export interface SkillTemplate {
  metadata: SkillMetadata;
  parameters: SkillParameter[];
  content: string;
}

export interface AnalysisSkillData {
  project: {
    name: string;
    path: string;
    totalFiles: number;
    totalLines: number;
  };
  frameworks: DetectedFrameworks;
  legacyPatterns: {
    [key: string]: {
      count: number;
      files: string[];
    };
  };
  modernPatterns: {
    [key: string]: {
      count: number;
      files: string[];
    };
  };
  issues: Issue[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  task: string;
  effort: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  description?: string;
}

export interface TechnologyStack {
  frontend: {
    framework: string;
    version: string;
    language: string;
    stateManagement?: string;
    routing?: string;
    httpClient?: string;
    uiLibrary?: string;
    buildTool: string;
  };
  backend: {
    framework: string;
    version: string;
    language: string;
    orm?: string;
    validation?: string;
    authentication?: string;
    testing?: string;
  };
  devops: {
    packageManager: string;
    linting: string;
    testing: string;
    cicd?: string;
    containerization?: string;
  };
}

export interface FeatureMap {
  legacyFeature: string;
  modernImplementation: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  files?: string[];
}

export interface Phase {
  number: number;
  name: string;
  duration: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedTime: string;
  dependencies: string[];
  files?: string[];
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface ArchitectureSkillData {
  analysisResults: AnalysisSkillData;
  targetStack: TechnologyStack;
  systemArchitecture: {
    frontend: string; // Mermaid diagram
    backend: string; // Mermaid diagram
    dataFlow: string; // Mermaid diagram
  };
  featureMapping: FeatureMap[];
  migrationPhases: Phase[];
  performanceImprovements: {
    metric: string;
    legacy: string;
    modern: string;
    improvement: string;
  }[];
  securityEnhancements: string[];
}

export interface PlanSkillData {
  project: {
    name: string;
    startDate: string;
    estimatedDuration: string;
    totalTasks: number;
  };
  architectureDesign: ArchitectureSkillData;
  phases: Phase[];
  risks: Risk[];
  successMetrics: string[];
}

export interface Risk {
  title: string;
  description: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  mitigation: string;
}

export interface MigrationReport {
  taskId: string;
  taskTitle: string;
  estimatedTime: string;
  actualTime: string;
  status: 'completed' | 'failed' | 'in-progress';
  filesCreated: string[];
  filesModified: string[];
  filesDeleted: string[];
  testResults: {
    unit: { passed: number; total: number };
    integration: { passed: number; total: number };
    e2e: { passed: number; total: number };
    coverage: number;
  };
  performanceImpact?: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
}

export interface TestSkillData {
  targetPath: string;
  testType: 'unit' | 'integration' | 'e2e' | 'all';
  coverageTarget: number;
  framework: string;
  testsGenerated: number;
  coverage: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
  testFiles: {
    path: string;
    type: 'unit' | 'integration' | 'e2e';
    tests: number;
  }[];
}

// Made with Bob
