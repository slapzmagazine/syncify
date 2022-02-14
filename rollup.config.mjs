import { rollup, config, plugin, env } from '@brixtol/rollup-config';

export default rollup(
  {
    input: 'src/index.ts',
    external: [
      'ansis',
      'anymatch',
      'axios',
      'chokidar',
      'cross-spawn',
      'dotenv',
      'fast-safe-stringify',
      'fs-extra',
      'glob',
      'html-minifier-terser',
      'minimist',
      'prompts',
      'yamljs',
      'browser-sync',
      'postcss',
      'sass',
      'svg-sprite',
      'svgo'
    ],
    output: [
      {
        format: 'es',
        file: 'package/index.mjs',
        sourcemap: 'hidden',
        preferConst: true,
        esModule: true,
        exports: 'named',
        chunkFileNames: '[name].js',

        plugins: env.is('prod', [
          plugin.esminify(),
          plugin.filesize(
            {
              showGzippedSize: false,
              showMinifiedSize: true
            }
          )
        ])
      },
      {
        format: 'cjs',
        file: 'package/index.js',
        sourcemap: 'hidden',
        preferConst: true,
        esModule: false,
        exports: 'named',
        chunkFileNames: '[name].js',
        plugins: env.is('prod', [
          plugin.esminify(),
          plugin.filesize(
            {
              showGzippedSize: false,
              showMinifiedSize: true
            }
          )
        ])
      }
    ],
    plugins: [
      plugin.del(
        {
          verbose: true,
          runOnce: true,
          targets: 'package/*'
        }
      ),
      plugin.alias(
        {
          customResolver: plugin.resolve({
            extensions: [ '.ts' ]
          }),
          entries: config.alias([
            'cli',
            'config',
            'logs',
            'shared',
            'requests',
            'modes',
            'transform'
          ])
        }
      ),
      plugin.replace(
        {
          preventAssignment: true,
          delimiters: [ '<!', '!>' ],
          values: {
            version: config.package.version
          }
        }
      ),
      plugin.json(),
      plugin.esbuild(
        {
          loaders: {
            '.json': 'json'
          }
        }
      ),
      plugin.resolve(
        {
          preferBuiltins: true,
          extensions: [ '.ts', '.js' ]
        }
      ),
      plugin.commonjs(
        {
          requireReturnsDefault: 'auto',
          extensions: [ '.ts', '.js' ]
        }
      ),
      plugin.beep()
    ]
  }
);
