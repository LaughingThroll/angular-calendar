const departmentTeams = {
  teams: [
    {
      name: "Frontend Team",
      percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
      teamId: 0,
      members: [
        {
          name: "Jack London",
          memberId: 28,
          vacations: [
            { startDate: "15.01.2021", endDate: "18.01.2021", type: "Paid" },
            { startDate: "28.01.2021", endDate: "01.02.2021", type: "Paid" },
          ],
        },
        {
          name: "Eric Meyer",
          memberId: 26,
          vacations: [{ startDate: "12.02.2021", endDate: "15.02.2021", type: "Paid" }],
        },
        {
          name: "Paul Irish",
          memberId: 25,
          vacations: [
            { startDate: "20.02.2021", endDate: "22.02.2021", type: "Paid" },
            { startDate: "25.02.2021", endDate: "25.03.2021", type: "Paid" },
          ],
        },
        {
          name: "Chris Coyier",
          memberId: 24,
          vacations: [
            { startDate: "19.01.2021", endDate: "19.02.2021", type: "Paid" },
            { startDate: "20.02.2021", endDate: "22.02.2021", type: "UnPaid" },
          ],
        },
      ],
    },
    {
      name: "Backend Team",
      percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
      teamId: 1,
      members: [
        {
          name: "Albert Einstein",
          memberId: 22,
          vacations: [{ startDate: "15.02.2021", endDate: "22.03.2021", type: "UnPaid" }],
        },
        {
          name: "Friedrich Nietzsche",
          memberId: 20,
          vacations: [
            { startDate: "22.02.2021", endDate: "22.03.2021", type: "UnPaid" },
            { startDate: "25.03.2021", endDate: "28.03.2021", type: "Paid" },
          ],
        },
        {
          name: "Isaac Newton",
          memberId: 19,
          vacations: [
            { startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid" },
            { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
          ],
        },
      ],
    },
    {
      name: "Design Team",
      percentageOfAbsent: [11, 4, 0, 0, 1, 2, 0, 2, 12, 2, 0, 1],
      teamId: 4,
      members: [
        {
          name: "Guccio Gucci",
          memberId: 5,
          vacations: [
            { startDate: "22.02.2021", endDate: "15.03.2021", type: "UnPaid" },
            { startDate: "30.03.2021", endDate: "15.04.2021", type: "Paid" },
          ],
        },
        {
          name: "Gabrielle Bonheur Chanel",
          memberId: 6,
          vacations: [
            { startDate: "30.02.2021", endDate: "12.03.2021", type: "Paid" },
            { startDate: "15.01.2021", endDate: "28.02.2021", type: "UnPaid" },
          ],
        },
      ],
    },
    {
      name: "QA Team",
      percentageOfAbsent: [16, 14, 0, 0, 1, 2, 0, 2, 2, 0, 0, 28],
      teamId: 5,
      members: [
        {
          name: "KEVIN MITNINK",
          memberId: 8,
          vacations: [{ startDate: "20.04.2021", endDate: "12.05.2021", type: "Paid" }],
        },
        {
          name: "ROBERT MORRIS",
          memberId: 11,
          vacations: [
            { startDate: "20.01.2021", endDate: "22.02.2021", type: "UnPaid" },
            { startDate: "20.03.2021", endDate: "22.04.2021", type: "UnPaid" },
          ],
        },
      ],
    },
    {
      name: "Manager Team",
      percentageOfAbsent: [16, 14, 0, 0, 1, 2, 0, 2, 2, 0, 0, 28],
      teamId: 6,
      members: [
        {
          name: "Raymond Kroc",
          memberId: 12,
          vacations: [
            { startDate: "17.02.2021", endDate: "20.03.2021", type: "Paid" },
            { startDate: "30.03.2020", endDate: "12.04.2020", type: "UnPaid" },
          ],
        },
      ],
    },
  ],
}

export default departmentTeams
