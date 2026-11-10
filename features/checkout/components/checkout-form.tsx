// checkout-form.tsx: the checkout form: name, email and address, checked by checkoutSchema.
// It only collects and checks the fields; what placing the order does (empty the cart, go to
// the thank-you page) is CheckoutContent's job, passed in as onPlaceOrder.
// Client code already: CheckoutContent, which renders it, is a Client Component.
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { checkoutSchema, type Checkout } from "../checkout.schema";

interface CheckoutFormProps {
  onPlaceOrder: (checkout: Checkout) => void;
}

// Every field starts empty; react-hook-form needs them so the inputs are controlled from the
// first render.
const DEFAULT_VALUES: Checkout = { name: "", email: "", address: "" };

export function CheckoutForm({ onPlaceOrder }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Checkout>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: DEFAULT_VALUES,
    // Check a field when it loses focus, then on every change: no error while first typing.
    mode: "onTouched",
  });

  return (
    // noValidate: the Zod rules give the messages, not the browser's bubbles.
    <form className="w-full max-w-checkout-form" noValidate onSubmit={handleSubmit(onPlaceOrder)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="checkout-name">Full name</FieldLabel>
          <Input
            id="checkout-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name !== undefined}
            aria-describedby="checkout-name-error"
            {...register("name")}
          />
          <FieldError id="checkout-name-error" errors={[errors.name]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="checkout-email">Email</FieldLabel>
          <Input
            id="checkout-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email !== undefined}
            aria-describedby="checkout-email-error"
            {...register("email")}
          />
          <FieldError id="checkout-email-error" errors={[errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="checkout-address">Address</FieldLabel>
          <Input
            id="checkout-address"
            type="text"
            autoComplete="street-address"
            aria-invalid={errors.address !== undefined}
            aria-describedby="checkout-address-error"
            {...register("address")}
          />
          <FieldError id="checkout-address-error" errors={[errors.address]} />
        </Field>
        <Button type="submit" size="lg" className="justify-self-start">
          Place order
        </Button>
      </FieldGroup>
    </form>
  );
}
