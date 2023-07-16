-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here
vim.g.mapleader = " "
-- Exit terinal with <esc><exc>
vim.keymap.set("t", "<esc><esc>", "<C-\\><C-n>")
vim.keymap.set("i", "jk", "<esc>")

-- Use <leader>w instead of <C-w>
vim.keymap.set("n", "<C-w>|", "<C-w>v", { desc = "Horizontal [S]plit" })
vim.keymap.set("n", "<C-w>-", "<C-w>s", { desc = "Horizontal [S]plit" })

-- Unlearn the muscle memory
vim.keymap.set("n", "<C-w>v", "<nop>")
vim.keymap.set("n", "<C-w>s", "<nop>")
vim.keymap.set({ "n", "v" }, "<Space>", "<Nop>", { silent = true })

-- Move selection up and down
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")

-- Keep cursor fixed with J
vim.keymap.set("n", "J", "mzJ`z")

-- Keep cursor in the same place when jumping
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "<C-d>", "<C-d>zz")

-- Keep cursor in the same place when searching
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

-- Keep previous paste
vim.keymap.set("x", "<leader>p", '"_dP')

-- Yank to system clipboard
vim.keymap.set("n", "<leader>y", '"+y')
vim.keymap.set("v", "<leader>y", '"+y')
vim.keymap.set("n", "<leader>Y", '"+Y')

vim.keymap.set("n", "Q", "<nop>")

vim.keymap.set("n", "<leader>D", vim.diagnostic.open_float, { desc = "Float [D]iagnostic" })

-- Cycle buffers with <tab>
vim.keymap.set("n", "<tab>", ":bnext<CR>", { desc = "Next Buffer" })
vim.keymap.set("n", "<S-tab>", ":bprevious<CR>", { desc = "Previous Buffer" })

-- Close buffer with <leader>q
vim.keymap.set("n", "<leader>q", ":bdelete<CR>", { desc = "Close Buffer" })
