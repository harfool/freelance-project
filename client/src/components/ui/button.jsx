import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/utils.js";
import buttonVariants from "./button-variants";

function Button({ className, variant, size, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
}

const ForwardedButton = React.forwardRef(Button);
ForwardedButton.displayName = "Button";

export { ForwardedButton as Button };
