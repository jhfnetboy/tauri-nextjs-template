"use client";
import { RoundedButton } from "@/components/RoundedButton";
import Image from "next/image";
import { useCallback } from "react";
import Link from "next/link";

export default function Home() {
  // 模拟登录功能
  const handleLogin = useCallback((): void => {
    // 这里实际应该调用 Tauri API 进行登录认证
    console.log("Login clicked");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row gap-8 items-center mb-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">欢迎使用 COS72 社区工具</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            COS72 是一个简单的社区工具，任何产品或商业都可以建立自己的社区，内嵌常用功能。
            通过这个平台，您可以连接用户、激励参与并建立忠诚度。
          </p>
          <div className="flex gap-4">
            <RoundedButton 
              onClick={handleLogin} 
              title="登录/注册" 
              disabled={false}
            />
            <Link href="/onboarding">
              <span className="m-4 max-w-xs rounded-xl border border-gray-200 p-6 text-left text-inherit transition-colors hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 active:border-blue-600 active:text-blue-600 cursor-pointer rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
                了解更多
              </span>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* 这里可以放置社区工具的示意图或标志 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-bold text-gray-300 dark:text-gray-600">COS72</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">主要功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="border p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 text-xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">如何使用</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-lg">克隆后初始化配置</li>
              <li className="text-lg">一键完成后网址部署（github pages或者netlify或者其他）</li>
              <li className="text-lg">创建社区，开始使用</li>
              <li className="text-lg">通过管理界面设置社区基础信息和合约</li>
              <li className="text-lg">邀请用户加入并开始互动</li>
            </ol>
          </div>
          <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-3">最近活动</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="border-b pb-2">
                  <p className="font-medium">{activity.action}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{activity.user}</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">准备好开始了吗？</h2>
        <p className="max-w-2xl mx-auto mb-6">
          加入 COS72，创建您自己的社区，激励用户参与并建立一个充满活力的生态系统。
        </p>
        <RoundedButton 
          onClick={handleLogin} 
          title="立即开始"
          disabled={false}
        />
      </section>
    </div>
  );
}

// 模拟数据
const features = [
  {
    icon: "🚀",
    title: "Onboarding",
    description: "新用户/未登录用户可见，注册后获得Gas Card，有reputation后领取SBT"
  },
  {
    icon: "💰",
    title: "OpenPNTs/OpenCards",
    description: "发行积分和建立白卡，其他社区有reputation的可获得积分赞助"
  },
  {
    icon: "✅",
    title: "Tasks",
    description: "合约交互，完成任务获得积分和reputation"
  },
  {
    icon: "🛒",
    title: "Shops",
    description: "管理员上传服务和商品，成员用积分兑换商品、服务和优惠券"
  },
  {
    icon: "🏆",
    title: "Reputation Rank",
    description: "依靠完成任务获得reputation，有nft和权重积分"
  },
  {
    icon: "🏠",
    title: "Homepage",
    description: "指向单页面介绍，默认是首页，可设置背景图片"
  }
];

const activities = [
  {
    id: 1,
    user: "User123",
    action: "完成了\"社区推广\"任务",
    time: "2小时前"
  },
  {
    id: 2,
    user: "Community456",
    action: "发布了新的社区奖励",
    time: "5小时前"
  },
  {
    id: 3,
    user: "Developer789",
    action: "获得了 'Web3 贡献者' SBT",
    time: "1天前"
  },
  {
    id: 4,
    user: "Admin001",
    action: "更新了社区规则",
    time: "2天前"
  }
];
