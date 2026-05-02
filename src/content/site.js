export const site = {
    person: {
      name: '侯开纪',
      nameEn: 'Kaiji Hou', // 可删
      tagline: '跨视角地理定位 / 视觉生成 / 大模型工程',
      location: '北京 / 武汉',
      email: '1377295397@qq.com',
      phone: '18963972706',
      // 先留空，后面你再填
      links: {
        github: '',
        scholar: '',
        cv: '', // 比如 '/cv.pdf'
        homepage: '',
      },
      about:
        '我关注跨视角地理定位、视觉生成与大模型工程落地。具备从数据与训练管线、模型训练与推理优化，到国产化迁移与部署的完整工程经验。',
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
        'Django',
        'C++ / OpenCV',
        'Streamlit',
      ],
    },
  
    publications: [
      {
        title:
          'MCFA: Multi-Scale Cascade and Feature Adaptive Alignment Network for Cross-View Geo-Localization',
        venue: 'Sensors (JCR Q2)',
        year: '—',
        authors: 'Kaiji Hou, ...',
        // poster/teaser 图：放 public/papers/mcfa.jpg，然后填 '/papers/mcfa.jpg'
        image: '',
        abstract:
          '通过充分挖掘无人机与卫星在同一场景下的互补视角信息，强化显著目标及其邻近区域的特征表达，并引入无人机视角独有的几何与尺度特性；在低空跨域泛化实验中较主流方法提升超 5.8%。',
        links: {
          paper: '',
          arxiv: '',
          code: '',
          project: '',
        },
        tags: ['Geo-Localization', 'Cross-view', 'Alignment'],
        highlight: '跨域泛化提升 >5.8%',
      },
      {
        title: 'Structural Perception Enhancement for Cross-View Geo-Localization',
        venue: 'PRCV (CCF C)',
        year: '—',
        authors: 'Kaiji Hou, ...',
        image: '',
        abstract:
          '提出基于 DINOv2 的 Structural Perception Enhancement 网络，挖掘细粒度区域特征并实现跨视角精准对齐；结合样本重平衡缓解卫星样本稀缺带来的训练不稳定，在 U1652 与 SUES-200 上提升 R@1 与 AP。',
        links: { paper: '', arxiv: '', code: '', project: '' },
        tags: ['DINOv2', 'Cross-view', 'Retrieval'],
        highlight: 'R@1 +0.44%、AP +0.96%',
      },
      {
        title: 'Geometry-Aware Diffusion for Controllable Multi-View Aerial Generation (View-Diff)',
        venue: 'PRCV',
        year: '—',
        authors: 'Kaiji Hou, ...',
        image: '',
        abstract:
          '提出几何感知双分支扩散框架，通过视点变换与空间引导补全协同、结构保持损失约束，实现遮挡区域真实补全与跨视角一致；在 LPIPS 等指标显著超过 SOTA。',
        links: { paper: '', arxiv: '', code: '', project: '' },
        tags: ['Diffusion', 'Aerial', 'Multi-view'],
        highlight: '跨视角一致性更强',
      },
    ],
  
    projects: [
      {
        name: '无人机跨视角地理定位算法优化与国产化迁移（清华大学合作）',
        period: '2024.04 - 2026.06',
        image: '',
        summary:
          '在 GNSS 拒止条件下，通过无人机影像与高分辨率卫星底图匹配，实现区域快速定位。',
        bullets: [
          '提出环形细粒度池化与多轴空间注意力模块，定位准确率较主流方法提升 13.4%。',
          '主导从 PyTorch 迁移至 Jittor，适配国产 NPU 推理环境，并在华为昇腾开发板部署。',
          '研究成果以第一作者发表于 SCI 期刊（后续补链接）。',
        ],
        stack: ['PyTorch', 'DINOv3/GIM', 'Jittor', 'Ascend'],
        links: { repo: '', demo: '', paper: '' },
      },
      {
        name: '基于机器学习的图像超分辨率系统（国家级大创负责人）',
        period: '2021.08 - 2023.06',
        image: '',
        summary:
          '基于 SRGAN + ConvNeXt 设计双分支超分辨率流程，并完成后端服务化与任务调度。',
        bullets: [
          'SSIM/PSNR 较原论文平均提升约 8%。',
          '基于 Django 实现上传-处理-返回的全流程服务。',
          '产出论文《基于 SRGAN 的图像超分辨率方法研究》（后续补链接）。',
        ],
        stack: ['PyTorch', 'SRGAN', 'Django', 'Linux'],
        links: { repo: '', demo: '', paper: '' },
      },
      {
        name: 'C++ 智能图像展示与检索服务（本地 LLM 语义检索）',
        period: '2025.01 - 2025.09',
        image: '',
        summary:
          '多主题图文展示平台：图片压缩与生成缩略图；集成 llama.cpp 做隐私友好的语义检索。',
        bullets: [
          'OpenCV + libjpeg-turbo 压缩后体积降低 40%–60%。',
          '语义检索较关键词匹配准确率提升约 35%。',
        ],
        stack: ['C++', 'OpenCV', 'libjpeg-turbo', 'llama.cpp'],
        links: { repo: '', demo: '' },
      },
    ],
  
    experience: [
      {
        company: '北京旷视科技有限公司',
        team: '云服务事业部（CSG）',
        title: '算法实习生',
        period: '2025.10 - 2026.03（北京）',
        bullets: [
          '基于 Hermes Agent 构建车牌检测自动化工作流：数据划分、YOLO 标注转换、YOLOv8 训练调度、ONNX 导出。',
          '设计 Agent 工具链调用机制：异常检测告警、训练状态推送（微信/飞书）、失败样本归类、流程复用。',
          '整理清洗 20 万+ 高质量语料，组合生成 600 万+ 中英文结构化 JSON 文档。',
          '基于 nori + OSS 构建高效图像读取管道，读取效率提升 2.3 倍；用 Streamlit 搭建可视化验证平台。',
        ],
      },
      {
        company: '北京研搜科技有限公司',
        team: '',
        title: '算法工程师',
        period: '2024.12 - 2025.07（北京）',
        bullets: [
          '搭建军情新闻问答系统：爬虫抓取多源数据，去重清洗，构建 12 万条指令数据集。',
          '基于 DeepSeek 蒸馏 Qwen2.5-7B 进行 SFT + GRPO，准确率提升约 32%，幻觉样本占比降低约 30%–40%。',
          '用 BGE + 向量检索构建轻量 RAG，引用真实新闻内容的比例提升约 30%。',
          '主导 GPTQ W4A16 量化，显存占用降低 45%；结合 vLLM 推理优化延迟。',
        ],
      },
    ],
  
    education: [
      {
        school: '北京信息科技大学',
        degree: '计算机技术（硕士）',
        period: '2023.09 - 2026.06（北京）',
        notes: ['校一等奖学金'],
      },
      {
        school: '江汉大学',
        degree: '计算机科学与技术（本科）',
        period: '2019.09 - 2023.06（武汉）',
        notes: ['校优秀毕业生（排名前 5%）', '班长', '校优秀干部奖学金、校二等奖学金'],
      },
    ],
  
    honors: [
      '第四届天智杯“智慧地球领域”人工智能竞赛 全国前十（军事航天部队装备部主办）',
      '第14届中国大学生计算机设计大赛 全国三等奖',
      '第14届中国大学生计算机设计大赛 中南赛区 一等奖',
      '英语六级（513分），计算机软件著作权登记证书，英特尔 OpenVINO 资格证书',
    ],
  }