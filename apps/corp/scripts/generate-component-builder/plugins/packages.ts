import { ComponentBuilderPlugin, ComponentBuilderPluginConfig } from '..';

/**
 * Provides custom packages configuration
 */
class PackagesPlugin implements ComponentBuilderPlugin {
  order = 0;

  exec(config: ComponentBuilderPluginConfig) {
    config.packages = [];

    config.components = [
      ...config.components,
      {
        path: '@repo/sitecore-components/container',
        moduleName: 'Container',
        componentName: 'Container',
      },
      {
        path: '@repo/sitecore-components/content-block',
        moduleName: 'ContentBlock',
        componentName: 'ContentBlock',
      },
    ];

    return config;
  }
}

export const packagesPlugin = new PackagesPlugin();
