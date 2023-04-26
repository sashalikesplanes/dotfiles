function SQLFormat()
  -- Get the current buffer's file path
  local buffer_file_path = vim.api.nvim_buf_get_name(0)

  -- Prepare the command to call pg_format with the temporary file as input and the buffer file as output
  local cmd = string.format("pg_format %s -o %s", buffer_file_path, buffer_file_path)

  -- Call the pg_format CLI tool and store the result in the output variable
  local output = os.execute(cmd)

  -- Check if the command executed successfully
  if output then
    -- Reload the current buffer to reflect the formatted content
    vim.api.nvim_exec("edit! " .. buffer_file_path, false)

    print("SQLFormat: Formatting completed.")
  else
    print("SQLFormat: Error occurred during formatting.")
  end
end

function Day()
      vim.cmd([[colorscheme tokyonight-day]])
end

-- Expose the function as a Vim command
vim.api.nvim_command("command! SQLFormat lua SQLFormat()")
vim.api.nvim_command("command! Day lua Day()")

