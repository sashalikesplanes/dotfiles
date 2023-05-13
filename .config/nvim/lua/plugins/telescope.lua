return {
  "nvim-telescope/telescope.nvim",
  tag = "0.1.1",
  lazy = true,
  event = 'VeryLazy',
  dependencies = { "nvim-lua/plenary.nvim" },
  config = function()
    local builtin = require('telescope.builtin')
    -- [P]roject
    vim.keymap.set('n', '<leader>pf', builtin.find_files, { desc = '[P]roject [F]iles' })
    vim.keymap.set('n', '<leader>pF', function()
      builtin.find_files({ find_command = { 'rg', '--files', '--hidden' },
      });
    end, { desc = '[P]roject [F]iles (Hidden)' })
    vim.keymap.set('n', '<leader>pb', builtin.buffers, { desc = '[P]roject [B]uffers' })
    vim.keymap.set('n', '<leader>ps', builtin.live_grep, { desc = '[P]roject [S]earch' })
    vim.keymap.set('n', '<leader>pS', function()
      builtin.grep_string({ shorten_path = true, word_match = "-w", only_sort_text = true, search = '' })
    end, { desc = '[P]roject fuzzy [S]earch' })

    vim.keymap.set('n', '<leader>pd', builtin.diagnostics, { desc = '[P]roject [D]iagnostics' })

    -- [G]it
    vim.keymap.set('n', '<leader>gc', builtin.git_bcommits, { desc = '[G]it [C]ommits' })
    vim.keymap.set('n', '<leader>gb', builtin.git_branches, { desc = '[G]it [B]ranches' })
    vim.keymap.set('n', '<leader>gs', builtin.git_status, { desc = '[G]it [S]tatus' })

    -- [G]oto
    vim.keymap.set('n', 'gd', builtin.lsp_definitions, { desc = '[G]oto [D]efinition' })
    vim.keymap.set('n', 'gr', builtin.lsp_references, { desc = '[G]oto [R]eferences' })
    vim.keymap.set('n', 'gi', builtin.lsp_implementations, { desc = '[G]oto [I]mplementation' })

    -- [C]urrent
    vim.keymap.set('n', '<leader>cd', function() builtin.diagnostics({ bufnr = 0 }) end,
      { desc = '[C]urrent [D]iagnostics' })
    vim.keymap.set('n', '<leader>cS', builtin.lsp_document_symbols, { desc = '[C]urrent [S]ymbols' })
    vim.keymap.set('n', '<leader>cs', builtin.current_buffer_fuzzy_find, { desc = '[C]urrent [S]earch' })
    vim.keymap.set('n', '<leader>cf', function()
      local parent_dir = vim.fn.expand('%:p:h')
      print(parent_dir)
      builtin.find_files({
        prompt_title = 'Find files in Parent Directory',
        cwd = parent_dir,
      })
    end, { desc = '[C]urrent [F]ind Files' })
  end
}
