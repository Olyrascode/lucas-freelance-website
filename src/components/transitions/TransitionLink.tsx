"use client";

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useTransition } from "./TransitionProvider";

export interface TransitionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  readonly href: string;
}

function shouldBypass(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}

// Drop-in replacement for next/link that routes the click through the
// page-transition provider. External links, modified clicks, and hash-only
// targets fall through to default browser behavior.
export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, onClick, children, ...rest }, ref) {
    const { navigate } = useTransition();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (shouldBypass(event)) return;
      if (isExternalHref(href)) return;
      if (href.startsWith("#")) return;

      event.preventDefault();
      navigate(href);
    };

    return (
      <a ref={ref} href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  },
);
