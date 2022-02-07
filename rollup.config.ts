/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import pluginTypescript from '@rollup/plugin-typescript';
import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginNodeResolve from '@rollup/plugin-node-resolve';

import { terser } from 'rollup-plugin-terser';
import multiInput from 'rollup-plugin-multi-input';

/* -------------------------- Internal Dependencies ------------------------- */
import pkg from './package.json';
import defaultTsConfig from './tsconfig.json';

const moduleName = pkg.name.replace(/^@.*\//, '');
const inputFileName = ['src/**/*.ts'];

const author = pkg.author;

const bundles = {
  es: 'dist/bundle-es',
  cjs: 'dist/bundle-cjs',
  browser: 'dist/bundle-browser',
};

const banner = `
  /**
   * ${moduleName}.js 
   * @summary ${pkg.description}
   * @version v${pkg.version}
   * @author  ${author}
   * @license Released under the ${pkg.license} license.
   * @copyright Adenekan Wonderful 2021
   */
`;

const pluginsSetups = bundle => ({
  external: ['react', 'react-dom'],
  plugins: [
    multiInput(),
    pluginTypescript({
      ...defaultTsConfig.compilerOptions,
      ...{
        declaration: true,
        emitDeclarationOnly: true,
        outDir: `${bundle}`,
        declarationDir: `${bundle}`,
        exclude: ['node_modules', 'dist'],
      },
    }),

    pluginCommonjs({
      extensions: ['.ts', '.tsx'],
    }),

    pluginNodeResolve({
      browser: bundle === bundles.browser ? true : false,
    }),
  ],
});

export default [
  {
    input: inputFileName,
    output: [
      {
        name: moduleName,
        dir: bundles.browser,
        format: 'esm',
        sourcemap: 'inline',
        banner,
        plugins: [terser()],
      },
    ],
    ...pluginsSetups(bundles.browser),
  },

  // ES
  {
    input: inputFileName,
    output: [
      {
        dir: bundles.es,
        format: 'es',
        sourcemap: 'inline',
        banner,
        exports: 'named',
      },
    ],
    ...pluginsSetups(bundles.es),
  },

  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        dir: bundles.cjs,
        format: 'cjs',
        sourcemap: 'inline',
        banner,
        exports: 'named',
      },
    ],
    ...pluginsSetups(bundles.cjs),
  },
];
