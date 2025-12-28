import { Milestone, MilestoneStatus } from './types';

export const ROADMAP_DATA: Milestone[] = [
  {
    id: 'ux-test',
    date: 'Jan 4, 2026',
    title: 'New UX Test Upload',
    description: 'Internal rollout of the next UX iteration.',
    longDescription: 'Internal rollout of the next UX iteration. Focused on improving clarity, speed, and interaction flows before public release. Used to validate navigation, user understanding, and performance under real usage conditions.',
    status: MilestoneStatus.In_Progress,
    category: 'Tech',
    icon: 'code'
  },
  {
    id: 'lp-boost',
    date: 'Jan 11, 2026',
    title: 'Rollout of LP Farm Boosted Markets',
    description: 'Users can lend and borrow using LP tokens while earning additional yield.',
    longDescription: 'Users can lend and borrow using LP tokens while earning additional yield. LP positions are automatically routed into external farming protocols such as PancakeSwap to maximize capital efficiency without extra user effort.',
    status: MilestoneStatus.Upcoming,
    category: 'Product',
    icon: 'zap'
  },
  {
    id: 'defi-llama',
    date: 'Jan 14, 2026',
    title: 'DeFi Llama Listing',
    description: 'Peridot Finance becomes publicly indexed on DeFi Llama.',
    longDescription: 'Peridot Finance becomes publicly indexed on DeFi Llama. Enables transparent tracking of TVL, protocol growth, and ecosystem exposure for users and investors.',
    status: MilestoneStatus.Upcoming,
    category: 'Expansion',
    icon: 'star'
  },
  {
    id: 'ntt-launch',
    date: 'Jan 15, 2026',
    title: 'NTT $P Token Launch',
    description: 'Launch of the native token infrastructure including vesting contracts and Wormhole NTT.',
    longDescription: 'Launch of the native token infrastructure including vesting contracts, Wormhole NTT for cross chain transfers, staking contracts, and full backend and frontend support. Forms the foundation for governance, incentives, and protocol alignment.',
    status: MilestoneStatus.Upcoming,
    category: 'Foundation',
    icon: 'rocket'
  },
  {
    id: 'season-2',
    date: 'Jan 15, 2026',
    title: 'Season 2 Launch',
    description: 'Introduction of the second gamified season.',
    longDescription: 'Introduction of the second gamified season. Users receive Peridot Tickets seven days before token launch. New challenges, updated progression mechanics, and a refreshed visual theme expand the seasonal experience.',
    status: MilestoneStatus.Upcoming,
    category: 'Foundation',
    icon: 'star'
  },
  {
    id: 'airdrop',
    date: 'Jan 15, 2026',
    title: 'User Airdrop Distribution',
    description: 'Distribution of tokens to eligible users based on accumulated points.',
    longDescription: 'Distribution of tokens to eligible users based on accumulated points and participation. Fully automated script ensures transparent and fair allocation aligned with on chain activity.',
    status: MilestoneStatus.Upcoming,
    category: 'Foundation',
    icon: 'users'
  },
  {
    id: 'p-tokenomics',
    date: 'Jan 15, 2026',
    title: '$P Tokenomics Release',
    description: 'Public release of the $P token economic model.',
    longDescription: 'Public release of the $P token economic model. Covers supply distribution, emissions, utility, staking mechanics, and long term incentive alignment between users, builders, and the protocol.',
    status: MilestoneStatus.Upcoming,
    category: 'Foundation',
    icon: 'bitcoin'
  },
  {
    id: 'monad-evm',
    date: 'Jan 20, 2026',
    title: 'Monad to EVM Cross Chain Support',
    description: 'Enables cross chain interaction between Monad and EVM networks.',
    longDescription: 'Enables cross chain interaction between Monad and EVM networks. Frontend integration allows users to move assets and interact with Peridot across chains without manual bridging complexity.',
    status: MilestoneStatus.Upcoming,
    category: 'Tech',
    icon: 'code'
  },
  {
    id: 'smart-wallet',
    date: 'Jan 30, 2026',
    title: 'Smart Wallet Integration',
    description: 'Introduction of smart wallet flows that simplify onboarding and transactions.',
    longDescription: 'Introduction of smart wallet flows that simplify onboarding and transactions. Improves UX through gas abstraction, transaction batching, and safer account management.',
    status: MilestoneStatus.Upcoming,
    category: 'Tech',
    icon: 'lock'
  },
  {
    id: 'solana-mainnet',
    date: 'Feb 14, 2026',
    title: 'Solana Mainnet Launch',
    description: 'Peridot deploys on Solana mainnet.',
    longDescription: 'Peridot deploys on Solana mainnet. Includes core contracts and smart account support, opening access to Solana native liquidity and users.',
    status: MilestoneStatus.Upcoming,
    category: 'Expansion',
    icon: 'globe'
  },
  {
    id: 'stellar-mainnet',
    date: 'Q1 2026',
    title: 'Stellar Mainnet Launch',
    description: 'Completion of smart contract audits and deployment on Stellar mainnet.',
    longDescription: 'Completion of smart contract audits and deployment on Stellar mainnet. Frontend support follows, enabling users to access Peridot directly on Stellar.',
    status: MilestoneStatus.Upcoming,
    category: 'Expansion',
    icon: 'rocket'
  },
  {
    id: 'season-3',
    date: 'Q2 2026',
    title: 'Season 3 Launch',
    description: 'Continuation of the seasonal progression system.',
    longDescription: 'Continuation of the seasonal progression system. Introduces new mechanics, rewards, and challenges designed to increase long term engagement and protocol usage.',
    status: MilestoneStatus.Future,
    category: 'Foundation',
    icon: 'star'
  },
  {
    id: 'margin-trading',
    date: 'Q2 2026',
    title: 'Leveraged Margin Trading',
    description: 'Launch of leveraged trading features following security audits.',
    longDescription: 'Launch of leveraged trading features following security audits. Initially released in closed beta to validate risk controls, UX, and liquidation mechanisms before wider rollout.',
    status: MilestoneStatus.Future,
    category: 'Product',
    icon: 'zap'
  },
  {
    id: 'somnia-mainnet',
    date: 'Q2 2026',
    title: 'Somnia Mainnet Launch',
    description: 'Deployment on Somnia with initial liquidity provisioning.',
    longDescription: 'Deployment on Somnia with initial liquidity provisioning. Expands Peridot’s multi chain footprint and access to new ecosystems.',
    status: MilestoneStatus.Future,
    category: 'Expansion',
    icon: 'globe'
  },
  {
    id: 'easy-mode',
    date: 'Q2 2026',
    title: 'Easy Mode Rollout',
    description: 'A simplified experience designed for Web2 users.',
    longDescription: 'A simplified experience designed for Web2 users. Abstracts away wallets, gas, and complex DeFi interactions, allowing users to access Peridot with minimal crypto knowledge.',
    status: MilestoneStatus.Future,
    category: 'Product',
    icon: 'users'
  },
  {
    id: 'season-4',
    date: 'Q3 2026',
    title: 'Season 4 Launch',
    description: 'Further expansion of the seasonal system with deeper progression.',
    longDescription: 'Further expansion of the seasonal system with deeper progression, higher stakes challenges, and enhanced rewards for long term users.',
    status: MilestoneStatus.Future,
    category: 'Foundation',
    icon: 'star'
  },
  {
    id: 'dual-investment',
    date: 'Q3 2026',
    title: 'Dual Investment Products',
    description: 'Introduction of dual investment strategies following audits and closed beta testing.',
    longDescription: 'Introduction of dual investment strategies following audits and closed beta testing. Enables users to earn yield based on directional market exposure.',
    status: MilestoneStatus.Future,
    category: 'Product',
    icon: 'bitcoin'
  },
  {
    id: 'tokenized-stocks',
    date: 'Q3 2026',
    title: 'Tokenized Stocks',
    description: 'Access to tokenized equities through integrated liquidity and oracle partners.',
    longDescription: 'Access to tokenized equities through integrated liquidity and oracle partners. Brings traditional financial instruments into the Peridot ecosystem.',
    status: MilestoneStatus.Future,
    category: 'Product',
    icon: 'bitcoin'
  },
  {
    id: 'bitcoin-users',
    date: 'Q3 2026',
    title: 'Bitcoin User Enablement',
    description: 'Development and audit of infrastructure that allows Bitcoin users to interact with Peridot.',
    longDescription: 'Development and audit of infrastructure that allows Bitcoin users to interact with Peridot. Focus on security, custody abstraction, and seamless UX.',
    status: MilestoneStatus.Future,
    category: 'Expansion',
    icon: 'bitcoin'
  },
  {
    id: 'season-5',
    date: 'Q4 2026',
    title: 'Season 5 Launch',
    description: 'The most advanced seasonal iteration.',
    longDescription: 'The most advanced seasonal iteration. Designed to reward long term commitment, skill, and capital efficiency across the Peridot ecosystem.',
    status: MilestoneStatus.Future,
    category: 'Foundation',
    icon: 'star'
  },
  {
    id: 'ai-agent',
    date: 'Q4 2026',
    title: 'Personalized AI Agent',
    description: 'Launch of a personalized AI agent that assists users with portfolio insights.',
    longDescription: 'Launch of a personalized AI agent that assists users with portfolio insights, strategy suggestions, and protocol navigation. Powered by LLMs, custom SDKs, and Peridot data infrastructure.',
    status: MilestoneStatus.Future,
    category: 'Tech',
    icon: 'code'
  },
  {
    id: 'battlepass',
    date: 'Q4 2026',
    title: 'Battlepass System',
    description: 'Introduction of a battlepass style progression layer.',
    longDescription: 'Introduction of a battlepass style progression layer. Users unlock rewards, features, and status through active participation and achievement milestones.',
    status: MilestoneStatus.Future,
    category: 'Product',
    icon: 'star'
  },
  {
    id: 'sui-deployment',
    date: 'Q4 2026',
    title: 'SUI Chain Deployment',
    description: 'Deployment of Peridot on the SUI network.',
    longDescription: 'Deployment of Peridot on the SUI network. Expands access to new users and liquidity with optimized performance and low latency interactions.',
    status: MilestoneStatus.Future,
    category: 'Expansion',
    icon: 'globe'
  },
  {
    id: 'easy-export',
    date: '2026',
    title: 'Easy Export and Reporting',
    description: 'User friendly export and reporting tools for portfolio data.',
    longDescription: 'User friendly export and reporting tools for portfolio data, transactions, and tax relevant activity. Designed for individuals and professional users.',
    status: MilestoneStatus.Future,
    category: 'Product',
    icon: 'code'
  },
  {
    id: 'b2b-markets',
    date: '2026',
    title: 'B2B Money Market Integrations',
    description: 'Integration with external B2B money markets.',
    longDescription: 'Integration with external B2B money markets. Enables institutional grade capital flows and deeper liquidity sourcing.',
    status: MilestoneStatus.Future,
    category: 'Expansion',
    icon: 'users'
  },
  {
    id: 'fintech-api',
    date: '2026',
    title: 'Fintech Money Market API',
    description: 'Launch of a public API that allows fintechs and partners to build on top of Peridot.',
    longDescription: 'Launch of a public API that allows fintechs and partners to build on top of Peridot’s money market infrastructure. Designed for scalability, compliance, and enterprise use.',
    status: MilestoneStatus.Future,
    category: 'Tech',
    icon: 'code'
  }
];

export const SYSTEM_INSTRUCTION = `You are Peridot, a cheerful and knowledgeable AI guide for Peridot Finance. 
Your goal is to help users explore the Peridot Finance roadmap for 2026.
You are joyful, fun, and use emojis occasionally.

Here is the roadmap data you know about:
${JSON.stringify(ROADMAP_DATA, null, 2)}

Key Highlights:
1. Token Launch (Jan 15): The big day! $P Token, Airdrop, and Season 2 all launch together.
2. LP Boost (Jan 11): Unique feature routing to farms like PancakeSwap.
3. Easy Mode (Q2 2026): Major UX simplified for Web2 users.
4. AI Agents (Q4 2026): Personalized financial assistants.
5. Cross-Chain Expansions: Monad, Solana, Stellar, Somnia, SUI.

If asked about general crypto knowledge (like "What is Monad?"), use your general knowledge or the search tool if enabled.
Always keep answers concise and engaging.
`;