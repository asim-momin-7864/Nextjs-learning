"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { InfoIcon, Plane, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";

// travel class
const travelClassOptions = [
  { label: "Economy", value: "economy" },
  { label: "Premium", value: "premium" },
  { label: "Business", value: "business" },
  { label: "First", value: "first" },
];

// zod
const travelSchema = z
  .object({
    destination: z
      .string()
      .min(2, "Destination must be at least 2 characters")
      .max(60, "Destination must be less than 60 characters"),
    tripName: z
      .string()
      .min(2, "Trip name must be at least 2 characters")
      .max(60, "Trip Name must be less than 60 characters"),
    travelClass: z.enum(["economy", "premium", "business", "first"], {
      // custome error when noting is seletced
      errorMap: () => ({ message: "Please select a travel class" }),
    }),
    hotelLink: z.string().url().optional().or(z.literal("")),
    travelReason: z.string().min(30, "Tell us more "),
    isDomestic: z.boolean(),
    passportNumber: z.string().optional(),
  })
  // cross field validation
  .refine(
    (data) =>
      data.isDomestic ||
      (data.passportNumber && data.passportNumber.trim().length > 0),
    {
      message: "Passport number is required for international trips",
      path: ["passportNumber"],
    },
  );

// type for travel schema
type TravelFormValues = z.infer<typeof travelSchema>;

// fake API
async function fakeTripSubmit(data: TravelFormValues): Promise<void> {
  // dummy to simulate async api call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("FormSubmitted:", data);
}

export default function Home() {
  // state for error comes from server
  const [globalError, setGlobalError] = useState<string | null>(null);

  // useForm - core hook
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TravelFormValues>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      destination: "",
      tripName: "",
      travelClass: "" as TravelFormValues["travelClass"],
      hotelLink: "",
      travelReason: "",
      isDomestic: false,
      passportNumber: "",
    },
  });

  // onSubmit function
  const onSubmit = async (data: TravelFormValues) => {
    setGlobalError(null);

    try {
      await fakeTripSubmit(data);
      toast.add({
        type: "success",
        title: "Trip booked!!!",
        description: "Your trip has been booked successfully",
      });
      reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "something went wrong";
      setGlobalError(message);
    }
  };

  // watch
  const isDomestic = useWatch({
    control,
    name: "isDomestic",
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-2xl flex-col  p-10 gap-y-10 bg-white dark:bg-black">
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h1 className="flex items-center text-primary font-bold">
            <Plane /> BOOK YOUR JOURNEY
          </h1>
          <h1 className="text-4xl font-extrabold">Plan a Trip</h1>
          <p className="font-light">Create and plan your dream trip</p>
        </div>

        {/* for big error / whole form error -- from server  */}
        {globalError && (
          <Alert variant={"destructive"} className="bg-destructive/5">
            <InfoIcon />
            <AlertTitle>Server Error</AlertTitle>
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}

        {/* // form */}
        <form className="w-8/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup className="gap-y-5">
              <Field>
                <FieldLabel htmlFor="destination">Destination *</FieldLabel>
                <Input
                  {...register("destination")}
                  id="destination"
                  autoComplete="off"
                  placeholder="e.g. Paris, Japan, Bali..."
                />
                {errors.destination && (
                  <FieldError errors={[errors.destination]} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="tripName">Trip name *</FieldLabel>
                <Input
                  {...register("tripName")}
                  id="tripName"
                  autoComplete="off"
                  placeholder="e.g. Trip to paris "
                />
                {errors.tripName && <FieldError errors={[errors.tripName]} />}
              </Field>
              <Controller
                control={control}
                name="travelClass"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Tracel Class *</FieldLabel>
                    <Select
                      items={travelClassOptions}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {travelClassOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <FieldLabel htmlFor="hotelLink">
                  Hotel Link{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  {...register("hotelLink")}
                  id="hotelLink"
                  autoComplete="off"
                  placeholder="https://"
                />
                {errors.hotelLink && <FieldError errors={[errors.hotelLink]} />}
              </Field>
              <Field>
                <FieldLabel htmlFor="travelReason">Travel Reason *</FieldLabel>
                <Textarea
                  {...register("travelReason")}
                  id="travelReason"
                  placeholder="Why are you taking this trip? What's the main purpose?"
                  rows={4}
                />
                {errors.travelReason && (
                  <FieldError errors={[errors.travelReason]} />
                )}
              </Field>
              <Controller
                control={control}
                name="isDomestic"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    orientation={"horizontal"}
                  >
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    <FieldLabel htmlFor={field.name}>
                      Domestic travel only (no passport required)
                    </FieldLabel>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {!isDomestic && (
                <Field>
                  <FieldLabel htmlFor="passportNumber">
                    Passport Number *
                  </FieldLabel>
                  <Input
                    {...register("passportNumber")}
                    id="passportNumber"
                    autoComplete="off"
                    placeholder="e.g. AS123456789"
                  />
                  {errors.passportNumber && (
                    <FieldError errors={[errors.passportNumber]} />
                  )}
                </Field>
              )}

              <Button type="submit" variant={"default"} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> Submitting....
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plane /> Confirm Booking
                  </span>
                )}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </main>
    </div>
  );
}
