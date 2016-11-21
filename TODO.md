* Allow users to join games
    * Create Game Plays Table
        * Capture userId, betAmount, hash of (userId, betAmount, serverBetSeed)
    * Create Ledger
        * Id
        * User_id
        * source_txn_id - Bitcoin Transaction ID
        * balance_before
        * balance_after
        * balance_type - Allows us to hold multiple user balances (Currencies)
        * Txn Types: Deposit, Withdrawal, Transfer, Bet, Cancel Bet, Winnings, House Cut, Invest
    * Socket.io
        * Create Global Channel for Games
        * Global Chat Channel
        * 
        

## Game Steps
* CREATE_GAME
    * Check User Balance
    * Record Bet
        * This prevents the user from over allocating available funds to many games. 
        * Also prevents games from halting because the user now doesnt have enough balance.
        * PENDING_BET
        
* JOIN_GAME
    * Add 
    * PENDING_BET - User, Amount
    * 
* CANCEL_BET
* GAME_COUNTDOWN
* GAME_FLIPPING
    