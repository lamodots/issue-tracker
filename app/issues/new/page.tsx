"use client";
import { Button, Callout, TextArea, TextField, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller, Form } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchema";
import Spinner from "@/app/components/Spinner";

type IssueForm = {
  title: string;
  description: string;
};
function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="max-w-xl space-y-2">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          setIsSubmitting(true);
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occure");
          }
        })}
        className=" space-y-3 pl-4"
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button disabled={isSubmitting}>
          Sumit new Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
