# Netlify 部署指南 - 邮件功能设置

## 📧 邮件功能实现说明

您的网站现在包含了一个邮件发送功能，使用Netlify Forms来处理邮件。以下是完整的部署和配置步骤：

## 🚀 部署到Netlify步骤

### 1. 准备代码
确保您的代码已经推送到GitHub仓库。

### 2. 连接Netlify
1. 访问 [netlify.com](https://netlify.com) 并注册/登录
2. 点击 "New site from Git"
3. 选择您的GitHub仓库
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `out`

### 3. 环境变量设置（如果需要）
在Netlify控制台中：
1. 进入 Site settings → Environment variables
2. 根据需要添加环境变量

### 4. 启用Netlify Forms
1. 部署成功后，进入Netlify控制台
2. 导航到 Forms 选项卡
3. 您应该能看到名为 "contact" 的表单
4. 启用表单通知：
   - 点击表单名称
   - 设置 Email notifications
   - 输入您的邮箱地址

## 📬 邮件通知设置

### Netlify Forms 邮件通知
1. **基础通知**（免费）：
   - 每次表单提交时，Netlify会发送邮件到您指定的邮箱
   - 包含所有表单字段内容

2. **高级功能**（付费计划）：
   - 自定义邮件模板
   - Webhook集成
   - 第三方服务集成

### 邮件通知配置步骤
1. 在Netlify控制台，找到您的站点
2. 进入 Forms → [您的表单名] → Settings and usage
3. 在 "Form notifications" 部分：
   - 点击 "Add notification"
   - 选择 "Email notification"
   - 输入您的邮箱地址
   - 自定义邮件主题（可选）
   - 保存设置

## 🔧 功能说明

### 前端邮件对话框
- 位置：右下角悬浮按钮
- 包含字段：姓名、邮箱、主题、消息
- 验证：客户端和服务端双重验证
- 状态反馈：成功/错误提示

### 后端处理
- API路由：`/api/send-email`
- 表单验证：必填字段和邮箱格式
- Netlify Forms集成：自动处理表单提交

## 📝 接收邮件示例

当用户提交表单时，您将收到如下格式的邮件：

```
主题：New form submission from [您的网站名]

姓名：张三
邮箱：zhangsan@example.com
主题：咨询合作
消息：您好，我对您的项目很感兴趣...

提交时间：2024-01-20 10:30:00
IP地址：xxx.xxx.xxx.xxx
```

## 🔒 安全考虑

1. **Spam Protection**: Netlify Forms内置反垃圾邮件功能
2. **Rate Limiting**: 自动限制表单提交频率
3. **Honeypot**: 已配置蜜罐字段防止机器人
4. **数据验证**: 前后端双重验证

## 🎨 自定义选项

### 修改表单样式
在 `satellite-orbit.tsx` 中修改对话框样式：
- 颜色主题
- 尺寸布局
- 动画效果

### 添加字段
1. 在前端表单中添加新字段
2. 在隐藏HTML表单中添加对应字段
3. 更新API路由验证逻辑

### 邮件模板（付费功能）
升级到Netlify付费计划后，可以：
- 自定义邮件HTML模板
- 添加logo和品牌元素
- 设置自动回复

## 📞 测试邮件功能

部署完成后，请测试邮件功能：
1. 访问您的网站
2. 点击右下角邮件按钮
3. 填写测试信息并提交
4. 检查您设置的邮箱是否收到通知

## 🔗 有用链接

- [Netlify Forms 文档](https://docs.netlify.com/forms/setup/)
- [Netlify Forms 定价](https://www.netlify.com/pricing/)
- [Next.js 部署指南](https://docs.netlify.com/frameworks/next-js/)

## 💡 常见问题

**Q: 为什么没有收到邮件？**
A: 检查垃圾邮件文件夹，确认Netlify Forms中的邮件地址配置正确。

**Q: 表单提交后显示404？**
A: 确保隐藏表单已正确添加到HTML中，并且Netlify已检测到表单。

**Q: 需要付费吗？**
A: Netlify Forms免费计划每月提供100次提交，超出需要升级。

---

🎉 恭喜！您的网站现在具备了完整的邮件发送功能。用户可以直接通过您的网站联系您！
