"use client";

import Image from 'next/image'
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

// Define the structure of the vault item with origin and name
interface VaultItem {
  id: string;
  amount: number;
}

// Function to extract origin and name from id
const parseItemId = (id: string) => {
  const parts = id.split(":"); // Assuming id is in the format 'origin_name'
  return {
    origin: parts[0] || "Unknown", // Default to 'Unknown' if origin is not found
    name: parts.slice(1).join(" ") || "Unnamed Item", // Join remaining parts as name
  };
};

export default function Page({ params }: { params: { index: string } }) {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    // Fetch vault items from the API when the component mounts
    const fetchVaultItems = async () => {
      try {
        const res = await fetch(`/api/vault/getvaultitems/${params.index}`);
        if (!res.ok) {
          throw new Error("Failed to fetch vault data");
        }
        const data = await res.json();
        setVaultItems(data.items); // Set the items in state
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchVaultItems();
  }, [params.index]);

  if (loading) {
    return <p>Loading vault data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Calculate the paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vaultItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(vaultItems.length / itemsPerPage);

  return (
    <main className="w-full grid grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-4">
      <div className="flex flex-col gap-4 items-center">
        <Table>
          <TableCaption>All items from vault {params.index}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item, idx) => {
              const { origin, name } = parseItemId(item.id);
              const texture = `/textures/${origin}/${name}.png`;
              return (
                <TableRow key={idx}>
                  <TableCell><Image src={texture} alt="Icon" width={16} height={16}/></TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{origin}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
