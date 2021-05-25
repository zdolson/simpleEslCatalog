import * as React from "react";
import SkeletonCard from "./Card";

export default function SkeletonCatalog() {
  return (
    <React.Fragment>
      {[...Array(10)].map((emptyValue, index) => (
        <SkeletonCard key={index} />
      ))}
    </React.Fragment>
  );
}
