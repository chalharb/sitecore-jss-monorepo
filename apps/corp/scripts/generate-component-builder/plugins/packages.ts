import { ComponentBuilderPlugin, ComponentBuilderPluginConfig } from '..';
import { components as sitecoreComponents } from '@repo/sitecore-components/component-builder-config';

/**
 * Provides custom packages configuration
 */
class PackagesPlugin implements ComponentBuilderPlugin {
  order = 0;

  exec(config: ComponentBuilderPluginConfig) {
    config.packages = [];
    config.components = [...config.components, ...sitecoreComponents];

    return config;
  }
}

export const packagesPlugin = new PackagesPlugin();

