return {
  {
    "catppuccin/nvim",
    name = "catppuccin",
    lazy = false,
    priority = 1000,
    config = function()
      vim.opt.termguicolors = true
      require("catppuccin").setup({
        flavour = "frappe",
        transparent_background = true,
        integrations = {
          harpoon = true,
          vimwiki = true,
          fidget = true,
        },
      })
    end,
  },
  -- Configure LazyVim to use catppuccin
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "catppuccin",
    },
  },
}
