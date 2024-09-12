-- Define the server URL
local serverURL = "http://localhost:3000/api/vault/getvaults"

-- Function to send HTTP POST with vault details
function sendVaultDetails(vaults)
    local payload = {
        vaults = vaults
    }

    -- Convert the table to a JSON string
    local json = textutils.serializeJSON(payload)

    -- Send HTTP POST request
    local response = http.post(serverURL, json, { ["Content-Type"] = "application/json" })

    -- Check for a valid response
    if response then
        print("Vault details sent successfully.")
    else
        print("Failed to send vault details.")
    end
end

-- Function to collect details of all vaults
function collectVaultDetails()
    local vaults = {}
    local peripherals = peripheral.getNames()
    
    for _, name in ipairs(peripherals) do
        local vault = peripheral.wrap(name)
        
        if vault and vault.list and vault.size then
            local items = vault.list()
            local vaultData = {
                name = name,
                items = {}
            }
            
            for slot, item in pairs(items) do
                table.insert(vaultData.items, {
                    slot = slot,
                    name = item.name,
                    count = item.count
                })
            end
            
            table.insert(vaults, vaultData)
        end
    end
    
    return vaults
end

-- Function to monitor vaults and send their details
function monitorVaults()
    while true do
        local vaultDetails = collectVaultDetails()
        
        -- Send the vault details
        sendVaultDetails(vaultDetails)
        
        -- Wait for a short period before checking again
        sleep(60) -- Adjust the delay as needed (in seconds)
    end
end

-- Start monitoring the vaults
monitorVaults()