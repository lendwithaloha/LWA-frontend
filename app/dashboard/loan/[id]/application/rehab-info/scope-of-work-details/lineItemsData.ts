export const lineItems = [
    {
      id: 1,
      title: 'Plans & Permits',
      budget: 3000,
      descriptionType: 'options',
      descriptionOptions: [
        'Building Permit',
        'Building Permit and other permits',
        'Plans and permits',
        'Architecture and structure engineering',
        'Architect/structure engineering and permits',
      ],
      selectedDescription: 'Building Permit and other permits',
      tooltip:
        'Select the option that best describes the plan & permit-related expenses you are budgeting for',
    },
    {
      id: 2,
      title: 'Demolition',
      budget: 7000,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe any demolition & cleanout work needed for this project. Leave blank if you are not doing work in this category.',
    },
    {
      id: 3,
      title: 'Foundation',
      budget: 0,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe the foundation repairs that will occur during this renovation. Leave blank if you are not doing work in this category.',
    },
    {
      id: 4,
      title: 'Roof & Gutters',
      budget: 15000,
      descriptionType: 'options',
      descriptionOptions: [
        'New roof',
        'Repair roof',
        'New roof and new gutters',
        'Repair fascia and/or gutters',
        'New roof in the addition',
        'New gutters',
      ],
      selectedDescription: 'New roof',
      tooltip:
        'Select the option that best describes your planned roof/gutter work. Leave blank if you are not doing work in this category.',
    },
    {
      id: 5,
      title: 'Exterior / Siding',
      budget: 5000,
      descriptionType: 'options',
      descriptionOptions: [
        'New siding',
        'New stucco',
        'Repair & paint',
        'Repair & powerwash',
      ],
      selectedDescription: 'Repair & paint',
      tooltip:
        'Select the option that best describes your planned exterior/siding work. Leave blank if you are not doing work in this category.',
    },
    {
      id: 6,
      title: 'Windows',
      budget: 4000,
      descriptionType: 'options',
      descriptionOptions: [
        'Replace all windows',
        'Replace 1-2 windows',
        'Replace 3-5 windows',
        'Replace 6-10 windows',
        'Repair windows as needed',
        'Install new windows in the addition',
      ],
      selectedDescription: 'Repair windows as needed',
      tooltip:
        'Select the option that best describes the type of window work you are budgeting for.',
    },
    {
      id: 7,
      title: 'Garage & Driveway',
      budget: 6000,
      descriptionType: 'options',
      descriptionOptions: [
        'New garage door',
        'Repair garage door',
        'New driveway',
        'Repair driveway',
        'New garage door with new motor',
        'New motor',
        'New garage door, new motor and new driveway',
        'Build new garage (1 Car Capacity)',
        'Build new garage (2 Cars Capacity)',
      ],
      selectedDescription: 'New garage door',
      tooltip:
        'Select the option that best describes your planned garage/driveway work.',
    },
    {
      id: 8,
      title: 'Framing',
      budget: 10000,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe the framing work that will occur during this renovation. Leave blank if you are not doing work in this category.',
    },
    {
      id: 9,
      title: 'Finish & Carpentry',
      budget: 1400,
      descriptionType: 'options',
      descriptionOptions: [
        'Replace all doors',
        'Replace all baseboards',
        'Replace all doors / trims and baseboards',
        'Replace doors and baseboards',
        'Install new hardware',
        'Install all new doors in the addition',
        'Install new exterior doors',
      ],
      selectedDescription: 'Replace all baseboards',
      tooltip:
        'Select the option that best describes your planned door/trim work.',
    },
    {
      id: 10,
      title: 'Sheetrock & Insulation',
      budget: 0,
      descriptionType: 'options',
      descriptionOptions: [
        'Replace all sheetrock and insulation',
        'Replace all sheetrock',
        'Repair sheetrock as needed',
        'Repair sheetrock and replace where needed',
        'New sheetrock and insulation for the addition',
      ],
      selectedDescription: '',
      tooltip:
        'Select the option that best describes your planned sheetrock/insulation work.',
    },
    {
      id: 11,
      title: 'Interior Paint',
      budget: 3000,
      descriptionType: 'options',
      descriptionOptions: ['New paint throughout the interior', 'Paint touchups'],
      selectedDescription: 'Paint touchups',
      tooltip:
        'Select the option that best describes your planned work. This line should account for interior painting only.',
    },
    {
      id: 12,
      title: 'Flooring',
      budget: 7900,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe the flooring work that will occur during this renovation. Leave blank if you are not doing work in this category.',
    },
    {
      id: 13,
      title: 'Kitchen',
      budget: 14470,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe the kitchen work that will occur during this renovation. Leave blank if you are not doing work in this category.',
    },
    {
      id: 14,
      title: 'Bathrooms',
      budget: 11400,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe the bathroom work that will occur during this renovation. Leave blank if you are not doing work in this category.',
    },
    {
      id: 15,
      title: 'Plumbing Work',
      budget: 9000,
      descriptionType: 'options',
      descriptionOptions: [
        'All new plumbing system',
        'Repair plumbing system',
        'Install new water heater',
        'New plumbing system for the addition',
      ],
      selectedDescription: 'Repair plumbing system',
      tooltip:
        'Select the option that best describes the plumbing work that will occur during this renovation.',
    },
    {
      id: 16,
      title: 'Electrical Work',
      budget: 10000,
      descriptionType: 'options',
      descriptionOptions: [
        'Repair electric system',
        'All new light fixtures and switches / outlets',
        'All new electrical system with all new light fixtures, switches and outlets',
        'Upgrade electrical panel',
        'Upgrade electrical panel and repairs as needed',
        'All new electrical system with all new light fixtures, switches and outlets (for the addition)',
      ],
      selectedDescription: 'Upgrade electrical panel and repairs as needed',
      tooltip:
        'Select the option that best describes the electrical work that will occur during this renovation.',
    },
    {
      id: 17,
      title: 'HVAC Work',
      budget: 9000,
      descriptionType: 'options',
      descriptionOptions: [
        'All new HVAC system',
        'Repair HVAC system',
        'Replace HVAC system from electric to gas',
        'Install new furnace',
        'Install new furnace with new ducting',
        'Install new AC system',
        'Install new HVAC system for the addition',
      ],
      selectedDescription: 'Repair HVAC system',
      tooltip:
        'Select the option that best describes the HVAC work that will occur during this renovation.',
    },
    {
      id: 18,
      title: 'Appliances',
      budget: 1700,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'List any new appliances that will be installed during this renovation. Leave blank if you are not doing work in this category.',
    },
    {
      id: 19,
      title: 'Yard / Landscaping',
      budget: 7000,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe any site or landscaping improvements that are planned during the renovation. Leave blank if you are not doing work in this category.',
    },
    {
      id: 20,
      title: 'Basement Finishes',
      budget: 0,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'Describe any improvements that will occur in the basement of the property. Leave blank if you are not doing work in this category.',
    },
    {
      id: 21,
      title: 'Miscellaneous',
      budget: 0,
      descriptionType: 'text',
      descriptionValue: '',
      tooltip:
        'This line can be used to capture work that doesn’t fit into other sections. Leave blank if you are not doing work in this category.',
    },
    {
      id: 22,
      title: 'Contingency',
      budget: 2978,
      descriptionType: 'text',
      descriptionValue: 'Additional Contingency',
      tooltip:
        'This line can be used to capture work that doesn’t fit into other sections.',
    },
  ]
  