import db from "../../../db.js";

const getPieChartData = async () => {
  try {
    const result = await db.query('SELECT status, COUNT(*) AS count FROM equipment GROUP BY status');
    const piechart = result.rows;
    return piechart;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    return []; // or handle error as needed
  }
};

export default getPieChartData;
