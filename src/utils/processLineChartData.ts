import { IPost, IUser } from "../types";

export const processLineChartData = (users: IUser[], posts: IPost[]) => {
  const dataMap: Record<string, { userCount: number; postCount: number }> = {};

  // Process users
  users.forEach((user) => {
    const userCreatedAt = user.createdAt; // Access the createdAt
    if (userCreatedAt) {
      // Check if it's defined
      const date = new Date(userCreatedAt).toISOString().split("T")[0]; // Format date
      if (!dataMap[date]) {
        dataMap[date] = { userCount: 0, postCount: 0 };
      }
      dataMap[date].userCount += 1;
    }
  });

  // Process posts
  posts.forEach((post) => {
    const postCreatedAt = post.createdAt; // Access the createdAt
    if (postCreatedAt) {
      // Check if it's defined
      const date = new Date(postCreatedAt).toISOString().split("T")[0]; // Format date
      if (!dataMap[date]) {
        dataMap[date] = { userCount: 0, postCount: 0 };
      }
      dataMap[date].postCount += 1;
    }
  });

  // Convert to an array of ChartDataPoint
  return Object.entries(dataMap).map(([date, counts]) => ({
    date,
    userCount: counts.userCount,
    postCount: counts.postCount,
  }));
};
