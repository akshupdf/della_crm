import React from 'react'
import { Table, Card, Modal, Tabs, Button } from "antd";
import { PlusOutlined, RiseOutlined, TeamOutlined } from "@ant-design/icons";

export default function Dashboardv2() {

    const statCards = [
        { title: "Total Leads", value: "100", icon: TeamOutlined },
        { title: "Conversion Rate", value: "45%", icon: RiseOutlined },
        { title: "Team Members", value: "10", icon: TeamOutlined },
      ];


  return (
    <div className='mt-10'>
       <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {statCards.map((card, index) => (
          <Card key={index} bordered style={{ textAlign: "center", flex: 1 }}>
            <div className="flex items-center">
              <card.icon style={{ fontSize: "24px", color: "#1890ff", marginBottom: "8px" }} />
              <div>
                <p style={{ marginBottom: "4px", color: "#8c8c8c" }}>{card.title}</p>
                <h3 style={{ fontSize: "24px", margin: 0 }}>{card.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
