"use client";

import TeamComponent from "./TeamComponent";
import TeamApiCall from "../HOC/TeamApiCall";

const HOCTeamComponent = TeamApiCall(TeamComponent);

export default function TeamWrapper() {
  return (
    <HOCTeamComponent />
  );
};