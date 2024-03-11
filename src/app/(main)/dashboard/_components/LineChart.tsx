"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUserIdStore } from "@/store";
import client from "@/utils/apolloClient";
import { gql, useMutation, useQuery } from "@apollo/client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker/locale/en";
import { getLineData } from "./Data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GET_EVENTS = gql`
  query Events($userId: String!) {
    events(id: $userId) {
      date
      type
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
      text: "EVENT DISTRIBUTION",
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

export default function LineChart() {
  const { userId } = useUserIdStore();
  const {
    loading,
    error,
    data: eventData,
  } = useQuery(GET_EVENTS, {
    variables: { userId: userId },
    client: client,
  });
  if (loading) return <Skeleton className="w-[98%] rounded-xl h-[48%]" />;
  const data = {
    labels,
    datasets: [
      {
        label: "Work",
        data: getLineData(eventData.events)[0],
        borderColor: "#F87171",
        backgroundColor: "#681c1c",
      },
      {
        label: "Personal",
        data: getLineData(eventData.events)[1],
        borderColor: "#38BDF8",
        backgroundColor: "#18457b",
      },
      {
        label: "Social",
        data: getLineData(eventData.events)[2],
        borderColor: "#16A34A",
        backgroundColor: "#08330a",
      },
    ],
  };

  if (eventData.events.length === 0)
    return (
      <div className="bg-white dark:bg-[#35374B] h-[48%] w-[98%] rounded-xl flex justify-center items-center italic">
        NO DATA
      </div>
    );

  return (
    <div className="bg-white dark:bg-[#35374B] h-[48%] w-[98%] rounded-xl flex justify-center items-center">
      <div className="flex justify-center items-center w-[95%] h-[95%]">
        {" "}
        <Line width={"90%"} height={"25%"} options={options} data={data} />{" "}
      </div>
    </div>
  );
}
