import React, { PropsWithChildren, useMemo } from "react";
import { BrandIcon } from "../brand-icon";

import "./styles.scss";

export type LinkProps = PropsWithChildren<{
  href: string;
}>

export const Link: React.FC<LinkProps> = ({ href, children }: LinkProps) => {
  const content = useMemo(
    () => href.startsWith('/')
          ? <span className="link-container">{children}</span>
          : href.includes("/github.com/")
            ? <span className="link-container">
                <BrandIcon brand="github" size="small" /> {children}
              </span>
            : children,
      []
  );
  const target = href.startsWith('/') ? "_self" : "_blank";

  return (
    <a href={href} target={target}>
      {content}
    </a>
  );
}