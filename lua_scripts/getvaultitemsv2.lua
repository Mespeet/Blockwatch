local info = resourceapi.getBlockInfo("minecraft:grass_block", "m")
local texture = info.model.textures["block/grass_block_side"]
local str = resourceapi.imageBytes(texture)
print(str)