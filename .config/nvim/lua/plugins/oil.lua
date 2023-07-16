return {
  "stevearc/oil.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  config = function()
    require("oil").setup({
      keymaps = {
        ["<CR>"] = "actions.select",
        ["<C-p>"] = "actions.preview",
        ["<C-c>"] = "actions.close",
        ["<C-h>"] = false,
        ["<C-l>"] = false,
        ["-"] = "actions.parent",
        ["."] = "actions.toggle_hidden",
        ["`"] = "actions.cd",
      },
      use_default_keymaps = true,
    })
    vim.keymap.set("n", "-", require("oil").open, { desc = "Open parent directory" })
    vim.keymap.set("n", "<leader>pv", require("oil").open, { desc = "Open parent directory" })
  end,
}
