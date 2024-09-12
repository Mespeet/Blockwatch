-- Base server URL (without the vault index)
local serverBaseURL = "http://localhost:3000/api/vault/getvaultitems/"

-- Function to send a POST request to the server for a specific vault
function sendRequest(vaultIndex, vaultItems)
    local data = {
        items = vaultItems
    }

    -- Construct the full dynamic URL with the vault index
    local dynamicURL = serverBaseURL .. vaultIndex

    -- Convert the data table to JSON
    local jsonData = textutils.serializeJSON(data)

    -- Send the POST request
    local response = http.post(dynamicURL, jsonData, { ["Content-Type"] = "application/json" })

    if response then
        local responseBody = response.readAll()
        print("Data sent successfully to " .. dynamicURL .. ": " .. responseBody)
        response.close()
    else
        print("Failed to send data to " .. dynamicURL)
    end
end

-- Function to get the items from a specific vault using Create mod
function getVaultItems(vaultPeripheral)
    -- Get the list of items in the vault
    local items = vaultPeripheral.list()

    local itemList = {}
    for slot, item in pairs(items) do
        -- Construct the item data (name, id, amount)
        table.insert(itemList, {
            name = item.displayName,       -- Get the display name of the item
            id = item.name,                -- Get the item identifier (e.g., minecraft:cobblestone)
            amount = item.count            -- Get the count of items in this slot
        })
    end

    return itemList
end

-- Main function to gather items from all vaults and send them
function main()
    while true do
        -- Find all vault peripherals connected to the system
        local vaults = { peripheral.find("create:item_vault") }
        
        -- Iterate over each vault found
        for index, vaultPeripheral in ipairs(vaults) do
            -- Fetch the items in the current vault
            local vaultItems = getVaultItems(vaultPeripheral)

            -- Send the items to the server with the vault index in the dynamic URL
            sendRequest(index, vaultItems)
        end

        -- Wait 5 seconds before checking again
        sleep(5)
    end
end

-- Start the main loop
main()