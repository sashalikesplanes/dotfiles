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
