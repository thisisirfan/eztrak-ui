import { Tooltip } from 'react-tooltip';
import { ReactNode } from 'react';

interface ToolTipProps {
  text?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
}

const ToolTip = ({ text = "tool tip", placement = 'top', children }: ToolTipProps) => {
  const tooltipText = String(text);

  return (
    <>
      <div data-tooltip-id={tooltipText} data-tooltip-content={tooltipText}>
        {children}
      </div>
      <Tooltip style={{ color: "#fff", borderRadius: "5px", }} id={tooltipText} place={placement} />
    </>
  );
}

export default ToolTip;