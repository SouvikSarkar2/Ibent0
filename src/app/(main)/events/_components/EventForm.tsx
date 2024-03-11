"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGeolocationStore, useUserIdStore } from "@/store";
import client from "@/utils/apolloClient";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string(),
  attendees: z.coerce.number().int().positive().lt(20),
  type: z.string(),
  date: z.union([z.date(), z.string()]),
  hr: z.coerce.number().int().nonnegative().lt(24),
  mn: z.coerce.number().int().nonnegative().lt(60),
  remainder: z.boolean(),
  duration: z.coerce.number().int().positive().lt(720),
  color: z
    .string()
    .startsWith("#")
    .length(7, { message: "Must be of 7 letters Starting with #" }),
});

const CREATE_EVENT = gql`
  mutation CreateEvent($input: NewEventInput!, $userId: ID!) {
    createEvent(input: $input, id: $userId) {
      title
      id
      date
      type
      description
      coordinates
    }
  }
`;

export function ProfileForm() {
  const router = useRouter();
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT, {
    client,
    update(cache, { data: { createEvent } }) {
      cache.modify({
        fields: {
          events(existingEvents = []) {
            const newEventRef = cache.writeFragment({
              data: createEvent,
              fragment: gql`
                fragment NewEvent on Event {
                  id
                  date
                  title
                  type
                }
              `,
            });
            return [...existingEvents, newEventRef];
          },
          eventByType(existingEventByType = []) {
            const newEventRef = cache.writeFragment({
              data: createEvent,
              fragment: gql`
                fragment NewEvent on Event {
                  id
                  date
                  title
                  type
                }
              `,
            });
            return [...existingEventByType, newEventRef];
          },
        },
      });
    },
  });
  const { coordinates, setCoordinates } = useGeolocationStore();
  const { userId } = useUserIdStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "Work",
      attendees: 1,
      remainder: false,
      hr: 12,
      mn: 30,
      duration: 10,
      color: "#0284C7",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const date = values.date;
    const localDate = date.toLocaleString();
    values.date = localDate;

    // console.log("coordinates :", coordinates);
    try {
      const { data } = await createEvent({
        variables: {
          input: {
            attendees: values.attendees,
            color: values.color,
            date: values.date,
            duration: values.duration,
            hr: values.hr,
            mn: values.mn,
            remainder: values.remainder,
            title: values.title,
            type: values.type,
            description: values.description,
            createdAt: new Date(Date.now()),
            coordinates: coordinates,
          },
          userId: userId,
        },
      });

      console.log("Event created:", data.createEvent);
      setCoordinates([0, 0]);
      router.push("/calender");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }

  if (loading)
    return (
      <div className="italic w-[100%] min-h-[80%] flex justify-center items-center">
        HANG TIGHT ADDING YOUR AWESOME EVENT...
      </div>
    );
  if (error)
    return (
      <div className="italic w-[100%] h-[80%] flex justify-center items-center">
        ERROR : {error.message}
      </div>
    );

  return (
    <div className=" w-[100%] flex justify-center items-center overflow-y-scroll pt-[200px] pb-10">
      <div className="w-[90%] pl-2  overflow-y-scroll">
        {" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center items-start "
          >
            <div className="flex">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="">
                    Title
                    <FormControl>
                      <Input
                        className="w-[80%] dark:bg-[#2C293D]"
                        placeholder="Eat"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    Description
                    <FormControl>
                      <Input
                        placeholder="Eat Dinner"
                        className="dark:bg-[#2C293D]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full  justify-start items-center gap-10">
              <FormField
                control={form.control}
                name="attendees"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2  w-[20%]">
                    Attendees
                    <FormControl>
                      <Input
                        type="number"
                        className="w-[90%] dark:bg-[#2C293D]"
                        placeholder="1 Person"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue="Work">
                      <FormControl>
                        <SelectTrigger className="dark:bg-[#2C293D]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-[#2C293D]">
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel>Date </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal dark:bg-[#2C293D]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 dark:bg-[#2C293D]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start gap-10 items-start w-[80%]">
              <div className="flex  gap-4 justify-center items-end">
                <FormField
                  control={form.control}
                  name="hr"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2  w-[100%]">
                      From
                      <FormControl>
                        <Input
                          type="number"
                          className="w-[100%] dark:bg-[#2C293D]"
                          placeholder="1 hr"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>hr</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mn"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2  w-[100%]">
                      <FormControl>
                        <Input
                          type="number"
                          className="w-[100%] dark:bg-[#2C293D]"
                          placeholder="1 min"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>mn</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2  w-[20%]">
                    Duration
                    <FormControl>
                      <Input
                        type="number"
                        className="w-[90%] dark:bg-[#2C293D]"
                        placeholder="10 min"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 ">
                    Color
                    <FormControl>
                      <Input
                        className="w-[100%] dark:bg-[#2C293D]"
                        placeholder="#fffffff"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="w-full"></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="remainder"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Give me Remainder</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="dark:bg-[#2a263c] dark:text-slate-200"
            >
              Submit
            </Button>
            <div className="text-gray-400 dark:text-gray-500">
              Some Awesome Colors - #C7395F #DED4E8 #E8BA40 #EDCBD2 #E87A5D
              #E87A5D #3B5BA5 #1c2423 #80C4B7 #688CEC #D49BAE #D49BAE #49AFD5
              #49AFD5 #E7A23A #F8EC7E #E4CCB2 #E26173 #B2456E #B2456E #56261A
              #D4CAE3 #D4CAE3 #E69462 #E69462 #EDCD44 #DD3F26 #F2EC9B #F2EC9B
              #1803A5 #DADADA #DADADA #4C8155 #E03C5F #224193 #224193 #E07887
              #E07887 #E07887 #E07887 #B7E696 #A95EA3 #507B6A #6A513B #CAD4DE
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
