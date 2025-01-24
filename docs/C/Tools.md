## MSVCRT, UCRT

vcrt 是指 Microsoft Visual C Runtime（MSVCRT），它是 Microsoft Visual Studio 提供的 C 运行时库的缩写。它包含了一组用于 C 和 C++ 编程语言的基础功能，例如内存管理、输入输出、字符串操作、数学函数等。这些功能是许多应用程序在运行时所依赖的。

具体来说，MSVCRT 提供了一些常见的运行时功能，包括：

- 标准输入输出：如 `printf、scanf` 等。
- 内存管理：如 `malloc、free` 等。
- 字符串处理：如 `strcpy、strlen` 等。
- 数学函数：如 `sin、cos、pow` 等。
- 多线程支持：提供多线程支持的相关功能。

### MSVCRT 与 UCRT 的区别：

- MSVCRT (Microsoft Visual C Runtime)：这是早期的 C 运行时库，已经被 UCRT 替代，但仍然有兼容性需求时继续存在。
- UCRT (Universal C Runtime)：这是新的 C 运行时库，旨在为所有 Windows 平台提供一致的支持。它与 Windows 操作系统紧密集成，支持更多现代操作系统的特性，并提高了兼容性和性能。

#### 为什么选择 MSVCRT？

兼容性：一些旧的程序和库依赖于 MSVCRT，因此它仍然被保留为可选的 C 运行时库，尤其在老旧的系统或软件上，使用 MSVCRT 可能会避免一些兼容性问题。

MinGW-w64 中的选择：

- 默认运行时切换：如您所述，MinGW-w64 从版本 12 开始默认使用 UCRT，而不是 MSVCRT。这是因为 UCRT 提供了更好的兼容性和支持，尤其是在最新的 Windows 系统上。
- 切换到 MSVCRT：如果用户仍然需要使用 MSVCRT（可能是因为与某些旧代码的兼容性需求），可以通过编译时参数（如 --with-default-msvcrt=msvcrt）来指定继续使用 MSVCRT。
- 因此，vcrt 主要是指 MSVCRT，它是 Windows 平台上为 C/C++ 程序提供运行时支持的一个关键组件。

* https://www.msys2.org/docs/environments/

---
