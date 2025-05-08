import { 
  EXPERTISE_OPTIONS, 
  EDUCATION_LEVEL_OPTIONS,
  POLITICAL_AFFILIATION_OPTIONS,
  AFFILIATION_STRENGTH_OPTIONS,
  POLITICAL_PARTY_OPTIONS,
  CANDIDATES_BY_PARTY,
  CANDIDATE_OFFICE_MAPPING,
  CANDIDATE_BIO_MAPPING,
  SPEECH_TYPE_OPTIONS,
  CAMPAIGN_STAGE_OPTIONS,
  CALL_TO_ACTION_OPTIONS,
  SPEECH_TONE_OPTIONS,
  FORMALITY_OPTIONS,
  RHETORICAL_DEVICES_OPTIONS
} from './constants';

// Test template for demonstration purposes
export const TEST_TEMPLATES = [
  {
    id: 1,
    name: "Campaign Launch Template",
    description: "A comprehensive template for announcing a campaign with persuasive messaging and clear policy vision.",
    thumbnail: "campaign_launch.jpg",
    template: {
      // Candidate Profile
      "candidate-name": "Shri Rahul Gandhi",
      "political-party": "Indian National Congress",
      "other-party": "",
      "office-sought": "Member of Parliament",
      "brief-bio": "As a seasoned political leader with over 15 years of experience in public service, Rahul Gandhi has demonstrated a deep commitment to economic reform, social justice, and democratic values. Beginning his political career in 2004 as an MP from Amethi, he has consistently championed the causes of farmers, youth, and marginalized communities across India. His educational background includes degrees from prestigious international institutions, providing him with a global perspective on governance and policy-making.",
      "key-strengths": "Education, Healthcare, Agriculture, Social Justice, Economy",
      
      // Audience Profile
      "age-range": "25-65",
      "occupation": "Farmers, Service sector employees, Small business owners, Students",
      "interests": "Economic prosperity, Social equality, Education, Rural development",
      "education-level": "Mixed Education Levels",
      "socioeconomic-status": "Middle and lower-middle class",
      "cultural-background": "Diverse multicultural Indian communities",
      "political-affiliation": "Centrist",
      "affiliation-strength": "Moderate",
      "primary-concerns": "Economic stability, Job creation, Agricultural reforms, Healthcare access, Educational opportunities",
      "existing-values": "Democracy, Social equality, Cultural diversity, National unity, Progress",
      
      // Speech Parameters
      "speech-type": "Initial Speech",
      "primary-objective": "To officially announce candidacy and present a compelling vision for India's future under new leadership",
      "secondary-objective": "To highlight the shortcomings of the current government while positioning our party as the credible alternative",
      "slogan": "For a Progressive and United India",
      "main-message": "Our campaign represents a vision for an inclusive, progressive India where economic growth benefits all citizens, where social harmony prevails over division, and where our democratic institutions are strengthened rather than undermined. We stand for transformative policies that will create jobs, support farmers, expand healthcare access, and invest in education while protecting India's diverse cultural heritage.",
      "policy-points": "#. Implementation of a minimum income guarantee for the poorest 20% of households #. Comprehensive farm loan waiver and agricultural reforms to double farmer incomes #. Creation of 10 million jobs annually through manufacturing and service sector growth.",
      "key-messages": "Time for change has come. Current leadership has failed to deliver on economic promises. Our inclusive vision will unite rather than divide. Every Indian deserves dignity and opportunity.",
      "personal-story": "When I traveled to Vidarbha and met with families of farmers who had taken their own lives due to crushing debt, I committed myself to finding sustainable solutions for our agricultural communities. Their stories of struggle and resilience have stayed with me and inform my policy priorities to this day.",
      "anecdote": "Last month in a small village in Uttar Pradesh, I met a young woman who had started a small cooperative with ten other women from her community. Despite having limited formal education, they had built a successful micro-enterprise that now employs over 50 people. This is the spirit of innovation and determination that exists throughout India, waiting to be unleashed with the right policies and support.",
      "hypothetical-scenario": "Imagine an India where a young person from any background, any region, any caste or religion, can access quality education, find meaningful employment, afford healthcare for their family, and aspire to fulfill their potential. This is not a distant dream but an achievable reality with the right leadership and policies.",
      "call-to-action": "Volunteer",
      "cta-instructions": "Join our campaign by visiting www.rahulgandhi.in or sending a WhatsApp message to 9876543210. Together, we can build the India we all deserve.",
      "speech-tone": "Inspirational",
      "formality": "Semi-Formal",
      "emotional-appeal": "Emotional",
      "humor": "Balanced",
      "rhetorical-devices": "Anaphora (repetition at beginning of sentences), Metaphor (symbolic comparisons), Antithesis (contrasting ideas), Tricolon (series of three)",
      "speech-length": "2000-2500 words (approximately 20 minutes)",
      "political-climate": "Increasing economic concerns amidst rising inflation and unemployment. Growing social tensions across religious and caste lines. Significant voter dissatisfaction with unfulfilled promises of the current government.",
      "recent-events": "Farmer protests against agricultural reforms, Rising fuel prices affecting everyday citizens, Border tensions with neighboring countries",
      "campaign-stage": "Early Campaign",
      "geographic-location": "New Delhi, National Capital Region"
    }
  },
  {
    id: 2,
    name: "Policy Speech Template",
    description: "A template for discussing detailed policy proposals and addressing specific issues.",
    thumbnail: "policy_speech.jpg",
    template: {
      // Candidate Profile
      "candidate-name": "Shri Narendra Modi",
      "political-party": "Bharatiya Janata Party",
      "office-sought": "Prime Minister of India",
      "brief-bio": "Narendra Modi has served as the Prime Minister of India since 2014, bringing over two decades of administrative experience to the office. His tenure as Chief Minister of Gujarat was marked by significant economic growth and development initiatives. Known for his dedication to governance reforms and technological advancement, he has implemented several landmark policies and digital initiatives to modernize India's economy and government services.",
      "key-strengths": "Economy, Technology, Foreign Policy, National Security, Infrastructure",
      
      // Audience Profile
      "age-range": "30-70",
      "occupation": "Business leaders, Industry professionals, Policy experts, Civil servants",
      "interests": "Economic growth, Business development, International relations, National security",
      "education-level": "Graduate (Master's)",
      "socioeconomic-status": "Middle and upper-middle class",
      "cultural-background": "Urban professionals and business community",
      "political-affiliation": "Center-Right",
      "affiliation-strength": "Strong",
      "primary-concerns": "Economic growth, Business-friendly policies, National security, Infrastructure development, International standing",
      "existing-values": "Self-reliance, Entrepreneurship, Tradition, National pride, Strong leadership",
      
      // Speech Parameters
      "speech-type": "Mid-Campaign Speech",
      "primary-objective": "To outline a comprehensive economic policy framework that will accelerate India's growth and global competitiveness",
      "secondary-objective": "To reassure business leaders and investors about the government's commitment to economic reforms and ease of doing business",
      "slogan": "Aatmanirbhar Bharat - Self-Reliant India",
      "main-message": "India's path to becoming a $5 trillion economy requires bold reforms, strategic investments in key sectors, and unleashing the entrepreneurial spirit of our people. Through our comprehensive economic policy framework, we will create an environment where businesses can flourish, innovation can thrive, and every Indian can participate in and benefit from economic growth.",
      "policy-points": "#. Implementation of a new industrial policy focusing on manufacturing and Make in India 2.0 #. Simplification of tax structures and further streamlining of GST to reduce compliance burden #. Creation of specialized economic zones with next-generation infrastructure and regulatory frameworks #. Digitalization of government services to reduce bureaucratic hurdles for businesses #. Strategic investments in R&D and emerging technologies to drive innovation.",
      "key-messages": "India must become self-reliant in critical sectors. Economic growth must be inclusive and sustainable. Administrative reforms will reduce red tape and improve ease of doing business. Innovation and entrepreneurship will drive India's future prosperity.",
      "personal-story": "In my early days as a tea seller, I witnessed firsthand the entrepreneurial spirit that drives our nation. Despite limited resources, local business owners would constantly innovate and adapt to serve their communities. That same spirit, when unleashed at scale across our nation, will power India's rise on the global stage.",
      "anecdote": "During a recent visit to a technology incubator in Bengaluru, I met a young entrepreneur who had developed an AI-powered solution to optimize agricultural irrigation. With minimal investment but extraordinary dedication, his startup is now helping thousands of farmers across three states increase crop yields while conserving water. This is the innovation ecosystem we are committed to fostering across India.",
      "hypothetical-scenario": "Imagine an India where a brilliant young innovator from a small town can access world-class infrastructure, capital, mentorship, and markets without leaving their hometown. Where a manufacturing unit can complete all regulatory compliance with a few clicks. Where our products proudly carry the 'Made in India' label while competing with the best in global markets. This is the India we are building.",
      "call-to-action": "Donate",
      "cta-instructions": "I invite business leaders to engage with our newly established Investment Facilitation Cell at invest@india.gov.in to explore opportunities in priority sectors and benefit from our streamlined approval processes.",
      "speech-tone": "Confident",
      "formality": "Formal",
      "emotional-appeal": "Subdued",
      "humor": "Serious",
      "rhetorical-devices": "Anaphora (repetition at beginning of sentences), Rhetorical Question, Parallelism (repeated grammatical structures), Climax (ascending importance)",
      "speech-length": "3000-3500 words (approximately 30 minutes)",
      "political-climate": "Post-pandemic economic recovery period with strong focus on self-reliance and domestic manufacturing. Growing international interest in India as an alternative manufacturing hub.",
      "recent-events": "Launch of Production Linked Incentive schemes, Recent improvements in India's Ease of Doing Business rankings, New bilateral trade agreements with key partner countries",
      "campaign-stage": "Mid-Campaign",
      "geographic-location": "Mumbai, Financial Capital of India"
    }
  }
];

// Function to validate template fields against constraints
export const validateTemplate = (template) => {
  const errors = [];
  
  // Validate key-strengths (must be from EXPERTISE_OPTIONS)
  if (template["key-strengths"]) {
    // Get both values and labels from options
    const strengthsList = template["key-strengths"].split(',').map(s => s.trim());
    const validExpertiseLabels = EXPERTISE_OPTIONS.map(opt => opt.label);
    const validExpertiseValues = EXPERTISE_OPTIONS.map(opt => opt.value);
    
    // Check if each strength is either a valid label or value
    const invalidStrengths = strengthsList.filter(
      s => !validExpertiseLabels.includes(s) && !validExpertiseValues.includes(s)
    );
    
    if (invalidStrengths.length > 0) {
      errors.push(`Invalid key strengths: ${invalidStrengths.join(', ')}`);
    }
  }
  
  // Validate age-range format (must be x-y)
  if (template["age-range"]) {
    const ageRangePattern = /^\d+-\d+$/;
    if (!ageRangePattern.test(template["age-range"])) {
      errors.push("Age range must be in format 'number-number' (e.g., '25-65')");
    }
  }
  
  // Validate education-level
  if (template["education-level"]) {
    const validEducation = EDUCATION_LEVEL_OPTIONS.map(opt => opt.value);
    if (!validEducation.includes(template["education-level"])) {
      errors.push(`Invalid education level: ${template["education-level"]}`);
    }
  }
  
  // Validate political-affiliation
  if (template["political-affiliation"]) {
    const validAffiliations = POLITICAL_AFFILIATION_OPTIONS.map(opt => opt.value);
    if (!validAffiliations.includes(template["political-affiliation"])) {
      errors.push(`Invalid political affiliation: ${template["political-affiliation"]}`);
    }
  }
  
  // Validate affiliation-strength
  if (template["affiliation-strength"]) {
    const validStrengths = AFFILIATION_STRENGTH_OPTIONS.map(opt => opt.value);
    if (!validStrengths.includes(template["affiliation-strength"])) {
      errors.push(`Invalid affiliation strength: ${template["affiliation-strength"]}`);
    }
  }
  
  // Validate speech-type
  if (template["speech-type"]) {
    const validTypes = SPEECH_TYPE_OPTIONS.map(opt => opt.value);
    if (!validTypes.includes(template["speech-type"])) {
      errors.push(`Invalid speech type: ${template["speech-type"]}`);
    }
  }
  
  // Validate call-to-action
  if (template["call-to-action"]) {
    const validCTAs = CALL_TO_ACTION_OPTIONS.map(opt => opt.value);
    if (!validCTAs.includes(template["call-to-action"])) {
      errors.push(`Invalid call to action: ${template["call-to-action"]}`);
    }
  }
  
  // Validate speech-tone
  if (template["speech-tone"]) {
    const validTones = SPEECH_TONE_OPTIONS.map(opt => opt.value);
    if (!validTones.includes(template["speech-tone"])) {
      errors.push(`Invalid speech tone: ${template["speech-tone"]}`);
    }
  }
  
  // Validate formality
  if (template["formality"]) {
    const validFormality = FORMALITY_OPTIONS.map(opt => opt.value);
    if (!validFormality.includes(template["formality"])) {
      errors.push(`Invalid formality: ${template["formality"]}`);
    }
  }
  
  // Validate rhetorical-devices
  if (template["rhetorical-devices"]) {
    const devicesList = template["rhetorical-devices"].split(',').map(d => d.trim());
    const validDeviceLabels = RHETORICAL_DEVICES_OPTIONS.map(opt => opt.label);
    const validDeviceValues = RHETORICAL_DEVICES_OPTIONS.map(opt => opt.value);
    
    // Check if each device is either a valid label or value
    const invalidDevices = devicesList.filter(
      d => !validDeviceLabels.includes(d) && !validDeviceValues.includes(d)
    );
    
    if (invalidDevices.length > 0) {
      errors.push(`Invalid rhetorical devices: ${invalidDevices.join(', ')}`);
    }
  }
  
  // Validate campaign-stage
  if (template["campaign-stage"]) {
    const validStages = CAMPAIGN_STAGE_OPTIONS.map(opt => opt.value);
    if (!validStages.includes(template["campaign-stage"])) {
      errors.push(`Invalid campaign stage: ${template["campaign-stage"]}`);
    }
  }
  
  // Validate policy-points format (must use "#." format)
  if (template["policy-points"]) {
    const policyPointsPattern = /#\.\s+.+/m;
    const policyLines = template["policy-points"].split(/#\.\s+/).filter(line => line.trim());
    
    if (!policyPointsPattern.test(template["policy-points"]) || policyLines.length === 0) {
      errors.push("Policy points must be in '#. First point #. Second point' format");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Function to convert template to form data
export const templateToFormData = (template) => {
  const candidateForm = {
    'candidate-name': template['candidate-name'] || '',
    'political-party': template['political-party'] || '',
    'other-party': template['other-party'] || '',
    'office-sought': template['office-sought'] || '',
    'brief-bio': template['brief-bio'] || '',
    'key-strengths': template['key-strengths'] ? template['key-strengths'].split(',').map(s => s.trim()) : [],
    // Audience Profile fields
    'age-range': template['age-range'] ? template['age-range'].split('-').map(n => parseInt(n.trim())) : [20, 60],
    'education-level': template['education-level'] || '',
    'socioeconomic-status': template['socioeconomic-status'] || '',
    'cultural-background': template['cultural-background'] || '',
    'political-affiliation-type': template['political-affiliation'] || '',
    'political-affiliation-strength': template['affiliation-strength'] || '',
    'primary-concerns': template['primary-concerns'] || '',
    'existing-values': template['existing-values'] || '',
    'occupation': template['occupation'] || '',
    'interests': template['interests'] || '',
  };
  
  // Extract policy points from the "#." format
  const policyPoints = [];
  if (template['policy-points']) {
    // Match points like "#. Point text"
    const pointRegex = /#\.?\s+([^#](?:[^]*?))(?=\s+#\.|$)/g;
    let match;
    while ((match = pointRegex.exec(template['policy-points'])) !== null) {
      if (match[1] && match[1].trim()) {
        policyPoints.push(match[1].trim());
      }
    }
    
    // If the regex didn't match (possibly due to formatting issues),
    // fall back to a simpler split approach
    if (policyPoints.length === 0) {
      const points = template['policy-points'].split(/#\.\s+/).filter(p => p.trim());
      policyPoints.push(...points);
    }
  }
  
  const speechParams = {
    'speech-type': template['speech-type'] || '',
    'other-speech-type': '',
    'primary-objective': template['primary-objective'] || '',
    'secondary-objective': template['secondary-objective'] || '',
    'slogan': template['slogan'] || '',
    'main-message': template['main-message'] || '',
    'policy-points': policyPoints,
    'political-climate': template['political-climate'] || '',
    'recent-events': template['recent-events'] || '',
    'campaign-stage': template['campaign-stage'] || '',
    'geographic-location': template['geographic-location'] || '',
    'key-messages': template['key-messages'] || '',
    'personal-story': template['personal-story'] || '',
    'anecdote': template['anecdote'] || '',
    'hypothetical-scenario': template['hypothetical-scenario'] || '',
    'call-to-action': template['call-to-action'] || '',
    'cta-instructions': template['cta-instructions'] || '',
    'speech-tone': template['speech-tone'] || '',
    'emotional-appeal': template['emotional-appeal'] || 'Neutral',
    'humor': template['humor'] || 'Balanced',
    'formality': template['formality'] || '',
    'rhetorical-devices': template['rhetorical-devices'] ? template['rhetorical-devices'].split(',').map(d => d.trim()) : [],
    'speech-length': template['speech-length'] || ''
  };
  
  return {
    candidateForm,
    speechParams
  };
}; 