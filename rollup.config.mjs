import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      name: 'logReporting',
      entryFileNames: '[name].cjs.js',
    },
    plugins: [resolve(), commonjs(), typescript(), json(), uglify()],
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      name: 'logReporting',
      entryFileNames: '[name].esm.js',
    },
    plugins: [resolve(), commonjs(), typescript(), json(), uglify()],
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'logReporting',
      entryFileNames: '[name].umd.js',
    },
    plugins: [resolve(), commonjs(), typescript(), json(), uglify()],
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'dist',
      format: 'amd',
      name: 'logReporting',
      entryFileNames: '[name].amd.js',
    },
    plugins: [resolve(), commonjs(), typescript(), json(), uglify()],
  },
];
