/**
 * Tests for utility functions
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  isPathOutsideWorkspace, 
  getProjectNameFromPath, 
  copySourceToWorkspace 
} from '../src/utils.js';
import { join, resolve } from 'path';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';

describe('isPathOutsideWorkspace', () => {
  it('should detect path outside workspace', () => {
    const workspacePath = '/home/user/workspace';
    const sourcePath = '/home/user/external/project';
    
    expect(isPathOutsideWorkspace(sourcePath, workspacePath)).toBe(true);
  });

  it('should detect path inside workspace', () => {
    const workspacePath = '/home/user/workspace';
    const sourcePath = '/home/user/workspace/examples/project';
    
    expect(isPathOutsideWorkspace(sourcePath, workspacePath)).toBe(false);
  });

  it('should handle relative paths', () => {
    const workspacePath = process.cwd();
    const sourcePath = './examples/test-app';
    
    expect(isPathOutsideWorkspace(sourcePath, workspacePath)).toBe(false);
  });

  it('should handle same path', () => {
    const workspacePath = '/home/user/workspace';
    const sourcePath = '/home/user/workspace';
    
    expect(isPathOutsideWorkspace(sourcePath, workspacePath)).toBe(false);
  });
});

describe('getProjectNameFromPath', () => {
  const testDir = join(process.cwd(), 'examples', 'test-temp-project');

  beforeEach(() => {
    // Create test directory
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should extract name from package.json', async () => {
    const packageJson = {
      name: 'my-legacy-app',
      version: '1.0.0'
    };
    
    writeFileSync(
      join(testDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    const name = await getProjectNameFromPath(testDir);
    expect(name).toBe('my-legacy-app');
  });

  it('should use directory name if no package.json', async () => {
    const name = await getProjectNameFromPath(testDir);
    expect(name).toBe('test-temp-project');
  });

  it('should use directory name if package.json has no name', async () => {
    const packageJson = {
      version: '1.0.0'
    };
    
    writeFileSync(
      join(testDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    const name = await getProjectNameFromPath(testDir);
    expect(name).toBe('test-temp-project');
  });
});

describe('copySourceToWorkspace', () => {
  const testSourceDir = join(process.cwd(), 'examples', 'test-source');
  const testWorkspaceDir = join(process.cwd(), 'examples', 'test-workspace');
  const projectName = 'test-project';

  beforeEach(() => {
    // Create test source directory with files
    if (!existsSync(testSourceDir)) {
      mkdirSync(testSourceDir, { recursive: true });
    }
    
    // Create some test files
    writeFileSync(join(testSourceDir, 'index.js'), 'console.log("test");');
    writeFileSync(join(testSourceDir, 'package.json'), '{"name":"test"}');
    
    // Create node_modules (should be excluded)
    mkdirSync(join(testSourceDir, 'node_modules'), { recursive: true });
    writeFileSync(join(testSourceDir, 'node_modules', 'test.js'), 'test');
    
    // Create .git (should be excluded)
    mkdirSync(join(testSourceDir, '.git'), { recursive: true });
    writeFileSync(join(testSourceDir, '.git', 'config'), 'test');

    // Create workspace directory
    if (!existsSync(testWorkspaceDir)) {
      mkdirSync(testWorkspaceDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test directories
    if (existsSync(testSourceDir)) {
      rmSync(testSourceDir, { recursive: true, force: true });
    }
    if (existsSync(testWorkspaceDir)) {
      rmSync(testWorkspaceDir, { recursive: true, force: true });
    }
  });

  it('should copy source to workspace', async () => {
    const targetPath = await copySourceToWorkspace(
      testSourceDir,
      projectName,
      testWorkspaceDir
    );

    expect(targetPath).toBe(join(testWorkspaceDir, 'legacy-apps', projectName));
    expect(existsSync(targetPath)).toBe(true);
    expect(existsSync(join(targetPath, 'index.js'))).toBe(true);
    expect(existsSync(join(targetPath, 'package.json'))).toBe(true);
  });

  it('should exclude node_modules', async () => {
    const targetPath = await copySourceToWorkspace(
      testSourceDir,
      projectName,
      testWorkspaceDir
    );

    expect(existsSync(join(targetPath, 'node_modules'))).toBe(false);
  });

  it('should exclude .git', async () => {
    const targetPath = await copySourceToWorkspace(
      testSourceDir,
      projectName,
      testWorkspaceDir
    );

    expect(existsSync(join(targetPath, '.git'))).toBe(false);
  });

  it('should create legacy-apps directory if not exists', async () => {
    const targetPath = await copySourceToWorkspace(
      testSourceDir,
      projectName,
      testWorkspaceDir
    );

    const legacyAppsDir = join(testWorkspaceDir, 'legacy-apps');
    expect(existsSync(legacyAppsDir)).toBe(true);
  });
});

// Made with Bob
