import React, { useEffect, useState } from 'react';
import { Card, Spin } from "antd";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from 'react-redux';
import { dashboardCount } from '../redux/appSlice';
import { UserOutlined, CheckCircleOutlined, LineChartOutlined } from "@ant-design/icons";

export default function Dashboardv2() {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(dashboardCount())
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // Ensure dashboardData is valid
  const cardsData = dashboardData?.[0]
    ? [
        {
          title: "Total Leads",
          value: dashboardData[0]?.totalLeadsCount || 0,
          icon: UserOutlined,
        },
        {
          title: "Confirmed Leads",
          value: dashboardData[0]?.confirmedLeadsCount || 0,
          icon: CheckCircleOutlined,
        },
        {
          title: "Conversion Rate",
          value: dashboardData[0]?.conversionRate || "0%",
          icon: LineChartOutlined,
        },
      ]
    : [];

    const data = [
      { name: "Confirmed Leads", value: dashboardData[0]?.confirmedLeadsCount || 0 },
      {
        name: "Total Leads",
        value: (dashboardData[0]?.totalLeadsCount || 0) - (dashboardData[0]?.confirmedLeadsCount || 0),
      },
    ];
  
    const COLORS = ["#1890ff", "#f0f0f0"];

  return (
    <div className='mt-10'>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            {cardsData.length > 0 ? (
              cardsData.map((card, index) => (
                <Card key={index} bordered style={{ textAlign: "center", flex: 1 }}>
                  <div className="flex items-center">
                    <card.icon style={{ fontSize: "24px", color: "#1890ff", marginBottom: "8px" }} />
                    <div>
                      <p style={{ marginBottom: "4px", color: "#8c8c8c" }}>{card.title}</p>
                      <h3 style={{ fontSize: "24px", margin: 0 }}>{card.value}</h3>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>

          {data ?       <ResponsiveContainer width="100%" height={600}>  <PieChart width={700} height={600}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={200}
        fill="#8884d8"
        label
        className='w-[60vh] h-[60vh] mx-auto'
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart> </ResponsiveContainer> : <p>No chart data available</p>}
        </div>
      )}
    </div>
  );
}
