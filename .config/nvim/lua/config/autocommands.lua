vim.api.nvim_create_autocmd('UIEnter', {
  callback = function()
    -- Get the terminal to load already
    vim.cmd('FloatermToggle')
    vim.cmd('FloatermToggle')
    vim.cmd('stopinsert')

    -- Open first file in main window
    -- We need this to happen on the next tick, if that's how it works in lua?
    vim.defer_fn(function() require('harpoon.ui').nav_file(1) end, 0)
  end
})

-- Create new diary entry and append it to index file
vim.api.nvim_create_autocmd('BufNewFile ~/vimwiki/diary/*.md', {
  callback = function()
    local current_buffer = vim.api.nvim_get_current_buf()
    local buffer_name = vim.api.nvim_buf_get_name(current_buffer)
    local path, filename, ext = string.match(buffer_name, "(.-)([^\\/]-%.?([^%.\\/]*))$")

    local dairy_path = vim.fn.expand("~/vimwiki/diary/")

    if (path ~= dairy_path or ext ~= 'md') then
      return
    end

    filename = filename:sub(1, -4) -- Remove the .md extension
    vim.api.nvim_buf_set_lines(current_buffer, 0, 0, false, {"# " .. filename})
    vim.api.nvim_buf_set_lines(current_buffer, 1, 1, false, {"", "## Done", "- ", "", "## Todo", "- ", "", "## Blockers", "- "})
    vim.api.nvim_command("w")

    local diary_md = vim.fn.expand("~/vimwiki/diary/diary.md")
    local diary_md_buffer = vim.fn.bufnr(diary_md)
    if (diary_md_buffer == -1) then
      diary_md_buffer = vim.fn.bufadd(diary_md)
    end

    vim.api.nvim_set_current_buf(diary_md_buffer)
    local link = "["..filename.."]("..filename..")"
    vim.api.nvim_buf_set_lines(diary_md_buffer, 1, 1, false, {link})
    vim.api.nvim_command('sort')
    vim.api.nvim_command("w")

    vim.api.nvim_set_current_buf(current_buffer)
  end
})

