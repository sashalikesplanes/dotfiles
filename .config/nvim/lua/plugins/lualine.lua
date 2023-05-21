local HARPOON_BUFFERS = 5

-- Returns a table of 5 functions
-- The functions return the file name for each of the 5 harpoon buffers
local function create_harpoon_file_funcs(mark)
  local function basename(file_path)
    return file_path:match("([^/]+)$")
  end

  local function get_file_name(i)
    local file = mark.get_marked_file_name(i)

    if file == nil then
      return '...'
    end

    return basename(file)
  end

  local funcs = {}

  for i = 1, HARPOON_BUFFERS do
    funcs[i] = function()
      return tostring(i) .. ' ' .. get_file_name(i)
    end
  end

  return funcs
end

local function current_macro_recording()
  local current_macro = vim.fn.reg_recording()

  if current_macro == '' then
    return ''
  end

  return 'REC: ' .. current_macro
end

return {
  { 'b0o/incline.nvim', config = function() require('incline').setup() end }, {
  "nvim-lualine/lualine.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons", "theprimeagen/harpoon" },
  config = function()
    local line = require('lualine')

    line.setup {
      options = {
        icons_enabled = true,
        theme = 'catppuccin',
        component_separators = { left = '', right = '' },
        section_separators = { left = '', right = '' },
        disabled_filetypes = {
          statusline = {},
          winbar = {},
        },
        ignore_focus = {},
        always_divide_middle = true,
        globalstatus = false,
        refresh = {
          statusline = 1000,
          tabline = 1000,
          winbar = 1000,
        }
      },
      inactive_sections = {},
      winbar = {},
      inactive_winbar = {},
      sections = {
        lualine_a = {},
        lualine_b = {},
        lualine_c = create_harpoon_file_funcs(require("harpoon.mark")),
        lualine_x = { current_macro_recording },
        lualine_y = { 'diagnostics', 'diff' },
        lualine_z = { 'location' }
      },
    }
    require('harpoon.mark').on('changed', function()
      line.refresh({ scope = 'tabpage', place = { 'tabline' } })
    end)

    -- make status line take whole width, regardless of splits
    -- has to be set here as it gets set by some plugin
    vim.opt.laststatus = 3
    -- hide command line
    vim.opt.cmdheight = 0
    vim.opt.showmode = false
  end,
}
}
