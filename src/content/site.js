export const site = {
  person: {
    name: '侯开纪',
    nameEn: 'Kaiji Hou',
    tagline: '跨视角地理定位 · 视觉生成 · 大模型工程',
    location: '武汉',
    email: '1377295397@qq.com',
    phone: '18963972706',
    links: {
      github: 'https://github.com/kaijiHou?tab=repositories',
      scholar: '',
      cv: '',
    },
    about:
      '硕士期间深耕计算机技术，具备系统的计算机科学与技术理论知识，获校优秀毕业论文与优秀毕业生。在实习与项目中深入参与大模型微调、部署与应用，熟悉从数据构建到模型落地的全流程；在无人机定位、图像超分辨率等计算机视觉任务中提出创新模块并实现性能显著提升。以第一作者在SCI等期刊发表多篇论文，参与国家级创新项目并主导技术方案设计。',
    strengths: [
      {
        title: '扎实的技术根基',
        desc: '硕士期间发表 3 篇 SCI/CCF 论文，深度学习比赛全国前10，获校优秀毕业论文、优秀毕业生。具备系统的计算机科学与技术理论知识，获得多项奖学金及荣誉奖项。',
        icon: '🎓',
      },
      {
        title: '大模型与CV项目经验',
        desc: '深入参与大模型微调（LLaMA-Factory + LoRA）、高性能部署（vLLM）与 AI Agent 工作流编排（LangChain/LangGraph），掌握 YOLOv8/v11 全流程（训练→ONNX 导出→推理部署）及 SAM3、ComfyUI 自动化标注工具链；在无人机跨视角定位（DINOv3、CLIP）、图像超分辨率（SRGAN）、多视角生成（Diffusion）及多模态语义分析（Qwen3-VL）等 CV 任务中提出创新模块，实现性能显著提升。',
        icon: '🤖',
      },
      {
        title: '全栈工程与系统开发能力',
        desc: '熟练掌握 C++、Python 等语言，具备 HTTP 协议栈、Redis 缓存、多线程、OpenCV 等系统开发与优化经验，能独立完成高并发服务与智能系统搭建。',
        icon: '⚙️',
      },
      {
        title: '突出的科研与创新能力',
        desc: '以第一作者在 SCI 等期刊发表多篇论文，参与国家级创新项目并主导技术方案设计，具备较强的问题发现、方法创新与成果转化能力。',
        icon: '🔬',
      },
      {
        title: '综合素养与团队协作',
        desc: '担任班长、项目负责人等职务，获得"校优秀干部"等荣誉，具备良好的组织协调、沟通表达与多任务推进能力。在校期间志愿者时长 120 小时。',
        icon: '🤝',
      },
    ],
    focus: [
      'Cross-view Geo-Localization',
      'Diffusion / Generation',
      'RAG / LLM Systems',
      'Training Pipeline & Observability',
      'Deployment & Quantization',
    ],
    skills: [
      'PyTorch',
      'Jittor / Ascend',
      'YOLOv8 / ONNX',
      'vLLM / GPTQ',
      'LLaMA-Factory / LoRA',
      'SAM3 / ComfyUI',
      'LangChain / LangGraph',
      '工作流编排',
      'Django',
      'C++ / OpenCV',
      'Redis / HTTP',
      'Streamlit',
      'llama.cpp',
      'Qt / QThreadPool',
      'Docker',
    ],
  },

  publications: [
    {
      title:
        'MCFA: Multi-Scale Cascade and Feature Adaptive Alignment Network for Cross-View Geo-Localization',
      venue: 'Sensors (JCR Q2, SCI)',
      year: '2025',
      authors: 'Kaiji Hou, ...',
      image: '/papers/mcfa.jpg',
      abstract:
        '跨视角地理定位（CVGL）因无人机与卫星图像在视角和场景布局上的剧烈差异面临巨大挑战。本文提出多尺度级联与特征自适应对齐网络（MCFA），包含多尺度级联模块（MSCM）和特征自适应对齐模块（FAAM）。MSCM 通过关联与融合捕获目标邻近区域特征，增强模型鲁棒性；FAAM 通过动态加权特征对齐，自适应调整跨视角特征差异，实现无人机与卫星图像间的精准对齐。',
      links: {
        paper: 'https://www.mdpi.com/1424-8220/25/14/4519',
        code: '',
      },
      tags: ['Geo-Localization', 'Cross-view', 'Feature Alignment'],
      highlight: '跨域泛化提升 >5.8%',
    },
    {
      title: 'Structural Perception Enhancement for Cross-View Geo-Localization',
      venue: 'PRCV (CCF C)',
      year: '2025',
      authors: 'Kaiji Hou, ...',
      image: '/papers/spe.jpg',
      abstract:
        '由于无人机（UAV）与卫星图像之间的视角和场景布局存在巨大差异，跨视角地理定位（CVGL）面临显著挑战。现有方法主要强调全局语义特征提取，但往往忽略细粒度局部区域，且在跨视角特征对齐方面存在困难。为此，我们提出结构感知增强（SPE）网络，基于 DINOv2 骨干架构，集成局部区域挖掘模块（LRMM），用于提取判别性区域特征并实现精确的跨视角特征对齐。此外，引入样本再平衡策略（SRS）以解决卫星图像稀缺和样本不平衡导致的训练不稳定问题。',
      links: {
        paper: 'https://link.springer.com/chapter/10.1007/978-981-95-5699-1_34',
        code: '',
      },
      tags: ['DINOv2', 'Cross-view', 'Retrieval'],
      highlight: 'R@1 +0.44%、AP +0.96%',
    },
    {
      title: 'Geometry-Aware Diffusion for Controllable Multi-View Aerial Generation (View-Diff)',
      venue: 'PRCV (CCF C)',
      year: '2025',
      authors: 'Kaiji Hou, ...',
      image: '/papers/viewdiff.jpg',
      abstract:
        '多视角图像生成常因三维场景理解不足导致几何不一致与纹理不连续。本文提出 View-Diff，一个几何感知的双分支扩散框架。核心创新：1）双分支流水线——视角变换分支精确变换已知区域，空间引导模块利用场景几何特征引导未知区域真实补全，保持跨视角空间一致性；2）优化感知模块——引入结构保持感知损失，增强已知区域特征保持，提升整体一致性。',
      links: {
        paper: 'https://link.springer.com/chapter/10.1007/978-981-95-5628-1_33',
        code: '',
      },
      tags: ['Diffusion', 'Aerial', 'Multi-view'],
      highlight: '跨视角一致性更强',
    },
  ],

  projects: [
    {
      name: 'YQDet — 多模态检测分析系统',
      period: '2025.08 - 至今',
      role: '项目负责人',
      image: '/projects/YQDet.jpg',
      summary:
        '多模态检测分析系统 — 基于 Vue 3 + YOLOv11 + Qwen3-VL 的图片/视频目标检测与语义分析平台，支持类别筛选、Qwen-VL 多模态匹配、历史记录可视化大屏。系统采用 YOLOv11 进行快速目标粗筛，若无检测目标则直接跳过，避免无效调用；若存在目标则触发 Qwen3-VL 进行深度多模态语义分析，在保证精度的同时显著降低大模型调用成本与延迟。',
      bullets: [
        '基于 YOLOv11 实现快速目标检测粗筛，无目标直接跳过，有目标才触发大模型分析，显著降低 API 调用成本。',
        '集成 Qwen3-VL 多模态大模型进行深度语义分析，实现目标属性识别、场景理解与自然语言描述生成。',
        'Vue 3 前端支持图片上传、视频帧提取、类别筛选、检测结果可视化对比。',
        '历史记录大屏展示，支持检测数据统计、趋势分析与结果回溯。',
      ],
      stack: ['Vue 3', 'YOLOv11', 'Qwen3-VL', 'Python', 'FastAPI', 'ECharts'],
      links: { github: 'https://github.com/kaijiHou/YQDet' },
    },
    {
      name: '无人机定位系统（清华大学合作项目）',
      period: '2024.02 - 2025.04',
      role: '算法设计',
      image: '/projects/uav.jpg',
      summary:
        '使用深度学习模型完成无人机在 GNSS 拒止条件下的快速定位。通过构建无人机影像与高分辨率卫星底图匹配系统，高效智能地为用户定位出任意大小区域的影像，实现区域快速定位。',
      bullets: [
        '创新性提出环形细粒度池化与多轴空间注意力模块，并基于 DINOv3、GIM 等深度学习模型搭建跨视角图像检索流程，使整体定位准确率较主流方法提升 13.4%。',
        '主导模型从 PyTorch 向国产深度学习平台 Jittor 的高效迁移，完成国产 NPU 与推理环境适配，并成功在华为昇腾开发板实现部署，实现完全国产化的推理方案。',
        '基于上述研究成果，以第一作者在 SCI 期刊发表论文。',
      ],
      stack: ['PyTorch', 'DINOv3/GIM', 'Jittor', 'Ascend', 'NPU'],
      links: { github: 'https://github.com/kaijiHou/SPE-Net' },
    },
    {
      name: 'C++ 智能图像展示与检索服务',
      period: '2025.02 - 2025.09',
      role: '项目负责人',
      image: '/projects/cpp_server.jpg',
      summary:
        '开发多主题图文展示平台，用户可上传文字和图片生成分主题相册。系统后台自动生成原图与压缩图以平衡展示速度与存储开销。集成本地大语言模型语义检索模块，支持用户以自然语言描述搜索相关主题相册。',
      bullets: [
        '实现 HTTP/1.1 协议栈，基于 Reactor 实现非阻塞 I/O，能够高效处理大量并发连接与请求。',
        '使用 redis-plus-plus 构建多层缓存机制，实现动态内容异步预加载与客户端动态渲染，扩展实时访客计数与热门榜单功能。',
        '集成 llama3.2-3B-Instruct 模型，实现相册语义检索功能，检索准确率较关键词匹配提升约 35%。',
        '使用 OpenCV 和 libjpeg-turbo 对图片进行尺寸缩放和多格式压缩，压缩后图像体积减小 40%–60%。',
        '采用 RAII 机制与智能指针管理资源生命周期，利用移动语义避免大规模数据拷贝，通过 std::atomic、std::mutex 实现高效线程同步。',
      ],
      stack: ['C++', 'HTTP/1.1', 'Redis', 'OpenCV', 'llama.cpp', 'libjpeg-turbo'],
      links: {},
    },
    {
      name: '基于 QT 的斗地主游戏',
      period: '2024.11 - 2025.02',
      role: '个人项目',
      image: '/projects/doudizhu.jpg',
      summary:
        '基于 Qt 框架独立设计并开发了一款完整的斗地主游戏，实现了发牌、叫地主、智能 AI 对战、动画特效、记牌器及语音提示在内的全套功能。',
      bullets: [
        '实现发牌、叫地主、出牌验证等全套游戏规则，利用 Qt 信号与槽在游戏控制器、界面和玩家对象之间传递事件，确保实时同步。',
        '使用 QPropertyAnimation 实现卡牌移动、结算面板弹出等动画效果，通过状态管理精确控制游戏环节切换。',
        '基于 QThreadPool 与 QtConcurrent 实现机器人玩家，设计包含牌型分析、跟牌逻辑的智能算法，实现 AI 难度级别实时切换。',
        '完整开发记牌器、语音提示、倒计时和出牌建议等功能，实现卡牌选中、拖拽反馈等直观交互操作。',
      ],
      stack: ['C++', 'Qt', 'QThreadPool', 'QtConcurrent', 'Animation'],
      links: {},
    },
    {
      name: '图像超分辨率系统（国家级创新训练项目）',
      period: '2021.08 - 2023.06',
      role: '项目负责人',
      image: '/projects/srgan.jpg',
      summary:
        '编号：202111072003。基于 SRGAN 架构，采用 ConvNeXt 作为特征提取骨干，设计双分支超分辨率流程并改进感知模块，系统优化训练策略，显著提升图像超分辨率的细节恢复与感知质量。',
      bullets: [
        'SSIM 和 PSNR 较原论文平均提升 8%。',
        '在 Linux 环境下基于 Django 搭建超分辨率系统后端，完成模型推理接口设计与任务调度，实现图像上传、处理与结果返回的全流程服务。',
        '发表论文《基于 SRGAN 的图像超分辨率方法研究》，并完成申请书、技术文档、结项报告撰写。',
      ],
      stack: ['PyTorch', 'SRGAN', 'ConvNeXt', 'Django', 'Linux'],
      links: { project: 'http://gjcxcy.bjtu.edu.cn/NewLXItemListForStudentDetail.aspx?ItemNo=744392&year=2021&type=student&IsLXItem=0' },
    },
  ],

  experience: [
    {
      company: '北京旷视科技有限公司',
      team: '云服务事业部（CSG）',
      title: '大模型算法实习生',
      period: '2025.10 - 2026.03（北京）',
      bullets: [
        '基于 Hermes Agent 构建车牌检测自动化工作流，支持通过自然语言触发数据划分、YOLO 标注格式转换、YOLOv8 训练调度、mAP 评估及 ONNX 模型导出等流程。',
        '基于 SAM3 与 ComfyUI 搭建全自动车牌标注工作流，支持文本、点位、边界框多模态输入，完成 10,000+ 张车牌图像的自动化分割与标注输出，标注效率较人工提升约 8 倍。',
        '设计并实现 Agent 工具链调用机制，集成异常检测与告警、训练状态远程推送（微信/QQ）、失败样本自动归类及流程复用能力，实现训练过程的可观测与可追踪。',
        '整理并清洗 20万+ 高质量文本语料、7万+ 数学公式、2,500+ LaTeX 表格数据，建立标准化数据存储体系。',
        '设计文档生成引擎，将语料库数据组合生成中英文 600万+ 高质量结构化 JSON 文档，为下游文档渲染系统提供标准化数据输入。利用 Streamlit 搭建可视化平台，实现数据生成与标注结果实时对比验证。',
      ],
    },
    {
      company: '北京研搜科技有限公司',
      team: '',
      title: '大模型算法工程师',
      period: '2024.12 - 2025.07（北京）',
      bullets: [
        '参与某研究所展示系统智能化升级，构建领域微调大模型，实现用户输入问题后，系统根据相关新闻内容生成精准概括回答的功能。',
        '编写 Python 脚本自动抓取并解析相关新闻内容，进行文本清洗、去噪与结构化处理，构建高质量微调数据集。',
        '基于 LLaMA-Factory 框架，使用 LoRA 方法对 Qwen3 8B 进行高效微调，设计领域指令与样例，提升模型在特定业务场景的理解与生成能力。',
        '以 vLLM 为高性能推理引擎，结合 RAG 实现文档向量化检索，通过 LangGraph 构建可编排的 Agent 工作流，完成检索意图识别、知识库召回、多源数据调度与结果结构化梳理的全流程业务逻辑，已在内部场景完成验证。',
      ],
    },
  ],

  education: [
    {
      school: '北京信息科技大学',
      degree: '计算机技术（硕士）',
      period: '2023.09 - 2026.06（北京）',
      notes: ['校优秀毕业生', '校优秀硕士论文', '校一等奖学金'],
    },
    {
      school: '江汉大学',
      degree: '计算机科学与技术（本科）',
      period: '2019.09 - 2023.06（武汉）',
      notes: ['校优秀毕业生（排名前 5%）', '班长', '校优秀干部奖学金、校二等奖学金'],
    },
  ],

  honors: [
    '第四届天智杯"智慧地球领域"人工智能竞赛 全国前十（军事航天部队装备部主办）',
    '第14届中国大学生计算机设计大赛 全国三等奖',
    '第14届中国大学生计算机设计大赛 中南赛区 一等奖',
    '英语六级（513分），计算机软件著作权登记证书，英特尔 OpenVINO 资格证书',
  ],
}
