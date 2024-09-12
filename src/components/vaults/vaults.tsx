"use client";  // This marks the component as a Client Component

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Link from 'next/link';

export default function Vaults() {
    const [vaultCount, setVaultCount] = useState(null); // State to store vault count

    async function getVaults() {
        const response = await fetch('/api/vault/getvaultsamount', {
            method: 'GET',
        });
        const data = await response.json();
        setVaultCount(data.vaultCount); // Store the vaultCount value in the state
    }

    useEffect(() => {
        getVaults(); // Fetch the data when the component mounts
    }, []);

    return (
        <Link href="/vaults">
        <Card>
            <CardHeader>
                <CardTitle>Vaults</CardTitle>
                <CardDescription>All vaults connected to the network</CardDescription>
            </CardHeader>
            <CardContent>
                {vaultCount !== null ? (
                    <div>{vaultCount}</div> // Render the vaultCount
                ) : (
                    <div>Loading...</div> // Render a loading state while waiting for data
                )}
            </CardContent>
        </Card>
        </Link>
    );
}