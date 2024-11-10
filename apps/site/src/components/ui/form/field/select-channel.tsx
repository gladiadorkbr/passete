import { SelectChannel } from "~/components/dashboard/select/channel"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"

import type { ChannelType } from "@discordjs/core/http-only"
import type { Control, FieldPath, FieldValues } from "react-hook-form"

export interface FormFieldSelectChannelProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label: string
  description: string
  placeholder?: string
  channelType?: keyof typeof ChannelType
  multiselect?: boolean
}

export function FormFieldSelectChannel<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldSelectChannelProps<TFieldValues, TName>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <SelectChannel
              channelType={props.channelType}
              multiselect={props.multiselect}
              {...field}
            />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}