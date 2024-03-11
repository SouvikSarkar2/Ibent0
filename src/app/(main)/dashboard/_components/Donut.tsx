"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserIdStore } from "@/store";
import client from "@/utils/apolloClient";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getDonutData } from "./Data";

ChartJS.register(ArcElement, Tooltip, Legend);

const GET_EVENTS = gql`
  query Events($userId: String!) {
    events(id: $userId) {
      type
    }
  }
`;

export default function Donut() {
  const { userId } = useUserIdStore();
  const {
    loading,
    error,
    data: eventData,
  } = useQuery(GET_EVENTS, {
    variables: { userId: userId },
    client: client,
  });
  if (loading) return <Skeleton className="w-[30%] h-full" />;
  const data = {
    labels: ["Work", "Personal", "Social"],
    datasets: [
      {
        labels: {
          font: "black",
        },
        data: getDonutData(eventData.events),
        backgroundColor: ["#F87171", "#38BDF8", "#16A34A"],
        borderColor: ["#000000"],
        borderWidth: 2,
      },
    ],
  };
  if (eventData.events.length === 0)
    return (
      <div className="flex justify-center items-center rounded-lg bg-white dark:bg-[#35374B] w-[30%] italic">
        NO DATA
      </div>
    );

  return (
    <div className="bg-white dark:bg-[#35374B] w-[30%] rounded-xl flex justify-center items-center">
      <div className="w-[90%] h-[90%]">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
