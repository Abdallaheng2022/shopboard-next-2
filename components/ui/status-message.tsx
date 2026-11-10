// status-message.tsx: ours. The box for empty, "no match" and error messages (DESIGN.md
// "Status and empty messages"). It knows nothing about what failed: it gets a message,
// optionally a title (children, shown first) and an action (a button or a link) under it.
import * as React from "react";
import { cn } from "@/lib/utils";

interface StatusMessageProps extends React.ComponentProps<"div"> {
  message: string;
  action?: React.ReactNode;
}

function StatusMessage({ message, action, className, children, ...props }: StatusMessageProps) {
  return (
    <div
      role="status"
      data-slot="status-message"
      className={cn(
        "grid justify-items-center gap-3 rounded-md border border-dashed border-border bg-card p-5 text-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <p>{message}</p>
      {action}
    </div>
  );
}

export { StatusMessage };
