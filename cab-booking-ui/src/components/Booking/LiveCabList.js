import React, { useEffect, useState } from "react";
import { connect, disconnect } from "../../utils/socket";
import { getAvailableCabs } from "../../api"; // existing API helper

export default function LiveCabList() {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    // initial load
    getAvailableCabs()
      .then(setCabs)
      .catch((e) => console.error("Initial cab load failed", e));

    // live updates
    const client = connect((updatedCab) => {
      setCabs(prev => {
        // replace or add
        const found = prev.find(c => c.cabId === updatedCab.cabId);
        if (found) {
          return prev.map(c => c.cabId === updatedCab.cabId ? updatedCab : c);
        }
        return [...prev, updatedCab];
      });
    });

    return () => disconnect();
  }, []);

  return (
    <div>
      <h2>Available Cabs (Live)</h2>
      <ul>
        {cabs.map(cab => (
          <li key={cab.cabId}>
            <strong>{cab.getDriverName ? cab.getDriverName() : cab.driverName}</strong>
            {" — "}
            ID: {cab.cabId}, Loc: ({cab.x.toFixed(2)}, {cab.y.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
}
