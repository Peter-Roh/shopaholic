import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

type ReportData = {
  labels: string[];
  datasets: {
    type: "line";
    label: string;
    borderColor: string;
    borderWidth: number;
    data: {
      x: string;
      y: number;
    }[];
  }[];
};

const Report: NextPage = () => {
  const [reportData, setReportData] = useState<ReportData>({
    labels: [
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
    ],
    datasets: [
      {
        type: "line",
        label: "Sales",
        borderColor: "#84cc16",
        borderWidth: 2,
        data: [
          {
            x: "January",
            y: 0,
          },
          {
            x: "February",
            y: 0,
          },
          {
            x: "March",
            y: 0,
          },
          {
            x: "April",
            y: 0,
          },
          {
            x: "May",
            y: 0,
          },
          {
            x: "June",
            y: 0,
          },
          {
            x: "July",
            y: 0,
          },
          {
            x: "August",
            y: 0,
          },
          {
            x: "September",
            y: 0,
          },
          {
            x: "October",
            y: 0,
          },
          {
            x: "November",
            y: 0,
          },
          {
            x: "December",
            y: 0,
          },
        ],
      },
    ],
  });
  const { mutateAsync } = api.purchase.report.useMutation();
  const [year, setYear] = useState(new Date().getFullYear());

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  useEffect(() => {
    void mutateAsync({ year }).then(({ soldItems }) => {
      if (soldItems) {
        setReportData((prev) => {
          const newData = [
            {
              x: "January",
              y: 0,
            },
            {
              x: "February",
              y: 0,
            },
            {
              x: "March",
              y: 0,
            },
            {
              x: "April",
              y: 0,
            },
            {
              x: "May",
              y: 0,
            },
            {
              x: "June",
              y: 0,
            },
            {
              x: "July",
              y: 0,
            },
            {
              x: "August",
              y: 0,
            },
            {
              x: "September",
              y: 0,
            },
            {
              x: "October",
              y: 0,
            },
            {
              x: "November",
              y: 0,
            },
            {
              x: "December",
              y: 0,
            },
          ];

          soldItems.soldItems.map((elt) => {
            if (newData[elt.createdAt.getMonth() + 1]) {
              newData[elt.createdAt.getMonth() + 1]!.y += 1;
            }
          });

          return {
            labels: prev.labels,
            datasets: [
              {
                ...prev.datasets[0]!,
                data: newData,
              },
            ],
          };
        });
      }
    });
  }, [mutateAsync, year]);

  const onClickDown = useCallback(() => {
    setYear((year) => year - 1);
  }, []);

  const onClickUp = useCallback(() => {
    setYear((year) => year + 1);
  }, []);

  return (
    <Layout title="Report" canGoBack hasTabBar>
      <div className="flex-x-center my-2">
        <span className="text-lg font-semibold text-gray-800">
          Search for year:
        </span>
        <button
          onClick={onClickDown}
          className="ring-focus-2 ml-2 rounded-md border border-transparent bg-cyan-500 py-1 px-2 text-lg font-medium text-white shadow-sm hover:bg-cyan-600"
        >
          <svg
            className="icon"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        <span className="mx-4 rounded-md border px-4 py-2">{year}</span>
        <button
          onClick={onClickUp}
          className="ring-focus-2 rounded-md border border-transparent bg-cyan-500 py-1 px-2 text-lg font-medium text-white shadow-sm hover:bg-cyan-600"
        >
          <svg
            className="icon"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <Line data={reportData} />
    </Layout>
  );
};

export default Report;
