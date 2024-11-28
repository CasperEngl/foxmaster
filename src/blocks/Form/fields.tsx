import { Checkbox } from "@/blocks/Form/checkbox";
import { Country } from "@/blocks/Form/country";
import { Email } from "@/blocks/Form/email";
import { Message } from "@/blocks/Form/message";
import { Number } from "@/blocks/Form/number";
import { Select } from "@/blocks/Form/select";
import { State } from "@/blocks/Form/state";
import { Text } from "@/blocks/Form/text";
import { Textarea } from "@/blocks/Form/textarea";

export const fields = {
  checkbox: Checkbox,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
  payment: null,
} as const;
