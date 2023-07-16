return {
  "vimwiki/vimwiki",
  -- Must set the options before the plugin loads
  init = function()
    vim.g.vimwiki_list = {
      {
        path = "~/vimwiki/",
        syntax = "markdown",
        ext = ".md",
      },
    }
  end,
}
