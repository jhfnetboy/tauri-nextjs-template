# 变更记录

## 版本 0.3.1 - 2024-07-22

### 修复问题和新增功能

1. 修复导航栏中的404链接问题
   - 创建缺失的`/points`页面，包含OpenPoints社区积分系统界面
   - 创建缺失的`/shop`页面，包含商店兑换系统界面
   - 创建缺失的`/reputation`页面，包含声誉系统和排行榜界面

### 修改文件

- `src/app/points/page.tsx`: 新增OpenPoints积分页面
- `src/app/shop/page.tsx`: 新增商店页面
- `src/app/reputation/page.tsx`: 新增声誉系统页面

### 初始化与运行指令

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm tauri dev

# 构建发布版本
pnpm tauri build
```

## 版本 0.3.0 - 2024-07-22

### 新增功能

1. 添加系统硬件信息检测功能
   - 使用Rust的sysinfo库获取CPU、内存、操作系统信息
   - 通过Tauri命令将系统信息传递到前端

2. 创建独立的通信演示页面
   - 将原测试通信功能从主页移至专用的Demo页面
   - 清理主页代码，保留社区工具的UI部分
   - 在导航菜单中添加Demo页面链接

### 修改文件

- `src-tauri/src/lib.rs`: 添加`get_hardware_info`函数及相关结构体
- `src-tauri/Cargo.toml`: 添加sysinfo库依赖
- `src/app/demo/page.tsx`: 创建新的演示页面展示通信方式
- `src/app/page.tsx`: 移除测试通信功能代码
- `src/app/layout.tsx`: 添加Demo页面的导航链接

### 初始化与运行指令

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm tauri dev

# 构建发布版本
pnpm tauri build
```

## 版本 0.1.3 - 2024-07-22

### 修复问题

1. 修复了 Rust 中的生命周期问题
   - 在异步上下文中克隆 `app_handle` 以使其满足 `'static` 生命周期约束
   - 解决了 "`window` does not live long enough" 的错误

### 修改文件

- `src-tauri/src/lib.rs`: 添加 `.clone()` 到 `window.app_handle()` 调用

## 版本 0.1.2 - 2024-07-22

### 修复问题

1. 修复了 Tauri 2.0 API 变更的兼容性问题
   - 将 `emit_all` 方法更改为 `emit` 方法
   - 在 Tauri 2.0 中，全局事件发送 API 有所变化

### 修改文件

- `src-tauri/src/lib.rs`: 将 `app_handle.emit_all()` 更改为 `app_handle.emit()`

## 版本 0.1.1 - 2024-07-22

### 修复问题

1. 修复了 Rust 代码中缺少 `Emitter` trait 导入的问题
   - 在 `src-tauri/src/lib.rs` 中添加了 `use tauri::Emitter;` 导入语句
   - 解决了 `emit_all` 和 `emit` 方法无法使用的编译错误

### 修改文件

- `src-tauri/src/lib.rs`: 添加了 `use tauri::Emitter;` 导入

## 版本 0.1.0 (初始版本) - 2024-07-22

### 新增功能

1. 基于 Tauri 2.0 + Next.js 15 模板创建项目
2. 实现前端调用 Rust 函数的基本演示
   - 添加 `greet` 命令返回简单字符串
   - 添加 `calculate` 命令接收参数并返回结构化数据
   - 添加计算器界面在前端展示与 Rust 的交互
3. 实现 Rust 向前端发送事件的示例
   - 添加 `start_process_monitoring` 命令触发后台监控任务
   - 实现从 Rust 发送全局事件和窗口特定事件
   - 在前端添加事件监听和展示组件

### 修改文件

- `src-tauri/src/lib.rs`: 添加了自定义 Rust 命令和事件发送功能
- `src/app/page.tsx`: 更新前端界面，添加计算器和事件监听组件
- `PLAN.md`: 创建项目开发计划
- `CHANGES.md`: 创建变更记录

### 初始化与运行指令

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm tauri dev

# 构建发布版本
pnpm tauri build
``` 