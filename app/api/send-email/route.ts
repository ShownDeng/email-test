import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // 验证必填字段
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    // 在Netlify上，表单提交将通过隐藏表单自动处理
    // 这里我们只需要返回成功状态
    // 实际的邮件发送将由Netlify Forms处理
    
    // 模拟提交到Netlify Forms（实际上在生产环境中由Netlify自动处理）
    const formData = new URLSearchParams()
    formData.append('form-name', 'contact')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('subject', subject)
    formData.append('message', message)

    // 在Netlify环境中，这将被正确路由到Netlify Forms
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    })

    return NextResponse.json({ success: true, message: '邮件发送成功' })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: '邮件发送失败，请稍后重试' },
      { status: 500 }
    )
  }
}
