import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardActivityCard = ({ chartData }: { chartData: any }) => {
  return (
    <div className="shadow-md rounded-lg p-5 w-[85%] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        User and Post Statistics
      </h2>
      <div className="flex flex-col">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="userCount" stroke="#8884d8" />
            <Line type="monotone" dataKey="postCount" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardActivityCard;
