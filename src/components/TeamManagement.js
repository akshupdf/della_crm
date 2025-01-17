import React, { useState } from "react";
import { Card, Table } from "antd";

const TeamManagement = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team Sunil",
      teamSize: 5,
      generatedLeads: 3,
      confirmedLeads: 1,
      deals: 0,
      employees: [
        { id: 1, name: "Mona", generatedLead: 0, confirmedDeals: 0 },
        { id: 2, name: "Varsha", generatedLead: 1, confirmedDeals: 0 },
        { id: 3, name: "Sahil", generatedLead: 1, confirmedDeals: 1 },
        { id: 4, name: "Heena", generatedLead: 0, confirmedDeals: 0 },
        { id: 5, name: "Viky", generatedLead: 1, confirmedDeals: 0 },
      ],
    },
    {
      id: 2,
      name: "Team Ketan",
      teamSize: 5,
      generatedLeads: 2,
      confirmedLeads: 2,
      deals: 1,
      employees: [
        { id: 1, name: "Priya", generatedLead: 1, confirmedDeals: 1 },
        { id: 2, name: "Cat", generatedLead: 0, confirmedDeals: 0 },
        { id: 3, name: "Salman", generatedLead: 0, confirmedDeals: 0 },
        { id: 4, name: "Sachin", generatedLead: 1, confirmedDeals: 1 },
        { id: 5, name: "Manoj", generatedLead: 0, confirmedDeals: 0 },
      ],
    },
  ]);

  return (
    <div className="p-4 space-y-6 mt-10">
      {teams.map((team) => (
        <Card
          key={team.id}
          className="w-full"
          title={
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="font-bold">{team.id}</span>
                <span>{team.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>Team Size: {team.teamSize}</span>
                <span>Generated Leads: {team.generatedLeads}</span>
                <span>Confirmed Leads: {team.confirmedLeads}</span>
                <span>Deals: {team.deals}</span>
              </div>
            </div>
          }
          bordered
        >
          <Table
            className="rounded-md border"
            dataSource={team.employees}
            rowKey="id"
            pagination={false}
          >
            <Table.Column title="ID" dataIndex="id" key="id" />
            <Table.Column title="Employee Name" dataIndex="name" key="name" />
            <Table.Column
              title="Generated Lead"
              dataIndex="generatedLead"
              key="generatedLead"
              align="center"
            />
            <Table.Column
              title="Confirmed Leads"
              dataIndex="confirmedDeals"
              key="confirmedDeals"
              align="center"
            />
          </Table>

          <div className="mt-4 flex justify-between items-center">
            <button type="dashed" size="small">
              Add Employee
            </button>
            <div className="flex gap-2">
              <button type="dashed" size="small">
                ADD Leads
              </button>
              <button type="dashed" size="small">
                Total Leads
              </button>
              <button type="dashed" size="small">
                Confirmed Leads
              </button>
              <button type="dashed" size="small">
                Deal
              </button>
              <button type="dashed" size="small">
                Team Performance
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TeamManagement;
