import RichText from "@/components/RichText";

import { Width } from "./width";

export const Message = ({ message }: { message: Record<string, any> }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText content={message} />}
    </Width>
  );
};
