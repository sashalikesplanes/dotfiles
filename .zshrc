export CLOUDSDK_PYTHON_SITEPACKAGES=1
export PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

export LIBFREENECT2_INSTALL_PREFIX="/usr/local/"

# Aliases
function gacp() { message="${@}"; git add .; git commit -m "$message"; git push; }
function gpacp() { message="${@}"; git pull; git add .; git commit -m "$message"; git push; }
function gac() { message="${@}"; git add .; git commit -m "$message"; } 
function gpp() { git pull; git push; }
function gpul() { git pull; }
function gpus() { git push; }

function tmux_select_session() {
  local session
  session=$(tmux list-sessions -F '#{session_name}' | fzf --prompt="Select a session: " --exact --preview="tmux list-windows -t {}" --preview-window=up:2)
  if [[ -n "$session" ]]; then
    tmux switch-client -t "$session"
  fi
}

function makegif() { ffmpeg -i "$1" -filter_complex "[0:v] fps=12,scale=480:-1,split [a] [b];[a] palettegen [p];[b] [p] paletteuse" "$2" }

# Shorten long nx commands
function ftcr() {
  local command="yarn nx run fine-transfers-client-rest"
  if [ "$#" -gt 0 ]; then
    command+=":$@"
  fi
  echo $command
  eval $command
}

# Easily create TS projects
newts() {
  project_name=$1
  mkdir "$project_name"
  cd "$project_name" || exit

  yarn init -y
  yarn add typescript ts-node @types/node --dev
  yarn tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs --strict
  mkdir src
  echo 'console.log("Hello, world!");' > src/index.ts
  echo -e '{\n "scripts": {\n "start": "ts-node src/index.ts",\n "build": "tsc"\n }\n}' > package-scripts.json
  jq -s '.[0] * .[1]' package.json package-scripts.json > package-new.json
  mv package-new.json package.json
  rm package-scripts.json

  git init
  echo -e "node_modules/\nlib/\n*.log" > .gitignore
  git add .
  git commit -m "Initial commit"
}


alias ya="yarn add"
alias docker='sudo docker'
alias add='sudo pacman -S'
alias mike='pm2 restart mike && pm2 monit'
alias ducks='du -cks * | sort -rn | head'
alias ga="git add"
alias gc="git commit -m"
alias gst="git status"

alias n="node"
alias py="python"
alias v="nvim"

# Rust
alias cb="cargo build"
alias cr="cargo run"
alias cch="cargo check"
alias cn="cargo new"

alias sssh="ssh sasha@kiselev.lu"

set -o vi
# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(pyenv zsh-autosuggestions zsh-syntax-highlighting)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
#
# Enable vim mode for command line
bindkey -v

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/sasha/google-cloud-sdk/path.zsh.inc' ]; then . '/Users/sasha/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/sasha/google-cloud-sdk/completion.zsh.inc' ]; then . '/Users/sasha/google-cloud-sdk/completion.zsh.inc'; fi

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

autoload -U +X bashcompinit && bashcompinit
complete -o nospace -C /usr/local/bin/terraform terraform
alias confi='/usr/bin/it --it-dir=/Users/sasha/.cf/ --work-tree=/Users/sasha'
