import { NextRequest, NextResponse } from 'next/server';

// Store vault count in memory (this will reset on server restart)
let vaultCount = 0;

export async function GET() {
    // Return the current vault count
    return NextResponse.json({ vaultCount });
}

export async function POST(request: NextRequest) {
    try {
        const { vaults } = await request.json();
        
        // Validate that vaults is a number
        if (typeof vaults === 'number' && vaults >= 0) {
            vaultCount = vaults;
            return NextResponse.json({ message: 'Vault count updated', vaultCount });
        } else {
            return NextResponse.json({ message: 'Invalid vault count' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request', error: error }, { status: 500 });
    }
}