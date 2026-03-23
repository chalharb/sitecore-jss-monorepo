import { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { cn } from '@repo/ui/lib/utils';

interface ContainerProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const DefaultContainer = (props: ContainerProps): JSX.Element => {
  const containerStyles = props?.params?.Styles ?? '';
  const styles = cn('component', 'container-default', props?.params?.GridParameters, containerStyles);
  const phKey = `container-${props?.params?.DynamicPlaceholderId}`;
  const id = props?.params?.RenderingIdentifier;
  const mediaUrlPattern = new RegExp(/mediaurl=\"([^"]*)\"/, 'i');
  let backgroundImage = props?.params?.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage && backgroundImage.match(mediaUrlPattern)) {
    const mediaUrl = backgroundImage.match(mediaUrlPattern)?.[1] || '';

    backgroundStyle = {
      backgroundImage: `url('${mediaUrl}')`,
    };
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="row">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ContainerProps): JSX.Element => {
  const splitStyles = props.params?.Styles?.split(' ');

  if (splitStyles && splitStyles.includes('container')) {
    return (
      <div className="container-wrapper">
        <DefaultContainer {...props} />
      </div>
    );
  }

  return <DefaultContainer {...props} />;
};
