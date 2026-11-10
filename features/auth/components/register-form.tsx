// register-form.tsx: the sign-up form, inside the header's Modal. The browser checks the fields
// (required, email, 8+ characters) before onSubmit runs. No sign-up endpoint exists yet, so
// submitting only tells the header the user's name. The Modal renders it only while open, so
// it starts empty every time.
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { focusRing } from "@/components/ui/focus-ring";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// The shortest password the form accepts.
const MIN_PASSWORD_LENGTH = 8;

interface RegisterFormProps {
  onRegister: (name: string) => void;
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    // Stop the browser from reloading the page; React handles the form.
    event.preventDefault();
    onRegister(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            aria-describedby="password-hint"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FieldDescription id="password-hint">
            At least {MIN_PASSWORD_LENGTH} characters.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          {/* A native checkbox in the primary color, with the shared focus outline. */}
          <input
            id="terms"
            type="checkbox"
            className={cn("size-4 accent-primary", focusRing)}
            required
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />
          <FieldLabel htmlFor="terms">I agree to the terms</FieldLabel>
        </Field>
        <Button type="submit">Create account</Button>
      </FieldGroup>
    </form>
  );
}
