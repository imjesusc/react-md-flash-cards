import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { Button } from "../../../components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../../../components/textarea";
import { useCardsStore } from "../../../store/cards.store";
import { useNavigate } from "react-router-dom";

export function CollectionCardForm() {
  const loadCards = useCardsStore((state) => state.loadCards);
  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(1),
    content: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loadCards(data.name, data.content);
    form.reset();
    navigate("/start");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name</FormLabel>
              <FormControl>
                <Input placeholder="Questions..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Content</FormLabel>
              <FormControl>
                <Textarea placeholder="## What is HTML?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer>
          <Button type="submit">Create collection</Button>
        </footer>
      </form>
    </Form>
  );
}
