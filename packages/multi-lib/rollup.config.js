const SECONDARY_LIBS = ['secondary'];
const SECONDARY_PATH = SECONDARY_LIBS.map(
  (p) => `packages/multi-lib/src/${p}/index.ts`
);

module.exports = (config) => {
  return {
    ...config,
    input: [config.input, ...SECONDARY_PATH],
    output: {
      ...config.output,
      inlineDynamicImports: false,
      entryFileNames: ({ facadeModuleId }) => {
        const index = SECONDARY_PATH.findIndex((pth) =>
          facadeModuleId.endsWith(pth)
        );
        return index >= 0
          ? `src/${facadeModuleId.split('/').at(-2)}/index.js`
          : '[name].js';
      },
    },
  };
};
