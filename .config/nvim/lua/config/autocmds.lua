-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
-- Add any additional autocmds here
-- Create new diary entry and append it to index file
vim.api.nvim_create_autocmd("BufNewFile ~/vimwiki/diary/*.md", {
  callback = function()
    local current_buffer = vim.api.nvim_get_current_buf()
    local buffer_name = vim.api.nvim_buf_get_name(current_buffer)
    local path, filename, ext = string.match(buffer_name, "(.-)([^\\/]-%.?([^%.\\/]*))$")

    local dairy_path = vim.fn.expand("~/vimwiki/diary/")

    if path ~= dairy_path or ext ~= "md" then
      return
    end

    filename = filename:sub(1, -4) -- Remove the .md extension
    vim.api.nvim_buf_set_lines(current_buffer, 0, 0, false, { "# " .. filename })
    vim.api.nvim_buf_set_lines(
      current_buffer,
      1,
      1,
      false,
      { "", "## Done", "- ", "", "## Todo", "- ", "", "## Blockers", "- " }
    )
    vim.api.nvim_command("w")

    local diary_md = vim.fn.expand("~/vimwiki/diary/diary.md")
    local diary_md_buffer = vim.fn.bufnr(diary_md)
    if diary_md_buffer == -1 then
      diary_md_buffer = vim.fn.bufadd(diary_md)
    end

    vim.api.nvim_set_current_buf(diary_md_buffer)
    local link = "[" .. filename .. "](" .. filename .. ")"
    vim.api.nvim_buf_set_lines(diary_md_buffer, 1, 1, false, { link })
    vim.api.nvim_command("sort")
    vim.api.nvim_command("w")

    vim.api.nvim_set_current_buf(current_buffer)
  end,
})

vim.api.nvim_create_autocmd("BufEnter *.tf", {
  callback = function()
    vim.bo.commentstring = "# %s"
  end,
})

local function reverse_iter(t)
  local i = #t + 1
  return function()
    i = i - 1
    if i > 0 then
      return i, t[i]
    end
  end
end

vim.api.nvim_create_autocmd("User", {
  pattern = "LazyVimStarted",
  once = true,
  callback = function()
    -- this needs to be deffered for some other stuff to load, I am not sure there is a better event
    vim.defer_fn(function()
      local mark = require("harpoon.mark")
      local harpoon_buffers = {}
      local current_idx = 1

      while mark.get_marked_file_name(current_idx) do
        harpoon_buffers[current_idx] = mark.get_marked_file_name(current_idx)
        current_idx = current_idx + 1
      end

      -- for each of the harpoon buffers we open them
      for _, buffer in reverse_iter(harpoon_buffers) do
        vim.cmd("silent edit " .. buffer)
      end

      require("harpoon.ui").nav_file(1)
    end, 10)
  end,
})
