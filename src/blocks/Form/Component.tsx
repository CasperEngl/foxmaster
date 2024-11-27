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

export const FormBlock: React.FC<
  {
    id?: string;
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
    introContent,
  } = props;

  const form = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
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
          form: formID,
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
      if (confirmationType === "redirect" && redirect) {
        const { url } = redirect;
        if (url) router.push(url);
      }
    },
  });

  return (
    <div className="">
      {enableIntro && introContent && !form.formState.isSubmitted && (
        <RichText
          className="mb-8 lg:mb-12"
          content={introContent}
          enableGutter={false}
        />
      )}
      <FormProvider {...form}>
        {!form.formState.isSubmitSuccessful ? (
          <form
            id={formID}
            onSubmit={form.handleSubmit(async (values) => {
              await mutation.mutateAsync(values);
            })}
          >
            <fieldset disabled={form.formState.isSubmitting}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType];
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...form}
                            control={form.control}
                            errors={form.formState.errors}
                            register={form.register}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>

              <Button
                form={formID}
                type="submit"
                variant="glassmorphic"
                size="glassmorphic"
                className="bg-background text-foreground"
                disabled={mutation.isPending}
              >
                {submitButtonLabel}
              </Button>
            </fieldset>
          </form>
        ) : form.formState.isSubmitSuccessful &&
          confirmationType === "message" ? (
          <RichText
            content={confirmationMessage}
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
};
