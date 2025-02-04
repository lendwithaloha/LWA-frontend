export type SideNavLink = {
  key: string;
  route: string;
  active?: boolean;
  expand?: boolean;
  status?: "complete" | "partial" | "error" | "warning" | "incomplete" | undefined ;
  disabled?: boolean;
  children?: SideNavLink[];
};
