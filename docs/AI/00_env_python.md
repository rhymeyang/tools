---
lang: zh-CN
title: Python Env Setting
description: some description
---

## pyenv

```shell
brew update
brew install pyenv
brew install pyenv-virtualenv
```

### Add pyenv to your shell startup file:

```shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.zshrc
source ~/.zshrc
```

### check installed correctly:

```shell
pyenv --version
```

### List available Python versions:

```sh
pyenv install --list

# specific version
pyenv install 3.9.10

```

### Set a global Python version:

```sh
pyenv global 3.11.4
```

Set a local Python version in a project directory:

```sh
cd my_project
pyenv local 3.9.10
```

### Create a Virtual Environment for Jupyter

```sh
pyenv virtualenv 3.9.10 jupyter-env
```

### List available virtual environments:

```sh
pyenv virtualenvs
```

### Activate the Environment

```sh
pyenv activate jupyter-env
```

### Check if the correct Python version is active:

```sh
python --version
```

## Install Jupyter Notebook

```sh
pip install jupyter

jupyter --version

```

### Add Virtual Environment to Jupyter as a Kernel

```sh
pip install ipykernel

python -m ipykernel install --user --name=jupyter-env --display-name "Python (jupyter-env)"

jupyter kernelspec list

```

<table data-start="2242" data-end="2965"><thead data-start="2242" data-end="2260"><tr data-start="2242" data-end="2260"><th data-start="2242" data-end="2249">Task</th><th data-start="2249" data-end="2260">Command</th></tr></thead><tbody data-start="2280" data-end="2965"><tr data-start="2280" data-end="2339"><td>Install <code data-start="2290" data-end="2297">pyenv</code></td><td><code data-start="2300" data-end="2337">brew install pyenv pyenv-virtualenv</code></td></tr><tr data-start="2340" data-end="2390"><td>Install Python 3.9.10</td><td><code data-start="2366" data-end="2388">pyenv install 3.9.10</code></td></tr><tr data-start="2391" data-end="2463"><td>Create a virtual environment</td><td><code data-start="2424" data-end="2461">pyenv virtualenv 3.9.10 jupyter-env</code></td></tr><tr data-start="2464" data-end="2531"><td>Activate the virtual environment</td><td><code data-start="2501" data-end="2529">pyenv activate jupyter-env</code></td></tr><tr data-start="2532" data-end="2584"><td>Install Jupyter Notebook</td><td><code data-start="2561" data-end="2582">pip install jupyter</code></td></tr><tr data-start="2585" data-end="2719"><td>Add virtual environment to Jupyter</td><td><code data-start="2624" data-end="2717">python -m ipykernel install --user --name=jupyter-env --display-name "Python (jupyter-env)"</code></td></tr><tr data-start="2720" data-end="2767"><td>Start Jupyter Notebook</td><td><code data-start="2747" data-end="2765">jupyter notebook</code></td></tr><tr data-start="2768" data-end="2830"><td>List available Jupyter kernels</td><td><code data-start="2803" data-end="2828">jupyter kernelspec list</code></td></tr><tr data-start="2831" data-end="2890"><td>Deactivate the virtual environment</td><td><code data-start="2870" data-end="2888">pyenv deactivate</code></td></tr><tr data-start="2891" data-end="2965"><td>Delete the virtual environment</td><td><code data-start="2926" data-end="2963">pyenv virtualenv-delete jupyter-env</code></td></tr></tbody></table>
