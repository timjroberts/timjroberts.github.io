import React, { PropsWithChildren, useMemo } from "react";
import { BrandIcon } from "../brand-icon";

import "./styles.scss";

export type LinkProps = PropsWithChildren<{
  href: string;
}>

export const Link: React.FC<LinkProps> = ({ href, children }: LinkProps) => {
  let content = useMemo(
    () => href.startsWith('/')
          ? <span className="link-container">{children}</span>
          : href.includes("/github.com/")
            ? <span className="link-container">
                <BrandIcon brand="github" size="small" /> {children}
              </span>
            : children,
      []
  );

  return (
    <a href={href}>
      {content}
    </a>
  );
}