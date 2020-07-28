import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import { terser } from 'rollup-plugin-terser';

export default {
  external: ['react'],
  input: ['src/**/*.js', 'src/core/**/*.js'],
  output: [
    {
      dir: 'bundle-es',
      format: 'es',
      name: 'bundle',
      plugins: [
        terser({
          include: ['core/**/*.js'],
          exclude: ['index.js'],
        }),
      ],
    },
    {
      dir: 'bundle-cjs',
      format: 'cjs',
      exports: 'named',
      name: 'bundle',
      plugins: [
        terser({
          include: ['core/**/*.js'],
          exclude: ['index.js'],
        }),
      ],
    },
    {
      name: 'bundle',
      dir: 'bundle-umd',
      format: 'esm',
      exports: 'named',
      plugins: [
        terser({
          include: ['core/**/*.js'],
          exclude: ['index.js'],
        }),
      ],
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    multiInput(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
  ],
};
