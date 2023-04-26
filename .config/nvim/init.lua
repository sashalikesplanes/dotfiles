-- Nvim settings which we want in all plugins
require("config")

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

-- Install lazy if we don't have it
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end

vim.opt.rtp:prepend(lazypath)

-- Plugins module
require("lazy").setup("plugins")
