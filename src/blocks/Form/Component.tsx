"use client";
import type { Form as FormType } from "@payloadcms/plugin-form-builder/types";

import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import { getClientSideURL } from "@/utilities/getURL";
import { buildInitialFormState } from "./buildInitialFormState";
import { fields } from "./fields";

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[];
}

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form: FormType;
  introContent?: {
    [k: string]: unknown;
  }[];
};

export function FormBlock(
  props: {
    id?: string;
  } & FormBlockType,
) {
  const form = useForm({
    defaultValues: buildInitialFormState(props.form.fields),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: Data) => {
      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }));

      const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        body: JSON.stringify({
          form: props.form.id,
          submissionData: dataToSend,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const res = (await req.json()) as any;

      if (req.status >= 400) {
        throw new Error(res.errors?.[0]?.message || "Internal Server Error");
      }

      return res;
    },
    onSuccess: () => {
      if (props.form.confirmationType === "redirect" && props.form.redirect) {
        if (props.form.redirect.url) router.push(props.form.redirect.url);
      }
    },
  });

  return (
    <div className="">
      {props.enableIntro &&
        props.introContent &&
        !form.formState.isSubmitted && (
          <RichText
            className="mb-8 lg:mb-12"
            content={props.introContent}
            enableGutter={false}
          />
        )}
      <FormProvider {...form}>
        {!form.formState.isSubmitSuccessful ? (
          <form
            id={props.form.id}
            onSubmit={form.handleSubmit(async (values) => {
              await mutation.mutateAsync(values);
            })}
          >
            <fieldset disabled={form.formState.isSubmitting}>
              <div className="mb-4 last:mb-0">
                {props.form.fields?.map((field, index) => {
                  const Field = field.blockType
                    ? fields?.[field.blockType]
                    : null;

                  if (!Field) {
                    return null;
                  }

                  return (
                    <div className="mb-6 last:mb-0" key={index}>
                      <Field
                        // @ts-expect-error - Field is not typed
                        form={props.form}
                        {...field}
                        {...form}
                        // @ts-expect-error - Field is not typed
                        control={form.control}
                        // @ts-expect-error - Field is not typed
                        errors={form.formState.errors}
                        // @ts-expect-error - Field is not typed
                        register={form.register}
                      />
                    </div>
                  );
                })}
              </div>

              <Button
                form={props.form.id}
                type="submit"
                variant="glassmorphic"
                size="glassmorphic"
                className="bg-background text-foreground"
                disabled={mutation.isPending}
              >
                {props.form.submitButtonLabel}
              </Button>
            </fieldset>
          </form>
        ) : form.formState.isSubmitSuccessful &&
          props.form.confirmationType === "message" ? (
          <RichText
            content={props.form.confirmationMessage}
            enableProse={false}
            enableGutter={false}
          />
        ) : null}

        {mutation.error ? (
          <div className="mt-4">{`500: ${mutation.error.message || ""}`}</div>
        ) : null}
      </FormProvider>
    </div>
  );
}
