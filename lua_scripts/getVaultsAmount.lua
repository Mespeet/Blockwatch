-- Define the server URL
local serverURL = "http://localhost:3000/api/vault/getvaultsamount"

-- Function to send HTTP POST with the number of vaults
function sendVaultCount(count)
    local payload = {
        vaults = count
    }

    -- Convert the table to a JSON string
    local json = textutils.serializeJSON(payload)

    -- Send HTTP POST request
    local response = http.post(serverURL, json, { ["Content-Type"] = "application/json" })

    -- Check for a valid response
    if response then
        print("Vault count sent successfully.")
    else
        print("Failed to send vault count.")
    end
end

-- Function to count the number of vaults and send the count
function monitorVaults()
    while true do
        local vaultCount = 0
        local peripherals = peripheral.getNames()
        
        for _, name in ipairs(peripherals) do
            local vault = peripheral.wrap(name)
            
            if vault and vault.list and vault.size then
                vaultCount = vaultCount + 1
            end
        end
        
        -- Send the vault count
        sendVaultCount(vaultCount)
        
        -- Wait for a short period before checking again
        sleep(60) -- Adjust the delay as needed (in seconds)
    end
end

-- Start monitoring the vaults
monitorVaults()