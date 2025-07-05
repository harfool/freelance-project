import * as React from "react";
import badgeVariants from "./badge-variants";
import { cn } from "../../utils/utils.js";

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
