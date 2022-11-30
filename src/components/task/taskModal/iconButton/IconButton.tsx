import { ReactNode } from "react";

type IconButton = {
  Icon: string,
  isActive: boolean,
  color: string,
  children: ReactNode,
}

export function IconButton({ Icon, isActive, color, children, ...props }: IconButton) {
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
