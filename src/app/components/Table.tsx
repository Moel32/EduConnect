import React from "react";
import { StudyPlanObject } from "@/app/types/types";

interface TableProps {
  plan: StudyPlanObject[];
}

const Table: React.FC<TableProps> = ({ plan }) => {
  return (
    <div className="bg-white p-1 shadow-md rounded-lg text-black overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 table-auto border-collapse border border-slate-400 animate-fade-in">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-4 py-2">Days</th>
              <th className="px-4 py-2">Topics</th>
              <th className="px-4 py-2">Subtopics</th>
              <th className="px-4 py-2">Hours</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {plan.map((p, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-2">{p.day}</td>
                <td className="px-4 py-2">
                  <ul>
                    {Array.isArray(p.topics) ? (
                      p.topics.map((topic, idx) => <li key={idx}>{topic}</li>)
                    ) : (
                      <li>{p.topics}</li>
                    )}
                  </ul>
                </td>
                <td className="px-4 py-2">
                  <ul>
                    {Array.isArray(p.subtopics) ? (
                      p.subtopics.map((subtopic, idx) => <li key={idx}>{subtopic}</li>)
                    ) : (
                      <li>{p.subtopics}</li>
                    )}
                  </ul>
                </td>
                <td className="px-4 py-2">{p.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
