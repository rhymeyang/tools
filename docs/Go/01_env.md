- [source](https://go.dev/dl/)
  - https://go.dev/dl/
  - https://golang.google.cn/dl/
- [dev ](https://go.dev/)
- [李文周的博客](https://www.liwenzhou.com/)

## 环境变量

### WINDOWS

- GOPATH
- GOPATH/bin

### go modules

#### 什么是 Go Modules？

Go Modules 是 Go 语言的一种依赖管理工具，用于解决 Go 项目的包依赖问题。它从 Go 1.11 开始引入，并在 Go 1.13 之后成为官方推荐的依赖管理方式。

核心功能：

- 依赖管理：管理项目依赖的版本，并确保一致性。
- 版本控制：支持语义化版本号（Semantic Versioning），可以指定依赖的版本。
- 工作环境隔离：无需使用 $GOPATH，可以在任何目录下创建和管理 Go 项目。
- 模块化支持：支持多模块开发，一个项目可以包含多个模块。

主要文件：

- go.mod：
  - 定义模块名称、Go 版本、依赖列表等信息。
  - 通过 `go mod init <module-name>` 生成。
- go.sum：
  - 记录所有依赖的具体版本和校验和，用于验证依赖的一致性。

必须开启 Go Modules 吗？

推荐开启：

自 Go 1.16 起，Go Modules 默认开启并且是标准的依赖管理方式。
即使不开启，其他非模块化方式（如 $GOPATH）可能会遇到许多限制，尤其是在处理复杂依赖时。

不开启的影响：

- 需要依赖 $GOPATH，开发路径受到限制。
- 难以管理版本，可能导致依赖冲突或不一致。
- 一些新的工具或库可能只支持 Go Modules。

如何确认 Go Modules 是否开启？ 查看环境变量 GO111MODULE：

- `on` ：始终开启。
- `off`：始终关闭。
- `auto`（默认值）：如果项目在 $GOPATH 之外并且有 go.mod 文件，则自动启用。

```shell
go env GO111MODULE

```

### 手动设置：

- 开启：`export GO111MODULE=on`
- 关闭：export GO111MODULE=off

### 修改项目：

初始化 Go Modules：

```bash
go mod init <module-name>
```

添加依赖：

```bash
go get <package>
```

### 永久设置 Go Modules 模式为开启状态

```shell
# 设置开启
go env -w GO111MODULE=on

# 取消开启
go env -w GO111MODULE=auto
```

#### `go env`：

1. go env 是用于查看和设置 Go 环境变量的命令。

- 使用 `-w` 参数可以永久写入配置，使设置在所有终端会话中生效（存储在 Go 的环境配置文件中）。

2.  `GO111MODULE=on`：
    - 是 Go Modules 的模式控制变量，支持以下三种值：
      - `on`：强制开启 Go Modules，忽略项目是否位于 $GOPATH 内外。
      - `off`：强制关闭 Go Modules，使用传统的 $GOPATH 模式。
      - `auto`（默认值）：根据项目上下文自动决定是否启用 Go Modules。
        - 如果项目根目录有 go.mod 文件，或者项目在 $GOPATH 外，则启用 Go Modules。
        - 否则使用 $GOPATH 模式。
3.  `-w` 参数：
    - 通过 `go env -w` 修改的值会写入全局配置文件（通常是用户目录下的配置文件），使该设置持久化，而不仅仅是当前会话有效。
    - 例如，运行 `go env -w GO111MODULE=on` 后，Go 在任何环境下都会默认使用 Go Modules。

## 1. GOROOT：

作用：指向 Go 的安装目录，包含标准库和工具链。

是否需要设置：

- 通常不需要手动设置，因为 Go 的安装程序会自动配置 GOROOT。
- 默认情况下，GOROOT 是 Go 安装路径，例如：
  - 使用 brew 安装时：`/usr/local/opt/go/libexec（Intel）`或 `/opt/homebrew/opt/go/libexec（Apple Silicon）`。
- 使用官方安装包时：`/usr/local/go`。
- 如果确实需要自定义路径（例如手动安装 Go），可以在 `~/.zshrc` 或 `~/.bash_profile` 中添加：

```bash
export GOROOT=/usr/local/go
export PATH=$GOROOT/bin:$PATH
```

验证 GOROOT： 运行以下命令确认当前的 GOROOT：

```bash
go env GOROOT

go env GOPATH
```
