"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string(),
  attendees: z.string(),
  type: z.string(),
  date: z.date(),
  hr: z.string(),
  mn: z.string(),
  remainder: z.boolean(),
  duration: z.coerce.number().positive().lt(720),
  color: z
    .string()
    .startsWith("#")
    .length(7, { message: "Must be of 7 letters Starting with #" }),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "Work",
      attendees: "1",
      remainder: false,
      hr: "12",
      mn: "0",
      duration: 10,
      color: "#0284C7",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className=" w-[100%] flex justify-center items-center overflow-y-scroll ">
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
                  <FormItem>
                    <FormLabel>Attendees</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue="1">
                      <FormControl>
                        <SelectTrigger className="dark:bg-[#2C293D]">
                          <SelectValue placeholder="No of Attendees" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-[#2C293D]">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">4+</SelectItem>
                      </SelectContent>
                    </Select>
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
                          selected={field.value}
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

            <div className="flex justify-start gap-10 items-start w-full">
              <div className="flex  gap-1 items-end">
                <FormField
                  control={form.control}
                  name="hr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="12">
                        <FormControl className="dark:bg-[#2C293D]">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-[#2C293D] h-[150px]">
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="13">13</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                          <SelectItem value="17">17</SelectItem>
                          <SelectItem value="18">18</SelectItem>
                          <SelectItem value="19">19</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="21">21</SelectItem>
                          <SelectItem value="22">22</SelectItem>
                          <SelectItem value="23">23</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className=" text-center">
                        hour
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mn"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue="0">
                        <FormControl className="dark:bg-[#2C293D]">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-[#2C293D] h-[150px]">
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                          <SelectItem value="13">13</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="16">16</SelectItem>
                          <SelectItem value="17">17</SelectItem>
                          <SelectItem value="18">18</SelectItem>
                          <SelectItem value="19">19</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="21">21</SelectItem>
                          <SelectItem value="22">22</SelectItem>
                          <SelectItem value="23">23</SelectItem>
                          <SelectItem value="24">24</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="26">26</SelectItem>
                          <SelectItem value="27">27</SelectItem>
                          <SelectItem value="28">28</SelectItem>
                          <SelectItem value="29">29</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="31">31</SelectItem>
                          <SelectItem value="32">32</SelectItem>
                          <SelectItem value="33">33</SelectItem>
                          <SelectItem value="34">34</SelectItem>
                          <SelectItem value="35">35</SelectItem>
                          <SelectItem value="36">36</SelectItem>
                          <SelectItem value="37">37</SelectItem>
                          <SelectItem value="38">38</SelectItem>
                          <SelectItem value="39">39</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                          <SelectItem value="41">41</SelectItem>
                          <SelectItem value="42">42</SelectItem>
                          <SelectItem value="43">43</SelectItem>
                          <SelectItem value="44">44</SelectItem>
                          <SelectItem value="45">45</SelectItem>
                          <SelectItem value="46">46</SelectItem>
                          <SelectItem value="47">47</SelectItem>
                          <SelectItem value="48">48</SelectItem>
                          <SelectItem value="49">49</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="51">51</SelectItem>
                          <SelectItem value="52">52</SelectItem>
                          <SelectItem value="53">53</SelectItem>
                          <SelectItem value="54">54</SelectItem>
                          <SelectItem value="55">55</SelectItem>
                          <SelectItem value="56">56</SelectItem>
                          <SelectItem value="57">57</SelectItem>
                          <SelectItem value="58">58</SelectItem>
                          <SelectItem value="59">59</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className=" text-center">
                        min
                      </FormDescription>
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
                        className="w-[60%] dark:bg-[#2C293D]"
                        placeholder="#fffffff"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Give color to yor event</FormDescription>
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
          </form>
        </Form>
      </div>
    </div>
  );
}
