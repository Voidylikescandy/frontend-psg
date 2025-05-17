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
      "primary-concerns": "Creating new job opportunities in emerging industries, \nIncreasing access to affordable healthcare for low-income families, \nImplementing policies to stabilize food prices through agricultural reforms, \nImproving vocational training programs to enhance employability, \nExpanding scholarship programs for underprivileged students to access higher education  ",
      "existing-values": "Protecting individual freedoms\nPromoting equal opportunities\nCelebrating diverse cultural heritage\nFostering a sense of community\nEmbracing innovation and change\nEnsuring fairness and justice for all\nSupporting the voices of underrepresented groups\nBuilding a more inclusive society",
      
      // Speech Parameters
      "speech-type": "Initial Speech",
      "primary-objective": "To inspire and mobilize the Indian electorate by clearly articulating a comprehensive and inclusive vision for the country's future, highlighting key policy initiatives and reforms that address the pressing challenges faced by the nation, and demonstrating a strong, capable leadership that embodies the aspirations of the people.",
      "secondary-objective": "Emphasize the key policy failures of the current administration to underscore the need for change.\nOutline the core values and principles that differentiate our party from the current government.\nShowcase the achievements and successes of our party in areas where we have been involved.\nHighlight the public's concerns and demonstrate how our party's policies address these issues.\nEstablish a clear contrast between our party's vision for the future and the current government's track record.\nProvide a roadmap for how our party plans to implement its policies and achieve its goals.\nBuild credibility by highlighting the expertise and experience of our party's leadership. ",
      "slogan": "For a Progressive and United India",
      "main-message": "We envision a future where every Indian has access to quality education and healthcare, and where economic opportunities are available to all, regardless of their background or socio-economic status.\nOur vision is built on the principles of social justice, equality, and environmental sustainability, ensuring that India's growth is not just rapid, but also inclusive and responsible.\nBy prioritizing job creation, supporting small businesses, and investing in infrastructure, we aim to drive economic growth that benefits the many, not just the few.\nWe are committed to strengthening our democratic institutions, promoting transparency, and upholding the rule of law, so that every citizen can trust in the fairness and integrity of our system.\nOur policies will support India's farmers, promote social harmony, and celebrate the country's rich cultural diversity, while also addressing the challenges of climate change and environmental degradation.",
      "policy-points": "#. Implement a guaranteed minimum income of 25,000 rupees for the poorest 20% of households through a targeted cash assistance program, funded by reallocating 5% of existing welfare budget inefficiencies and closing corporate tax loopholes. #. Implement a comprehensive farm loan waiver program for small and marginal farmers, covering loans up to five lakh rupees, to provide immediate relief from debt burdens.\nIntroduce a Farm Income Support Scheme that guarantees a minimum price for crops, ensuring farmers receive at least 50 percent more than the cost of production.\nEstablish a Farmer Producer Organization fund to support the creation and strengthening of FPOs, enhancing farmers' bargaining power and market access.\nInvest in irrigation infrastructure, aiming to increase the irrigated area by 20 percent over the next five years, to reduce dependence on rainfall and improve crop yields.\nSimplify and expedite the process for land record digitization, reducing disputes and improving access to credit for farmers. #. Invest in workforce development programs that provide vocational training in emerging technologies and industries, targeting the creation of at least 10 million new jobs annually through a combination of manufacturing and service sector growth.\nIncrease access to capital for small businesses and startups through tax incentives, grants, and low-interest loans, fostering an environment that encourages entrepreneurship and job creation.\nImplement a comprehensive national infrastructure development plan, focusing on transportation, energy, and digital infrastructure to support businesses and stimulate economic growth.",
      "key-messages": "We're at a crossroads where the status quo is no longer acceptable.\nFailed economic policies have left many behind, it's time for a new direction.\nOur campaign is built on inclusivity, not division, bringing together diverse voices.\nEvery citizen deserves equal access to opportunities and the dignity that comes with it.\nOur vision for India is one where everyone has a chance to thrive.",
      "personal-story": "My family's farm was on the brink of collapse when I was a teenager, the weight of debt and uncertainty hanging over us like a constant storm cloud.\nMy parents worked tirelessly, often for 18 hours a day, to keep our land productive, but the returns were dwindling, and the bank was threatening to repossess everything we'd worked for.\nI saw firsthand the toll this took on my family, the sleepless nights, the endless worry, and the fear that gripped us all.\nIt was a struggle that many families in our community faced, and it was clear that the system was broken, leaving hardworking families to fend for themselves against the whims of a volatile market and unforgiving bureaucracy.\nThose experiences shaped my understanding of the challenges our agricultural communities face and instilled in me a determination to fight for policies that support our farmers, not just in times of crisis but every day.\nI've carried the lessons I learned on that farm with me throughout my career, informing my advocacy for fair prices, better infrastructure, and accessible credit for our farmers.\nThe families I met in Vidarbha echoed the struggles of my own family, and it reinforced my commitment to creating a more just and equitable system for those who toil on our land.",
      "anecdote": "The story of Kalavati Devi, a widow from a rural village in Bihar, is a testament to the power of women's empowerment.\nShe took a small loan from a local microfinance institution and started a small business making traditional handicrafts, which eventually became a thriving enterprise employing several women from her community.\nWith her earnings, she was able to educate her children and improve her family's living conditions, inspiring other women in her village to follow in her footsteps.\nThis kind of grassroots entrepreneurship is happening across the country, demonstrating the potential for economic growth and social change when women are given the opportunity to succeed.",
      "hypothetical-scenario": "A young girl from a rural village in Bihar grows up with the opportunity to attend a well-funded school with modern facilities, qualified teachers, and a curriculum that prepares her for the demands of the 21st-century job market.\nShe excels in her studies, particularly in science and mathematics, and receives a scholarship to pursue higher education in a prestigious institution.\nUpon graduating, she lands a job in a thriving tech industry, earning a decent salary that allows her to support her family and contribute to her community.\nWith her stable income, she can afford quality healthcare for her parents and younger siblings, ensuring they receive the medical attention they need without financial strain.\nAs she progresses in her career, she becomes a role model for younger girls in her village, inspiring them to pursue their dreams and defy traditional limitations.\nHer success is not an isolated incident but part of a broader trend where individuals from all backgrounds achieve their potential, driving economic growth, social mobility, and a more equitable society.\nThe country benefits from a skilled, diverse workforce that attracts investments, fosters innovation, and competes effectively on the global stage.\nThe government, through its policies and investments, has created an ecosystem that supports entrepreneurship, education, and healthcare, making it possible for talented individuals to thrive and make a meaningful impact.",
      "call-to-action": "Volunteer",
      "cta-instructions": "Visit www.rahulgandhi.in to learn more about our campaign and sign up to get involved.\nSend a WhatsApp message to 9876543210 to join our movement and receive updates on our progress.\nShare your contact information to receive regular updates on campaign events and initiatives.\nAttend our upcoming rally on 15th August at Rajpath, New Delhi, to show your support.\nFollow our social media handles on Facebook, Twitter, and Instagram at @rahulgandhi to stay informed.",
      "speech-tone": "Inspirational",
      "formality": "Semi-Formal",
      "emotional-appeal": "Emotional",
      "humor": "Balanced",
      "rhetorical-devices": "Anaphora (repetition at beginning of sentences), Metaphor (symbolic comparisons), Antithesis (contrasting ideas), Tricolon (series of three)",
      "speech-length": "2000-2500 words (approximately 20 minutes)",
      "political-climate": "Voter anxiety is high due to economic instability and unmet expectations from the government.\nGrowing divisions along religious and caste lines are a significant concern for social cohesion.\nThe current government's unfulfilled promises have eroded public trust, creating an opportunity for alternative voices.\nEconomic issues such as inflation and unemployment are top priorities for voters.\nThere's a need for inclusive messaging that addresses the concerns of diverse voter groups.\nThe political discourse is likely to be heated, with voters expecting tangible solutions to pressing issues. ",
      "recent-events": "Farmer protests against agricultural reforms have highlighted the struggles of the agricultural community and the impact of policy changes on their livelihoods.\nRising fuel prices are affecting the cost of living for everyday citizens, influencing transportation costs, and impacting the overall economy.\nBorder tensions with neighboring countries have raised concerns about national security, regional stability, and the potential for diplomatic fallout.\nRecent government initiatives to boost local manufacturing and economic growth have been announced, potentially creating new job opportunities and stimulating regional development.\nGrowing concerns about climate change and its effects on local ecosystems and agriculture are becoming increasingly pressing.\nThe ongoing debate about digital privacy and data protection is shaping the conversation around technology and personal freedoms.",
      "campaign-stage": "Early Campaign",
      "geographic-location": "New Delhi, National Capital Region",

      "persuasion-techniques": "Optimize Your Message, Elicit Congruent Attitudes",
      "persuasion-instructions": "Use simple and clear language to convey complex policy ideas, avoiding technical jargon that may confuse the audience.\nEmphasize the benefits of the policies for the common man, highlighting how they will directly impact and improve the lives of the audience.\nUse storytelling techniques to make the message more relatable, such as sharing examples of individuals or families who have benefited from similar policies in the past.\nFrame the policies as a moral imperative, emphasizing the need for social justice, equality, and fairness in the distribution of resources and opportunities.\nHighlight the candidate's personal commitment to the cause, sharing personal anecdotes or experiences that demonstrate their passion and dedication to the issues.\nUse data and statistics to demonstrate the effectiveness of the policies, but present them in a way that is easy to understand and visualize.\nAppeal to the audience's sense of patriotism and national pride, framing the policies as a necessary step towards building a stronger, more prosperous India.\nEmphasize the importance of collective action and community effort in achieving the vision of a progressive and united India.\nUse inclusive language to emphasize that the policies are designed to benefit all Indians, regardless of their background or socio-economic status.\nLink the policies to the audience's values, such as protecting individual freedoms, promoting equal opportunities, and celebrating diverse cultural heritage.\nElicit congruent attitudes by asking rhetorical questions that resonate with the audience's concerns and values, such as \"Don't we deserve a government that prioritizes the welfare of our children and the future of our country?\nUse emotional appeals to create a sense of empathy and shared understanding, such as describing the struggles of a farmer or the aspirations of a young student.\nAdapt the message to the audience's values by using phrases that resonate with their concerns, such as Ensuring fairness and justice for all or Building a more inclusive society.\nUse the slogan For a Progressive and United India to create a sense of unity and shared purpose among the audience.\nFrame the policies as a necessary step towards achieving the core message of quality education and healthcare, and economic opportunities for all.\nEmphasize how the policies will support India's farmers, promote social harmony, and celebrate the country's rich cultural diversity."
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