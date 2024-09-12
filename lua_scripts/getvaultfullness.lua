-- Define the server URL
local serverURL = "http://localhost:3000/api/vault/getvaultsfullness"

-- Function to send HTTP POST with vault details
function sendVaultUpdate(vaultName, percentageFull)
    local payload = {
        vault = vaultName,
        fullness = percentageFull
    }

    -- Convert the table to a JSON string
    local json = textutils.serializeJSON(payload)
    
    -- Print the payload to see what's being sent
    print("Sending payload: " .. json)

    -- Send HTTP POST request
    local response, errorMessage = http.post(serverURL, json, { ["Content-Type"] = "application/json" })

    -- Check if the request succeeded or failed
    if response then
        print(string.format("Update sent for %s: %.2f%% full", vaultName, percentageFull))
    else
        print("Failed to send update: " .. errorMessage)
    end
end

-- Function to get the fullness percentage of a vault
function getVaultFullness(vault)
    if vault and vault.list and vault.size then
        -- Get the list of items and vault size
        local itemList = vault.list()
        local totalSlots = vault.size()

        -- Calculate the current fullness
        local totalItems = 0
        for slot, item in pairs(itemList) do
            totalItems = totalItems + item.count
        end

        local maxItems = totalSlots * 64
        return (totalItems / maxItems) * 100
    else
        return 0
    end
end

-- Function to monitor vaults and send updates at intervals
function monitorVaults()
    while true do
        local peripherals = peripheral.getNames()
        for _, name in ipairs(peripherals) do
            local vault = peripheral.wrap(name)

            if vault and vault.list and vault.size then
                -- Get the fullness percentage
                local percentageFull = getVaultFullness(vault)
                
                -- Send the update
                sendVaultUpdate(name, percentageFull)
            end
        end
        -- Wait for a short period before checking again
        sleep(5) -- Adjust the delay as needed (in seconds)
    end
end

-- Start monitoring the vaults
monitorVaults()