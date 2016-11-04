const fetchGameData = () => {
  /**
   * remainingLobbyTime: Time remaining for users to join
   * timeTillRoll: Countdown for Roll
   *
   */
  return [
    {
      id: 1,
      status: 'NOT_STARTED',
      playerCount: 5,
      remainingLobbyTime: 60,
      timeTillRoll: 10
    }
  ]
};

export default fetchGameData;

