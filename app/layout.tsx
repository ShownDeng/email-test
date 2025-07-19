import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '卫星轨道 - Satellite Orbit',
  description: '一个美丽的3D卫星轨道可视化网站',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        {/* 隐藏的Netlify表单 - 根据官方文档要求 */}
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="bot-field" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="subject" />
          <textarea name="message"></textarea>
          <input type="text" name="timestamp" />
          <input type="text" name="user_ip" />
          <input type="text" name="user_agent" />
          <input type="text" name="page_url" />
        </form>
      </body>
    </html>
  )
}
