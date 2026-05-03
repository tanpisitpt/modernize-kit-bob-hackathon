/**
 * Code Analyzer Module
 * Analyzes JavaScript/TypeScript files for legacy patterns
 */

import { parse } from '@babel/parser';
import { readFile } from 'fs/promises';
import type {
  AnalyzeOptions,
  AnalysisResult,
  LegacyPatterns,
  ModernPatterns,
  ImportInfo,
  Issue
} from './types.js';

/**
 * Analyze a JavaScript/TypeScript file
 * @param filePath - Path to the file
 * @param options - Analysis options
 * @returns Analysis results
 */
export async function analyzeFile(filePath: string, options: AnalyzeOptions = {}): Promise<AnalysisResult> {
  const { verbose = false } = options;

  try {
    const code = await readFile(filePath, 'utf-8');
    
    // Parse the code into an AST
    let ast;
    try {
      ast = parse(code, {
        sourceType: 'unambiguous',
        plugins: ['jsx', 'typescript', 'decorators-legacy']
      });
    } catch (parseError) {
      // If parsing fails, fall back to regex-based analysis
      if (verbose) {
        console.warn(`Failed to parse ${filePath}, using regex fallback`);
      }
      return analyzeWithRegex(code, filePath);
    }

    // Detect patterns
    const legacyPatterns = detectLegacyPatterns(ast, code);
    const modernPatterns = detectModernPatterns(ast, code);
    const complexity = calculateComplexity(code);
    const imports = extractImports(code);

    return {
      file: filePath,
      legacyPatterns,
      modernPatterns,
      complexity,
      imports,
      issues: generateIssues(legacyPatterns, modernPatterns, filePath)
    };
  } catch (error) {
    const emptyLegacyPatterns: LegacyPatterns = {
      jquery: false,
      callbacks: false,
      var: false,
      commonjs: false,
      angularjs: false,
      promiseThen: false,
      globalVariables: false,
      documentWrite: false,
      eval: false,
      with: false
    };
    
    const emptyModernPatterns: ModernPatterns = {
      asyncAwait: false,
      esm: false,
      letConst: false,
      arrowFunctions: false,
      templateLiterals: false,
      destructuring: false,
      spread: false,
      classes: false,
      typescript: false
    };
    
    return {
      file: filePath,
      error: error instanceof Error ? error.message : String(error),
      legacyPatterns: emptyLegacyPatterns,
      modernPatterns: emptyModernPatterns,
      complexity: 0,
      imports: [],
      issues: []
    };
  }
}

/**
 * Detect legacy patterns in code
 * @param ast - Abstract Syntax Tree
 * @param code - Source code
 * @returns Detected legacy patterns
 */
export function detectLegacyPatterns(ast: any, code: string): LegacyPatterns {
  return {
    jquery: /\$\(|jQuery\(/.test(code),
    callbacks: /function\s*\(\s*err\s*,|callback\s*\(/.test(code),
    var: /\bvar\s+\w+/.test(code),
    commonjs: /require\(|module\.exports|exports\./.test(code),
    angularjs: /angular\.module|\$scope|\$http|\$q|\$rootScope/.test(code),
    promiseThen: /\.then\(/.test(code) && !/async|await/.test(code),
    globalVariables: /window\.\w+\s*=|global\.\w+\s*=/.test(code),
    documentWrite: /document\.write/.test(code),
    eval: /\beval\(/.test(code),
    with: /\bwith\s*\(/.test(code)
  };
}

/**
 * Detect modern patterns in code
 * @param ast - Abstract Syntax Tree
 * @param code - Source code
 * @returns Detected modern patterns
 */
export function detectModernPatterns(ast: any, code: string): ModernPatterns {
  return {
    asyncAwait: /async\s+function|async\s*\(|await\s+/.test(code),
    esm: /import\s+.*from|export\s+(default|const|function|class)/.test(code),
    letConst: /\b(let|const)\s+\w+/.test(code),
    arrowFunctions: /=>\s*{|=>\s*\w/.test(code),
    templateLiterals: /`.*\$\{/.test(code),
    destructuring: /const\s*{.*}|let\s*{.*}|const\s*\[.*\]|let\s*\[.*\]/.test(code),
    spread: /\.\.\./.test(code),
    classes: /\bclass\s+\w+/.test(code),
    typescript: /:\s*(string|number|boolean|any|void|Promise|Array)</.test(code)
  };
}

/**
 * Calculate code complexity (simplified cyclomatic complexity)
 * @param code - Source code
 * @returns Complexity score
 */
export function calculateComplexity(code: string): number {
  let complexity = 1; // Base complexity

  // Count decision points
  const patterns = [
    /\bif\s*\(/g,
    /\belse\s+if\s*\(/g,
    /\bfor\s*\(/g,
    /\bwhile\s*\(/g,
    /\bcase\s+/g,
    /\bcatch\s*\(/g,
    /\?\s*.*\s*:/g, // Ternary operators
    /&&|\|\|/g // Logical operators
  ];

  patterns.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) {
      complexity += matches.length;
    }
  });

  return complexity;
}

/**
 * Extract imports from code
 * @param code - Source code
 * @returns List of imports
 */
export function extractImports(code: string): ImportInfo[] {
  const imports: ImportInfo[] = [];

  // ES6 imports
  const es6ImportRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = es6ImportRegex.exec(code)) !== null) {
    imports.push({ type: 'esm', module: match[1] });
  }

  // CommonJS requires
  const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((match = requireRegex.exec(code)) !== null) {
    imports.push({ type: 'commonjs', module: match[1] });
  }

  return imports;
}

/**
 * Generate issues based on detected patterns
 * @param legacyPatterns - Detected legacy patterns
 * @param modernPatterns - Detected modern patterns
 * @param filePath - File path
 * @returns List of issues
 */
export function generateIssues(legacyPatterns: LegacyPatterns, modernPatterns: ModernPatterns, filePath: string): Issue[] {
  const issues: Issue[] = [];

  if (legacyPatterns.jquery) {
    issues.push({
      type: 'legacy-pattern',
      pattern: 'jquery',
      severity: 'high',
      message: 'jQuery usage detected. Consider migrating to modern DOM APIs or a modern framework.',
      file: filePath
    });
  }

  if (legacyPatterns.callbacks) {
    issues.push({
      type: 'legacy-pattern',
      pattern: 'callbacks',
      severity: 'medium',
      message: 'Callback-based code detected. Consider migrating to async/await.',
      file: filePath
    });
  }

  if (legacyPatterns.var) {
    issues.push({
      type: 'legacy-pattern',
      pattern: 'var',
      severity: 'low',
      message: 'var declarations detected. Use let/const instead.',
      file: filePath
    });
  }

  if (legacyPatterns.commonjs && !modernPatterns.esm) {
    issues.push({
      type: 'legacy-pattern',
      pattern: 'commonjs',
      severity: 'medium',
      message: 'CommonJS modules detected. Consider migrating to ES modules.',
      file: filePath
    });
  }

  if (legacyPatterns.angularjs) {
    issues.push({
      type: 'legacy-pattern',
      pattern: 'angularjs',
      severity: 'high',
      message: 'AngularJS 1.x patterns detected. Consider migrating to modern Angular or React.',
      file: filePath
    });
  }

  if (legacyPatterns.eval) {
    issues.push({
      type: 'security',
      pattern: 'eval',
      severity: 'critical',
      message: 'eval() usage detected. This is a security risk and should be removed.',
      file: filePath
    });
  }

  return issues;
}

/**
 * Fallback regex-based analysis when AST parsing fails
 * @param code - Source code
 * @param filePath - File path
 * @returns Analysis results
 */
function analyzeWithRegex(code: string, filePath: string): AnalysisResult {
  const legacyPatterns = detectLegacyPatterns(null, code);
  const modernPatterns = detectModernPatterns(null, code);
  const complexity = calculateComplexity(code);
  const imports = extractImports(code);

  return {
    file: filePath,
    legacyPatterns,
    modernPatterns,
    complexity,
    imports,
    issues: generateIssues(legacyPatterns, modernPatterns, filePath),
    parseError: true
  };
}

/**
 * Analyze multiple files
 * @param files - Array of file paths
 * @param options - Analysis options
 * @returns Analysis results for all files
 */
export async function analyzeFiles(files: string[], options: AnalyzeOptions = {}): Promise<AnalysisResult[]> {
  const results: AnalysisResult[] = [];
  
  for (const file of files) {
    const result = await analyzeFile(file, options);
    results.push(result);
  }

  return results;
}

// Made with Bob
