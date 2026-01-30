// server/services/pathwayService.js

const pathways = [
  {
    id: 'exam-stress',
    name: 'Exam Stress Reset',
    category: 'stress',
    description: 'A short sequence to calm nerves and refocus before exams.',
    steps: [
      { type: 'breathing', title: 'Box Breathing', duration: '2 minutes', why: 'Calms the nervous system.' },
      { type: 'grounding', title: '5-4-3-2-1 Grounding', duration: '2 minutes', why: 'Brings attention to the present moment.' },
      { type: 'writing', title: 'List Top 3 Worries', duration: '3 minutes', why: 'Externalizes worries to reduce mental load.' },
      { type: 'planning', title: 'Mini Study Plan', duration: '5 minutes', why: 'Creates a sense of control and direction.' },
      { type: 'compassion', title: 'Self-Compassion Reminder', duration: '1 minute', why: 'Reduces harsh self-criticism.' }
    ]
  },

  {
    id: 'panic-calm',
    name: 'Panic Calm-Down',
    category: 'anxiety',
    description: 'Immediate calming steps for acute anxiety or panic.',
    steps: [
      { type: 'breathing', title: 'Extended Exhale Breathing', duration: '3 minutes', why: 'Activates calming response.' },
      { type: 'grounding', title: 'Temperature Change', duration: '1 minute', why: 'Resets intense emotional arousal.' },
      { type: 'grounding', title: 'Name 3 Things You See', duration: '2 minutes', why: 'Anchors attention in the present.' },
      { type: 'reassurance', title: 'Safety Statement', duration: '1 minute', why: 'Reduces fear-based thinking.' }
    ]
  },

  {
    id: 'low-motivation',
    name: 'Low Motivation Reset',
    category: 'low-mood',
    description: 'Small steps to restart momentum when feeling low.',
    steps: [
      { type: 'activation', title: 'Tiny Task', duration: '5 minutes', why: 'Builds momentum with small success.' },
      { type: 'movement', title: '2-Minute Movement', duration: '2 minutes', why: 'Improves energy and mood.' },
      { type: 'writing', title: 'One Helpful Thought', duration: '2 minutes', why: 'Shifts perspective gently.' },
      { type: 'planning', title: 'Plan One Next Action', duration: '3 minutes', why: 'Reduces overwhelm.' }
    ]
  },

  {
    id: 'sleep-wind-down',
    name: 'Sleep Wind-Down',
    category: 'sleep',
    description: 'A short routine to prepare for sleep.',
    steps: [
      { type: 'routine', title: 'Screen Off', duration: '10 minutes', why: 'Reduces blue light exposure.' },
      { type: 'breathing', title: 'Slow Breathing', duration: '3 minutes', why: 'Signals body to relax.' },
      { type: 'writing', title: 'Tomorrow List', duration: '3 minutes', why: 'Clears mental clutter.' },
      { type: 'relaxation', title: 'Body Scan', duration: '5 minutes', why: 'Releases physical tension.' }
    ]
  },

  {
    id: 'overwhelm-reset',
    name: 'Overwhelm Reset',
    category: 'stress',
    description: 'Steps to regain clarity when feeling overloaded.',
    steps: [
      { type: 'pause', title: 'Two-Minute Pause', duration: '2 minutes', why: 'Interrupts stress cycle.' },
      { type: 'writing', title: 'Brain Dump', duration: '5 minutes', why: 'Gets everything out of your head.' },
      { type: 'sorting', title: 'Pick Top 3 Priorities', duration: '3 minutes', why: 'Creates focus.' },
      { type: 'planning', title: 'One Small Action', duration: '3 minutes', why: 'Restores sense of control.' }
    ]
  }
];

function getAllPathways() {
  return pathways;
}

function getPathwayById(id) {
  return pathways.find(p => p.id === id);
}

module.exports = {
  getAllPathways,
  getPathwayById
};
