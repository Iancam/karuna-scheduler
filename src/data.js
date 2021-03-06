module.exports.constantState = {
  questionsPerWeek: 2,
  dienerQuestionIds: [
    "Engaged",
    "Future",
    "Purpose",
    "Respect",
    "Competent",
    "Good"
  ],
  resetDay: 0
};

const standard_flows = [
  [
    "Hi @contact.name, how was your day today? From 1 being on the struggle bus to 10 being pure bliss. ",
    "Thanks for reflecting @contact.name. Why do you feel today was a @flow.wellbeing_quant?"
  ],
  [
    "Hey hey @contact.name, how went your day? From 1 being dreadful to 10 being superb. ",
    "Thoughts on what made today a @flow.wellbeing_quant?"
  ],
  [
    "Hiya @contact.name, how'd today go for you? From 1 being terrible to 10 being an absolute delight. ",
    "Would you like to share why you felt today was a @flow.wellbeing_quant?"
  ],
  [
    "Good evening @contact.name, how would you say today went? From 1 being awful to 10 being fantastic. ",
    "Reflections on why a @flow.wellbeing_quant?"
  ],
  [
    "Hi @contact.name, how was your day today? From 1 low to 10 high. ",
    "Thanks for reflecting @contact.name. Why do you feel today was a @flow.wellbeing_quant?"
  ],
  [
    "Hey hey @contact.name, how went your day? From 1 being on the struggle bus to 10 being pure bliss. ",
    "Thoughts on what made today a @flow.wellbeing_quant?"
  ],
  [
    "Goooood evening @contact.name, how would you say today went? From 1 being on the struggle bus to 10 being pure bliss. ",
    "Reflections on why a @flow.wellbeing_quant?"
  ]
];

const deiner_flows = [
  {
    title: "Engaged",
    flow: [
      "Hi @contact.name, NEW question for ya!",
      "Do you feel engaged and interested in your daily activities? From 1-“not at all” to 7-“💯yes!” with 4 being neutral.",
      "Thanks for reflecting @contact.name. Why a @flow.otherswellbeing_quant?"
    ]
  },
  {
    title: "Future",
    flow: [
      "Hi @contact.name, NEW question for ya!",
      "Do you feel generally optimistic about your future? From 1-“not at all” to 7-“💯yes!” with 4 being neutral.",
      "Thanks for reflecting @contact.name. Why a @flow.otherswellbeing_quant?"
    ]
  },
  {
    title: "Purpose",
    flow: [
      "Hi @contact.name, NEW question for ya!",
      "Do you feel you’re leading a purposeful and meaningful life? From 1-“not at all” to 7-“💯yes!” with 4 being neutral.",
      "Thanks for reflecting @contact.name. Why a @flow.otherswellbeing_quant?"
    ]
  },
  {
    title: "Respect",
    flow: [
      "Hi @contact.name, NEW question for ya!",
      "In general, do you feel people respect you? From 1-“not at all” to 7-“💯yes!” with 4 being neutral.",
      "Thanks for reflecting @contact.name. Why a @flow.otherswellbeing_quant?"
    ]
  },
  {
    title: "Competent",
    flow: [
      "Hi @contact.name, NEW question for ya!",
      "Do you feel competent and capable in the activities that are important to you? From 1-“not at all” to 7-“💯yes!” with 4 being neutral.",
      "Thanks for reflecting @contact.name. Why a @flow.otherswellbeing_quant?"
    ]
  },
  {
    title: "Good",
    flow: [
      "Hi @contact.name, NEW question for ya!",
      "Do you feel you are a good person and live a good life? From 1-“not at all” to 7-“💯yes!” with 4 being neutral.",
      "Thanks for reflecting @contact.name. Why a @flow.otherswellbeing_quant?"
    ]
  }
];
