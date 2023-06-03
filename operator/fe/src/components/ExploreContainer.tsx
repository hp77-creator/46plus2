import "./ExploreContainer.css";
import { useState } from "react";
import HTML5Plugin from "./HTML5Plugin";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <HTML5Plugin />
      <strong>{name}</strong>
    </div>
  );
};

export default ExploreContainer;
