/**
 * @file form.tsx
 * @description Shadcn UI Form primitives — React Hook Form context wrappers.
 *
 * This version is written for the new Shadcn (2025) that uses @base-ui/react
 * instead of @radix-ui. It provides the same API surface as the classic
 * Shadcn form component, but uses native HTML elements + React context
 * instead of Radix UI primitives.
 *
 * ARCHITECTURE:
 * The Shadcn form pattern layers three concerns:
 *   1. FormProvider (from RHF) — provides the form state to all children.
 *   2. FormField (Controller wrapper) — binds a registered field to any input.
 *   3. FormItem / FormLabel / FormControl / FormMessage — accessible wrappers
 *      that auto-wire `htmlFor`, `aria-describedby`, and error text together.
 */

"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// Re-export FormProvider as `Form` — the outermost wrapper.
const Form = FormProvider;

// ---------------------------------------------------------------------------
// Context: FormField (tracks the field name for downstream access)
// ---------------------------------------------------------------------------

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName };

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

/**
 * FormField wraps RHF's Controller, adding context so nested components
 * (FormLabel, FormMessage, etc.) can access the field name and its error state.
 */
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Context: FormItem (provides a stable unique ID to the field group)
// ---------------------------------------------------------------------------

type FormItemContextValue = { id: string };

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// ---------------------------------------------------------------------------
// Internal hook: useFormField
// ---------------------------------------------------------------------------

/**
 * Reads the current field's state from both FormFieldContext and FormItemContext.
 * Used internally by FormLabel, FormControl, and FormMessage.
 */
function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext.name) {
    throw new Error("useFormField must be used within a <FormField>.");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

// ---------------------------------------------------------------------------
// FormItem — the container div that provides the ID context
// ---------------------------------------------------------------------------

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// FormLabel — auto-associates with the input via `htmlFor`
// ---------------------------------------------------------------------------

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// FormControl — wraps the input element in a div with ARIA attributes
// ---------------------------------------------------------------------------

/**
 * FormControl renders a wrapper <div> that applies ARIA attributes.
 * The actual input MUST have its own `id` set via the `formItemId` from context.
 *
 * WHY A WRAPPER DIV instead of React.cloneElement?
 * React.cloneElement with unknown generic children causes TypeScript strict-mode
 * errors. A wrapper div is simpler, semantically neutral, and equally effective
 * for accessibility — `aria-describedby` on the wrapper is still read by
 * screen readers when the input is focused.
 */
function FormControl({ children, className, ...props }: React.ComponentProps<"div">) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <div
      data-slot="form-control"
      data-form-item-id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      className={cn("contents", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormDescription — optional hint text
// ---------------------------------------------------------------------------

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// FormMessage — renders Zod validation errors automatically
// ---------------------------------------------------------------------------

/**
 * FormMessage reads the field error from RHF context and renders it.
 * No props needed — it "just works" inside a <FormField>.
 */
function FormMessage({ className, children, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? "") : children;

  if (!body) return null;

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
