const questions = [
  // Category 1: Core Philosophy & Vision
  {
    id: 1,
    category: 'Core Philosophy & Vision',
    drep: "My long-term vision for Cardano is for it to be:",
    holder: "I'm looking for a DRep whose long-term vision for Cardano is for it to be:",
    answers: [
      'A secure, decentralized global financial system.',
      'The top ecosystem for DApps and Web3 experiences.',
      'A public utility for real-world solutions like digital ID.',
      'A reliable store of value that prioritizes stability.',
    ],
  },
  {
    id: 2,
    category: 'Core Philosophy & Vision',
    drep: 'As a DRep, my primary role is:',
    holder: "I believe a DRep's primary role is to be:",
    answers: [
      'An Expert, voting based on their own judgment.',
      "A Representative, voting based on their delegators' majority view.",
      'A Community Builder, focused on discussion and education.',
      'A Minimalist, voting only on critical proposals.',
    ],
  },
  {
    id: 3,
    category: 'Core Philosophy & Vision',
    drep: 'Regarding the Cardano Treasury, I will:',
    holder: 'Regarding the Cardano Treasury, I want my DRep to:',
    answers: [
      'Spend aggressively on DApp development and user growth.',
      'Prioritize funding for core infrastructure and security.',
      'Conserve the Treasury for long-term health.',
      'Focus on funding community initiatives and education.',
    ],
  },
  {
    id: 4,
    category: 'Core Philosophy & Vision',
    drep: 'To balance stakeholder interests, I will:',
    holder: 'To balance stakeholder interests, my ideal DRep will:',
    answers: [
      'Prioritize the voice of Ada holders.',
      'Give more weight to technical experts like devs and SPOs.',
      'Focus on attracting new businesses to Cardano.',
      'Seek a fair compromise between all groups.',
    ],
  },
  {
    id: 5,
    category: 'Core Philosophy & Vision',
    drep: 'For a controversial but innovative proposal, I would:',
    holder: 'For a controversial but innovative proposal, I would want my DRep to:',
    answers: [
      'Support innovation if benefits outweigh the risks.',
      'Oppose it until its stability is proven.',
      'Abstain until the community reaches a consensus.',
      'Support it only after formal peer review.',
    ],
  },

  // Category 2: Engagement & Process
  {
    id: 6,
    category: 'Engagement & Process',
    drep: "I'll stay informed on proposals mainly by:",
    holder: 'I want my DRep to stay informed on proposals mainly by:',
    answers: [
      'Reading the technical specifications themselves.',
      'Participating in community discussions on social media and forums.',
      'Following summaries from trusted community experts.',
      'A mix of all of the above.',
    ],
  },
  {
    id: 7,
    category: 'Engagement & Process',
    drep: 'When evaluating a proposal, the most critical factor is its:',
    holder: 'When my DRep evaluates a proposal, the most critical factor should be its:',
    answers: [
      'Technical security.',
      'Economic value and ROI for Cardano.',
      'Broad community support.',
      "Alignment with Cardano's core principles.",
    ],
  },
  {
    id: 8,
    category: 'Engagement & Process',
    drep: 'If I disagree with a popular proposal, I will:',
    holder: 'If my DRep disagrees with a popular proposal, I would want them to:',
    answers: [
      "Vote 'No' and publish their detailed reasoning.",
      'Defer to the majority and vote with them.',
      'Debate publicly to explain their viewpoint.',
      'Abstain from the vote.',
    ],
  },
  {
    id: 9,
    category: 'Engagement & Process',
    drep: 'My experience in the Cardano ecosystem is:',
    holder: 'I prefer a DRep whose experience in the Cardano ecosystem is primarily:',
    answers: [
      "Deep: They've followed it for years.",
      'Technical: They are a developer or SPO.',
      'Community: They are active in discussions.',
      'New: They are learning fast and eager to contribute.',
    ],
  },
  {
    id: 10,
    category: 'Engagement & Process',
    drep: 'For DApp funding, I will favor proposals that:',
    holder: 'For DApp funding, I want my DRep to favor proposals that:',
    answers: [
      'Show a clear path to being self-sustaining.',
      'Can attract the most new users to Cardano.',
      'Are open-source and provide public goods.',
      'Are technically innovative, even if niche.',
    ],
  },

  // Category 3: Communication & Transparency
  {
    id: 11,
    category: 'Communication & Transparency',
    drep: "I'll communicate my voting reasons to delegators mainly through:",
    holder: 'I want my DRep to communicate their voting reasons to delegators mainly through:',
    answers: [
      "I don't believe rationales are always necessary.",
      'Real-time posts on social media.',
      'Written rationales attached to every vote.',
      "A 'Voting Record' page on their website.",
    ],
  },
  {
    id: 12,
    category: 'Communication & Transparency',
    drep: "If my view conflicts with my delegators' poll:",
    holder: "If my DRep's personal view conflicts with a delegator poll, I would want them to:",
    answers: [
      "I'll vote my conscience and explain why.",
      "I'll always vote with the poll result.",
      "I'll start a discussion to explain my view, then re-poll.",
      "I'll abstain to avoid conflict with my delegators or principles.",
    ],
  },
  {
    id: 13,
    category: 'Communication & Transparency',
    drep: 'My delegators can expect communication from me:',
    holder: 'I expect my DRep to communicate with their delegators:',
    answers: [
      'On a regular schedule (e.g., weekly).',
      'Only when there are active votes.',
      'Constantly; being very active in daily discussions.',
      'Only the essentials; focusing on substance over noise.',
    ],
  },
  {
    id: 14,
    category: 'Communication & Transparency',
    drep: 'Regarding conflicts of interest, I will:',
    holder: 'Regarding conflicts of interest, my DRep should:',
    answers: [
      'Publicly disclose any personal stake in a proposal.',
      'Abstain from votes where they have a major conflict.',
      'Be trusted to vote for the network\'s good.',
      'Ask their delegators for advice in such cases.',
    ],
  },
  {
    id: 15,
    category: 'Communication & Transparency',
    drep: 'I will be accessible to my delegators through:',
    holder: 'I want my DRep to be accessible to their delegators through:',
    answers: [
      'Open DMs and active participation in public forums.',
      "Scheduled 'office hours' or regular AMAs.",
      'A structured contact form on their website.',
      'Their public announcements and vote explanations only.',
    ],
  },

  // Category 4: Specific Governance & Technical Stances
  {
    id: 16,
    category: 'Specific Governance & Technical Stances',
    drep: 'On network parameter changes (e.g., fees), I will generally:',
    holder: 'On network parameter changes (e.g., fees), I want my DRep to generally:',
    answers: [
      'Prioritize stability and avoid changes unless essential.',
      'Support changes that lower fees and increase speed.',
      'Support changes that improve security, even if fees rise.',
      'Lean on their delegators\' opinions, as they may not be technical.',
    ],
  },
  {
    id: 17,
    category: 'Specific Governance & Technical Stances',
    drep: 'The Cardano Constitution should be viewed as:',
    holder: 'I believe the Cardano Constitution should be viewed as:',
    answers: [
      'A foundational document that is rarely changed.',
      "A living document that evolves with the community's will.",
      'A set of principles giving DReps flexibility in voting.',
      'A technical guardrail for security, not a policy guide.',
    ],
  },
  {
    id: 18,
    category: 'Specific Governance & Technical Stances',
    drep: 'Funding for marketing and business development should be:',
    holder: 'I believe funding for marketing and business development should be:',
    answers: [
      "A top priority to increase Cardano's visibility.",
      'Supported only if they have clear, measurable goals.',
      "Rejected; the protocol's quality should be its own marketing.",
      'A lower priority than technical development.',
    ],
  },
  {
    id: 19,
    category: 'Specific Governance & Technical Stances',
    drep: 'On funding large ecosystem organizations, I would:',
    holder: 'When it comes to funding large ecosystem organizations, I want my DRep to:',
    answers: [
      'Provide stable funding, as they are essential for growth.',
      'Scrutinize their budgets and performance like any other project.',
      'Prioritize their decentralization over pure efficiency.',
      'Push them to become self-funding and less reliant on the Treasury.',
    ],
  },
  {
    id: 20,
    category: 'Specific Governance & Technical Stances',
    drep: 'On funding bridges to other blockchains, I am:',
    holder: 'On funding bridges to other blockchains, my preferred stance is:',
    answers: [
      'Highly supportive; interoperability is key to growth.',
      'Cautious; bridges must be secure and well-audited.',
      'A lower priority than building our native ecosystem.',
      'Supportive only if the bridge benefits Cardano more than it costs.',
    ],
  },

  // Category 5: Personal Commitment & Practicalities
  {
    id: 21,
    category: 'Personal Commitment & Practicalities',
    drep: 'I can realistically commit this much time to DRep duties:',
    holder: 'I\'m looking for a DRep who can commit to their duties on a level that is:',
    answers: [
      'Full-time (my primary role).',
      'Significant part-time (15-20 hrs/week).',
      'A dedicated hobby (5-10 hrs/week).',
      'As needed, mainly during important votes.',
    ],
  },
  {
    id: 22,
    category: 'Personal Commitment & Practicalities',
    drep: 'I am acting as a DRep:',
    holder: 'I prefer my DRep to be:',
    answers: [
      'As an individual, based on my reputation.',
      'As the face of a small team that helps me.',
      'As part of a larger, known Cardano organization.',
      'As an anonymous or pseudonymous DRep.',
    ],
  },
  {
    id: 23,
    category: 'Personal Commitment & Practicalities',
    drep: 'On the topic of DRep compensation from the Treasury:',
    holder: 'On the topic of DRep compensation from the Treasury:',
    answers: [
      "I'm against it. The role should be voluntary to avoid financial motives.",
      "It's essential. It professionalizes the role and attracts dedicated talent.",
      "I only support it if funds are used as a public trust for community projects.",
      'I support it, but expect a large portion to be shared back with my delegators.',
    ],
  },
  {
    id: 24,
    category: 'Personal Commitment & Practicalities',
    drep: 'For technical proposals outside my expertise, I will:',
    holder: 'For technical proposals outside their expertise, I want my DRep to:',
    answers: [
      'Defer to the judgment of trusted community experts.',
      "Abstain, as it's irresponsible to vote on what they don't understand.",
      'Do the extra research needed to make an informed decision myself.',
      'Consult with multiple, diverse experts before voting.',
    ],
  },
  {
    id: 25,
    category: 'Personal Commitment & Practicalities',
    drep: 'If I must step down as a DRep, I will:',
    holder: 'If my DRep must step down, I would expect them to:',
    answers: [
      'Retire without notice.',
      'Recommend a successor who shares my values.',
      'Announce their departure well in advance.',
      'Just stop voting and become inactive.',
    ],
  }
        ];

export default questions;