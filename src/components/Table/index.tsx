/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { JSX } from "react/jsx-runtime";

interface Column {
  key: string;
  title: string;
  render?: (row: any) => JSX.Element;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columns = [], data = [] }) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-500 font-semibold uppercase";
      case "declined":
        return "text-red-500 font-semibold uppercase";
      case "pending":
      case "ended": // Show yellow for "ended"
        return "text-yellow-500 font-semibold uppercase";
      default:
        return "text-gray-500";
    }
  };

  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path
      .split(".")
      .reduce((value, key) => (value ? value[key] : undefined), obj);
  };

  const abbreviateCrypto = (method: string): string => {
    const cryptoMap: Record<string, string> = {
      bitcoin: "BTC",
      solana: "SOL",
      ethereum: "ETH",
    };

    return cryptoMap[method.toLowerCase()] || method; // Default to original if not found
  };

  const formatValue = (key: string, value: any): JSX.Element | string => {
    if (key === "method") {
      return <strong className="uppercase">{abbreviateCrypto(value)}</strong>;
    }
    if (key === "amount" && typeof value === "number") {
      return <strong>{`$${value.toLocaleString()}`}</strong>;
    }
    if (key === "createdAt" && value) {
      return new Date(value).toLocaleString();
    }
    return value || "—";
  };

  return (
    <div className="overflow-x-auto">
      {columns.length === 0 || data.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No data available to display.
        </p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 border border-gray-200 text-left font-semibold"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const value = getNestedValue(row, column.key);
                  return (
                    <td
                      key={column.key}
                      className={`px-4 py-2 border border-gray-200 text-gray-700 ${
                        column.key === "status" ? getStatusClass(value) : ""
                      }`}
                    >
                      {column.render
                        ? column.render(row)
                        : formatValue(column.key, value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
