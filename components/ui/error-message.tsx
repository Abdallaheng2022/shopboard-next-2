// error-message.tsx: ours. What every error.tsx shows: a fixed message and "Try again".
// "Try again" calls retry(), which loads the route again. When the connection comes back, it
// does the same by itself. React already logs the error when the boundary catches it, so this
// file doesn't log it again (AGENTS.md rule 4).
"use client";

import { useEffect } from "react";
import { Button } from "./button";
import { StatusMessage } from "./status-message";

interface ErrorMessageProps {
  message: string;
  retry: () => void;
}

function ErrorMessage({ message, retry }: ErrorMessageProps) {
  // The browser's "online" event is outside React, so listening to it is an effect.
  // The cleanup removes the listener when this message leaves the page.
  useEffect(() => {
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [retry]);

  return (
    <StatusMessage
      message={message}
      action={
        <Button variant="secondary" onClick={retry}>
          Try again
        </Button>
      }
    />
  );
}

export { ErrorMessage };
