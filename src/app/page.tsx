"use client";

import getAgents from "@/lib/valapi";
import { useEffect, useState } from "react";

export default function Home() {
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAgents();
        setAgents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Valorant Agents</h1>
      <ul>
        {agents.map((agent) => (
          <li key={agent.uuid}>{agent.displayName}</li>
        ))}
      </ul>
    </div>
  );
}
