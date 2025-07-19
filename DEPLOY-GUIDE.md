# 🚀 Netlify 部署指南

## 快速部署步骤

### 1. 推送代码到GitHub
```bash
git add .
git commit -m "Add email contact form"
git push origin main
```

### 2. 连接Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 点击 "New site from Git"
3. 选择GitHub并连接您的仓库
4. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
5. 点击 "Deploy site"

### 3. 配置邮件通知
部署成功后：
1. 进入Netlify控制台 → 您的站点
2. 点击 "Forms" 选项卡
3. 找到 "contact" 表单
4. 点击表单名称进入设置
5. 在 "Notifications" 部分：
   - 点击 "Add notification"
   - 选择 "Email notification"
   - 输入您的邮箱地址
   - 保存

## 📧 邮件功能说明

- **位置**: 网站右下角的蓝色邮件按钮
- **功能**: 用户可以填写姓名、邮箱、主题和消息
- **通知**: 每次有人提交表单，您都会收到邮件通知
- **免费额度**: Netlify提供每月100次免费表单提交

## 🎉 完成！

部署完成后，您的网站将具备：
- 美丽的3D卫星轨道展示
- 完整的邮件联系功能
- 自动化的邮件通知系统

测试方法：访问您的网站，点击右下角邮件按钮，发送测试邮件。
