import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const configs = [];

const packages = [
  {
    name: 'core',
    desc: 'log-repeorting核心代码',
  },
  {
    name: 'logger',
    desc: 'log-repeorting logger',
  },
];

const sourcemap = false;

const plugins = [
  resolve(),
  commonjs(),
  typescript(),
  json(),
  uglify(),
  esbuild({ target: 'esnext' }),
];
const external = ['fs', 'path', 'ts-node', 'typescript'];

for (const pck of packages) {
  const input = `packages/${pck.name}`;

  const _output = [
    {
      file: `${input}/dist/index.cjs`,
      format: 'cjs',
      sourcemap,
    },
    {
      file: `${input}/dist/index.mjs`,
      format: 'esm',
      sourcemap,
    },
    {
      file: `${input}/dist/index.iife.min.js`,
      format: 'iife',
      sourcemap,
      plugins: [],
    },
  ];

  const _configs = [
    {
      input: `${input}/index.ts`,
      output: _output,
      plugins,
      external,
    },
    {
      input: `${input}/index.ts`,
      output: {
        file: `${input}/dist/index.d.ts`,
        format: 'esm',
        sourcemap,
      },
      plugins: [dts()],
      external,
    },
  ];

  configs.push(..._configs);
}

export default configs;
