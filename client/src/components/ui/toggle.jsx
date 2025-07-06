"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "../../utils/utils.js";
import { toggleVariants } from "./toggle-variants";

const Toggle = React.forwardRef(function Toggle(
  { className, variant, size, ...props },
  ref
) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
});
Toggle.displayName = "Toggle";

export { Toggle };
