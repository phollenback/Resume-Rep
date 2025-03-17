"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export function Navbar() {
  const { userId } = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}/points`)
        .then(res => res.json())
        .then(data => setPoints(data.totalPoints))
        .catch(console.error);
    }
  }, [userId]);

  return (
    <nav className="...">
      {/* ... existing navbar content ... */}
      <div className="flex items-center gap-2">
        <span className="font-medium">Points:</span>
        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full">
          {points}
        </span>
      </div>
    </nav>
  );
} 