"use client";

import React, { useState } from "react";
import { FaPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import LoadingPage from '../components/LoadingPage'; // Import the LoadingPage component
import { StudyPlanObject } from "@/app/types/types";
import Table from "../components/Table";
import NavbarFooter from "../components/NavbarFooter";
import quizImage from '../../../public/images/study-plan.webp'; // Placeholder for the circular image
import { useLocalStorage } from '../../hooks/useLocalStorage';

const buttonClass =
  "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";

export default function StudyPlanner() {
  const [fields, setFields] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useLocalStorage<StudyPlanObject[]>('studyPlan', []);
  const [days, setDays] = useState<string>("1");
  const [error, setError] = useState<string | null>(null);

  const handleField = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newFields = [...fields];
    newFields[index] = e.target.value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  const fetchStudyPlan = async () => {
    setLoading(true);
    setError(null);
    const topics = fields.join(" ");
    const data = {
      topics,
      days,
    };
    try {
      const response = await fetch("/api/palm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.status === 201) {
        setPlan(JSON.parse(responseData));
      } else {
        console.error(responseData);
        setError("Failed to create study plan. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please reload the page and try again.");
    }
    setLoading(false);
  };

  const handleDelete = (index: number) => {
    let f = [...fields];
    f.splice(index, 1);
    setFields(f);
  };

  return (
    <NavbarFooter>
      <div className="flex min-h-screen flex-col items-center p-6 md:p-24">
        <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4">
          <Image 
            src={quizImage} 
            alt="Study Planner Icon" 
            fill
            style={{objectFit:"cover"}}
            aria-label="Study Planner Image"
          />
        </div>
        <h1 className="text-4xl font-bold mb-3">AI Study Planner</h1>
        <h2 className="text-xl text-center text-gray-100 mb-6">
          Easily create a comprehensive study plan tailored to your needs and study preferences.
        </h2>
        {error && (
          <div className="text-red-500 mb-4">
            {error} 
            <button onClick={() => window.location.reload()} className="underline ml-2">
              Reload
            </button>
          </div>
        )}
        <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={index} className="w-full flex items-center">
              <input
                className={`w-full bg-white border-red-100 p-2 rounded-md border-2 text-black`}
                type="text"
                placeholder="Add a topic"
                value={field}
                onChange={(e) => handleField(e, index)}
              />
              {fields.length > 1 && (
                <button
                  className="w-1/6 md:w-1/12 ml-2 md:ml-0"
                  arial-label="Delete"
                  onClick={() => handleDelete(index)}
                >
                  <FaRegTrashAlt />
                </button>
              )}
            </div>
          ))}
          <button
            className={buttonClass}
            onClick={handleAddField}
            disabled={loading}
          >
            <FaPlusSquare className="mx-auto" />
          </button>
          <label className="flex flex-row justify-between">
            Select Days to Study
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="p-2 text-black"
            >
              {(() => {
                const options = [];
                for (let i = 1; i <= 10; i++) {
                  options.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return options;
              })()}
            </select>
          </label>
          <button className={buttonClass} onClick={fetchStudyPlan}>
            {loading ? (
              <Image
                className="mx-auto"
                src="/loading.svg"
                width={20}
                height={20}
                alt="loading"
                arial-label="Load"
              />
            ) : (
              "Create Study Plan"
            )}
          </button>
          {loading ? <LoadingPage /> : (plan!.length > 0 && <Table plan={plan} />)}
        </div>
      </div>
    </NavbarFooter>
  );
}
