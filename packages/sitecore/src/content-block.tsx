import { JSX } from 'react';
import { Text, RichText, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui/card';
import { ComponentProps } from './types';

type ContentBlockProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
  <Card className="contentBlock">
    <CardHeader>
      <CardTitle>
        <Text tag="h2" className="contentTitle" field={fields.heading} />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <RichText className="contentDescription" field={fields.content} />
    </CardContent>
  </Card>
);

export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
