"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUserIdStore } from "@/store";
import client from "@/utils/apolloClient";
import { gql, useMutation, useQuery } from "@apollo/client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker/locale/en";
import { getBarData } from "./Data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GET_EVENTS = gql`
  query Events($userId: String!) {
    events(id: $userId) {
      date
    }
  }
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "TOTAL EVENTS",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function BarChart() {
  const { userId } = useUserIdStore();
  const {
    loading,
    error,
    data: eventData,
  } = useQuery(GET_EVENTS, {
    variables: { userId: userId },
    client: client,
  });
  if (loading) return <Skeleton className="w-[69%] h-full" />;
  const data = {
    labels,
    datasets: [
      {
        label: "EVENT PER MONTH",
        data: getBarData(eventData.events),
        backgroundColor: "#FACC15",
        borderColor: "#000000",
        borderWidth: 2,
      },
    ],
  };

  if (eventData.events.length === 0)
    return (
      <div className="bg-white dark:bg-[#35374B] w-[70%] rounded-xl flex justify-center items-center italic">
        NO DATA
      </div>
    );

  return (
    <div className="bg-white dark:bg-[#35374B] w-[70%] rounded-xl flex justify-center items-center">
      <div className="flex h-[95%] w-[98%] justify-center items-center">
        <Bar options={options} data={data} />{" "}
      </div>
    </div>
  );
}
