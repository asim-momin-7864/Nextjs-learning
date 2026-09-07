"use client"

/**
 * FORM EXAMPLE — Create Startup
 *
 * Stack: react-hook-form + zod + shadcn (base-ui) components + sonner toasts
 *
 * Concepts demonstrated:
 *  1. Defining a Zod schema and inferring the TypeScript type from it
 *  2. useForm() with zodResolver — the bridge between RHF and Zod
 *  3. Controller — how to connect non-native inputs (Select, Checkbox) to RHF
 *  4. register() — for plain HTML-compatible inputs (Input, Textarea)
 *  5. formState: { errors, isSubmitting } — error display & loading state
 *  6. handleSubmit — the only place Zod validation fires on submit
 *  7. watch() — reading a live field value to drive conditional logic
 *  8. setValue() / reset() — programmatic field control
 */

import { useState } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─────────────────────────────────────────────────────────
// 1. ZOD SCHEMA
//    Define validation rules here — same approach as backend.
//    z.infer<> gives you the TypeScript type for free.
// ─────────────────────────────────────────────────────────
const startupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Keep it under 60 chars"),

  tagline: z
    .string()
    .min(10, "Tagline too short")
    .max(120, "Keep it concise — under 120 chars"),

  stage: z.enum(["idea", "mvp", "seed", "series-a"], {
    // custom_error fires when nothing is selected
    errorMap: () => ({ message: "Please select a stage" }),
  }),

  website: z
    .string()
    .url("Must be a valid URL (include https://)")
    .optional()
    .or(z.literal("")), // allow empty string (optional field pattern)

  description: z
    .string()
    .min(30, "Tell us more — at least 30 characters")
    .max(500, "Keep it under 500 characters"),

  isRemote: z.boolean(),

  // Conditional: only required when NOT remote
  city: z.string().optional(),
})
// Refinement: cross-field validation — can't do this in individual field rules
.refine(
  (data) => data.isRemote || (data.city && data.city.trim().length > 0),
  {
    message: "City is required for non-remote startups",
    path: ["city"], // which field gets the error
  }
)

// z.infer gives the OUTPUT type — after .default() / .transform()
// For the form, we use the input type which keeps isRemote as boolean.
type StartupFormValues = z.infer<typeof startupSchema>

// ─────────────────────────────────────────────────────────
// Fake API call — replace with your real server action
// ─────────────────────────────────────────────────────────
async function fakeSubmitStartup(data: StartupFormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Submitted:", data)
  // Throw to simulate server error:
  // throw new Error("Startup name already taken")
}

// ─────────────────────────────────────────────────────────
// FORM COMPONENT
// ─────────────────────────────────────────────────────────
export default function CreateStartupPage() {
  const [serverError, setServerError] = useState<string | null>(null)

  /**
   * useForm() — the core hook
   *
   * resolver: zodResolver(schema) — plugs Zod into RHF's validation pipeline
   * defaultValues: ALWAYS provide these. Without them, React warns about
   *   uncontrolled→controlled switches and checkboxes default to undefined.
   */
  const {
    register,      // for native inputs: binds name, onChange, onBlur, ref
    control,       // for Controller wrapper (Select, Checkbox, custom)
    handleSubmit,  // wraps your submit fn — runs Zod ONLY on submit
    formState: { errors, isSubmitting },
    reset,         // programmatic reset to defaultValues (or custom values)
    // setError — use in catch block to push server errors into a field:
    // setError("name", { message: "Name already taken" })
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    // DefaultValues<T> — RHF's internal type makes all fields optional/partial,
    // so undefined is always valid here even for required enum fields.
    // But "" is NOT in the enum type, so we cast it.
    // At runtime, Zod rejects "" on submit with the enum error — that's correct.
    defaultValues: {
      name: "",
      tagline: "",
      stage: "" as StartupFormValues["stage"], // cast: "" keeps Select controlled; Zod rejects on submit
      website: "",
      description: "",
      isRemote: false,
      city: "",
    },
  })

  /**
   * useWatch() instead of watch()
   *
   * watch() is a plain function returned from useForm() — React Compiler
   * can't memoize components that call it because it can produce stale values.
   *
   * useWatch() is a proper React hook — it subscribes to the field and
   * triggers a re-render only when that field's value changes. React Compiler
   * can safely memoize around it.
   */
  const isRemote = useWatch({ control, name: "isRemote" })

  /**
   * onSubmit — only called after Zod validation passes
   * handleSubmit catches any thrown error from this function automatically
   */
  const onSubmit = async (data: StartupFormValues) => {
    setServerError(null)
    try {
      await fakeSubmitStartup(data)
      toast.success("Startup submitted! 🚀", {
        description: `${data.name} is now in review.`,
      })
      reset() // clear the form on success
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setServerError(message)

      // setError() — push a server-side error into a specific field
      // setError("name", { message: "Name is already taken" })
    }
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 text-primary">
            <Rocket className="size-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Launch your startup
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create Startup</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A working form example — react-hook-form + zod + shadcn
          </p>
        </div>

        {/* Server-level error banner */}
        {serverError && (
          <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        {/* ── THE FORM ── */}
        {/*
          onSubmit={handleSubmit(onSubmit)}
          handleSubmit does two things:
          1. Prevents default browser submit
          2. Runs Zod validation — only calls onSubmit() if valid
        */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate             // disable native browser validation — Zod handles it
          className="space-y-5"
        >

          {/* ── FIELD: Name ── */}
          {/*
            register("name") returns { name, onChange, onBlur, ref }
            Spread onto the native input — RHF tracks it automatically.
            Use this for: Input, Textarea, native <select>, <input type="checkbox">
          */}
          <fieldset className="space-y-1.5">
            <Label htmlFor="name">Startup name *</Label>
            <Input
              id="name"
              placeholder="e.g. Acme Corp"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {/* errors.name?.message — only exists if Zod failed this field */}
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </fieldset>

          {/* ── FIELD: Tagline ── */}
          <fieldset className="space-y-1.5">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input
              id="tagline"
              placeholder="e.g. The GitHub for hardware"
              {...register("tagline")}
              aria-invalid={!!errors.tagline}
            />
            {errors.tagline && (
              <p className="text-xs text-destructive">{errors.tagline.message}</p>
            )}
          </fieldset>

          {/* ── FIELD: Stage (Select) ── */}
          {/*
            Controller — use when the component:
            - Is not a native input (doesn't accept a ref the normal way)
            - Needs value/onChange in its own prop format

            render prop receives: { field, fieldState }
            field = { value, onChange, onBlur, name, ref }
            Map these to the component's own props.
          */}
          <fieldset className="space-y-1.5">
            <Label htmlFor="stage">Stage *</Label>
            <Controller
              name="stage"
              control={control}
              render={({ field }) => (
                <Select
                  // field.value ?? "" — never pass undefined to a controlled Select.
                  // Base UI determines controlled vs uncontrolled on the FIRST render:
                  //   undefined → uncontrolled (no value tracking)
                  //   ""       → controlled   (empty selection, placeholder shows)
                  // If field.value is undefined on render 1, then truthy on render 2,
                  // Base UI throws the uncontrolled→controlled error.
                  value={field.value ?? ""}
                  onValueChange={field.onChange}  // Select fires onValueChange, not onChange
                >
                  <SelectTrigger
                    id="stage"
                    className="w-full"
                    aria-invalid={!!errors.stage}
                  >
                    <SelectValue placeholder="Select stage…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">💡 Idea</SelectItem>
                    <SelectItem value="mvp">🛠 MVP</SelectItem>
                    <SelectItem value="seed">🌱 Seed</SelectItem>
                    <SelectItem value="series-a">🚀 Series A</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.stage && (
              <p className="text-xs text-destructive">{errors.stage.message}</p>
            )}
          </fieldset>

          {/* ── FIELD: Website (optional) ── */}
          <fieldset className="space-y-1.5">
            <Label htmlFor="website">
              Website <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourstartup.com"
              {...register("website")}
              aria-invalid={!!errors.website}
            />
            {errors.website && (
              <p className="text-xs text-destructive">{errors.website.message}</p>
            )}
          </fieldset>

          {/* ── FIELD: Description (Textarea) ── */}
          <fieldset className="space-y-1.5">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="What problem are you solving? Who is it for?"
              rows={4}
              {...register("description")}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description.message}</p>
            )}
          </fieldset>

          {/* ── FIELD: Remote checkbox ── */}
          {/*
            Checkbox uses Controller because:
            - @base-ui Checkbox fires checked state via onCheckedChange (not native onChange)
            - The value is boolean, not string

            field.value  → boolean (checked state)
            field.onChange → called with the new boolean
          */}
          <fieldset className="flex items-center gap-3">
            <Controller
              name="isRemote"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isRemote"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="isRemote" className="cursor-pointer font-normal">
              Fully remote — no physical office
            </Label>
          </fieldset>

          {/* ── FIELD: City (conditional) ── */}
          {/*
            watch("isRemote") causes this block to show/hide.
            The .refine() on the schema handles validation cross-field.
          */}
          {!isRemote && (
            <fieldset className="space-y-1.5">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="e.g. San Francisco"
                {...register("city")}
                aria-invalid={!!errors.city}
              />
              {errors.city && (
                <p className="text-xs text-destructive">{errors.city.message}</p>
              )}
            </fieldset>
          )}

          {/* ── SUBMIT ── */}
          {/*
            isSubmitting — true while handleSubmit's async fn is running.
            Prevents double-submit and gives user feedback.
          */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Rocket className="size-4" />
                Submit Startup
              </>
            )}
          </Button>
        </form>
      </div>
    </main>
  )
}
