/**
 * Framework Detector Module
 * Detects frameworks, libraries, and build tools used in a project
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import semver from 'semver';
import type {
  PackageJson,
  DetectedFrameworks,
  FrameworkInfo,
  TestingFramework,
  StylingFramework,
  StateManagement,
  OutdatedDependency
} from './types.js';

/**
 * Detect frameworks and libraries in a project
 * @param sourcePath - Path to the project
 * @param packageJson - Parsed package.json
 * @returns Detected frameworks
 */
export async function detectFrameworks(sourcePath: string, packageJson: PackageJson | null = null): Promise<DetectedFrameworks> {
  // Load package.json if not provided
  let pkg: PackageJson;
  if (!packageJson) {
    try {
      const packagePath = join(sourcePath, 'package.json');
      const content = await readFile(packagePath, 'utf-8');
      pkg = JSON.parse(content);
    } catch (error) {
      pkg = {
        name: 'unknown',
        version: '0.0.0',
        dependencies: {},
        devDependencies: {}
      };
    }
  } else {
    pkg = packageJson;
  }

  const frameworks: DetectedFrameworks = {
    frontend: detectFrontendFramework(pkg, sourcePath),
    backend: detectBackendFramework(pkg, sourcePath),
    buildTool: detectBuildTool(pkg, sourcePath),
    testing: detectTestingFramework(pkg),
    styling: detectStylingFramework(pkg),
    stateManagement: detectStateManagement(pkg)
  };

  return frameworks;
}

/**
 * Detect frontend framework
 * @param packageJson - package.json content
 * @param sourcePath - Project path
 * @returns Frontend framework info
 */
export function detectFrontendFramework(packageJson: PackageJson, sourcePath: string): FrameworkInfo {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Check for jQuery (legacy)
  if (deps.jquery) {
    return {
      name: 'jQuery',
      version: deps.jquery,
      type: 'legacy',
      modernization: 'Consider migrating to React, Vue, or vanilla JS'
    };
  }

  // Check for AngularJS 1.x (legacy)
  if (deps.angular && !deps['@angular/core']) {
    return {
      name: 'AngularJS',
      version: deps.angular,
      type: 'legacy',
      modernization: 'Migrate to Angular (2+), React, or Vue'
    };
  }

  // Check for React
  if (deps.react) {
    return {
      name: 'React',
      version: deps.react,
      type: 'modern',
      modernization: null
    };
  }

  // Check for Vue
  if (deps.vue) {
    return {
      name: 'Vue.js',
      version: deps.vue,
      type: 'modern',
      modernization: null
    };
  }

  // Check for Angular (modern)
  if (deps['@angular/core']) {
    return {
      name: 'Angular',
      version: deps['@angular/core'],
      type: 'modern',
      modernization: null
    };
  }

  // Check for Svelte
  if (deps.svelte) {
    return {
      name: 'Svelte',
      version: deps.svelte,
      type: 'modern',
      modernization: null
    };
  }

  return {
    name: 'None',
    version: null,
    type: 'unknown',
    modernization: 'Consider using a modern framework like React or Vue'
  };
}

/**
 * Detect backend framework
 * @param packageJson - package.json content
 * @param sourcePath - Project path
 * @returns Backend framework info
 */
export function detectBackendFramework(packageJson: PackageJson, sourcePath: string): FrameworkInfo {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Check for Express
  if (deps.express) {
    const version = deps.express.replace(/[\^~]/, '');
    const isLegacy = semver.valid(version) && semver.lt(version, '4.0.0');
    
    return {
      name: 'Express',
      version: deps.express,
      type: isLegacy ? 'legacy' : 'modern',
      modernization: isLegacy ? 'Upgrade to Express 4.x or 5.x' : null
    };
  }

  // Check for Koa
  if (deps.koa) {
    return {
      name: 'Koa',
      version: deps.koa,
      type: 'modern',
      modernization: null
    };
  }

  // Check for Fastify
  if (deps.fastify) {
    return {
      name: 'Fastify',
      version: deps.fastify,
      type: 'modern',
      modernization: null
    };
  }

  // Check for NestJS
  if (deps['@nestjs/core']) {
    return {
      name: 'NestJS',
      version: deps['@nestjs/core'],
      type: 'modern',
      modernization: null
    };
  }

  // Check for Hapi
  if (deps['@hapi/hapi'] || deps.hapi) {
    return {
      name: 'Hapi',
      version: deps['@hapi/hapi'] || deps.hapi,
      type: 'modern',
      modernization: null
    };
  }

  return {
    name: 'None',
    version: null,
    type: 'unknown',
    modernization: null
  };
}

/**
 * Detect build tool
 * @param packageJson - package.json content
 * @param sourcePath - Project path
 * @returns Build tool info
 */
export function detectBuildTool(packageJson: PackageJson, sourcePath: string): FrameworkInfo {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Check for Webpack
  if (deps.webpack) {
    return {
      name: 'Webpack',
      version: deps.webpack,
      type: 'modern',
      modernization: null
    };
  }

  // Check for Vite
  if (deps.vite) {
    return {
      name: 'Vite',
      version: deps.vite,
      type: 'modern',
      modernization: null
    };
  }

  // Check for Parcel
  if (deps.parcel) {
    return {
      name: 'Parcel',
      version: deps.parcel,
      type: 'modern',
      modernization: null
    };
  }

  // Check for Rollup
  if (deps.rollup) {
    return {
      name: 'Rollup',
      version: deps.rollup,
      type: 'modern',
      modernization: null
    };
  }

  // Check for Gulp (legacy)
  if (deps.gulp) {
    return {
      name: 'Gulp',
      version: deps.gulp,
      type: 'legacy',
      modernization: 'Consider migrating to Webpack, Vite, or npm scripts'
    };
  }

  // Check for Grunt (legacy)
  if (deps.grunt) {
    return {
      name: 'Grunt',
      version: deps.grunt,
      type: 'legacy',
      modernization: 'Consider migrating to Webpack, Vite, or npm scripts'
    };
  }

  // Check for Browserify (legacy)
  if (deps.browserify) {
    return {
      name: 'Browserify',
      version: deps.browserify,
      type: 'legacy',
      modernization: 'Consider migrating to Webpack or Vite'
    };
  }

  return {
    name: 'None',
    version: null,
    type: 'unknown',
    modernization: 'Consider using a modern build tool like Vite or Webpack'
  };
}

/**
 * Detect testing framework
 * @param packageJson - package.json content
 * @returns Testing framework info
 */
export function detectTestingFramework(packageJson: PackageJson): TestingFramework[] {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };

  const frameworks: TestingFramework[] = [];

  if (deps.jest) frameworks.push({ name: 'Jest', version: deps.jest });
  if (deps.mocha) frameworks.push({ name: 'Mocha', version: deps.mocha });
  if (deps.vitest) frameworks.push({ name: 'Vitest', version: deps.vitest });
  if (deps.jasmine) frameworks.push({ name: 'Jasmine', version: deps.jasmine });
  if (deps.cypress) frameworks.push({ name: 'Cypress', version: deps.cypress });
  if (deps.playwright) frameworks.push({ name: 'Playwright', version: deps.playwright });

  return frameworks.length > 0 ? frameworks : [{ name: 'None', version: null }];
}

/**
 * Detect styling framework/library
 * @param packageJson - package.json content
 * @returns Styling framework info
 */
export function detectStylingFramework(packageJson: PackageJson): StylingFramework[] {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };

  const frameworks: StylingFramework[] = [];

  if (deps.sass || deps['node-sass']) frameworks.push({ name: 'Sass', version: deps.sass || deps['node-sass'] });
  if (deps.less) frameworks.push({ name: 'Less', version: deps.less });
  if (deps['styled-components']) frameworks.push({ name: 'Styled Components', version: deps['styled-components'] });
  if (deps['@emotion/react']) frameworks.push({ name: 'Emotion', version: deps['@emotion/react'] });
  if (deps.tailwindcss) frameworks.push({ name: 'Tailwind CSS', version: deps.tailwindcss });
  if (deps.bootstrap) frameworks.push({ name: 'Bootstrap', version: deps.bootstrap });

  return frameworks.length > 0 ? frameworks : [{ name: 'None', version: null }];
}

/**
 * Detect state management library
 * @param packageJson - package.json content
 * @returns State management info
 */
export function detectStateManagement(packageJson: PackageJson): StateManagement {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };

  if (deps.redux) {
    return {
      name: 'Redux',
      version: deps.redux,
      type: 'modern'
    };
  }

  if (deps.mobx) {
    return {
      name: 'MobX',
      version: deps.mobx,
      type: 'modern'
    };
  }

  if (deps.zustand) {
    return {
      name: 'Zustand',
      version: deps.zustand,
      type: 'modern'
    };
  }

  if (deps.recoil) {
    return {
      name: 'Recoil',
      version: deps.recoil,
      type: 'modern'
    };
  }

  return {
    name: 'None',
    version: null,
    type: 'unknown'
  };
}

/**
 * Analyze dependencies for outdated packages
 * @param packageJson - package.json content
 * @returns List of outdated dependencies
 */
export function analyzeOutdatedDependencies(packageJson: PackageJson): OutdatedDependency[] {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const outdated: OutdatedDependency[] = [];

  // Known legacy versions
  const legacyVersions: Record<string, string> = {
    'express': '4.0.0',
    'react': '16.0.0',
    'vue': '2.0.0',
    'angular': '2.0.0',
    'webpack': '4.0.0',
    'typescript': '4.0.0'
  };

  for (const [pkg, version] of Object.entries(deps)) {
    if (legacyVersions[pkg]) {
      const cleanVersion = version.replace(/[\^~]/, '');
      if (semver.valid(cleanVersion) && semver.lt(cleanVersion, legacyVersions[pkg])) {
        outdated.push({
          package: pkg,
          current: version,
          recommended: `^${legacyVersions[pkg]}`
        });
      }
    }
  }

  return outdated;
}

// Made with Bob
