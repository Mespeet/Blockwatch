import { NextResponse } from 'next/server';

interface VaultUpdate {
  vault: string;
  fullness: number;
}

// In-memory store for vault data
const vaultData: Record<string, number> = {};

// Handler for POST requests (for updates from ComputerCraft)
export async function POST(req: Request) {
  try {
    const data: VaultUpdate = await req.json();
    const { vault, fullness } = data;

    if (typeof vault === 'string' && typeof fullness === 'number') {
      // Round fullness to 1 decimal place
      vaultData[vault] = parseFloat(fullness.toFixed(1));
      return NextResponse.json({ message: 'Update successful' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing update:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// Handler for GET requests (to fetch the vault data)
export async function GET() {
  return NextResponse.json(vaultData);
}