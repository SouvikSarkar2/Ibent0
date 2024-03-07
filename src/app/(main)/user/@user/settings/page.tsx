"use client";

import { Progress } from "@/components/ui/progress";

import { gql, useMutation, useQuery } from "@apollo/client";
import client from "@/utils/apolloClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEdgeStore } from "@/lib/edgestore";

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
import { useUserIdStore } from "@/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { SingleImageDropzone } from "./_components/SingleImageDropZone";

const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      name
      img
      status
      color
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $userId, input: $input) {
      name
    }
  }
`;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z.string(),
  color: z.string().length(7).startsWith("#"),
});

const Settings = () => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [progressValue, setProgressValue] = useState<number>(0);
  const { edgestore } = useEdgeStore();
  const { userId } = useUserIdStore();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    client: client,
  });
  const [
    updateUser,
    { loading: updateLoader, error: updateError, data: updatedData },
  ] = useMutation(UPDATE_USER, {
    client: client,
    refetchQueries: ["GetUser"],
  });
  let user = data?.user;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${user?.name}`,
      status: `${user?.status}`,
      color: `${user?.color}`,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (updateLoader)
    return <div className="flex flex-col h-full">Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;
  if (updateError) return <p>UpdateError: {updateError.message}</p>;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await updateUser({ variables: { userId: userId, input: values } });
    router.push("/user");
  }
  return (
    <div className="w-full h-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex overflow-y-scroll"
        >
          <div className="h-full w-full flex">
            <div className="h-full  w-[50%]">
              <div className="p-4">
                <Link href={"/user"}>
                  <ArrowLeftCircle />
                </Link>
              </div>
              <div className=" h-full w-full flex flex-col gap-4 justify-start items-center">
                <SingleImageDropzone
                  width={200}
                  height={200}
                  value={file}
                  dropzoneOptions={{
                    maxSize: 1024 * 1024 * 5,
                    maxFiles: 1,
                  }}
                  onChange={(file) => {
                    setFile(file);
                  }}
                />
                <Progress
                  value={progressValue}
                  className="w-[30%] h-2 duration-100"
                />
                <div
                  className="bg-black text-white p-2 rounded-lg uppercase font-urbanist text-sm dark:bg-[#0f0d16] cursor-pointer"
                  onClick={async () => {
                    if (file) {
                      const res = await edgestore.publicFiles.upload({
                        file,
                        onProgressChange: (progress) => {
                          // you can use this to show a progress bar
                          setProgressValue(progress);
                        },
                      });

                      console.log(res);
                      updateUser({
                        variables: {
                          userId: userId,
                          input: {
                            img: res.url,
                          },
                        },
                      });
                    }
                  }}
                >
                  {progressValue === 0 && "Upload"}
                  {progressValue > 0 && progressValue < 100 && "Uploading"}
                  {progressValue === 100 && "Uploaded"}
                </div>
              </div>
            </div>
            <div className="h-full  w-[50%] flex justify-center items-center">
              <div className="h-[80%] w-[50%] flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-urbanist text-lg">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:bg-[#2C293D]"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-urbanist text-lg">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:bg-[#2C293D]"
                          placeholder=""
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
                    <FormItem>
                      <FormLabel className="font-urbanist text-lg">
                        Color
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:bg-[#2C293D]"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Color Should be in Hex Form Starting with #
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="font-urbanist dark:bg-[#181622] dark:text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Settings;
