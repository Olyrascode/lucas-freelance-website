export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export type ScrollDirection = "up" | "down" | "idle";

export interface ScrollState {
  readonly direction: ScrollDirection;
  readonly y: number;
}
