import { JSX } from "react";
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from "@sitecore-jss/sitecore-jss-nextjs";
import { cn } from "@repo/ui/lib/utils";

interface ColumnSplitterProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ColumnSplitterProps): JSX.Element => {
  const styles = cn(
    "row",
    "component",
    "column-splitter",
    props?.params?.GridParameters,
    props?.params?.Styles,
  );
  const columnWidths = [
    props.params.ColumnWidth1,
    props.params.ColumnWidth2,
    props.params.ColumnWidth3,
    props.params.ColumnWidth4,
    props.params.ColumnWidth5,
    props.params.ColumnWidth6,
    props.params.ColumnWidth7,
    props.params.ColumnWidth8,
  ];
  const columnStyles = [
    props.params.Styles1,
    props.params.Styles2,
    props.params.Styles3,
    props.params.Styles4,
    props.params.Styles5,
    props.params.Styles6,
    props.params.Styles7,
    props.params.Styles8,
  ];
  const enabledPlaceholders = props.params.EnabledPlaceholders.split(",");
  const id = props.params.RenderingIdentifier;

  return (
    <div className={styles} id={id ? id : undefined}>
      {enabledPlaceholders.map((ph, index) => {
        const phKey = `column-${ph}-{*}`;
        const phStyles = cn(columnWidths[+ph - 1], columnStyles[+ph - 1]);

        return (
          <div key={index} className={phStyles}>
            <div className="row">
              <Placeholder name={phKey} rendering={props.rendering} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
