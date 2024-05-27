return {
  "alexghergh/nvim-tmux-navigation",
  config = function()
    require("nvim-tmux-navigation").setup({
      disable_when_zoomed = false, -- defaults to false
      keybindings = {
        left = "<C-h>",
        down = "<C-j>",
        right = "<C-l>",
        last_active = "<C-\\>",
        up = "<C-k>",
        next = "<C-Space>",
      },
    })
    -- vim.keymap.set('n', "<C-\\>", nvim_tmux_nav.NvimTmuxNavigateLastActive)
    -- vim.keymap.set('n', "<C-Space>", nvim_tmux_nav.NvimTmuxNavigateNext)
  end,
}
