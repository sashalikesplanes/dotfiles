Vim�UnDo� �.?�����,��l*����,�箝��}7^�D   %                                   dv�Z    _�                              ����                                                                                                                                                                                                                                                                                                                                      $          V       dv�Y    �   #   %            end�   "   $              })�   !   #          
      end,�       "                  end�      !          9          end, { buffer = bufnr, desc = "[lsp] format" })�                 J            vim.lsp.buf.format({ bufnr = vim.api.nvim_get_current_buf() })�                5          vim.keymap.set("x", "<Leader>f", function()�                F        if client.supports_method("textDocument/rangeFormatting") then�                 �                        end�                          -- })�                -          --   desc = "[lsp] format on save",�                          --   end,�                E          --     vim.lsp.buf.format({ bufnr = bufnr, async = async })�                $          --   callback = function()�                          --   group = group,�                          --   buffer = bufnr,�                1          -- vim.api.nvim_create_autocmd(event, {�                K          -- vim.api.nvim_clear_autocmds({ buffer = bufnr, group = group })�                          -- format on save�                 �                9          end, { buffer = bufnr, desc = "[lsp] format" })�                J            vim.lsp.buf.format({ bufnr = vim.api.nvim_get_current_buf() })�                5          vim.keymap.set("n", "<Leader>f", function()�                A        if client.supports_method("textDocument/formatting") then�   
             )      on_attach = function(client, bufnr)�   	                 null_ls.setup({�      
           �      	          )    local async = event == "BufWritePost"�                4    local event = "BufWritePre" -- or "BufWritePost"�                V    local group = vim.api.nvim_create_augroup("lsp_format_on_save", { clear = false })�                 �                &    local null_ls = require("null-ls")�                  config = function()�                $  'jose-elias-alvarez/null-ls.nvim',5��               $       '   	       $       '       �                         1                     �               &       )   J       &       )       �                           t                       �               V       Y   u       V       Y       �               4       7   �       4       7       �               )       ,         )       ,       �                           4                      �    	                     5                    �    
           )       ,   L      )       ,       �               A       D   y      A       D       �               5       8   �      5       8       �               J       M   �      J       M       �               9       <   E      9       <       �                           �                      �                         �                    �               K       N   �      K       N       �               1       4   �      1       4       �                      !   &             !       �                          H                     �               $       '   i      $       '       �               E       H   �      E       H       �                         �                    �               -       0   �      -       0       �                         "                    �                         5                    �                           D                      �               F       I   E      F       I       �               5       8   �      5       8       �               J       M   �      J       M       �               9       <         9       <       �                          S                    �    !           
          b      
              �    "                  	   p             	       �    #                     z                    5��