import React from "react";
import { StudyPlanObject } from "@/app/types/types";

const Table = ({ plan }: { plan: StudyPlanObject[] }) => {
  console.log(plan);
  return (
    <div className="relative overflow-x-auto bg-white p-3 w-100 h-100 shadow-md text-black">
      <table className="w-full text-sm text-left text-gray-500 table-auto border-collapse border-spacing-2 border border-slate-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th>Day</th>
            <th>Topics</th>
            <th>Subtopics</th>
            <th>Hours to Study</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((p, index) => (
            <tr
              className={
                index !== plan.length - 1 ? "border-y-2 border-gray-300" : ""
              }
              key={index}
            >
              <td>{p.day}</td>
              <td>
                <ul>
                  {Array.isArray(p.topics) ? (
                    p.topics.map((topic) => <li key={topic}>{topic}</li>)
                  ) : (
                    <li>{p.topics}</li>
                  )}
                </ul>
              </td>
              <td>
                <ul>
                {Array.isArray(p.subtopics) ? (
                    p.subtopics.map((subtopic) => <li key={subtopic}>{subtopic}</li>)
                  ) : (
                    <li>{p.topics}</li>
                  )}
                </ul>
              </td>
              <td>{p.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;