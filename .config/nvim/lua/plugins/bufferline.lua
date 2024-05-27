local function get_marked_buffers()
  local mark = require("harpoon.mark")
  local harpoon_buffers = {}
  local current_idx = 1

  while mark.get_marked_file_name(current_idx) do
    harpoon_buffers[current_idx] = mark.get_marked_file_name(current_idx)
    current_idx = current_idx + 1
  end

  return harpoon_buffers
end

local function get_index_of_value(table, value)
  local index = nil
  for i, v in pairs(table) do
    if v == value then
      index = i
      break
    end
  end

  return index
end

return {
  "akinsho/bufferline.nvim",
  dependencies = { "theprimeagen/harpoon" },
  event = "VeryLazy",
  keys = {
    { "<leader>bp", "<Cmd>BufferLineTogglePin<CR>", desc = "Toggle pin" },
    { "<leader>bP", "<Cmd>BufferLineGroupClose ungrouped<CR>", desc = "Delete non-pinned buffers" },
  },
  opts = {
    options = {
      -- stylua: ignore
      close_command = function(n) require("mini.bufremove").delete(n, false) end,
      -- stylua: ignore
      right_mouse_command = function(n) require("mini.bufremove").delete(n, false) end,
      diagnostics = "nvim_lsp",
      always_show_bufferline = false,
      diagnostics_indicator = function(_, _, diag)
        local icons = require("lazyvim.config").icons.diagnostics
        local ret = (diag.error and icons.Error .. diag.error .. " " or "")
          .. (diag.warning and icons.Warn .. diag.warning or "")
        return vim.trim(ret)
      end,
      numbers = function(buffer)
        -- get the harpoon buffers and the name of the buffer
        local buf_name = vim.fn.bufname(buffer.id)
        local harpoon_buffers = get_marked_buffers()

        return get_index_of_value(harpoon_buffers, buf_name) or ""
      end,
      custom_filter = function(buf_number)
        -- get the harpoon buffers and the name of the buffer
        local harpoon_buffers = get_marked_buffers()
        local buf_name = vim.fn.bufname(buf_number)

        local idx = get_index_of_value(harpoon_buffers, buf_name)

        if idx then
          return true
        end
        return false
      end,
      sort_by = function(buffer_a, buffer_b)
        -- get the harpoon buffers and the names of the buffers
        local harpoon_buffers = get_marked_buffers()
        local buf_name_a = vim.fn.bufname(buffer_a.id)
        local buf_name_b = vim.fn.bufname(buffer_b.id)

        local idx_a = get_index_of_value(harpoon_buffers, buf_name_a)
        local idx_b = get_index_of_value(harpoon_buffers, buf_name_b)

        return idx_a < idx_b
      end,
    },
  },
}
