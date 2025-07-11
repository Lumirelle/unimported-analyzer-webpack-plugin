/**
 * Default options.
 */
const DEFAULT_OPTIONS = {
  preset: 'common',
  /**
   * Default ignores, will be merged with any other preset ignores.
   */
  ignores: [
    // node_modules & build output
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
    'bin/**/*',
    // config files
    '*.config.*',
    // profiles
    '*.properties',
    '*.json',
    '*.yaml',
    '*.yml',
    '*.toml',
    // package manager files
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',
    'bun.lockb',
    // dot dirs & dot files
    '.*/**/*',
    '**/.*',
    // documentation files
    '**/*.md',
    '**/*.txt',
    '**/LICENSE',
    // scripts
    '**/*.sh',
    '**/*.bat',
    '**/*.ps1',
    'sudo',
    // non-source files
    '**/*.d.ts',
    '**/*.map',
    '**/*.min.*',
  ],
  important: [],
  output: '.unimported/unimported-files.json',
  debug: false,
}

/**
 * Preset options.
 */
const PRESET_OPTIONS = {
  /**
   * Common preset -- Default
   */
  common: {
    src: './',
    ignores: [
      ...DEFAULT_OPTIONS.ignores,
    ],
    important: DEFAULT_OPTIONS.important,
    output: DEFAULT_OPTIONS.output,
    debug: DEFAULT_OPTIONS.debug,
  },

  /**
   * Webpack preset
   */
  webpack: {
    src: './src',
    ignores: [
      ...DEFAULT_OPTIONS.ignores,
    ],
    important: DEFAULT_OPTIONS.important,
    output: DEFAULT_OPTIONS.output,
    debug: DEFAULT_OPTIONS.debug,
  },

  /**
   * Vue preset
   */
  vue: {
    src: './src',
    ignores: [
      ...DEFAULT_OPTIONS.ignores,
    ],
    important: DEFAULT_OPTIONS.important,
    output: DEFAULT_OPTIONS.output,
    debug: DEFAULT_OPTIONS.debug,
  },

  /**
   * Nuxt preset
   */
  nuxt: {
    src: './',
    ignores: [
      ...DEFAULT_OPTIONS.ignores,
      'app/**/*',
      'modules/**/*',
      'router/**/*',
      'app.html',
    ],
    important: DEFAULT_OPTIONS.important,
    output: DEFAULT_OPTIONS.output,
    debug: DEFAULT_OPTIONS.debug,
  },
}

/**
 * Gets the merged configuration options
 *
 * @param {object} userOptions Options provided by the user
 * @returns {object} Merged options
 */
function getMergedOptions(userOptions = {}) {
  const preset = userOptions.preset || DEFAULT_OPTIONS.preset

  if (!PRESET_OPTIONS[preset]) {
    throw new Error(`Preset "${preset}" is not supported.`)
  }

  const presetOptions = PRESET_OPTIONS[preset]

  return {
    preset,
    src: userOptions.src || presetOptions.src,
    ignores: [...presetOptions.ignores, ...(userOptions.ignores || [])],
    important: userOptions.important || presetOptions.important,
    output: userOptions.output || presetOptions.output,
    debug: userOptions.debug || presetOptions.debug,
  }
}

module.exports = {
  getMergedOptions,
}
