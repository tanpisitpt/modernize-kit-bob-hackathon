#!/usr/bin/env node

/**
 * mdnkit CLI - Legacy Application Modernization Toolkit
 * Analyzes legacy JavaScript/TypeScript applications and generates IBM Bob Skills
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { scanFiles } from './scanner.js';
import { analyzeFiles } from './analyzer.js';
import { detectFrameworks } from './detector.js';
import { generateSkills } from './generator.js';
import {
  loadPackageJson,
  isPathOutsideWorkspace,
  getProjectNameFromPath,
  copySourceToWorkspace
} from './utils.js';
import type { ProjectAnalysis } from './types.js';

interface InitOptions {
  sourcePath: string;
  outputDir: string;
  copy: boolean;
  verbose: boolean;
}

interface AnalyzeOptions {
  verbose: boolean;
}

interface DetectOptions {
  sourcePath: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

const program = new Command();

program
  .name('mdnkit')
  .description('AI-powered legacy application modernization toolkit')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize analysis of a legacy application')
  .option('-s, --source-path <path>', 'Path to the legacy application source code', '.')
  .option('-o, --output-dir <path>', 'Output directory for Bob Skills', './.bob/skills')
  .option('--no-copy', 'Skip copying source code to workspace (use original path)')
  .option('-v, --verbose', 'Enable verbose logging', false)
  .action(async (options: InitOptions) => {
    const startTime = Date.now();
    const spinner: Ora = ora('Initializing mdnkit analysis...').start();
    
    try {
      console.log(chalk.blue('\n🔍 mdnkit - Legacy Application Modernization Toolkit\n'));
      
      const sourcePath = resolve(options.sourcePath);
      const outputDir = resolve(options.outputDir);
      const workspacePath = process.cwd();
      
      // Determine if we need to copy the source
      let actualSourcePath = sourcePath;
      let copiedToWorkspace = false;
      let originalPath = sourcePath;
      
      if (options.copy !== false) {
        const isOutside = isPathOutsideWorkspace(sourcePath, workspacePath);
        
        if (isOutside) {
          const projectName = await getProjectNameFromPath(sourcePath);
          const targetPath = join(workspacePath, 'legacy-apps', projectName);
          
          // Check if copy already exists
          if (existsSync(targetPath)) {
            actualSourcePath = targetPath;
            copiedToWorkspace = true;
            spinner.info(chalk.cyan(`ℹ Using existing copy: legacy-apps/${projectName}`));
            
            if (options.verbose) {
              console.log(chalk.gray(`  Original: ${sourcePath}`));
              console.log(chalk.gray(`  Existing copy: ${actualSourcePath}`));
              console.log(chalk.gray(`  Tip: Delete the copy to create a fresh snapshot`));
            }
          } else {
            spinner.text = 'Copying source code to workspace...';
            
            try {
              actualSourcePath = await copySourceToWorkspace(sourcePath, projectName, workspacePath);
              copiedToWorkspace = true;
              spinner.succeed(chalk.green(`✓ Source copied to workspace: legacy-apps/${projectName}`));
              
              if (options.verbose) {
                console.log(chalk.gray(`  Original: ${sourcePath}`));
                console.log(chalk.gray(`  Workspace: ${actualSourcePath}`));
              }
            } catch (error) {
              spinner.warn(chalk.yellow('⚠ Failed to copy source, using original path'));
              if (options.verbose) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error(chalk.gray(`  Reason: ${errorMessage}`));
                console.log(chalk.gray('  Analysis will proceed using the original path'));
              }
              actualSourcePath = sourcePath;
            }
          }
        } else {
          if (options.verbose) {
            console.log(chalk.cyan('ℹ Source is already in workspace, using original path\n'));
          }
        }
      } else {
        if (options.verbose) {
          console.log(chalk.cyan('ℹ Skipping copy (--no-copy flag set)\n'));
        }
      }
      
      console.log(chalk.gray(`Source Path: ${actualSourcePath}`));
      console.log(chalk.gray(`Output Directory: ${outputDir}`));
      console.log(chalk.gray(`Verbose: ${options.verbose}\n`));
      
      // Step 1: Load package.json
      spinner.start('Loading project configuration...');
      const projectPackageJson = await loadPackageJson(actualSourcePath);
      if (options.verbose) {
        console.log(chalk.gray(`\nProject: ${projectPackageJson.name} v${projectPackageJson.version}`));
      }
      
      // Step 2: Scan files
      spinner.start('Scanning project files...');
      const scanResult = await scanFiles(actualSourcePath, { verbose: options.verbose });
      const jsFiles = [
        ...scanResult.files.javascript.map(f => join(actualSourcePath, f)),
        ...scanResult.files.jsx.map(f => join(actualSourcePath, f)),
        ...scanResult.files.typescript.map(f => join(actualSourcePath, f)),
        ...scanResult.files.tsx.map(f => join(actualSourcePath, f))
      ];
      
      spinner.succeed(chalk.green(`Found ${scanResult.stats.totalFiles} files (${scanResult.stats.totalLines.toLocaleString()} lines)`));
      
      if (options.verbose) {
        console.log(chalk.gray(`  JavaScript: ${scanResult.files.javascript.length}`));
        console.log(chalk.gray(`  TypeScript: ${scanResult.files.typescript.length}`));
        console.log(chalk.gray(`  JSX: ${scanResult.files.jsx.length}`));
        console.log(chalk.gray(`  TSX: ${scanResult.files.tsx.length}`));
      }
      
      // Step 3: Analyze code patterns
      spinner.start('Analyzing code patterns...');
      const analysisResults = await analyzeFiles(jsFiles, { verbose: options.verbose });
      
      const issueCount = analysisResults.reduce((sum, r) => sum + (r.issues?.length || 0), 0);
      spinner.succeed(chalk.green(`Analyzed ${analysisResults.length} files, found ${issueCount} issues`));
      
      // Step 4: Detect frameworks
      spinner.start('Detecting frameworks and libraries...');
      const frameworks = await detectFrameworks(actualSourcePath, projectPackageJson);
      
      spinner.succeed(chalk.green('Framework detection complete'));
      if (options.verbose) {
        console.log(chalk.gray(`  Frontend: ${frameworks.frontend.name} ${frameworks.frontend.version || ''}`));
        console.log(chalk.gray(`  Backend: ${frameworks.backend.name} ${frameworks.backend.version || ''}`));
        console.log(chalk.gray(`  Build Tool: ${frameworks.buildTool.name} ${frameworks.buildTool.version || ''}`));
      }
      
      // Step 5: Generate Bob Skills
      spinner.start('Generating Bob Skills...');
      const analysis = {
        files: analysisResults,
        stats: scanResult.stats,
        project: projectPackageJson
      };
      
      await generateSkills(analysis, frameworks, actualSourcePath, outputDir, {
        originalPath,
        copiedToWorkspace
      });
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      spinner.succeed(chalk.green(`Bob Skills generated in ${duration}s`));
      
      console.log(chalk.green('\n✅ Analysis complete!\n'));
      console.log(chalk.gray(`Generated files in: ${outputDir}`));
      console.log(chalk.cyan('  📊 mdnkit-analysis/SKILL.md'));
      console.log(chalk.cyan('  🏗️  mdnkit-architecture/SKILL.md'));
      console.log(chalk.cyan('  📋 mdnkit-plan/SKILL.md'));
      console.log(chalk.cyan('  🔄 mdnkit-migrate/SKILL.md'));
      console.log(chalk.cyan('  🧪 mdnkit-test/SKILL.md\n'));
      
      console.log(chalk.yellow('💡 Next steps:'));
      console.log(chalk.gray('  1. Review the generated Bob Skills files'));
      console.log(chalk.gray('  2. Use Bob to invoke skills:'));
      console.log(chalk.gray(`     "Bob, use mdnkit-analysis to analyze ${projectPackageJson.name}"`));
      console.log(chalk.gray(`     "Bob, use mdnkit-architecture to design modern architecture"`));
      console.log(chalk.gray(`     "Bob, use mdnkit-plan to create implementation plan"`));
      console.log(chalk.gray('  3. Start the modernization process\n'));
      
    } catch (error) {
      spinner.fail(chalk.red('Analysis failed'));
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : '';
      console.error(chalk.red(`\nError: ${errorMessage}`));
      if (options.verbose && errorStack) {
        console.error(chalk.gray(errorStack));
      }
      process.exit(1);
    }
  });

program
  .command('analyze')
  .description('Analyze a specific file or directory')
  .argument('<path>', 'Path to file or directory to analyze')
  .option('-v, --verbose', 'Enable verbose logging', false)
  .action(async (path: string, options: AnalyzeOptions) => {
    console.log(chalk.blue('\n🔍 Analyzing:', path));
    console.log(chalk.yellow('\n⚠️  This command is not yet implemented\n'));
    // TODO: Implement file/directory analysis
  });

program
  .command('detect')
  .description('Detect frameworks and libraries in a project')
  .option('-s, --source-path <path>', 'Path to the project', '.')
  .action(async (options: DetectOptions) => {
    console.log(chalk.blue('\n🔍 Detecting frameworks in:', options.sourcePath));
    console.log(chalk.yellow('\n⚠️  This command is not yet implemented\n'));
    // TODO: Implement framework detection
  });

program.parse();

// Made with Bob
