return {
  "zbirenbaum/copilot.lua",
  lazy = true,
  event = "VeryLazy",
  build = ":Copilot auth",
  config = function()
    require("copilot").setup({
      suggestion = {
        auto_trigger = true,
        keymap = {
          accept = "<M-cr>",
          accept_word = "<M-tab>",
          next = "<M-j>",
          prev = "<M-k>",
          dismiss = "<M-bs>",
        },
      },
    })
  end,
}
