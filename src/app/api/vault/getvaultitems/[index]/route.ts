import { NextRequest, NextResponse } from 'next/server';

// Define the type for a vault item
interface VaultItem {
    name: string;
    id: string;
    amount: number;
}

// Define the in-memory store type
const vaultsData: { [key: number]: VaultItem[] } = {};

// Helper function to group items by identifier and sum their amounts
function groupItems(items: VaultItem[]): VaultItem[] {
    const grouped: { [key: string]: VaultItem } = {};

    items.forEach(item => {
        if (grouped[item.id]) {
            grouped[item.id].amount += item.amount;
        } else {
            grouped[item.id] = { ...item };
        }
    });

    return Object.values(grouped);
}

// GET handler to retrieve the items for a specific vault
export async function GET(req: NextRequest, { params }: { params: { index: string } }) {
    const vaultIndex = parseInt(params.index, 10);

    // Check if the vault exists in the store
    if (vaultsData[vaultIndex]) {
        return NextResponse.json({ vaultIndex, items: vaultsData[vaultIndex] });
    } else {
        return NextResponse.json({ message: `Vault ${vaultIndex} not found` }, { status: 404 });
    }
}

// POST handler to store the items for a specific vault
export async function POST(req: NextRequest, { params }: { params: { index: string } }) {
    const vaultIndex = parseInt(params.index, 10);

    try {
        // Define the expected structure of the request body
        const { items }: { items: VaultItem[] } = await req.json();
        console.log(`Received data for vault ${vaultIndex}:`, items); // Log incoming items

        // Validate items format (must be an array of VaultItem)
        if (!Array.isArray(items)) {
            return NextResponse.json({ message: 'Invalid data format. "items" must be an array.' }, { status: 400 });
        }

        // Group items by their identifier and sum their amounts
        const groupedItems = groupItems(items);

        // Store the aggregated items in memory associated with the vault index
        vaultsData[vaultIndex] = groupedItems;

        return NextResponse.json({ message: `Vault ${vaultIndex} data updated`, items: groupedItems });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request', error: error }, { status: 500 });
    }
}
