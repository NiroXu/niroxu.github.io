export type NavItem = {
  label: string;
  href: string;
};

export type HeroCTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export type SiteProfile = {
  name: string;
  role: string;
  englishRole: string;
  heroEyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
  summary: string;
  availability: string;
  location: string;
  focusAreas: string[];
};

export type AboutCard = {
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  accentColor: string;
  previewType: "nebula" | "signal" | "orbit" | "matrix";
  image: string | null;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  metrics?: string[];
  status?: string;
  highlights?: string[];
  awards?: string;
};

export type SkillGroup = {
  title: string;
  icon: "atom" | "layers" | "server" | "database" | "sparkles";
  description: string;
  items: string[];
};

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
};

export type ContactLink = {
  label: string;
  href: string;
  note: string;
  icon: "github" | "mail" | "linkedin";
};

export type SceneQualityConfig = {
  starsCount: number;
  starsFactor: number;
  starsDepth: number;
  starSpeed: number;
  particleCount: number;
  particleScale: number;
  canvasDpr: [number, number];
  orbitSegments: number;
  parallaxIntensity: number;
  enableParallax: boolean;
  blurOpacity: number;
};

const GITHUB_PROFILE = "https://github.com/NiroXu";

export const navItems: NavItem[] = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#skills" },
  { label: "里程碑", href: "#experience" },
  { label: "联系", href: "#contact" },
];

export const profile: SiteProfile = {
  name: "Niro Xu",
  role: "AI Agent 与机器人开发者",
  englishRole: "AI Agent & Robotics Engineer",
  heroEyebrow: "Portfolio / Projects & Experiments",
  headline: "你好，我是 Niro Xu",
  subheadline: "关注 AI Agent、机器人系统与真实世界工程落地的开发者",
  description: "我构建 AI Agent、机器人和交互式系统。",
  summary:
    "这个网站记录了一些我做过、调试过、失败过、修好过，并从中学到东西的项目。",
  availability: "开放技术交流 · Open to collaboration",
  location: "聚焦 Agent 工作流与具身智能工程实践",
  focusAreas: [
    "LLM Agents",
    "RAG & Vector DB",
    "MCP & Tool Use",
    "ROS2 / Nav2",
    "Trace Observability",
  ],
};

export const heroCtas: HeroCTA[] = [
  { label: "查看项目", href: "#projects", variant: "primary" },
  { label: "GitHub", href: GITHUB_PROFILE, variant: "secondary", external: true },
  { label: "联系我", href: "#contact", variant: "ghost" },
];

export const aboutCards: AboutCard[] = [
  {
    title: "我是谁",
    eyebrow: "About / Identity",
    description:
      "我是一名关注 AI Agent、机器人系统与真实世界工程落地的开发者，习惯把复杂任务拆成可观测、可重试、可联调的系统。",
    highlights: ["Agent 工程", "机器人联调", "端到端落地"],
  },
  {
    title: "我会做什么",
    eyebrow: "Craft / Agent Systems",
    description:
      "从 Agent 搭建、 RAG 检索、到 上下文管理；从嵌入式仿真到实机搭建，都是我的研究方向。",
    highlights: ["Multi-Agent", "RAG Pipeline", "MCP 工具编排", "Trace 回溯"],
  },
  {
    title: "工程背景",
    eyebrow: "Robotics / Embedded",
    description:
      "在机器人方向积累过 ROS2 仿真导航、STM32 嵌入式控制、FSM 整机逻辑与竞赛级整机联调经验，为具身智能 Agent 提供工程底座。",
    highlights: ["ROS2", "STM32", "FSM", "实机落地"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "writing-style-agent",
    title: "面向自媒体的 AI 写作与文风迁移 Agent 引擎",
    subtitle: "文风仿写 · RAG · Multi-Agent · HTML Trace",
    description:
      "基于大语言模型构建文风迁移与内容生成 Agent 系统，支持新闻稿、自媒体文章等场景下的事实保留、风格迁移与结构重写，实现从原文到目标风格成稿的端到端自动化生成。",
    stack: ["Python", "LLM", "RAG", "Vector DB", "Multi-Agent", "HTML Trace"],
    accentColor: "#818cf8",
    previewType: "signal",
    image: null,
    githubUrl: GITHUB_PROFILE,
    liveUrl: "",
    featured: true,
    metrics: ["Agent Workflow", "RAG", "HTML Trace"],
    status: "Agent Workflow",
    highlights: [
      "设计并实现 RAG 检索增强流程，基于本地向量库召回相似文章、风格样例与写作模板，提升事实一致性与风格稳定性。",
      "采用多 Agent 协作范式拆解复杂写作任务，划分为任务路由、写作规划、内容生成、结果审查与反馈修正等模块，支持分步推理、失败重试与动态重规划。",
      "自研 HTML Trace 可观测链路，完整记录模型调用、Prompt、工具调用、Agent 状态流转与中间结果，支持对生成失败、风格偏移和事实错误快速回溯。",
      "构建 10 条文风仿写 benchmark，评估端到端成功率、生成耗时、风格一致性与可追踪性。",
    ],
  },
  {
    id: "ros2-mcp-nav-agent",
    title: "ROS2具身智能导航系统",
    subtitle: "自然语言控制 · fastmcp · Nav2 · Gazebo",
    description:
      "面向移动机器人自然语言控制场景，构建基于大语言模型、MCP 协议与 ROS2 导航栈的智能导航系统，实现自然语言指令到机器人导航行为的端到端映射。",
    stack: ["Python", "LLM", "MCP", "fastmcp", "ROS2", "Nav2", "Gazebo"],
    accentColor: "#38bdf8",
    previewType: "nebula",
    image: null,
    githubUrl: GITHUB_PROFILE,
    liveUrl: "",
    featured: true,
    metrics: ["MCP 解耦", "Nav2", "Gazebo 仿真"],
    status: "Embodied Agent",
    highlights: [
      "设计并实现基于 MCP 的机器人 Agent 通信架构，将 AI 决策层与 ROS2 控制层解耦，使 LLM 通过标准化工具接口调用导航能力。",
      "基于 fastmcp 封装 ROS2 导航动作接口，将目标点导航、状态查询、任务执行等能力抽象为 LLM 可调用工具。",
      "搭建完整 ROS2 仿真验证环境，完成 Gazebo 场景、slam_toolbox 建图、Nav2 配置与参数调优，实现地图构建、路径规划与自主导航。",
      "设计 Agent 决策层与执行层任务交互流程，具备自然语言理解、工具选择、导航执行与状态反馈能力。",
    ],
  },
  {
    id: "seedling-incubator",
    title: "种苗生长信息自动化采集无人育苗箱",
    subtitle: "嵌入式闭环控制 · 多源传感",
    description:
      "作为项目负责人，设计并实现面向种苗生长场景的自动化育苗箱系统，完成环境感知、闭环控制、数据采集与系统联调等核心工作。",
    stack: ["STM32", "Embedded C", "Sensors", "Closed-loop Control"],
    accentColor: "#34d399",
    previewType: "orbit",
    image: "/projects/seedling-incubator.png",
    githubUrl: GITHUB_PROFILE,
    liveUrl: "",
    featured: false,
    metrics: ["队长", "大创优秀结题", "节能减排国三"],
    status: "Team Lead",
    awards: "湖北省大创优秀结题 · 节能减排竞赛全国三等奖",
    highlights: [
      "基于 STM32 构建嵌入式控制系统，完成温度、湿度、光照等多源环境数据采集，并设计闭环控制逻辑实现环境参数自动调节。",
      "负责系统整体方案设计与团队协作，完成硬件选型、传感器接入、控制程序开发、整机调试与项目答辩。",
    ],
  },
  {
    id: "greenhouse-phenotyping-robot",
    title: "面向温室的盆栽表型信息获取机器人",
    subtitle: "磁导航 · FSM · 舵轮结构",
    description:
      "参与面向温室场景的盆栽表型信息获取机器人研发，负责移动底盘控制、路径跟随与整机运动逻辑设计，项目入选第十六届全国大学生创新年会。",
    stack: ["STM32", "FSM", "Magnetic Navigation", "Chassis Control"],
    accentColor: "#c084fc",
    previewType: "matrix",
    image: "/projects/greenhouse-robot.png",
    githubUrl: GITHUB_PROFILE,
    liveUrl: "",
    featured: false,
    metrics: ["创新年会", "磁导航", "FSM"],
    status: "Robotics",
    awards: "第十六届全国大学生创新年会",
    highlights: [
      "设计并实现机器人磁导航自动行驶方案，完成磁传感器信号采集、滤波处理与路径偏差判断，实现温室轨迹中的稳定循迹。",
      "基于有限状态机 FSM 构建整机控制程序，将运行流程拆分为行走、转向、跨垄、停车与异常处理等状态。",
      "自主设计舵轮运动结构，完成底盘运动控制、转向逻辑、跨垄工况切换与实地运行验证。",
    ],
  },
  {
    id: "cotton-seeding-robot",
    title: "棉花自动播种机器人控制系统设计与实现",
    subtitle: "多电机协同 · 嵌入式调度 · 队长",
    description:
      "作为队长完成棉花自动播种机器人设计与实现，负责整机方案设计、核心控制程序开发、机械结构搭建与系统联调，获国际智能农机装备大赛国家二等奖。",
    stack: ["STM32", "Motor Control", "Embedded Scheduling", "Mechanical Integration"],
    accentColor: "#fbbf24",
    previewType: "orbit",
    image: "/projects/cotton-robot.png",
    githubUrl: GITHUB_PROFILE,
    liveUrl: "",
    featured: false,
    metrics: ["队长", "农机大赛国二"],
    status: "Competition",
    awards: "智能农机装备大赛国家二等奖",
    highlights: [
      "设计多电机协同控制架构，完成播种机构、移动机构与执行机构之间的动作时序调度，实现指定作业流程下的自动播种。",
      "完成传感器接口、执行器控制与系统状态管理程序设计，构建稳定的嵌入式控制流程。",
      "独立完成机器搭建与系统联调，解决电机协同、结构干涉、动作同步和现场运行稳定性等问题。",
    ],
  },
  {
    id: "board-game-robot",
    title: "五子棋自动下棋机器人",
    subtitle: "坐标映射 · 多轴运动",
    description:
      "作为队长完成棋类自动下棋机器人设计与实现，负责主控程序架构设计、多轴运动控制、动作流程调度与整机系统调试，获全国大学生电子设计竞赛湖北省二等奖。",
    stack: ["Embedded C", "Motion Control", "Path Planning", "Mechanical Arm"],
    accentColor: "#7dd3fc",
    previewType: "signal",
    image: "/projects/board-game-robot.png",
    githubUrl: GITHUB_PROFILE,
    liveUrl: "",
    featured: false,
    metrics: ["队长", "电赛省二"],
    status: "Competition",
    awards: "全国大学生电子设计竞赛湖北省二等奖",
    highlights: [
      "设计机器人主控系统程序，实现棋盘坐标映射、目标位置解算、运动路径规划与落子动作控制，完成从识别决策到机械执行的完整流程。",
      "构建多轴运动控制逻辑，协调机械臂 / 平台运动、执行机构动作与状态反馈，保证落子准确性与稳定性。",
      "负责系统级联调与异常问题排查，优化运动精度、动作时序和执行稳定性。",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "AI Agent & LLM",
    icon: "sparkles",
    description: "面向复杂任务的 Agent 编排与工具调用。",
    items: ["LLM Agents", "Multi-Agent", "Tool Use", "Task Planning", "Prompt Engineering"],
  },
  {
    title: "RAG & Observability",
    icon: "database",
    description: "检索增强与可观测性，让生成过程可回溯、可评估。",
    items: ["RAG", "Vector DB", "Benchmark", "HTML Trace", "Failure Retry"],
  },
  {
    title: "Robotics & MCP",
    icon: "atom",
    description: "具身智能方向的协议解耦与导航栈实践。",
    items: ["MCP", "fastmcp", "ROS2", "Nav2", "Gazebo", "SLAM"],
  },
  {
    title: "Embedded & Control",
    icon: "server",
    description: "真实机器人场景的嵌入式工程。",
    items: ["STM32", "FSM", "Motor Control", "Sensors", "Closed-loop"],
  },
  {
    title: "Frontend & Interactive",
    icon: "layers",
    description: "交互式系统与作品集呈现。",
    items: ["agent", "LLM", "嵌入式", "机器人"],
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "timeline-01",
    period: "2023",
    title: "国际智能农机装备大赛国家二等奖",
    company: "棉花自动播种机器人 · 队长",
    description:
      "负责整机方案、多电机协同控制与竞赛落地联调，完成从结构设计到田间运行的完整闭环。",
    tags: ["控制理论", "中断控制", "状态管理"],
  },
  {
    id: "timeline-02",
    period: "2022",
    title: "全国大学生节能减排竞赛全国三等奖",
    company: "无人育苗箱 · 队长",
    description:
      "主导育苗箱环境感知与闭环控制系统，项目获湖北省大学生创新创业训练计划优秀结题。",
    tags: ["闭环控制", "环境感知", "STM32"],
  },
  {
    id: "timeline-03",
    period: "2023",
    title: "第十六届全国大学生创新年会",
    company: "温室盆栽表型信息获取机器人",
    description:
      "参与磁导航循迹、FSM 整机逻辑与舵轮结构研发，项目入选全国大学生创新年会。",
    tags: ["ROS2", "磁导航", "FSM"],
  },
  {
    id: "timeline-04",
    period: "2024",
    title: "全国大学生电子设计竞赛湖北省二等奖",
    company: "五子棋自动下棋机器人 · 队长",
    description:
      "完成主控架构、多轴运动控制与整机联调，实现从坐标解算到落子执行的完整棋类机器人系统。",
    tags: ["坐标映射", "多轴运动", "步进电机"],
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: GITHUB_PROFILE,
    note: "暂时还未开源，敬请期待",
    icon: "github",
  },
];

export const sceneQualityPresets: Record<string, SceneQualityConfig> = {
  desktop: {
    starsCount: 4200,
    starsFactor: 4,
    starsDepth: 60,
    starSpeed: 0.65,
    particleCount: 160,
    particleScale: 18,
    canvasDpr: [1, 1.8],
    orbitSegments: 64,
    parallaxIntensity: 16,
    enableParallax: true,
    blurOpacity: 0.72,
  },
  mobile: {
    starsCount: 1800,
    starsFactor: 3,
    starsDepth: 42,
    starSpeed: 0.4,
    particleCount: 72,
    particleScale: 12,
    canvasDpr: [1, 1.25],
    orbitSegments: 42,
    parallaxIntensity: 8,
    enableParallax: true,
    blurOpacity: 0.48,
  },
  reducedMotion: {
    starsCount: 900,
    starsFactor: 2.4,
    starsDepth: 30,
    starSpeed: 0.08,
    particleCount: 24,
    particleScale: 8,
    canvasDpr: [1, 1.2],
    orbitSegments: 28,
    parallaxIntensity: 0,
    enableParallax: false,
    blurOpacity: 0.32,
  },
};

export const siteContent = {
  navItems,
  profile,
  heroCtas,
  aboutCards,
  projects,
  skillGroups,
  timeline,
  contactLinks,
};
