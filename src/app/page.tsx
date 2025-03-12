"use client";

import Bento from "@/components/bento";
import { useState } from "react";

export default function Home() {
  const [agents, setAgents] = useState("a");

  return (
    <div className="m-8 flex flex-col flex-wrap gap-4 md:flex-row">
      <Bento>slt</Bento>
      <Bento>cv</Bento>
      <Bento>ooui</Bento>
    </div>
  );
}
