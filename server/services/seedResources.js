require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('../models/Resource');

mongoose.connect(process.env.MONGO_URI);

const resources = [

  // =========================
  // Anxiety & Panic (CBT / NHS / NIMH)
  // =========================
  { title: 'Box Breathing Technique', category: 'anxiety', description: 'Slow, paced breathing to calm the nervous system.', source: 'National Health Service (United Kingdom)', tags: ['breathing','panic','calm','anxiety'], evidenceLevel: 'high' },
  { title: '5-4-3-2-1 Grounding Technique', category: 'anxiety', description: 'Sensory grounding exercise to reduce acute anxiety.', source: 'National Health Service (United Kingdom)', tags: ['grounding','panic','overwhelm','anxiety'], evidenceLevel: 'high' },
  { title: 'Progressive Muscle Relaxation', category: 'anxiety', description: 'Tensing and relaxing muscle groups to reduce tension.', source: 'American Psychological Association', tags: ['relaxation','tension','anxiety'], evidenceLevel: 'high' },
  { title: 'Paced Breathing with Extended Exhale', category: 'anxiety', description: 'Longer exhales to activate parasympathetic response.', source: 'National Institute of Mental Health (United States)', tags: ['breathing','panic','calm'], evidenceLevel: 'moderate' },
  { title: 'Anxiety Exposure Hierarchy Planning', category: 'anxiety', description: 'Gradual exposure planning to reduce avoidance.', source: 'American Psychological Association', tags: ['exposure','avoidance','anxiety'], evidenceLevel: 'high' },
  { title: 'Worry Time Scheduling', category: 'anxiety', description: 'Contain worry to a specific daily time window.', source: 'National Health Service (United Kingdom)', tags: ['worry','anxiety','cbt'], evidenceLevel: 'moderate' },
  { title: 'Thought Defusion (ACT)', category: 'anxiety', description: 'Learning to observe thoughts without attachment.', source: 'Association for Contextual Behavioral Science (ACT)', tags: ['act','defusion','anxiety'], evidenceLevel: 'moderate' },
  { title: 'Calm Body Scan', category: 'anxiety', description: 'Guided body awareness to release physical tension.', source: 'Mind (Mental Health Charity, United Kingdom)', tags: ['body-scan','relaxation','anxiety'], evidenceLevel: 'moderate' },

  // =========================
  // Stress Management (WHO / APA / NHS)
  // =========================
  { title: 'Stress Bucket Exercise', category: 'stress', description: 'Identify stressors and coping outlets.', source: 'Mind (Mental Health Charity, United Kingdom)', tags: ['stress','planning','coping'], evidenceLevel: 'moderate' },
  { title: 'Daily Stress Log', category: 'stress', description: 'Track stress triggers and responses.', source: 'American Psychological Association', tags: ['stress','tracking','awareness'], evidenceLevel: 'general' },
  { title: 'Two-Minute Reset Break', category: 'stress', description: 'Brief pause to reset posture, breath, and focus.', source: 'World Health Organization', tags: ['stress','reset','micro-break'], evidenceLevel: 'general' },
  { title: 'Time Blocking for Stress Reduction', category: 'stress', description: 'Structured scheduling to reduce overload.', source: 'Centers for Disease Control and Prevention (United States)', tags: ['stress','routine','planning'], evidenceLevel: 'general' },
  { title: 'Relaxation Response Practice', category: 'stress', description: 'Eliciting physiological relaxation response.', source: 'American Psychological Association', tags: ['stress','relaxation'], evidenceLevel: 'moderate' },
  { title: 'Boundary Setting Practice', category: 'stress', description: 'Learning to set limits to prevent burnout.', source: 'American Psychological Association', tags: ['stress','boundaries','burnout'], evidenceLevel: 'general' },

  // =========================
  // Sleep (CDC / NHS / Mayo Clinic)
  // =========================
  { title: 'Sleep Hygiene Fundamentals', category: 'sleep', description: 'Daily habits that support quality sleep.', source: 'Centers for Disease Control and Prevention (United States)', tags: ['sleep','routine','hygiene'], evidenceLevel: 'high' },
  { title: 'Consistent Bedtime Routine', category: 'sleep', description: 'Create predictable pre-sleep behaviors.', source: 'National Health Service (United Kingdom)', tags: ['sleep','routine','relax'], evidenceLevel: 'high' },
  { title: 'Limit Blue Light Exposure', category: 'sleep', description: 'Reduce screen use before bed.', source: 'Mayo Clinic (United States)', tags: ['sleep','screen','hygiene'], evidenceLevel: 'moderate' },
  { title: 'Sleep Environment Optimization', category: 'sleep', description: 'Adjust light, noise, and temperature.', source: 'Centers for Disease Control and Prevention (United States)', tags: ['sleep','environment'], evidenceLevel: 'moderate' },
  { title: 'Stimulus Control for Insomnia', category: 'sleep', description: 'Use bed only for sleep to retrain association.', source: 'National Health Service (United Kingdom)', tags: ['sleep','insomnia'], evidenceLevel: 'moderate' },
  { title: 'Caffeine Cutoff Strategy', category: 'sleep', description: 'Limit caffeine to improve sleep onset.', source: 'Mayo Clinic (United States)', tags: ['sleep','caffeine'], evidenceLevel: 'general' },

  // =========================
  // Low Mood & Depression-Supportive (NIMH / APA / CBT)
  // =========================
  { title: 'Behavioral Activation Basics', category: 'low-mood', description: 'Increase positive reinforcement through activity.', source: 'American Psychological Association', tags: ['low-mood','activation','motivation'], evidenceLevel: 'high' },
  { title: 'Activity Scheduling', category: 'low-mood', description: 'Plan small, meaningful activities.', source: 'National Institute of Mental Health (United States)', tags: ['low-mood','activity','routine'], evidenceLevel: 'high' },
  { title: 'Tiny Steps Method', category: 'low-mood', description: 'Break tasks into very small actions.', source: 'National Institute of Mental Health (United States)', tags: ['low-mood','tiny-steps','motivation'], evidenceLevel: 'moderate' },
  { title: 'Pleasant Events List', category: 'low-mood', description: 'Identify enjoyable or meaningful activities.', source: 'American Psychological Association', tags: ['low-mood','pleasure','activity'], evidenceLevel: 'general' },
  { title: 'Self-Compassion Break', category: 'low-mood', description: 'Practice kindness toward self during difficulty.', source: 'World Health Organization', tags: ['self-compassion','low-mood'], evidenceLevel: 'general' },
  { title: 'Mood Monitoring Chart', category: 'low-mood', description: 'Track mood changes over time.', source: 'National Health Service (United Kingdom)', tags: ['low-mood','tracking'], evidenceLevel: 'general' },

  // =========================
  // Focus & Performance (APA / University Skills)
  // =========================
  { title: 'Pomodoro Focus Method', category: 'focus', description: 'Timed work intervals to improve attention.', source: 'University Study Skills Programs', tags: ['focus','time','productivity'], evidenceLevel: 'general' },
  { title: 'Single-Tasking Practice', category: 'focus', description: 'Reduce multitasking to improve concentration.', source: 'American Psychological Association', tags: ['focus','attention'], evidenceLevel: 'general' },
  { title: 'Distraction Parking List', category: 'focus', description: 'Write distractions to address later.', source: 'National Health Service (United Kingdom)', tags: ['focus','distraction'], evidenceLevel: 'general' },
  { title: 'Exam Stress Planning Sheet', category: 'focus', description: 'Short plan for exam-related stress.', source: 'National Health Service (United Kingdom)', tags: ['exam','stress','focus'], evidenceLevel: 'general' },
  { title: 'Performance Breathing', category: 'focus', description: 'Breathing to steady nerves before performance.', source: 'American Psychological Association', tags: ['focus','anxiety','performance'], evidenceLevel: 'moderate' },

  // =========================
  // Mindfulness & Grounding (MBSR / NHS / WHO)
  // =========================
  { title: '3-Minute Breathing Space', category: 'mindfulness', description: 'Brief mindfulness reset exercise.', source: 'University of Massachusetts Medical School (Mindfulness-Based Stress Reduction)', tags: ['mindfulness','breathing','reset'], evidenceLevel: 'general' },
  { title: 'Mindful Body Awareness', category: 'mindfulness', description: 'Notice sensations without judgment.', source: 'University of Massachusetts Medical School (Mindfulness-Based Stress Reduction)', tags: ['mindfulness','body'], evidenceLevel: 'general' },
  { title: 'Name Three Things', category: 'grounding', description: 'Name items to anchor in present moment.', source: 'National Health Service (United Kingdom)', tags: ['grounding','present'], evidenceLevel: 'general' },
  { title: 'Temperature Change Grounding', category: 'grounding', description: 'Cold water or cool air to reset.', source: 'Dialectical Behavior Therapy Skills Training', tags: ['grounding','reset'], evidenceLevel: 'general' },
  { title: 'Senses Check-In', category: 'grounding', description: 'Notice one thing per sense.', source: 'Mind (Mental Health Charity, United Kingdom)', tags: ['grounding','senses'], evidenceLevel: 'general' },
  { title: 'Mindful Walking', category: 'mindfulness', description: 'Short walk with attention to movement.', source: 'World Health Organization', tags: ['mindfulness','movement'], evidenceLevel: 'general' },

  // =========================
  // Cognitive Behavioral Therapy Core Tools
  // =========================
  { title: 'Thought Record Worksheet', category: 'cbt', description: 'Identify and evaluate automatic thoughts.', source: 'Cognitive Behavioral Therapy (Greenberger & Padesky)', tags: ['cbt','thoughts','reframing'], evidenceLevel: 'high' },
  { title: 'Evidence For and Against', category: 'cbt', description: 'Weigh evidence supporting and opposing thoughts.', source: 'American Psychological Association', tags: ['cbt','thoughts','evidence'], evidenceLevel: 'high' },
  { title: 'Cognitive Distortions Checklist', category: 'cbt', description: 'Identify common thinking errors.', source: 'National Health Service (United Kingdom)', tags: ['cbt','distortions'], evidenceLevel: 'high' },
  { title: 'Decatastrophizing Exercise', category: 'cbt', description: 'Reduce catastrophic thinking.', source: 'American Psychological Association', tags: ['cbt','catastrophizing'], evidenceLevel: 'moderate' },
  { title: 'Behavioral Experiment Planning', category: 'cbt', description: 'Test beliefs through small experiments.', source: 'Cognitive Behavioral Therapy Manuals', tags: ['cbt','experiments'], evidenceLevel: 'moderate' },

  // =========================
  // Acceptance & Commitment Therapy (ACT)
  // =========================
  { title: 'Values Clarification', category: 'act', description: 'Identify personal values for direction.', source: 'Association for Contextual Behavioral Science', tags: ['act','values','motivation'], evidenceLevel: 'moderate' },
  { title: 'Committed Action Planning', category: 'act', description: 'Small actions aligned with values.', source: 'Association for Contextual Behavioral Science', tags: ['act','action','values'], evidenceLevel: 'moderate' },
  { title: 'Acceptance of Emotions', category: 'act', description: 'Allow emotions without struggle.', source: 'Association for Contextual Behavioral Science', tags: ['act','acceptance'], evidenceLevel: 'moderate' },
  { title: 'Self-as-Context Exercise', category: 'act', description: 'Perspective-taking to reduce fusion.', source: 'ACT Therapy Manuals', tags: ['act','perspective'], evidenceLevel: 'general' }

];

async function seed() {
  await Resource.deleteMany();
  await Resource.insertMany(resources);
  console.log(`Seeded ${resources.length} curated evidence-based resources`);
  process.exit();
}

seed();
