export interface IpCheckFeature {
  title: string;
  desc: string;
}

export interface IpCheckTutorialStep {
  stepNumber: number;
  title: string;
  desc: string;
  codeSnippet?: string;
  codeLang?: string;
  pencilTip?: string;
}

export interface IpCheckSite {
  id: string;
  name: string;
  shortName: string;
  url: string;
  badge: string;
  tagline: string;
  description: string;
  iconName: string;
  iconUrl?: string;
  features: IpCheckFeature[];
  scenarios: string[];
  specs: {
    dataSources: string;
    leakCheck: string;
    dualStack: string;
    specialFeature: string;
  };
  tutorial: {
    overview: string;
    highlights: Array<{ title: string; badge: string; detail: string }>;
    steps: IpCheckTutorialStep[];
    advancedTips: string[];
    faq: Array<{ question: string; answer: string }>;
  };
}

export const IP_CHECK_SITES: IpCheckSite[] = [
  {
    id: 'ipok',
    name: 'IPOK',
    shortName: 'IPOK',
    url: 'https://ipok.io',
    badge: '多维风控聚合',
    tagline: '聚合主流安全风控源 · IP 纯净度与欺诈评分 (Fraud Score)',
    description: 'IPOK 是一个聚合了 8~10 个权威风控与威胁情报数据库的专业 IP 纯净度评估平台。深度诊断节点欺诈值、WebRTC/DNS 泄露、住宅宽带与机房 IP 属性、IPv4/IPv6 双栈路由以及主流 AI 和流媒体连通资格。',
    iconName: 'ipok',
    features: [
      { title: '8+源风控', desc: '整合 IPQS、MaxMind minFraud、Scamalytics 等权威库交叉计算欺诈分（Fraud Score）。' },
      { title: '家宽识别', desc: '精准判定 ISP 电信运营商、ASN 自治域编号及 Residential 住宅宽带属性。' },
      { title: '泄露排查', desc: '即时探测浏览器 WebRTC 穿透泄露与 DNS 本地运营商解析泄漏。' },
      { title: '双栈拓扑', desc: '完整支持 IPv4 / IPv6 双协议栈，并提供同 /24 邻近网段历史滥用排查。' }
    ],
    scenarios: [
      '跨境电商多店铺防封与防关联（TikTok Shop / Amazon / eBay）',
      '节点纯净度体检与真伪家宽验证',
      'ChatGPT / Claude 注册与使用风控资格排查',
      '代理隐私安全性自查（防 WebRTC / DNS 泄露）'
    ],
    specs: {
      dataSources: 'IPQS、MaxMind、Scamalytics 等 8+ 商业风控库',
      leakCheck: 'WebRTC STUN 穿透 + DNS 泄漏多节点探测',
      dualStack: '原生支持 IPv4 / IPv6 双栈探测与 CIDR 网段',
      specialFeature: 'AI（ChatGPT/Claude）与主流流媒体服务可用性徽章'
    },
    tutorial: {
      overview: 'IPOK (ipok.io) 专注于深度评估 IP 纯净度与被滥用程度。在各大电商平台、金融结算平台以及 OpenAI / Anthropic 等 AI 平台的风控眼里，一个干净的低风险住宅 IP 是保障账号安全、避免无故封禁的核心基础。',
      highlights: [
        {
          title: '欺诈评分 (Fraud Score)',
          badge: '核心指标',
          detail: '分值区间 0~100。0~15 分属于极低风险优质住宅网络；16~50 分为普通数据中心机房或合规 VPN；>75 分为高危 IP，通常已被拉入滥用黑名单。'
        },
        {
          title: 'IP 类型识别 (Type & ASN)',
          badge: '网络属性',
          detail: '标明是 Residential（住宅宽带）、Mobile（蜂窝移动网络）还是 Datacenter/Hosting（机房云服务器），并附带对应 ASN 自治系统编号。'
        },
        {
          title: 'WebRTC & DNS 泄露',
          badge: '隐私防护',
          detail: '检测浏览器底层是否通过 WebRTC 绕过代理暴露了本地真实 IP，以及 DNS 是否请求了国内运营商解析器。'
        },
        {
          title: '同网段风险 (Subnet Reputation)',
          badge: '邻近关联',
          detail: '扫描同 /24 网段内其他 IP 的信誉评分，防止因为邻近 IP 违规滥用导致当前 IP 受到牵连风控。'
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: '配置并连接代理客户端',
          desc: '打开您的代理软件（如 Clash、Sing-box、Shadowrocket），确认已选择目标节点，并开启系统代理或 TUN 虚拟网卡模式。',
          pencilTip: '如果要测试特定落地节点的质量，建议先暂时关闭全局 PAC 分流，或将 ipok.io 强制指定走该节点。'
        },
        {
          stepNumber: 2,
          title: '访问 IPOK 官方网站并等待诊断',
          desc: '在浏览器中访问 https://ipok.io，系统会自动通过多个独立接口并发探测您的网络出口，并在 2~3 秒内生成完整的体检卡片。',
          codeSnippet: 'curl -s https://ipok.io/api/ip\n# 也可在终端中直接使用 API 获取纯文本格式报告',
          codeLang: 'bash'
        },
        {
          stepNumber: 3,
          title: '查看 Fraud Score 欺诈评分与 IP 类型',
          desc: '查看卡片顶部的数值仪表盘。如果数值在 20 分以内且类型标记为 Residential，说明该节点非常适合用于跨境运营和注册风控敏感业务。',
          pencilTip: '若分数偏高（>50）且用于 Claude 等平台，极易触发人机验证或降智，建议向机场或 VPS 服务商更换更干净的节点。'
        },
        {
          stepNumber: 4,
          title: '核验 WebRTC Check 与 DNS Leak 区域',
          desc: '滑动到页面中部的 Leaks 测试区域，确认显示的公网 IP 均为海外节点 IP。如果出现了任何以 100.x、10.x 或中国大陆开头的 IP，说明存在泄露。',
          pencilTip: '若 WebRTC 泄漏，可以在 Chrome / Edge 扩展商店安装「WebRTC Control」并选择「Disable WebRTC」，或在客户端启用 TUN 虚拟网卡接管。'
        },
        {
          stepNumber: 5,
          title: '核对主流平台可用性徽章',
          desc: '页面下方会列出 ChatGPT、Claude、Netflix、Amazon 等常见服务的可用性状态，绿色打勾代表该 IP 未被对应平台的黑名单策略拦截。'
        }
      ],
      advancedTips: [
        '若需要长期稳定运营店铺或 AI 账号，务必选择 Fraud Score 极低且固定 ASN 的静态住宅节点，避免频繁切换出口地理位置。',
        'IPOK 还提供 Chrome 浏览器扩展与 iOS / macOS 原生客户端，可以在日常浏览时一键查看当前网页代理的风险值。',
        '开发者可直接集成 IPOK 提供的 RESTful API，用于在自建代理池中自动化过滤和剔除脏 IP。'
      ],
      faq: [
        {
          question: '为什么节点 Fraud Score 显示较高，但日常浏览 Google 和 YouTube 很顺畅？',
          answer: '普通网页浏览、视频播放对 IP 纯净度要求极低；但金融机构、PayPal、OpenAI、TikTok、Amazon 等有极严格的反欺诈风控模型。高欺诈分虽然不影响正常看视频，但在敏感业务中极易导致封号或风控。'
        },
        {
          question: '检测到 WebRTC 泄露真实 IP 应该怎么彻底修复？',
          answer: 'WebRTC 会通过 STUN 穿透获取所有物理网卡的 IP。最彻底的解决办法是在代理客户端（如 Clash Verge Rev、Sing-box）中开启 TUN 虚拟网卡模式接管系统所有流量，或者在浏览器设置/插件中彻底禁用 WebRTC 功能。'
        }
      ]
    }
  },
  {
    id: 'ipcheck',
    name: 'IPCheck.ing',
    shortName: 'IPCheck',
    url: 'https://ipcheck.ing/?hl=zh',
    badge: '开源全能工具箱',
    tagline: '多探针 IP 交叉比对 · 全球站点连通性测试 · 即时网速测量',
    description: '由开发者 Jason Ng 开源（MyIP），完全无广告、轻量极速的现代化全能 IP 与网络工具箱。支持多数据源 IP 交叉比对、IPv4/IPv6 双栈展示、WebRTC & DNS 泄露探测、全球主流服务可用性检测及 Cloudflare 边缘测速。',
    iconName: 'ipcheck',
    features: [
      { title: '开源无广告', desc: '开源透明无跟踪代码，保护用户隐私，并支持使用 Docker 在本地或私有服务器一键部署。' },
      { title: '多探针比对', desc: '聚合 Cloudflare、IPInfo、IP-API 等多个权威接口，杜绝单一接口缓存误判。' },
      { title: '连通性测试', desc: '实时连通性探测 Google、YouTube、GitHub、OpenAI、Telegram 等服务的往返延迟。' },
      { title: '边缘测速', desc: '内置 Cloudflare CDN 上传下载与延迟抖动测试，支持 PWA 桌面安装与高效快捷键操作。' }
    ],
    scenarios: [
      '翻墙代理连接后的第一站全方位体检',
      '排查分流规则失效与 DNS 污染问题',
      '实时测试到国内外主流站点的连通率与网络延迟',
      '快速查询反查任意 IP 地址的地理运营商信息'
    ],
    specs: {
      dataSources: 'Cloudflare、IPInfo、IP-API 等多数据源交叉',
      leakCheck: 'DNS 泄露测试（独立随机子域）+ WebRTC STUN 穿透',
      dualStack: '独立卡片分别展示 IPv4 与 IPv6 真实出口',
      specialFeature: '全球主流站点连通性矩阵 + 轻量边缘网络测速'
    },
    tutorial: {
      overview: 'IPCheck.ing (MyIP) 是目前中文互联网上体验最优秀、界面最清爽的 IP 综合工具之一。它不仅能查 IP 归属，还能测泄露、测连通性、测速度，甚至支持安装为 PWA 原生桌面应用，是科学上网必备的体检神器。',
      highlights: [
        {
          title: '多探针 IP 交叉比对',
          badge: '防误差',
          detail: '同时展示 Cloudflare、IPInfo 等多个探针识别的 IP 归属地与运营商，一眼看出是否存在 CDN 缓存或 IP 库更新滞后。'
        },
        {
          title: 'DNS 泄漏测试',
          badge: '防污染',
          detail: '生成一次性随机子域名请求并监听解析链，若列表中出现中国电信、联通、移动的 DNS，说明存在分流泄漏。'
        },
        {
          title: '连通性实时矩阵',
          badge: '实用测试',
          detail: '以红绿图标直观展示 Google、YouTube、GitHub、OpenAI、ChatGPT、Telegram、Bilibili、百度等网站的连接状态与延迟毫秒数。'
        },
        {
          title: '极速边缘测速',
          badge: '性能指标',
          detail: '利用 Cloudflare 全球边缘节点测试当前出口的实际下载速度、上传速度、延迟与抖动，直观反映节点带宽瓶颈。'
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: '启动翻墙客户端并开启代理',
          desc: '打开您的科学上网软件，连接节点并确保已接管浏览器网络。',
          pencilTip: '推荐将代理模式设置为「规则 (Rule)」或「全局 (Global)」，便于针对性验证。'
        },
        {
          stepNumber: 2,
          title: '打开 IPCheck.ing 页面',
          desc: '在浏览器中打开 https://ipcheck.ing/?hl=zh，页面将瞬间完成多项自动化检测。',
          codeSnippet: '# 支持键盘高效快捷键：\n# 按「?」打开快捷键帮助面板\n# 按「D」切换深色/浅色模式\n# 按「R」一键重新发起检测',
          codeLang: 'text'
        },
        {
          stepNumber: 3,
          title: '查验 IPv4 / IPv6 出口一致性',
          desc: '查看顶部的「我的 IP」看板，确认 IPv4 与 IPv6 是否均显示为您选择的海外落地地区。如果 IPv6 显示为中国大陆，说明 IPv6 流量绕过了代理！',
          pencilTip: '如果 IPv6 绕过代理，建议在代理客户端配置中开启「禁用 IPv6 (disable-ipv6: true)」或开启 IPv6 代理路由。'
        },
        {
          stepNumber: 4,
          title: '检查可用性测试面板',
          desc: '查看常用站点列表，全部显示绿色打勾且延迟在合理范围即为正常。若 OpenAI 提示失败，需检查分流规则中是否未将 openai.com 加入代理列表。'
        },
        {
          stepNumber: 5,
          title: '切换到「DNS 泄漏测试」标签页',
          desc: '点击 DNS 泄漏测试，等待进度条走完。确认出现的 DNS 服务器全部为海外服务商（如 Cloudflare、Google、Quad9），无任何国内运营商即可放心使用。'
        }
      ],
      advancedTips: [
        '支持 PWA 安装：在 Chrome 或 Safari 地址栏右侧点击「安装」或「添加到主屏幕」，即可获得如同原生 App 的秒开体验。',
        '隐私极度安全：前端代码完全开源在 GitHub，不包含任何第三方跟踪脚本或用户行为收集。',
        '支持私有部署：通过一行 Docker 命令 `docker run -d -p 18966:18966 jason5ng32/myip:latest` 即可在自己的服务器上拥有独立检测站。'
      ],
      faq: [
        {
          question: '连通性测试中 ChatGPT 显示连接失败，但 Google 能正常打开？',
          answer: '说明当前节点 IP 被 OpenAI 屏蔽，或者代理客户端的分流规则中缺少 OpenAI 域名规则导致直连失败。请在客户端中切换分流规则，或更换未被 OpenAI 屏蔽的节点。'
        },
        {
          question: 'DNS 泄露测试出现中国大陆运营商会怎样？',
          answer: 'DNS 泄露意味着虽然您的网页流量走了代理，但您正在访问哪些域名的查询请求却被直接发送给本地电信/联通/移动解析器，存在严重的隐私暴露风险。应在客户端配置中开启 DNS 远程解析与分流保护。'
        }
      ]
    }
  },
  {
    id: 'ipsuper',
    name: 'IPSuper',
    shortName: 'IPSuper',
    url: 'https://ipsuper.com',
    badge: 'AI与流媒体体检',
    tagline: '多风控库秒级比对 · 原生家宽判定 · ChatGPT/Claude 防封评估',
    description: '针对当前严格的 AI 服务（ChatGPT/Claude）风控和流媒体跨区限制打造的现代化 IP 质量体检站。多源交叉比对风险评分，秒级甄别原生家庭宽带（ISP/Residential）与托管机房（Hosting），评估防封与防降智能力。',
    iconName: 'ipsuper',
    features: [
      { title: '原生IP甄别', desc: '精准区分原生 IP 与广播/机房中继 IP，原生 IP 权重最高，极难被风控拦截。' },
      { title: '住宅家宽', desc: '准确识别 AT&T、Verizon、Comcast 等主流海外真实 ISP 家宽，杜绝机房假冒。' },
      { title: '多源评级', desc: '并行调取 MaxMind、IP2Location、Scamalytics 等商业风险等级，告别单一误判。' },
      { title: '极简无广告', desc: '无任何繁琐广告，卡片化排版直观大方，专为极客与 VPS 玩家打造。' }
    ],
    scenarios: [
      'VPS 自建节点搭建后的质量体检与线路评估',
      'ChatGPT / Claude 频繁提示人机验证或降智时排查节点风险',
      'Netflix / Disney+ / HBO 等流媒体平台跨区解锁核验',
      '挑选优质低风控高权重机场线路'
    ],
    specs: {
      dataSources: 'MaxMind、IP2Location、Scamalytics 等商业库',
      leakCheck: '代理/VPN/Tor 出口特征分析 + 欺诈标记排查',
      dualStack: '支持 IPv4 / IPv6 独立网络属性诊断',
      specialFeature: '原生 IP vs 广播 IP 识别 + 真实住宅 ISP 判定'
    },
    tutorial: {
      overview: '随着 OpenAI 和 Anthropic 对机房 IP 的管控愈发严格，很多自建 VPS 或机场节点常常遭遇「降智」或频繁 Cloudflare 盾牌。IPSuper (ipsuper.com) 可以帮助我们一眼看穿当前节点是原生家庭宽带还是普通机房云服务器，评估其真实防封质量。',
      highlights: [
        {
          title: '原生 IP (Native IP) 鉴别',
          badge: '质量金标准',
          detail: '原生 IP 指该 IP 的注册地区与机房机柜物理位置完全吻合。流媒体和 AI 平台会给予原生 IP 最高的信任权重。'
        },
        {
          title: '网络类型判定 (Type)',
          badge: '家宽 vs 机房',
          detail: '标明当前 IP 是 Residential（真实家庭宽带）还是 Hosting/Datacenter（托管机房），住宅 IP 在防风控方面具有压倒性优势。'
        },
        {
          title: '综合风险等级 (Risk Score)',
          badge: '安全评级',
          detail: '秒级交叉对比多个数据库，给出综合风险级别。越接近 0 分越纯净，High Risk（高风险）节点应尽量避免登录重要账号。'
        },
        {
          title: '黑名单与恶意流量审查',
          badge: '滥用排查',
          detail: '检查该 IP 过去是否曾被用于垃圾邮件（Spam）、扫描爬虫或恶意代理，避免买到被玩坏的二手脏 IP。'
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: '启动代理工具并连接待测试节点',
          desc: '在客户端中选中需要评估质量的代理线路，确保代理已接管全局或浏览器流量。',
          pencilTip: '建议分别测试不同的节点（如香港、日本、美国、新加坡），对比各节点的风险等级。'
        },
        {
          stepNumber: 2,
          title: '打开 IPSuper 官网看板',
          desc: '在浏览器中访问 https://ipsuper.com，等待系统加载完成风险仪表盘。',
          codeSnippet: '# 也可以直接在浏览器按 F12 打开开发者工具网络面板\n# 观察当前请求通过的代理出口地址与真实响应头',
          codeLang: 'text'
        },
        {
          stepNumber: 3,
          title: '核验「Type」类型属性',
          desc: '重点查看网络类型字段：若显示为 Residential（住宅），说明是稀缺高权重的家宽；若显示为 Hosting，则为普通机房 IP。',
          pencilTip: '自建 VPS（如搬瓦工、Oracle Cloud、Linode）几乎 100% 都是 Hosting 机房 IP，这是正常现象。'
        },
        {
          stepNumber: 4,
          title: '查验「Risk Score」风险评分',
          desc: '观察风险分值。若显示 Low Risk 或在 20 分以内，说明该 IP 非常干净；若显示 High Risk，说明在某些风控数据库中已有不良记录。'
        },
        {
          stepNumber: 5,
          title: '比对地理定位与时区设置',
          desc: '检查检测到的国家、城市以及时区信息。在浏览器中操作时，建议让系统时区与当前 IP 的时区保持一致，防止触发环境指纹异常风控。'
        }
      ],
      advancedTips: [
        '如果自建 VPS 显示为机房 IP 但想要解锁流媒体或使用 Claude，可以通过配置 Warp 双栈出口，或者利用住宅代理中转做二次落地。',
        '多源对比：IPSuper 支持多个数据库并行展现，如果一个数据库显示有风险但其他数据库均判定干净，通常说明只是个别库更新滞后。',
        '定期复查：云服务器 IP 的信誉会随时间动态变化，定期在 IPSuper 上复查可以及时发现节点是否被恶意流量污染。'
      ],
      faq: [
        {
          question: '为什么我自己花钱买的 VPS 搭建的节点，依然显示为 Hosting 机房 IP？',
          answer: '因为云厂商（AWS、Linode、Oracle、DigitalOcean 等）在互联网管理机构注册的 ASN 属性全都是数据中心（Hosting/Datacenter）。除非向服务商额外购买昂贵的住宅 IP（Residential IP）或家宽专线，否则所有 VPS 都是机房 IP。'
        },
        {
          question: '什么是广播 IP？它和原生 IP 有什么本质区别？',
          answer: '广播 IP 是服务商把其他国家或地区的 IP 网段通过 BGP 宣告广播到当前的机房使用。这种 IP 成本较低，但在很多流媒体和版权数据库中会识别错误，甚至导致地区限制失效。而原生 IP 注册地和机房完全一致，权重最高。'
        }
      ]
    }
  },
  {
    id: 'net-coffee',
    name: 'Net.Coffee',
    shortName: 'Net.Coffee',
    url: 'https://ip.net.coffee',
    badge: '分流与Claude体检',
    tagline: '35+ 站点出口分流检测 · Claude 专属风控 · 全球 Ping 实测',
    description: '专为代理与科学上网用户打造的实用网络咖啡体检站。支持国内外 35+ 个主流网站的实际出口 IP 探测，一眼核验规则分流是否配置正确；提供 Claude AI 专属风控检测页面，以及 DNS/WebRTC 泄露自查和全球网络 Ping 延迟测试。',
    iconName: 'net-coffee',
    features: [
      { title: '35+出口分流', desc: '向国内外 35+ 个代表性站点发起实际请求，直观展示各站点看到的出口 IP。' },
      { title: 'Claude体检', desc: '专门针对 Anthropic Claude 严苛风控设计的独立体检页面（/claude）。' },
      { title: '防泄露自查', desc: '即时检查国内运营商 DNS 是否泄露、本地局域网真实公网 IP 是否被穿透暴露。' },
      { title: '全球Ping', desc: '测试到北美、欧洲、亚太主要骨干机房的实时 Ping 往返延迟与网络质量。' }
    ],
    scenarios: [
      '验证 Clash / Sing-box 分流规则配置是否生效（国内直连、国外代理）',
      'Claude 经常被封号或被拦截时排查当前节点风控资格',
      '排查国内外网站访问缓慢、分流走错线路问题',
      '测试海外节点到全球骨干网络的网络延迟与丢包率'
    ],
    specs: {
      dataSources: '35+ 全球与国内主流站点真实 HTTP 出口探测',
      leakCheck: 'DNS 泄露检测 + WebRTC 本地真实 IP 穿透自查',
      dualStack: '支持国内外节点双向分流核验',
      specialFeature: 'Claude AI 专项体检页面（ip.net.coffee/claude）+ 全球 Ping'
    },
    tutorial: {
      overview: 'Net.Coffee（网络咖啡）是很多科学上网老手的心头好。它最核心的功能就是「分流测试」——很多人配置了规则分流，却不知道国内网站到底是不是真的直连、访问 ChatGPT 到底是不是真的走指定的海外出口。Net.Coffee 一张表就能全部看清。',
      highlights: [
        {
          title: '35+ 站点出口分流检测',
          badge: '分流神器',
          detail: '同时请求 Cloudflare、Google、OpenAI、Discord、Twitter、GitHub、国内主流站点等，直接列出每一个网站探测到的出口 IP。'
        },
        {
          title: 'Claude 专属风险体检 (/claude)',
          badge: '防封必备',
          detail: 'Anthropic 对 Claude 的 IP 审核极严。Net.Coffee 专属体检页面能精准检测当前节点是否在 Claude 允许的国家内、是否被标记为封锁名单。'
        },
        {
          title: '国内直连验证',
          badge: '免卡顿',
          detail: '快速查看访问国内网站时，展示的是否是您家里真实的电信/联通/移动 IP。如果是海外 IP，说明分流失效导致国内流量绕道国外。'
        },
        {
          title: '全球骨干 Ping 实测',
          badge: '延迟诊断',
          detail: '覆盖北美、欧洲、日本、新加坡等全球主要互联网骨干交换中心，一键测试节点的物理延迟与网络抖动。'
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: '打开代理软件并选择「规则模式 (Rule Mode)」',
          desc: '确认代理客户端处于分流规则模式，不要开启全局模式，以便验证规则是否生效。',
          pencilTip: '推荐使用主流分流规则集（如 Loyalsoldier、ACL4SSR），确保国内国外流量精细区分。'
        },
        {
          stepNumber: 2,
          title: '访问 Net.Coffee 官网',
          desc: '在浏览器中打开 https://ip.net.coffee，等待页面自动加载 35+ 个站点的探测结果。',
          codeSnippet: '# 若需直接进行 Claude 专项风控体检，可直接打开：\n# https://ip.net.coffee/claude',
          codeLang: 'text'
        },
        {
          stepNumber: 3,
          title: '核验国内站点与国外站点分流结果',
          desc: '查看检测列表：国内站点（如百度、B站）应显示为您本地真实的中国宽带 IP；国外站点（如 Google、OpenAI）应显示为您代理节点的海外 IP。',
          pencilTip: '如果国内站点显示为美国或日本 IP，说明分流失效，会导致国内 App 变卡甚至无法使用，需要检查 rules 规则配置。'
        },
        {
          stepNumber: 4,
          title: '进行 Claude 专属风控体检',
          desc: '点击顶部或访问 https://ip.net.coffee/claude，查看当前 IP 是否被 Anthropic 允许。全部绿色代表可以放心登录使用 Claude。'
        },
        {
          stepNumber: 5,
          title: '自查 WebRTC 与 DNS 泄露',
          desc: '观察页面底部的 DNS 泄露与 WebRTC 检测项，确认没有暴露出本地运营商解析器，确保网络环境纯净隐蔽。'
        }
      ],
      advancedTips: [
        '如果发现特定网站（如 ChatGPT）分流走错了线路，可以在代理客户端的自定义规则（Custom Rules）中手动添加 `DOMAIN-SUFFIX,openai.com,节点名称`。',
        'Claude 专属页面对于合租账号或者重度使用 Claude 的开发者极其有用，每次换节点前先体检，可以大幅减少封号风险。',
        '利用全球 Ping 模块可以快速了解该节点的骨干网路由质量，辅助排查晚高峰网络卡顿问题。'
      ],
      faq: [
        {
          question: '为什么打开国内网站很卡甚至打不开，在 Net.Coffee 上能看出什么？',
          answer: '打开 Net.Coffee 查看国内站点的出口 IP。如果国内站点显示的是美国或日本 IP，说明规则分流配置有误，所有国内流量都被强制绕道了国外，导致延迟飙升。需将代理模式设为「规则」，并确保 CN 域名与 GEOIP,CN 策略为 DIRECT（直连）。'
        },
        {
          question: 'Claude 提示「App not available in your country」怎么办？',
          answer: '请使用 Net.Coffee 的 Claude 专属体检页面检查。如果节点出口被 Anthropic 识别为中国香港、俄罗斯等未支持地区，就会出现该提示。需要将节点切换为美国、英国、日本等支持地区的低风险节点。'
        }
      ]
    }
  }
];

export function getIpCheckSiteById(id: string): IpCheckSite | undefined {
  return IP_CHECK_SITES.find(site => site.id === id);
}
