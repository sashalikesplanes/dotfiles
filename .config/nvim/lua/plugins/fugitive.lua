return {
  "tpope/vim-fugitive",
  config = function()
    vim.keymap.set("n", "<leader>gS", function()
      vim.cmd.Git()
    end, { desc = "[G]it [S]tatus" })
  end,
}
