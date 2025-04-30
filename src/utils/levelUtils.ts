export const fetchLevelDetails = async () => {
    // Mock data for demonstration
    return [
      {
        currentLevel: 1,
        cost: 100,
        cyclesCompleted: 3,
        totalPartners: 10,
        isActive: true,
        overtakeValue: 2.865,
        partnersStatus: [1, 1, 0], // Example status for partners
        uplineid: 1,
      },
      {
        currentLevel: 2,
        cost: 200,
        cyclesCompleted: 5,
        totalPartners: 15,
        isActive: true,
        overtakeValue: 1.456,
        partnersStatus: [1, 0, 0], // Example status for partners
        uplineid: 1,
      },
      {
        currentLevel: 3,
        cost: 300,
        cyclesCompleted: 2,
        totalPartners: 8,
        isActive: true,
        overtakeValue: 0,
        partnersStatus: [1, 1, 1], // Example status for partners
        uplineid: 1,
      },
    ];
  };