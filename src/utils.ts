/**
 * Utility Functions
 * Common helper functions used across the application
 */

import { readFile } from 'fs/promises';
import { join, resolve, relative, basename } from 'path';
import { copy, ensureDir } from 'fs-extra';
import type { PackageJson } from './types.js';

/**
 * Load and parse package.json
 * @param sourcePath - Path to the project
 * @returns Parsed package.json
 */
export async function loadPackageJson(sourcePath: string): Promise<PackageJson> {
  try {
    const packagePath = join(sourcePath, 'package.json');
    const content = await readFile(packagePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return {
      name: 'unknown',
      version: '0.0.0',
      dependencies: {},
      devDependencies: {}
    };
  }
}

/**
 * Format file size
 * @param bytes - Size in bytes
 * @returns Formatted size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format duration
 * @param ms - Duration in milliseconds
 * @returns Formatted duration
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${(ms / 60000).toFixed(2)}m`;
}

/**
 * Chunk array into smaller arrays
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Sleep for a duration
 * @param ms - Duration in milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get file extension
 * @param filePath - File path
 * @returns File extension
 */
export function getFileExtension(filePath: string): string {
  return filePath.split('.').pop()?.toLowerCase() || '';
}

/**
 * Check if file is a JavaScript file
 * @param filePath - File path
 * @returns True if JavaScript file
 */
export function isJavaScriptFile(filePath: string): boolean {
  const ext = getFileExtension(filePath);
  return ['js', 'jsx', 'ts', 'tsx'].includes(ext);
}

/**
 * Check if file is a config file
 * @param filePath - File path
 * @returns True if config file
 */
export function isConfigFile(filePath: string): boolean {
  const fileName = filePath.split(/[/\\]/).pop()?.toLowerCase() || '';
  return fileName.includes('config') ||
         fileName.startsWith('.') ||
         fileName.includes('rc') ||
         fileName === 'package.json';
}

/**
 * Check if file is a test file
 * @param filePath - File path
 * @returns True if test file
 */
export function isTestFile(filePath: string): boolean {
  const fileName = filePath.toLowerCase();
  return fileName.includes('test') || 
         fileName.includes('spec') || 
         fileName.includes('__tests__');
}

/**
 * Sanitize file path for display
 * @param filePath - File path
 * @returns Sanitized path
 */
export function sanitizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

/**
 * Calculate percentage
 * @param value - Current value
 * @param total - Total value
 * @returns Percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Group array by key
 * @param array - Array to group
 * @param key - Key or function to group by
 * @returns Grouped object
 */
export function groupBy<T extends Record<string, any>>(array: T[], key: string | ((item: T) => string)): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, item: T) => {
    const groupKey = typeof key === 'function' ? key(item) : String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

/**
 * Remove duplicates from array
 * @param array - Array with duplicates
 * @returns Array without duplicates
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Sort array by property
 * @param array - Array to sort
 * @param property - Property to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array
 */
export function sortBy<T>(array: T[], property: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return array.sort((a: T, b: T) => {
    const aVal = a[property];
    const bVal = b[property];
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
}

/**
 * Truncate string
 * @param str - String to truncate
 * @param length - Max length
 * @returns Truncated string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length - 3) + '...';
}

/**
 * Pluralize word
 * @param word - Word to pluralize
 * @param count - Count
 * @returns Pluralized word
 */
export function pluralize(word: string, count: number): string {
  return count === 1 ? word : `${word}s`;
}

/**
 * Format number with commas
 * @param num - Number to format
 * @returns Formatted number
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Deep clone object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge objects deeply
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output: any = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceValue = (source as any)[key];
      if (isObject(sourceValue)) {
        if (!(key in target)) {
          output[key] = sourceValue;
        } else {
          output[key] = deepMerge((target as any)[key], sourceValue);
        }
      } else {
        output[key] = sourceValue;
      }
    });
  }
  
  return output;
}

/**
 * Check if value is an object
 * @param item - Value to check
 * @returns True if object
 */
function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Retry async function
 * @param fn - Function to retry
 * @param retries - Number of retries
 * @param delay - Delay between retries
 * @returns Result
 */
export async function retry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay);
  }
}

/**
 * Create progress bar
 * @param current - Current value
 * @param total - Total value
 * @param width - Bar width
 * @returns Progress bar
 */
export function createProgressBar(current: number, total: number, width = 20): string {
  const percentage = current / total;
  const filled = Math.round(width * percentage);
  const empty = width - filled;
  
  return `[${'█'.repeat(filled)}${' '.repeat(empty)}] ${Math.round(percentage * 100)}%`;
}

/**
 * Check if a path is outside the current workspace
 * @param sourcePath - Path to check
 * @param workspacePath - Current workspace path
 * @returns True if path is outside workspace
 */
export function isPathOutsideWorkspace(sourcePath: string, workspacePath: string): boolean {
  const resolvedSource = resolve(sourcePath);
  const resolvedWorkspace = resolve(workspacePath);
  return !resolvedSource.startsWith(resolvedWorkspace);
}

/**
 * Get project name from path or package.json
 * @param sourcePath - Source path
 * @returns Project name
 */
export async function getProjectNameFromPath(sourcePath: string): Promise<string> {
  try {
    const packagePath = join(sourcePath, 'package.json');
    const content = await readFile(packagePath, 'utf-8');
    const packageJson = JSON.parse(content);
    return packageJson.name || basename(sourcePath);
  } catch {
    return basename(sourcePath);
  }
}

/**
 * Copy source code to workspace for reference
 * @param sourcePath - Original source path
 * @param projectName - Project name for directory
 * @param workspacePath - Workspace path
 * @returns New path to copied source
 */
export async function copySourceToWorkspace(
  sourcePath: string,
  projectName: string,
  workspacePath: string
): Promise<string> {
  const targetPath = join(workspacePath, 'legacy-apps', projectName);
  
  // Ensure target directory exists
  await ensureDir(join(workspacePath, 'legacy-apps'));
  
  // Copy with filters
  await copy(sourcePath, targetPath, {
    filter: (src: string) => {
      const relativePath = relative(sourcePath, src);
      
      // Exclude common directories that shouldn't be copied
      const excludePatterns = [
        'node_modules',
        '.git',
        'dist',
        'build',
        'coverage',
        '.next',
        '.nuxt',
        'out',
        'target',
        '.cache',
        'tmp',
        'temp'
      ];
      
      // Check if path contains any excluded pattern
      return !excludePatterns.some(pattern => {
        const parts = relativePath.split(/[/\\]/);
        return parts.includes(pattern);
      });
    }
  });
  
  return targetPath;
}

// Made with Bob
