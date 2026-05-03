/**
 * File Scanner Module
 * Scans project directories and categorizes files for analysis
 */

import fg from 'fast-glob';
import { readFile, stat } from 'fs/promises';
import { join, relative } from 'path';
import type { ScanOptions, ScanResult, FileCategories, ScanStats } from './types.js';

/**
 * Scan files in a directory
 * @param sourcePath - Path to scan
 * @param options - Scan options
 * @returns Categorized file list
 */
export async function scanFiles(sourcePath: string, options: ScanOptions = {}): Promise<ScanResult> {
  const {
    verbose = false,
    exclude = ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**', '**/coverage/**']
  } = options;

  // Define glob patterns for different file types
  const patterns = [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json'
  ];

  if (verbose) {
    console.log(`Scanning: ${sourcePath}`);
  }

  // Find all matching files
  const files = await fg(patterns, {
    cwd: sourcePath,
    ignore: exclude,
    absolute: true,
    dot: false
  });

  // Categorize files
  const categorized = await categorizeFiles(files, sourcePath);

  return categorized;
}

/**
 * Categorize files by type and purpose
 * @param files - Array of file paths
 * @param sourcePath - Base source path
 * @returns Categorized files
 */
export async function categorizeFiles(files: string[], sourcePath: string): Promise<ScanResult> {
  const categories: FileCategories = {
    javascript: [],
    typescript: [],
    jsx: [],
    tsx: [],
    json: [],
    config: [],
    test: []
  };

  const stats: ScanStats = {
    totalFiles: files.length,
    totalLines: 0,
    entryPoints: []
  };

  for (const file of files) {
    const relativePath = relative(sourcePath, file);
    const ext = file.split('.').pop()?.toLowerCase() || '';
    
    // Categorize by extension
    if (ext === 'js') {
      categories.javascript.push(relativePath);
    } else if (ext === 'ts') {
      categories.typescript.push(relativePath);
    } else if (ext === 'jsx') {
      categories.jsx.push(relativePath);
    } else if (ext === 'tsx') {
      categories.tsx.push(relativePath);
    } else if (ext === 'json') {
      categories.json.push(relativePath);
    }

    // Identify config files
    const fileName = file.split(/[/\\]/).pop()?.toLowerCase() || '';
    if (fileName.includes('config') || fileName === 'package.json' || 
        fileName.startsWith('.') || fileName.includes('rc')) {
      categories.config.push(relativePath);
    }

    // Identify test files
    if (fileName.includes('test') || fileName.includes('spec') || 
        relativePath.includes('__tests__') || relativePath.includes('/tests/')) {
      categories.test.push(relativePath);
    }

    // Identify entry points
    if (fileName === 'index.js' || fileName === 'index.ts' || 
        fileName === 'main.js' || fileName === 'main.ts' ||
        fileName === 'app.js' || fileName === 'app.ts' ||
        fileName === 'server.js' || fileName === 'server.ts') {
      stats.entryPoints.push(relativePath);
    }

    // Count lines
    try {
      const content = await readFile(file, 'utf-8');
      stats.totalLines += content.split('\n').length;
    } catch (error) {
      // Skip files that can't be read
    }
  }

  return {
    files: categories,
    stats
  };
}

/**
 * Get file content
 * @param filePath - Path to file
 * @returns File content
 */
export async function getFileContent(filePath: string): Promise<string> {
  return await readFile(filePath, 'utf-8');
}

/**
 * Check if path is a directory
 * @param path - Path to check
 * @returns True if directory
 */
export async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

// Made with Bob
