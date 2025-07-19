"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Html } from "@react-three/drei"
import type * as THREE from "three"
import Image from "next/image" // Import Next.js Image component
import { useRouter } from "next/navigation" // Import useRouter for navigation
import { books } from "@/lib/book-data" // Import book data
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// 卫星组件 - 不同大小的球体带纹路
function Satellite({
  orbitRadius,
  orbitSpeed,
  color = "#ffffff",
  initialAngle = 0,
  size = 0.15,
  bookTitle = "未知书籍", // 新增书名属性
  bookImage = "/placeholder.svg?height=100&width=70", // 新增图片属性
  bookSlug, // 新增书籍slug属性
}: {
  orbitRadius: number
  orbitSpeed: number
  color?: string
  initialAngle?: number
  size?: number
  bookTitle?: string
  bookImage?: string
  bookSlug: string // slug是必需的
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  useFrame((state) => {
    if (groupRef.current) {
      // 轨道旋转
      groupRef.current.rotation.y = state.clock.elapsedTime * orbitSpeed + initialAngle
    }

    if (meshRef.current) {
      // 卫星自转
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.z += 0.01

      // 轻微的上下漂浮
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
  })

  const handleClick = () => {
    router.push(`/books/${bookSlug}`)
  }

  return (
    <group ref={groupRef}>
      <group position={[orbitRadius, 0, 0]}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick} // 添加点击事件
        >
          {/* 卫星球体 - 增加细分度以显示纹路 */}
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.4}
          />

          {/* 添加网格线纹路 */}
          <mesh>
            <sphereGeometry args={[size + 0.001, 16, 16]} />
            <meshBasicMaterial color="#888888" transparent opacity={0.3} wireframe={true} />
          </mesh>
        </mesh>

        {/* 悬浮牌子 */}
        {hovered && (
          <Html position={[0, size + 0.5, 0]} center>
            <div
              className="
              bg-white rounded-xl shadow-lg overflow-hidden
              w-[180px] cursor-pointer
              transform transition-all duration-300 ease-out
              hover:scale-105 hover:-translate-y-1
            "
            >
              {/* 图片区域 - 占据顶部大部分空间 */}
              <div className="w-full h-[150px] relative">
                <Image
                  src={bookImage || "/placeholder.svg"}
                  alt={bookTitle}
                  fill // 使用fill属性让图片填充父容器
                  className="object-cover"
                />
              </div>
              {/* 内容区域 */}
              <div className="p-4 text-left">
                <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">{bookTitle}</h3>
                <p className="text-xs text-gray-600 mb-3">点击查看观后感</p>
                <button className="w-full bg-black text-white text-sm font-semibold py-2 rounded-md hover:bg-gray-800 transition-colors">
                  查看详情
                </button>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}

// 轨道线组件 - 全部改为白色
function OrbitRing({ radius }: { radius: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.01, radius + 0.01, 128]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={2} />
    </mesh>
  )
}

// 中心核心 - 保持之前的样子
function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.x += 0.005
      ringsRef.current.rotation.z += 0.003
    }
  })

  return (
    <group>
      {/* 中心球体 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#00ffff"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 旋转环 */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.03, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.4} transparent opacity={0.8} />
        </mesh>

        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.9, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} transparent opacity={0.6} />
        </mesh>

        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.0, 0.015, 16, 100]} />
          <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.2} transparent opacity={0.4} />
        </mesh>

        <mesh rotation={[Math.PI / 3, Math.PI / 6, Math.PI / 4]}>
          <torusGeometry args={[1.15, 0.008, 16, 100]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  )
}

// 背景粒子
function SpaceParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005
    }
  })

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.3} />
    </points>
  )
}

export default function SatelliteOrbit() {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [userIP, setUserIP] = useState<string>('')

  // 获取用户IP地址
  useEffect(() => {
    const getUserIP = async () => {
      try {
        // 使用更可靠的IP服务
        const ipServices = [
          { url: 'https://api.ipify.org?format=json', type: 'json', key: 'ip' },
          { url: 'https://ipapi.co/json/', type: 'json', key: 'ip' },
          { url: 'https://api.ip.sb/ip', type: 'text' },
          { url: 'https://ifconfig.me/ip', type: 'text' },
          { url: 'https://icanhazip.com', type: 'text' }
        ]
        
        for (const service of ipServices) {
          try {
            console.log(`尝试获取IP from: ${service.url}`)
            const response = await fetch(service.url, {
              method: 'GET',
              mode: 'cors',
              cache: 'no-cache'
            })
            
            if (response.ok) {
              if (service.type === 'json') {
                const data = await response.json()
                const ip = data[service.key!]
                if (ip) {
                  console.log(`成功获取IP: ${ip}`)
                  setUserIP(ip)
                  return
                }
              } else {
                const ip = (await response.text()).trim()
                if (ip && /^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
                  console.log(`成功获取IP: ${ip}`)
                  setUserIP(ip)
                  return
                }
              }
            }
          } catch (err) {
            console.log(`${service.url} 失败:`, err)
            continue
          }
        }
        
        // 如果所有服务都失败，设置一个标记
        console.log('所有IP服务都失败，使用客户端检测')
        setUserIP('客户端检测失败')
      } catch (error) {
        console.log('IP获取过程出错:', error)
        setUserIP('获取失败')
      }
    }
    
    getUserIP()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // 获取时间戳和浏览器信息
      const timestamp = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      const userAgent = navigator.userAgent
      const currentIP = userIP || '正在获取...'

      // 创建增强的消息内容
      const enhancedMessage = `${emailForm.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 提交信息记录
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 提交时间: ${timestamp}
🌐 用户IP: ${currentIP}
💻 浏览器: ${userAgent}
📄 来源页面: ${window.location.href}
🔍 屏幕分辨率: ${window.screen.width}x${window.screen.height}
🌍 时区: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

      // 根据Netlify官方文档的要求提交表单
      const formData = new FormData()
      formData.append('form-name', 'contact')
      formData.append('name', emailForm.name)
      formData.append('email', emailForm.email)
      formData.append('subject', emailForm.subject)
      formData.append('message', enhancedMessage)
      
      // 添加隐藏字段来传递额外信息
      formData.append('timestamp', timestamp)
      formData.append('user_ip', currentIP)
      formData.append('user_agent', userAgent)
      formData.append('page_url', window.location.href)

      console.log('提交的表单数据:', {
        name: emailForm.name,
        email: emailForm.email,
        subject: emailForm.subject,
        ip: currentIP,
        timestamp: timestamp
      })

      const response = await fetch('/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: new URLSearchParams(formData as any).toString()
      })

      if (response.ok) {
        setSubmitStatus('success')
        setEmailForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => {
          setIsEmailDialogOpen(false)
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
        {/* 环境光 */}
        <ambientLight intensity={0.05} />

        {/* 主光源 */}
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#00ffff" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />

        {/* 星空背景 */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

        {/* 背景粒子 */}
        <SpaceParticles />

        {/* 中心发光体 */}
        <CentralCore />

        {/* 轨道线 - 全部白色 */}
        <OrbitRing radius={2.5} />
        <OrbitRing radius={4} />
        <OrbitRing radius={5.5} />
        <OrbitRing radius={7} />

        {/* 卫星球体 - 不同大小，都小于中心球体(0.5) */}
        {books.map((book, index) => (
          <Satellite
            key={book.slug}
            orbitRadius={index % 4 === 0 ? 2.5 : index % 4 === 1 ? 4 : index % 4 === 2 ? 5.5 : 7}
            orbitSpeed={index % 4 === 0 ? 0.2 : index % 4 === 1 ? 0.15 : index % 4 === 2 ? 0.1 : 0.07} // 降低速度
            color="#ffffff"
            initialAngle={(index * Math.PI * 2) / books.length} // 均匀分布
            size={0.07 + (index % 5) * 0.025} // 随机大小，确保小于0.5
            bookTitle={book.title}
            bookImage={book.image}
            bookSlug={book.slug}
          />
        ))}

        {/* 轨道控制 */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={25}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* 邮件按钮 - 固定在右下角 */}
      <div className="absolute bottom-6 right-6 z-10">
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-110"
              size="icon"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[500px] bg-black/90 border-cyan-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-cyan-400 text-xl">联系我</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 隐藏字段：Netlify表单必需 */}
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">姓名</Label>
                  <Input
                    id="name"
                    name="name"
                    value={emailForm.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                    placeholder="您的姓名"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">邮箱</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={emailForm.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                    placeholder="您的邮箱"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">主题</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={emailForm.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  placeholder="邮件主题"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">消息</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={emailForm.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 resize-none"
                  placeholder="请输入您想说的话..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="text-green-400 text-sm">
                  ✓ 邮件发送成功！感谢您的联系。
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-400 text-sm">
                  ✗ 发送失败，请稍后重试。
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEmailDialogOpen(false)}
                  className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {isSubmitting ? '发送中...' : '发送邮件'}
                </Button>
              </div>

              {/* 显示检测到的信息 */}
              
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
