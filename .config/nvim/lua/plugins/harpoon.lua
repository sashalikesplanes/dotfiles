local HARPOON_BUFFERS = 10

return {
  "theprimeagen/harpoon",
  config = function()
    vim.keymap.set("n", "<leader>a", require("harpoon.mark").add_file, { desc = "[A]dd harpoon file" })
    vim.keymap.set("n", "<C-w>e", require("harpoon.ui").toggle_quick_menu, { desc = "[W]indow [E]dit harpoon" })
    for i = 1, HARPOON_BUFFERS do
      vim.keymap.set("n", "<C-w>" .. i, function()
        require("harpoon.ui").nav_file(i)
      end, { desc = "Harpoon [W]indow " .. i })
    end
  end,
}
