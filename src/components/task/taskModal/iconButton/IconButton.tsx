import { ReactNode } from "react";
import { IconType } from "react-icons";

type IconButtonProps = {
  Icon: IconType,
  isActive?: boolean,
  color?: string,
  children?: ReactNode,
  onClick?: () => void
}

export function IconButton({ Icon, isActive, color, children, ...props }: IconButtonProps) {
  console.log('Rerender from IconButton')


  return (
    <button
      className={`btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${color || ''
        }`}
      {...props}
    >
      <span className={`${children != null ? 'mr-1' : ''}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
