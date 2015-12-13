// Alex Mun
// ECE 4984
// Milestone 3
// Description: Full implementation of gameplay.

// Anglemode is set to radians
angleMode = "radians";

// Used to coordinate player/AI turns
var lockout = 0;

// Used to delay the AI's turn
var delayAI = 0;

// Error message for zero cards remaining
var noCardsError = 0;

// Initializes game data for each new game
var newGameInit = 0;

// Player victory condition
var playerWin = 0;

// Player loss condition
var playerLose = 0;

// Holds an array of particle objects
var particles = [];

// Holds an array of background star objects
var menuStars = [];

// The player's deck
var playerDeck = [];

// The opponent's deck
var opponentDeck = [];

// The size of the player's deck
var playerDeckSize = 10;

// The size of the opponent's deck
var opponentDeckSize = 10;

// Number of cards remaining (player)
var playerCardsLeft = playerDeckSize;

// Number of cards remaining (opponent)
var opponentCardsLeft = opponentDeckSize;

// Used to navigate the player's deck
var playerDeckIndex = 0;

// Used to navigate the opponent's deck
var opponentDeckIndex = 0;

// Used to initialize the player's deck
var playerDeckInit = 0;

// The size of the player's grave
var playerGraveSize = 0;

// The size of the opponent's grave
var opponentGraveSize = 0;

// The player's hitpoints
var playerHP = 0;

// The opponent's hitpoints
var opponentHP = 0;

// The hitpoints selected
var hitpoints = 40;

// The player's hand
var playerHand_1 = -1;
var playerHand_2 = -1;
var playerHand_3 = -1;

// The number of cards in the player's hand
var playerHandCount = 0;

// Enable/disable player's draw ability
var playerDrawEnable = 0;

// Displays placement boxes on the field
var showFields_1 = 0;
var showFields_2 = 0;
var showFields_3 = 0;

// Displays target boxes on the field
var showTargets_1 = 0;
var showTargets_2 = 0;
var showTargets_3 = 0;

// Player field variables
var playerField_1 = 0;
var playerField_2 = 0;
var playerField_3 = 0;

// Opponent field variables
var oppField_1 = 0;
var oppField_2 = 0;
var oppField_3 = 0;

// Player field indices
var pf1_index = -1;
var pf2_index = -1;
var pf3_index = -1;

// Opponent field indices
var of1_index = -1;
var of2_index = -1;
var of3_index = -1;

// Player HP variables
var pf1_hp = 0;
var pf2_hp = 0;
var pf3_hp = 0;

// Player attack variables
var pf1_atk = 0;
var pf2_atk = 0;
var pf3_atk = 0;

// Opponent HP variables
var of1_hp = 0;
var of2_hp = 0;
var of3_hp = 0;

// Opponent attack variables
var of1_atk = 0;
var of2_atk = 0;
var of3_atk = 0;

// Combat calculation variables
var sum_1 = 0;
var sum_2 = 0;
var sum_3 = 0;

// Opponent AI variables (placement)
var oppAI_place1 = 0;
var oppAI_place2 = 0;
var oppAI_place3 = 0;

// Opponent AI variables (attacking)
var oppAI_atk1 = 0;
var oppAI_atk2 = 0;
var oppAI_atk3 = 0;

// Attack animation variables (player)
var anim_patk1 = 0;
var anim_patk2 = 0;
var anim_patk3 = 0;
var anim_pstr1 = 0;
var anim_pstr2 = 0;
var anim_pstr3 = 0;

// Attack animation variables (opponent)
var anim_oatk1 = 0;
var anim_oatk2 = 0;
var anim_oatk3 = 0;
var anim_ostr1 = 0;
var anim_ostr2 = 0;
var anim_ostr3 = 0;

// Attack animation phases (player)
var phase1 = 1;
var phase2 = 0;
var phase3 = 0;

// Attack animation phases (opponent)
var opp_phase1 = 1;
var opp_phase2 = 0;
var opp_phase3 = 0;

// Used to delay animations
var delayAnim1 = 0;
var delayAnim2 = 0;
var delayAnim3 = 0;

// Defines the timer object
var timerObj = function(s, e, inc)
{
    // The starting position
    this.x = s;
    
    // Saves the starting position
    this.s = s;
    
    // The ending position
    this.e = e;
    
    // The increment value
    this.inc = inc;
    
    // Control values
    this.start = 0;
    this.end = 0;
};

// Defines the movement properties of the timer object
timerObj.prototype.move = function()
{
    // Begin timer function
    if (this.start === 1)
    {
        this.end = 0;
        if (this.x !== this.e)
        {
            this.x = this.x + this.inc;
        }
        else if (this.x >= this.e)
        {
            this.x = this.s;
            this.start = 0;
            this.end = 1;
        }
    }
};

// Creates a timer object
var lockTimer = new timerObj(0, 100, 2);

// Defines the highlight object
var highlightObj = function(x)
{
    // The x-axis position value
    this.x = x;
    
    // Displays the field placement region when set to 1
    this.show = 0;  
};

// Defines the graphical properties of the highlight object
highlightObj.prototype.draw = function() 
{
    if (this.show === 1)
    {
        // Highlight the player's card
        fill(0, 255, 0, 100);
        rect(this.x, 310, 60, 80);
    }
};

// Create highlight objects
var hl1 = new highlightObj(20);
var hl2 = new highlightObj(100);
var hl3 = new highlightObj(180);
    
// Defines the field placement object
var fieldObj = function(x)
{
    // The x-axis position value
    this.x = x;
    
    // Displays the field placement region when set to 1
    this.show = 0;  
};

// Defines the graphical properties of the field placement object
fieldObj.prototype.draw = function() 
{
    if (this.show === 1)
    {
        // Field placement region
        fill(0, 255, 0, 255);
        rect(this.x, 190, 60, 80);
    }
};

// Create field placement objects
var pf1 = new fieldObj(20);
var pf2 = new fieldObj(100);
var pf3 = new fieldObj(180);

// Defines the target object
var targetObj = function(x)
{
    // The x-axis position value
    this.x = x;
    
    // Displays the target region when set to 1
    this.show = 0;
};

// Defines the graphical properties of the target object
targetObj.prototype.draw = function() 
{
    if (this.show === 1)
    {
        // Highlight the opponent's card
        fill(255, 0, 0, 150);
        rect(this.x, 80, 60, 80);
        
        // Highlight the player's card
        fill(0, 255, 0, 100);
        rect(this.x, 190, 60, 80);
    }
};

// Create target objects for the player
var to1 = new targetObj(20);
var to2 = new targetObj(100);
var to3 = new targetObj(180);

// Defines the hitbox object
var hitboxObj = function(x, p)
{
    // The x-axis position value
    this.x = x;
    
    // Determines the hitbox position
    this.p = p;
    
    // Displays the target region when set to 1
    this.show = 0;
};

// Defines the graphical properties of the hitbox object
hitboxObj.prototype.draw = function() 
{
    if ((this.show === 1) && (this.p === 1))
    {
        // Highlight the opponent's hitbox
        fill(255, 0, 0, 200);
        rect(this.x, 80, 60, 80);
        
        // Draws an arrow
        noStroke();
        fill(255, 255, 255);
        triangle(this.x + 5, 110, this.x + 30, 90, this.x + 55, 110);
        rect(this.x + 20, 100, 20, 50);
        
        // Highlight the player's card
        fill(0, 255, 0, 100);
        rect(this.x, 190, 60, 80);
    }
};

// Create hitbox objects for the opponent
var opp_hb1 = new hitboxObj(20, 1);
var opp_hb2 = new hitboxObj(100, 1);
var opp_hb3 = new hitboxObj(180, 1);

// Defines the explosion object
var explosionObj = function() 
{
    this.position = new PVector(0, 0);
    this.direction = new PVector(0, 0);
    this.size = random(3, 5);
    this.timer = 0;
}; 

// Defines the graphical properties of the explosion object
explosionObj.prototype.draw = function() 
{
    noStroke();
    fill(255, 0, 0, this.timer);
    ellipse(this.position.x, this.position.y, this.size, this.size);
    this.position.x += this.direction.y * cos(this.direction.x);
    this.position.y += this.direction.y * sin(this.direction.x);
    this.position.y += (90/(this.timer + 100));
    this.timer--;
};

// Defines the detonator object
var detonateObj = function()
{
    // Initialize at step 0
    this.step = 0;
    
    // Positional values
    this.position = new PVector(0, 0);
    
    // Directional values
    this.direction = new PVector(0, 0);
    
    // The target values
    this.target = new PVector(0, 0);
    
    // Holds explosion objects
    this.explosions = [];
    
    // Populate explosions array with explosion objects
    for (var i = 0; i < 200; i++) 
    {
        this.explosions.push(new explosionObj());   
    }    
};

// Defines the graphical properties of the detonator object
detonateObj.prototype.draw = function() 
{
    // Initialize at step 2
    this.step = 2;
    
    // Animate all explosion objects in the array
    for (var i = 0; i < this.explosions.length; i++) 
    {
        this.explosions[i].position.set(this.target.x, this.target.y);
        this.explosions[i].direction.set(random(0, 360), random(-1, 1));
        this.explosions[i].timer = 100;
    }    
};

// Defines the card object
var cardObj = function(x, y, r, g, b, atk, hp, blank, index, namegen)
{
    // Position values
    this.x = x;
    this.y = y;
    
    // Color values
    this.r = r;
    this.g = g;
    this.b = b;

    // Gameplay values
    this.atk = atk;
    this.hp = hp;
    this.blank = blank;
    this.index = index;
    
    // Game engine values (0 is false, 1 is true)
    this.drawn = 0;
    this.inHand = 0;
    this.hand_1 = 0;
    this.hand_2 = 0;
    this.hand_3 = 0;
    this.field_1 = 0;
    this.field_2 = 0;
    this.field_3 = 0;
    this.oppHand = 0;
    this.oppField_1 = 0;
    this.oppField_2 = 0;
    this.oppField_3 = 0;
    this.flash = 0;
    this.dead = 0;
    
    // Death animation effects
    this.death_fx = new detonateObj();
    
    // Create a random seed for a name
    this.nameGen = namegen;
};

// Defines the movement properties of the card object
cardObj.prototype.move = function()
{
    // Draws a card when the player's hand is empty
    if (playerHandCount === 0)
    {
        if ((this.drawn === 1) && (this.inHand === 0) && (this.blank === 0))
        {
            if (this.x > 20)
            {
                this.x = this.x - 10;
            }
            else
            {
                this.drawn = 0;
                this.inHand = 1;
                this.hand_1 = 1;
                playerHandCount = 1;
                playerDrawEnable = 0;
                playerHand_1 = playerDeckIndex;
                playerDeckIndex++;
                playerCardsLeft--;
            }
        }
    }
    
    // Draws a card when the player's hand has 1 card
    else if (playerHandCount === 1)
    {
        if ((this.drawn === 1) && (this.inHand === 0) && (this.blank === 0))
        {
            if (this.x > 100)
            {
                this.x = this.x - 10;
            }
            else
            {
                this.drawn = 0;
                this.inHand = 1;
                this.hand_2 = 1;
                playerHandCount = 2;
                playerDrawEnable = 0;
                playerHand_2 = playerDeckIndex;
                playerDeckIndex++;
                playerCardsLeft--;
            }
        }
    }
    
    // Draws a card when the player's hand has 2 cards
    else if (playerHandCount === 2)
    {
        if ((this.drawn === 1) && (this.inHand === 0) && (this.blank === 0))
        {
            if (this.x > 180)
            {
                this.x = this.x - 10;
            }
            else
            {
                this.drawn = 0;
                this.inHand = 1;
                this.hand_3 = 1;
                playerHandCount = 3;
                playerDrawEnable = 0;
                playerHand_3 = playerDeckIndex;
                playerDeckIndex++;
                playerCardsLeft--;
            }
        }
    }
    
    // Draws three cards for the player's hand for each new game
    if (playerDeckInit === 0)
    {
        // Draws the first card
        if (playerHandCount === 0)
        {
            if(playerDeck[playerDeckIndex].x > 20)
            {
                playerDeck[playerDeckIndex].x = playerDeck[playerDeckIndex].x - 4;
            }
            else
            {
                playerDeck[playerDeckIndex].inHand = 1;
                playerDeck[playerDeckIndex].hand_1 = 1;
                playerHand_1 = playerDeckIndex;
                playerHandCount++;
                playerDeckIndex++;
                playerCardsLeft--;
            }
        }
        
        // Draws the second card
        else if (playerHandCount === 1)
        {
            if(playerDeck[playerDeckIndex].x > 100)
            {
                playerDeck[playerDeckIndex].x = playerDeck[playerDeckIndex].x - 4;
            }
            else
            {
                playerDeck[playerDeckIndex].inHand = 1;
                playerDeck[playerDeckIndex].hand_2 = 1;
                playerHand_2 = playerDeckIndex;
                playerHandCount++;
                playerDeckIndex++;
                playerCardsLeft--;
            }
        }
        
        // Draws the third card
        else if (playerHandCount === 2)
        {
            if(playerDeck[playerDeckIndex].x > 180)
            {
                playerDeck[playerDeckIndex].x = playerDeck[playerDeckIndex].x - 4;
            }
            else
            {
                playerDeck[playerDeckIndex].inHand = 1;
                playerDeck[playerDeckIndex].hand_3 = 1;
                playerHand_3 = playerDeckIndex;
                playerHandCount++;
                playerDeckIndex++;
                playerCardsLeft--;
                playerDeckInit = 1;
            }
        }
        else
        {
            // Finish player initialization
            playerDeckInit = 1;
        }
    }
    
    // AI card placement for field position 1
    if ((oppAI_place1 === 1) && (opponentDeck[opponentDeckIndex].blank === 0))
    {
        opponentDeck[opponentDeckIndex].oppHand = 0;
        opponentDeck[opponentDeckIndex].oppField_1 = 1;
        of1_index = opponentDeck[opponentDeckIndex].index;
        of1_hp = opponentDeck[opponentDeckIndex].hp;
        of1_atk = opponentDeck[opponentDeckIndex].atk;
        
        // Delay card placement until death animation has finished
        if (delayAI === 0) 
        {
            if (opponentDeck[opponentDeckIndex].y < 80)
            {
                opponentDeck[opponentDeckIndex].y++;
            }
            else
            {
                opponentDeckIndex++;
                opponentCardsLeft--;
                oppAI_place1 = 0;
            }
        }
    }
    
    // AI card placement for field position 2
    if ((oppAI_place2 === 1) && (opponentDeck[opponentDeckIndex].blank === 0))
    {
        opponentDeck[opponentDeckIndex].oppHand = 0;
        opponentDeck[opponentDeckIndex].oppField_2 = 1;
        of2_index = opponentDeck[opponentDeckIndex].index;
        of2_hp = opponentDeck[opponentDeckIndex].hp;
        of2_atk = opponentDeck[opponentDeckIndex].atk;
    
        // Delay card placement until death animation has finished
        if (delayAI === 0) 
        {
            if (opponentDeck[opponentDeckIndex].x < 100)
            {
                opponentDeck[opponentDeckIndex].x += 10;
            }
            if (opponentDeck[opponentDeckIndex].y < 80)
            {
                opponentDeck[opponentDeckIndex].y++;
            }
            else
            {
                opponentDeckIndex++;
                opponentCardsLeft--;
                oppAI_place2 = 0;
            }
        }
    }
    
    // AI card placement for field position 3
    if ((oppAI_place3 === 1) && (opponentDeck[opponentDeckIndex].blank === 0))
    {
        opponentDeck[opponentDeckIndex].oppHand = 0;
        opponentDeck[opponentDeckIndex].oppField_3 = 1;
        of3_index = opponentDeck[opponentDeckIndex].index;
        of3_hp = opponentDeck[opponentDeckIndex].hp;
        of3_atk = opponentDeck[opponentDeckIndex].atk;
    
        // Delay card placement until death animation has finished
        if (delayAI === 0) 
        {
            if (opponentDeck[opponentDeckIndex].x < 180)
            {
                opponentDeck[opponentDeckIndex].x += 10;
            }
            if (opponentDeck[opponentDeckIndex].y < 80)
            {
                opponentDeck[opponentDeckIndex].y++;
            }
            else
            {
                opponentDeckIndex++;
                opponentCardsLeft--;
                oppAI_place3 = 0;
            }
        }
    }
    
    // AI attack process for field position 1
    if (oppAI_atk1 === 1)
    {
        sum_1 = pf1_hp - of1_atk;
        
        if (sum_1 <= 0)
        {
            playerDeck[pf1_index].dead = 1;
            playerDeck[pf1_index].field_1 = 0;
            playerDeck[pf1_index].hp = sum_1;
            playerGraveSize++;
            playerField_1 = 0;
            sum_1 = 0;
            pf1_hp = 0;
            pf1_atk = 0;
            oppAI_atk1 = 0;
        }
        else
        {
            playerDeck[pf1_index].hp = sum_1;
            pf1_hp = sum_1;
            sum_1 = 0;
            oppAI_atk1 = 0;
        }
    }
    
    // AI attack process for field position 2
    if (oppAI_atk2 === 1)
    {
        sum_2 = pf2_hp - of2_atk;
        
        if (sum_2 <= 0)
        {
            playerDeck[pf2_index].dead = 1;
            playerDeck[pf2_index].field_2 = 0;
            playerDeck[pf2_index].hp = sum_2;
            playerGraveSize++;
            playerField_2 = 0;
            sum_2 = 0;
            pf2_hp = 0;
            pf2_atk = 0;
            oppAI_atk2 = 0;
        }
        else
        {
            playerDeck[pf2_index].hp = sum_2;
            pf2_hp = sum_2;
            sum_2 = 0;
            oppAI_atk2 = 0;
        }
    }
    
    // AI attack process for field position 3
    if (oppAI_atk3 === 1)
    {
        sum_3 = pf3_hp - of3_atk;
        
        if (sum_3 <= 0)
        {
            playerDeck[pf3_index].dead = 1;
            playerDeck[pf3_index].field_3 = 0;
            playerDeck[pf3_index].hp = sum_3;
            playerGraveSize++;
            playerField_3 = 0;
            sum_3 = 0;
            pf3_hp = 0;
            pf3_atk = 0;
            oppAI_atk3 = 0;
        }
        else
        {
            playerDeck[pf3_index].hp = sum_3;
            pf3_hp = sum_3;
            sum_3 = 0;
            oppAI_atk3 = 0;
        }
    }
    
    // 1st field placement from the 1st hand card position
    if ((this.field_1 === 1) && (this.inHand === 1) && (playerField_1 === 0) && (this.hand_1 === 1))
    {
        // Card placement animation
        if ((this.y > 190))
        {
            this.y = this.y - 5;
        }
        else
        {
            if (playerHand_2 !== -1)
            {
                // Move the 2nd hand card to the 1st hand card position
                if (playerDeck[playerHand_2].x > 20)
                {
                    playerDeck[playerHand_2].x = playerDeck[playerHand_2].x - 5;
                }
                else
                {
                    if (playerHand_3 !== -1)
                    {
                        // Move the 3rd hand card to the 2nd hand card position
                        if (playerDeck[playerHand_3].x > 100)
                        {
                            playerDeck[playerHand_3].x = playerDeck[playerHand_3].x - 5;
                        }
                        else
                        {
                            // Removes the 1st hand card from the player's hand
                            this.inHand = 0;
                            this.hand_1 = 0;
                            playerHandCount = 2;
                            
                            // The 2nd hand card becomes the 1st hand card
                            playerDeck[playerHand_2].hand_2 = 0;
                            playerDeck[playerHand_2].hand_1 = 1;
                            playerHand_1 = playerHand_2;
                            
                            // The 3rd hand card becomes the 2nd hand card
                            playerDeck[playerHand_3].hand_3 = 0;
                            playerDeck[playerHand_3].hand_2 = 1;
                            playerHand_2 = playerHand_3;
                            playerHand_3 = -1;
                            playerField_1 = 1;
                            pf1_index = this.index;
                            
                            // Assign card attributes
                            pf1_hp = this.hp;
                            pf1_atk = this.atk;
                        }
                    }
                    else
                    {
                        // Removes the 1st hand card from the player's hand
                        this.inHand = 0;
                        this.hand_1 = 0;
                        playerHandCount = 1;
                        
                        // The 2nd hand card becomes the 1st hand card
                        playerDeck[playerHand_2].hand_2 = 0;
                        playerDeck[playerHand_2].hand_1 = 1;
                        playerHand_1 = playerHand_2;
                        playerHand_2 = -1;
                        playerField_1 = 1;
                        pf1_index = this.index;
                        
                        // Assign card attributes
                        pf1_hp = this.hp;
                        pf1_atk = this.atk;
                    }
                }
            }
            else
            {
                // Removes the 1st hand card from the player's hand
                this.inHand = 0;
                this.hand_1 = 0;
                playerHandCount = 0;
                playerHand_1 = -1;
                playerField_1 = 1;
                pf1_index = this.index;
                
                // Assign card attributes
                pf1_hp = this.hp;
                pf1_atk = this.atk;
            }
        }
    }
    
    // 2nd field placement from the 1st hand card position
    if ((this.field_2 === 1) && (this.inHand === 1) && (playerField_2 === 0) && (this.hand_1 === 1))
    {
        // Card placement animation
        if (this.y !== 190)
        {
            this.y = this.y - 5;
            
            if (this.x !== 100)
            {
                this.x = this.x + 5;
            }
        }
        else
        {
            if (playerHand_2 !== -1)
            {
                // Move the 2nd hand card to the 1st hand card position
                if (playerDeck[playerHand_2].x > 20)
                {
                    playerDeck[playerHand_2].x = playerDeck[playerHand_2].x - 5;
                }
                else
                {
                    if (playerHand_3 !== -1)
                    {
                        // Move the 3rd hand card to the 2nd hand card position
                        if (playerDeck[playerHand_3].x > 100)
                        {
                            playerDeck[playerHand_3].x = playerDeck[playerHand_3].x - 5;
                        }
                        else
                        {
                            // Removes the 1st hand card from the player's hand
                            this.inHand = 0;
                            this.hand_1 = 0;
                            playerHandCount = 2;
                            
                            // The 2nd hand card becomes the 1st hand card
                            playerDeck[playerHand_2].hand_2 = 0;
                            playerDeck[playerHand_2].hand_1 = 1;
                            playerHand_1 = playerHand_2;
                            
                            // The 3rd hand card becomes the 2nd hand card
                            playerDeck[playerHand_3].hand_3 = 0;
                            playerDeck[playerHand_3].hand_2 = 1;
                            playerHand_2 = playerHand_3;
                            playerHand_3 = -1;
                            playerField_2 = 1;
                            pf2_index = this.index;
                            
                            // Assign card attributes
                            pf2_hp = this.hp;
                            pf2_atk = this.atk;
                        }
                    }
                    else
                    {
                        // Removes the 1st hand card from the player's hand
                        this.inHand = 0;
                        this.hand_1 = 0;
                        playerHandCount = 1;
                        
                        // The 2nd hand card becomes the 1st hand card
                        playerDeck[playerHand_2].hand_2 = 0;
                        playerDeck[playerHand_2].hand_1 = 1;
                        playerHand_1 = playerHand_2;
                        playerHand_2 = -1;
                        playerField_2 = 1;
                        pf2_index = this.index;
                        
                        // Assign card attributes
                        pf2_hp = this.hp;
                        pf2_atk = this.atk;
                    }
                }
            }
            else
            {
                // Removes the 1st hand card from the player's hand
                this.inHand = 0;
                this.hand_1 = 0;
                playerHandCount = 0;
                playerHand_1 = -1;
                playerField_2 = 1;
                pf2_index = this.index;
                
                // Assign card attributes
                pf2_hp = this.hp;
                pf2_atk = this.atk;
            }
        }
    }
    
    // 3rd field placement from the 1st hand card position
    if ((this.field_3 === 1) && (this.inHand === 1) && (playerField_3 === 0) && (this.hand_1 === 1))
    {
        // Card placement animation
        if (this.x !== 180)
        {
            this.x = this.x + 5;
            
            if (this.y !== 190)
            {
                this.y = this.y - 5;
            }
        }
        else
        {
            if (playerHand_2 !== -1)
            {
                // Move the 2nd hand card to the 1st hand card position
                if (playerDeck[playerHand_2].x > 20)
                {
                    playerDeck[playerHand_2].x = playerDeck[playerHand_2].x - 5;
                }
                else
                {
                    if (playerHand_3 !== -1)
                    {
                        // Move the 3rd hand card to the 2nd hand card position
                        if (playerDeck[playerHand_3].x > 100)
                        {
                            playerDeck[playerHand_3].x = playerDeck[playerHand_3].x - 5;
                        }
                        else
                        {
                            // Removes the 1st hand card from the player's hand
                            this.inHand = 0;
                            this.hand_1 = 0;
                            playerHandCount = 2;
                            
                            // The 2nd hand card becomes the 1st hand card
                            playerDeck[playerHand_2].hand_2 = 0;
                            playerDeck[playerHand_2].hand_1 = 1;
                            playerHand_1 = playerHand_2;
                            
                            // The 3rd hand card becomes the 2nd hand card
                            playerDeck[playerHand_3].hand_3 = 0;
                            playerDeck[playerHand_3].hand_2 = 1;
                            playerHand_2 = playerHand_3;
                            playerHand_3 = -1;
                            playerField_3 = 1;
                            pf3_index = this.index;
                            
                            // Assign card attributes
                            pf3_hp = this.hp;
                            pf3_atk = this.atk;
                        }
                    }
                    else
                    {
                        // Removes the 1st hand card from the player's hand
                        this.inHand = 0;
                        this.hand_1 = 0;
                        playerHandCount = 1;
                        
                        // The 2nd hand card becomes the 1st hand card
                        playerDeck[playerHand_2].hand_2 = 0;
                        playerDeck[playerHand_2].hand_1 = 1;
                        playerHand_1 = playerHand_2;
                        playerHand_2 = -1;
                        playerField_3 = 1;
                        pf3_index = this.index;
                        
                        // Assign card attributes
                        pf3_hp = this.hp;
                        pf3_atk = this.atk;
                    }
                }
            }
            else
            {
                // Removes the 1st hand card from the player's hand
                this.inHand = 0;
                this.hand_1 = 0;
                playerHandCount = 0;
                playerHand_1 = -1;
                playerField_3 = 1;
                pf3_index = this.index;
                
                // Assign card attributes
                pf3_hp = this.hp;
                pf3_atk = this.atk;
            }
        }
    }
    
    // 1st field placement from the 2nd hand card position
    if ((this.field_1 === 1) && (this.inHand === 1) && (playerField_1 === 0) && (this.hand_2 === 1))
    {
        // Card placement animation
        if (this.y !== 190)
        {
            this.y = this.y - 5;
            
            if (this.x !== 20)
            {
                this.x = this.x - 5;
            }
        }
        
        else
        {
            if (playerHand_3 !== -1)
            {
                // Move the 3rd hand card to the 2nd hand card position
                if (playerDeck[playerHand_3].x > 100)
                {
                    playerDeck[playerHand_3].x = playerDeck[playerHand_3].x - 5;
                }
                else
                {
                    // Removes the 2nd hand card from the player's hand
                    this.inHand = 0;
                    this.hand_2 = 0;
                    playerHandCount = 2;
                    
                    // The 3rd hand card becomes the 2nd hand card
                    playerDeck[playerHand_3].hand_3 = 0;
                    playerDeck[playerHand_3].hand_2 = 1;
                    playerHand_2 = playerHand_3;
                    playerHand_3 = -1;
                    playerField_1 = 1;
                    pf1_index = this.index;
                    
                    // Assign card attributes
                    pf1_hp = this.hp;
                    pf1_atk = this.atk;
                }
            }
            else
            {
                // Removes the 2nd hand card from the player's hand
                this.inHand = 0;
                this.hand_2 = 0;
                playerHandCount = 1;
                playerHand_2 = -1;
                playerField_1 = 1;
                pf1_index = this.index;
                
                // Assign card attributes
                pf1_hp = this.hp;
                pf1_atk = this.atk;
            }
        }
    }
    
    // 2nd field placement from the 2nd hand card position
    if ((this.field_2 === 1) && (this.inHand === 1) && (playerField_2 === 0) && (this.hand_2 === 1))
    {
        // Card placement animation
        if (this.y !== 190)
        {
            this.y = this.y - 5;
        }
        
        else
        {
            if (playerHand_3 !== -1)
            {
                // Move the 3rd hand card to the 2nd hand card position
                if (playerDeck[playerHand_3].x > 100)
                {
                    playerDeck[playerHand_3].x = playerDeck[playerHand_3].x - 5;
                }
                else
                {
                    // Removes the 2nd hand card from the player's hand
                    this.inHand = 0;
                    this.hand_2 = 0;
                    playerHandCount = 2;
                    
                    // The 3rd hand card becomes the 2nd hand card
                    playerDeck[playerHand_3].hand_3 = 0;
                    playerDeck[playerHand_3].hand_2 = 1;
                    playerHand_2 = playerHand_3;
                    playerHand_3 = -1;
                    playerField_2 = 1;
                    pf2_index = this.index;
                    
                    // Assign card attributes
                    pf2_hp = this.hp;
                    pf2_atk = this.atk;
                }
            }
            else
            {
                // Removes the 2nd hand card from the player's hand
                this.inHand = 0;
                this.hand_2 = 0;
                playerHandCount = 1;
                playerHand_2 = -1;
                playerField_2 = 1;
                pf2_index = this.index;
                
                // Assign card attributes
                pf2_hp = this.hp;
                pf2_atk = this.atk;
            }
        }
    }
    
    // 3rd field placement from the 2nd hand card position
    if ((this.field_3 === 1) && (this.inHand === 1) && (playerField_3 === 0) && (this.hand_2 === 1))
    {
        // Card placement animation
        if ((this.y !== 190))
        {
            this.y = this.y - 5;
            
            if (this.x !== 180)
            {
                this.x = this.x + 5;
            }
        }
        
        else
        {
            if (playerHand_3 !== -1)
            {
                // Move the 3rd hand card to the 2nd hand card position
                if (playerDeck[playerHand_3].x > 100)
                {
                    playerDeck[playerHand_3].x = playerDeck[playerHand_3].x - 5;
                }
                else
                {
                    // Removes the 2nd hand card from the player's hand
                    this.inHand = 0;
                    this.hand_2 = 0;
                    playerHandCount = 2;
                    
                    // The 3rd hand card becomes the 2nd hand card
                    playerDeck[playerHand_3].hand_3 = 0;
                    playerDeck[playerHand_3].hand_2 = 1;
                    playerHand_2 = playerHand_3;
                    playerHand_3 = -1;
                    playerField_3 = 1;
                    pf3_index = this.index;
                    
                    // Assign card attributes
                    pf3_hp = this.hp;
                    pf3_atk = this.atk;
                }
            }
            else
            {
                // Removes the 2nd hand card from the player's hand
                this.inHand = 0;
                this.hand_2 = 0;
                playerHandCount = 1;
                playerHand_2 = -1;
                playerField_3 = 1;
                pf3_index = this.index;
                
                // Assign card attributes
                pf3_hp = this.hp;
                pf3_atk = this.atk;
            }
        }
    }
    
    // 1st field placement from the 3rd hand card position
    if ((this.field_1 === 1) && (this.inHand === 1) && (playerField_1 === 0) && (this.hand_3 === 1))
    {
        // Card placement animation
        if (this.x !== 20)
        {
            this.x = this.x - 5;
            
            if (this.y !== 190)
            {
                this.y = this.y - 5;
            }
        }
        
        else
        {
            // Removes the 3rd hand card from the player's hand
            this.inHand = 0;
            this.hand_3 = 0;
            playerHandCount = 2;
            playerHand_3 = -1;
            playerField_1 = 1;
            pf1_index = this.index;
            
            // Assign card attributes
            pf1_hp = this.hp;
            pf1_atk = this.atk;
        }
    }
    
    // 2nd field placement from the 3rd hand card position
    if ((this.field_2 === 1) && (this.inHand === 1) && (playerField_2 === 0) && (this.hand_3 === 1))
    {
        // Card placement animation
        if (this.y !== 190)
        {
            this.y = this.y - 5;
            
            if (this.x !== 100)
            {
                this.x = this.x - 5;
            }
        }
        
        else
        {
            // Removes the 3rd hand card from the player's hand
            this.inHand = 0;
            this.hand_3 = 0;
            playerHandCount = 2;
            playerHand_3 = -1;
            playerField_2 = 1;
            pf2_index = this.index;
            
            // Assign card attributes
            pf2_hp = this.hp;
            pf2_atk = this.atk;
        }
    }
    
    // 3rd field placement from the 3rd hand card position
    if ((this.field_3 === 1) && (this.inHand === 1) && (playerField_3 === 0) && (this.hand_3 === 1))
    {
        // Card placement animation
        if (this.y !== 190)
        {
            this.y = this.y - 5;
        }
        
        else
        {
            // Removes the 3rd hand card from the player's hand
            this.inHand = 0;
            this.hand_3 = 0;
            playerHandCount = 2;
            playerHand_3 = -1;
            playerField_3 = 1;
            pf3_index = this.index;
            
            // Assign card attributes
            pf3_hp = this.hp;
            pf3_atk = this.atk;
        }
    }
    
    // Attack animation for player field position 1
    if ((anim_patk1 === 1) && (this.field_1 === 1))
    {
        // Phase 1 animation
        if ((this.y < 220) && (phase1 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 220) && (phase1 === 1))
        {
            phase1 = 0;
            phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y > 160) && (phase2 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 160) && (phase2 === 1))
        {
            phase2 = 0;
            phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y < 190) && (phase3 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 190) && (phase3 === 1))
        {
            delayAnim1 = 0;
            anim_patk1 = 0;
            phase1 = 1;
            phase2 = 0;
            phase3 = 0;
        }
    }
    
    // Attack animation for player field position 2
    if ((anim_patk2 === 1) && (this.field_2 === 1))
    {
        // Phase 1 animation
        if ((this.y < 220) && (phase1 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 220) && (phase1 === 1))
        {
            phase1 = 0;
            phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y > 160) && (phase2 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 160) && (phase2 === 1))
        {
            phase2 = 0;
            phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y < 190) && (phase3 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 190) && (phase3 === 1))
        {
            delayAnim2 = 0;
            anim_patk2 = 0;
            phase1 = 1;
            phase2 = 0;
            phase3 = 0;
        }
    }
    
    // Attack animation for player field position 3
    if ((anim_patk3 === 1) && (this.field_3 === 1))
    {
        // Phase 1 animation
        if ((this.y < 220) && (phase1 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 220) && (phase1 === 1))
        {
            phase1 = 0;
            phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y > 160) && (phase2 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 160) && (phase2 === 1))
        {
            phase2 = 0;
            phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y < 190) && (phase3 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 190) && (phase3 === 1))
        {
            delayAnim3 = 0;
            anim_patk3 = 0;
            phase1 = 1;
            phase2 = 0;
            phase3 = 0;
        }
    }
    
    // Attack animation for opponent field position 1
    if ((anim_oatk1 === 1) && (this.oppField_1 === 1))
    {
        // Phase 1 animation
        if ((this.y > 50) && (opp_phase1 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 50) && (opp_phase1 === 1))
        {
            opp_phase1 = 0;
            opp_phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y < 110) && (opp_phase2 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 110) && (opp_phase2 === 1))
        {
            opp_phase2 = 0;
            opp_phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y > 80) && (opp_phase3 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 80) && (opp_phase3 === 1))
        {
            anim_oatk1 = 0;
            opp_phase1 = 1;
            opp_phase2 = 0;
            opp_phase3 = 0;
        }
    }
    
    // Attack animation for opponent field position 2
    if ((anim_oatk2 === 1) && (this.oppField_2 === 1))
    {
        // Phase 1 animation
        if ((this.y > 50) && (opp_phase1 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 50) && (opp_phase1 === 1))
        {
            opp_phase1 = 0;
            opp_phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y < 110) && (opp_phase2 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 110) && (opp_phase2 === 1))
        {
            opp_phase2 = 0;
            opp_phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y > 80) && (opp_phase3 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 80) && (opp_phase3 === 1))
        {
            anim_oatk2 = 0;
            opp_phase1 = 1;
            opp_phase2 = 0;
            opp_phase3 = 0;
        }
    }
    
    // Attack animation for opponent field position 3
    if ((anim_oatk3 === 1) && (this.oppField_3 === 1))
    {
        // Phase 1 animation
        if ((this.y > 50) && (opp_phase1 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 50) && (opp_phase1 === 1))
        {
            opp_phase1 = 0;
            opp_phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y < 110) && (opp_phase2 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 110) && (opp_phase2 === 1))
        {
            opp_phase2 = 0;
            opp_phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y > 80) && (opp_phase3 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 80) && (opp_phase3 === 1))
        {
            anim_oatk3 = 0;
            opp_phase1 = 1;
            opp_phase2 = 0;
            opp_phase3 = 0;
        }
    }
    
    // Direct attack animation for player field position 1
    if ((anim_pstr1 === 1) && (this.field_1 === 1))
    {
        // Phase 1 animation
        if ((this.y < 220) && (phase1 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 220) && (phase1 === 1))
        {
            phase1 = 0;
            phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y > 80) && (phase2 === 1))
        {
            this.y = this.y - 20;
        }
        else if ((this.y <= 80) && (phase2 === 1))
        {
            phase2 = 0;
            phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y < 190) && (phase3 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 190) && (phase3 === 1))
        {
            delayAnim1 = 0;
            anim_pstr1 = 0;
            phase1 = 1;
            phase2 = 0;
            phase3 = 0;
        }
    }
    
    // Direct attack animation for player field position 2
    if ((anim_pstr2 === 1) && (this.field_2 === 1))
    {
        // Phase 1 animation
        if ((this.y < 220) && (phase1 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 220) && (phase1 === 1))
        {
            phase1 = 0;
            phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y > 80) && (phase2 === 1))
        {
            this.y = this.y - 20;
        }
        else if ((this.y <= 80) && (phase2 === 1))
        {
            phase2 = 0;
            phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y < 190) && (phase3 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 190) && (phase3 === 1))
        {
            delayAnim1 = 0;
            anim_pstr2 = 0;
            phase1 = 1;
            phase2 = 0;
            phase3 = 0;
        }
    }
    
    // Direct attack animation for player field position 3
    if ((anim_pstr3 === 1) && (this.field_3 === 1))
    {
        // Phase 1 animation
        if ((this.y < 220) && (phase1 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 220) && (phase1 === 1))
        {
            phase1 = 0;
            phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y > 80) && (phase2 === 1))
        {
            this.y = this.y - 20;
        }
        else if ((this.y <= 80) && (phase2 === 1))
        {
            phase2 = 0;
            phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y < 190) && (phase3 === 1))
        {
            this.y = this.y + 10;
        }
        else if ((this.y >= 190) && (phase3 === 1))
        {
            delayAnim1 = 0;
            anim_pstr3 = 0;
            phase1 = 1;
            phase2 = 0;
            phase3 = 0;
        }
    }
    
    // Direct attack animation for opponent field position 1
    if ((anim_ostr1 === 1) && (this.oppField_1 === 1))
    {
        // Phase 1 animation
        if ((this.y > 50) && (opp_phase1 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 50) && (opp_phase1 === 1))
        {
            opp_phase1 = 0;
            opp_phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y < 180) && (opp_phase2 === 1))
        {
            this.y = this.y + 20;
        }
        else if ((this.y >= 180) && (opp_phase2 === 1))
        {
            opp_phase2 = 0;
            opp_phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y > 80) && (opp_phase3 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 80) && (opp_phase3 === 1))
        {
            anim_ostr1 = 0;
            opp_phase1 = 1;
            opp_phase2 = 0;
            opp_phase3 = 0;
        }
    }
    
    // Direct attack animation for opponent field position 2
    if ((anim_ostr2 === 1) && (this.oppField_2 === 1))
    {
        // Phase 1 animation
        if ((this.y > 50) && (opp_phase1 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 50) && (opp_phase1 === 1))
        {
            opp_phase1 = 0;
            opp_phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y < 180) && (opp_phase2 === 1))
        {
            this.y = this.y + 20;
        }
        else if ((this.y >= 180) && (opp_phase2 === 1))
        {
            opp_phase2 = 0;
            opp_phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y > 80) && (opp_phase3 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 80) && (opp_phase3 === 1))
        {
            anim_ostr2 = 0;
            opp_phase1 = 1;
            opp_phase2 = 0;
            opp_phase3 = 0;
        }
    }
    
    // Direct attack animation for opponent field position 3
    if ((anim_ostr3 === 1) && (this.oppField_3 === 1))
    {
        // Phase 1 animation
        if ((this.y > 50) && (opp_phase1 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 50) && (opp_phase1 === 1))
        {
            opp_phase1 = 0;
            opp_phase2 = 1;
        }
        
        // Phase 2 animation
        if ((this.y < 180) && (opp_phase2 === 1))
        {
            this.y = this.y + 20;
        }
        else if ((this.y >= 180) && (opp_phase2 === 1))
        {
            opp_phase2 = 0;
            opp_phase3 = 1;
        }
        
        // Phase 3 animation
        if ((this.y > 80) && (opp_phase3 === 1))
        {
            this.y = this.y - 10;
        }
        else if ((this.y <= 80) && (opp_phase3 === 1))
        {
            anim_ostr3 = 0;
            opp_phase1 = 1;
            opp_phase2 = 0;
            opp_phase3 = 0;
        }
    }
};

// Defines the graphical properties of the card object
cardObj.prototype.draw = function()
{
    // Death animation
    if (this.dead === 1)
    {
        // Controls the rate at which the card flashes
        var flash = random(0, 1000);
        if (this.flash === 0)
        {
            if (flash > 300)
            {
                fill(255, 0, 0, 155);
            }
            else
            {
                fill(255, 255, 255, 200);
            }
        }
        rect(this.x, this.y, 60, 80);
        
        // Death animation effects
        this.death_fx.position.set(this.x + 25, this.y + 20);
        this.death_fx.target.set(this.x + 25, this.y + 20);

        // Draw death animation effects
        if (this.death_fx.step === 0) 
        {
            this.death_fx.draw();
        } 

        // Animate particles
        else if (this.death_fx.step === 2) 
        {
            for (var i = 0; i < this.death_fx.explosions.length; i++) 
            {
                this.death_fx.explosions[i].draw();   
            } 
        }
        
        // Animate card
        if ((this.x < 315) && (this.death_fx.explosions[0].timer <= 60))
        {
            this.x = this.x + 20;
        }
        
        // Resume AI
        if ((this.x >= 300) && (this.x < 315))
        {
            delayAI = 0;
        }
        
        // Disable card flashing
        if (this.x >= 315)
        {
            this.flash = 1;
        }
    }
    
    // Flash when attacked (opponent position 1)
    else if ((anim_patk1 === 1) && (this.oppField_1 === 1))
    {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, 60, 80);
    }
    
    // Flash when attacked (opponent position 2)
    else if ((anim_patk2 === 1) && (this.oppField_2 === 1))
    {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, 60, 80);
    }
    
    // Flash when attacked (opponent position 3)
    else if ((anim_patk3 === 1) && (this.oppField_3 === 1))
    {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, 60, 80);
    }
    
    // Flash when attacked (player position 1)
    else if ((anim_oatk1 === 1) && (this.field_1 === 1))
    {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, 60, 80);
    }
    
    // Flash when attacked (player position 2)
    else if ((anim_oatk2 === 1) && (this.field_2 === 1))
    {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, 60, 80);
    }
    
    // Flash when attacked (player position 3)
    else if ((anim_oatk3 === 1) && (this.field_3 === 1))
    {
        fill(255, 0, 0, 100);
        rect(this.x, this.y, 60, 80);
    }
    
    // Blank cards will only contain graphical art
    else if (this.blank === 1)
    {
        fill(212, 181, 55);
        rect(this.x, this.y, 60, 80);
        fill(255, 255, 255);
        rect(this.x + 2, this.y + 2, 56, 76);
        fill(212, 181, 55);
        rect(this.x + 4, this.y + 4, 52, 72);
        fill(255, 255, 255);
    }
    
    // Non-blank cards will be used for gameplay
    else
    {
        fill(212, 181, 55);
        rect(this.x, this.y, 60, 80);
        fill(255, 255, 255);
        rect(this.x + 2, this.y + 2, 56, 76);
        fill(230, 200, 55);
        rect(this.x + 4, this.y + 4, 52, 72);
        fill(45, 45, 45);
        textSize(12);
        text("ATK: "+this.atk, this.x + 6, this.y + 65);
        text("HP: "+this.hp, this.x + 6, this.y + 45);
        
        // Assign a random name to the card
        if (this.nameGen === 0)
        {
            text("Thief", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 1)
        {
            text("Pikeman", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 2)
        {
            text("Archer", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 3)
        {
            text("Griffin", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 4)
        {
            text("Knight", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 5)
        {
            text("Zealot", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 6)
        {
            text("Cavalier", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 7)
        {
            text("Angel", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 8)
        {
            text("Imp", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 9)
        {
            text("Hellion", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 10)
        {
            text("Cerebus", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 11)
        {
            text("Demon", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 12)
        {
            text("Fiend", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 13)
        {
            text("Ifrit", this.x + 6, this.y + 25);
        }
        else if (this.nameGen === 14)
        {
            text("Devil", this.x + 6, this.y + 25);
        }
        else
        {
            text("Dragon", this.x + 6, this.y + 25);
        }
    }
};

// Defines the particle object
var particleObj = function(x, y) 
{
    this.position = new PVector(x, y);
    this.velocity = new PVector(random(-0.05, 0.05), random(0.5, 2));
    this.size = random(1, 2);
    this.position.y -= (18 - this.size);
    this.c1 = 255;
    this.timeLeft = 255;
};

// Defines the movement properties of the particle object
particleObj.prototype.move = function() 
{
    this.position.add(this.velocity);
    this.timeLeft--;
};

// Defines the graphical properties of the particle object
particleObj.prototype.draw = function() 
{
    noStroke();
    fill(this.c1, this.c1, this.c1, this.timeLeft);
    ellipse(this.position.x, this.position.y, this.size, this.size*2);
};

// Draws mountains using the Perlin Noise algorithm
var drawRange = function(c1) 
{
    var incAmount = 0.01;
    for (var t = 0; t < incAmount * width; t += 0.01) 
    {
        stroke(c1 - 20, c1 - 20, c1 - 20);
        var n = noise(t + c1 * 20);
        var y = map(n, 0, 1, 0, height/2);
        rect(t * 100, height - y, 1, y);
    }
};

// Runs the waterfall animation during the opening screen
var animateWaterFall = function()
{
    if (particles.length < 300) 
    {
        particles.push(new particleObj(random(190, 200), 335));
        particles.push(new particleObj(random(190, 200), 335));
    }
        
    for (var i=0; i<particles.length; i++) 
    {
        if ((particles[i].timeLeft > 0) && (particles[i].position.y < 400)) 
        {
            particles[i].draw();
            particles[i].move();
        }
        else 
        {
            particles.splice(i, 1);
        }
    }
};

// Controls the height of the sun in the opening screen
var apogee = 400;

// The transition time from the opening screen to the main menu
var menuDelay = 100;

// Set to 1 when the player exits the opening screen
var start = 0;

// Set to 1 when the player clicks on the "New Game" menu item
var newGame = 0;

// Set to 1 when the player clicks on the "Instructions" menu item
var instructions = 0;

// Set to 1 when the player clicks on the "Options" menu item
var options = 0;

// Defines the menu object
var menuObj = function(x, y, w, h, t)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.t = t;
};

// Defines the graphical properties of the menu object
menuObj.prototype.draw = function() 
{
    noStroke();
    fill(0, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    fill(255, 255, 255);
    textSize(35);
    text(this.t, this.x + 15, this.y + 40);
};

// Defines the menu arrow object
var menuArrowObj = function()
{
    this.x = 0;
    this.y = 0;
};

// Defines the graphical properties of the menu arrow object
menuArrowObj.prototype.draw = function() 
{
    // Adjust cursor value to mouseY's position
    var cursorY = mouseY - 5;
    
    // Constrain cursor values
    if (mouseY < 100)
    {
        cursorY = 100;
    }
    if (mouseY > 250)
    {
        cursorY = 250;
    }
    
    // Draws the menu arrow
    noStroke();
    fill(255, 255, 255);
    rect(40, cursorY + 5, 30, 10);
    triangle(70, cursorY, 70, cursorY + 20, 90, cursorY + 10);
};

// Defines the menu star object
var menuStarObj = function()
{
    this.x = random(0, 400);
    this.y = random(0, 400);
    this.size = random(1, 2);
};

// Defines the graphical properties of the menu star object
menuStarObj.prototype.draw = function() 
{
    // Redraw the menu star object after reaching the screen bottom
    if (this.y > 400)
    {
        this.x = random(0, 400);
        this.y = 0;
    }
    
    // Controls the descent speed of the menu star object
    var descent = this.y += 0.5;
    
    // Controls the range for the twinkle value
    var twinkle = random(0, 1000);
    
    // Animate twinkling
    if (twinkle > 100)
    {
        stroke(255, 255, 255);
        fill(255, 255, 255);
    }
    else
    {
        stroke(100, 100, 100);
        fill(100, 100, 100);
    }
    
    // Draws the menu star object
    ellipse(this.x, descent, this.size, this.size);
};

// Creates menu items
var menu_top = new menuObj(90, 90, 200, 50, "New Game");
var menu_mid = new menuObj(90, 160, 200, 50, "Instructions");
var menu_bot = new menuObj(90, 230, 200, 50, "Options");
var return_mid = new menuObj(90, 300, 200, 50, "    Return");
var return_bot = new menuObj(90, 300, 200, 50, "    Return");

// Creates a menu arrow object
var menu_arrow = new menuArrowObj();

// Creates menu star objects for the menu background
for (var i = 0; i < 150; i++) 
{
    menuStars.push(new menuStarObj());
}

// Initializes a new game
var createNewGame = function()
{
    // Reset all game data
    playerWin = 0;
    playerLose = 0;
    playerHP = hitpoints;
    opponentHP = hitpoints;
    playerCardsLeft = playerDeckSize;
    opponentCardsLeft = opponentDeckSize;
    playerDeckInit = 0;
    playerDeckIndex = 0;
    opponentDeckIndex = 0;
    playerGraveSize = 0;
    opponentGraveSize = 0;
    playerHand_1 = -1;
    playerHand_2 = -1;
    playerHand_3 = -1;
    playerHandCount = 0;
    playerDrawEnable = 0;
    playerField_1 = 0;
    playerField_2 = 0;
    playerField_3 = 0;
    oppField_1 = 0;
    oppField_2 = 0;
    oppField_3 = 0;
    pf1_index = -1;
    pf2_index = -1;
    pf3_index = -1;
    of1_index = -1;
    of2_index = -1;
    of3_index = -1;
    pf1_hp = 0;
    pf2_hp = 0;
    pf3_hp = 0;
    pf1_atk = 0;
    pf2_atk = 0;
    pf3_atk = 0;
    of1_hp = 0;
    of2_hp = 0;
    of3_hp = 0;
    of1_atk = 0;
    of2_atk = 0;
    of3_atk = 0;
    sum_1 = 0;
    sum_2 = 0;
    sum_3 = 0;
    noCardsError = 0;
    lockout = 0;
    
    // Clear all decks
    playerDeck = [];
    opponentDeck = [];
    
    // Populates the player's deck with card objects
    for (var i = 0; i < playerDeckSize; i++) 
    {
        playerDeck.push(new cardObj(320, 310, 255, 255, 255, round(random(1, 10)), round(random(1, 10)), 0, i, round(random(0, 15))));
    }
    
    // Inserts a blank card to hide the contents of the player's deck
    playerDeck.push(new cardObj(320, 310, 255, 75, 75, 0, 0, 1, -1));
    
    // Populates the opponents's deck with card objects
    for (var i = 0; i < opponentDeckSize; i++) 
    {
        opponentDeck.push(new cardObj(20, -80, 255, 255, 255, round(random(1, 10)), round(random(1, 10)), 0, i, round(random(0, 15))));
    }
    
    // Inserts a blank card to hide the contents of the opponent's deck
    opponentDeck.push(new cardObj(320, 310, 255, 75, 75, 0, 0, 1, -1));
    
    // Initializes the opponent's deck for AI control
    for (var i = 0; i < opponentDeckSize; i++) 
    {
        opponentDeck[i].oppHand = 1;
    }
    
    // Finish game initialization
    newGameInit = 1;
};

// Handles mouse inputs from the user
var mouseClicked = function()
{
    // Exits the opening screen on initial mouse click
    if (start === 0)
    {
        start = 1;
    }
    else
    {
        // Main menu item selection
        if ((mouseX >= 90) && (mouseX <= 300) && (newGame === 0))
        {
            if ((mouseY >= menu_top.y) && (mouseY <= menu_top.y + menu_top.h) && (instructions === 0) && (options === 0))
            {
                newGame = 1;
            }
            
            if ((mouseY >= menu_mid.y) && (mouseY <= menu_mid.y + menu_mid.h) && (instructions === 0) && (options === 0))
            {
                instructions = 1;
            }
            
            if ((mouseY >= menu_bot.y) && (mouseY <= menu_bot.y + menu_bot.h) && (instructions === 0) && (options === 0))
            {
                options = 1;
            }
            
            if ((mouseY >= return_mid.y) && (mouseY <= return_mid.y + return_mid.h))
            {
                instructions = 0;
            }
            
            if ((mouseY >= return_bot.y) && (mouseY <= return_bot.y + return_bot.h))
            {
                options = 0;
            }
        }
        
        // Mouse input handling within the options menu
        if (options === 1)
        {
            if ((mouseX >= 150) && (mouseX <= 210) && (mouseY >= 170) && (mouseY <= 190))
            {
                hitpoints = 40;
                options = 0;
            }
            else if ((mouseX >= 150) && (mouseX <= 210) && (mouseY >= 220) && (mouseY <= 240))
            {
                hitpoints = 30;
                options = 0;
            }
            else if ((mouseX >= 150) && (mouseX <= 210) && (mouseY >= 260) && (mouseY <= 280))
            {
                hitpoints = 20;
                options = 0;
            }
        }
        
        // Mouse input handling within a new game
        if ((newGame === 1) && (lockTimer.start === 0))
        {
            // New game conditions
            if ((playerWin === 1) || (playerLose === 1))
            {
                newGame = 0;
                playerWin = 0;
                playerLose = 0;
            }
            
            // Initialize game data
            if (newGameInit === 0)
            {
                createNewGame();
            }
            
            // Drawing a card from the deck
            if ((mouseX >= 320) && (mouseX <= 380) && (mouseY >= 310) && (mouseY <= 390) && (lockout === 0))
            {
                showTargets_1 = 0;
                showTargets_2 = 0;
                showTargets_3 = 0;
                opp_hb1.show = 0;
                opp_hb2.show = 0;
                opp_hb3.show = 0;
                to1.show = 0;
                to2.show = 0;
                to3.show = 0;
                pf1.show = 0;
                pf2.show = 0;
                pf3.show = 0;
                hl1.show = 0;
                hl2.show = 0;
                hl3.show = 0;
                
                if (playerCardsLeft > 0)
                {
                    // Draw card and play animation
                    if (playerDrawEnable === 0)
                    {
                        playerDrawEnable = 1;
                        playerDeck[playerDeckIndex].drawn = 1;
                        lockout = 1;
                    }
                }
                else
                {
                    // Display error message
                    noCardsError = 1;
                }
            }
            
            // Player interaction with the 1st hand card
            if ((mouseX >= 20) && (mouseX <= 80) && (mouseY >= 310) && (mouseY <= 390))
            {
                showTargets_1 = 0;
                showTargets_2 = 0;
                showTargets_3 = 0;
                opp_hb1.show = 0;
                opp_hb2.show = 0;
                opp_hb3.show = 0;
                to1.show = 0;
                to2.show = 0;
                to3.show = 0;
                
                if (playerHand_1 !== -1)
                {
                    showFields_1 = 1;
                    showFields_2 = 0;
                    showFields_3 = 0;
                    
                    hl1.show = 1;
                    hl2.show = 0;
                    hl3.show = 0;
                    
                    if (playerField_1 === 0)
                    {
                        pf1.show = 1;
                    }
                    
                    if (playerField_2 === 0)
                    {
                        pf2.show = 1;
                    }
                    
                    if (playerField_3 === 0)
                    {
                        pf3.show = 1;
                    }
                }
            }
            
            // Player interaction with the 2nd hand card
            if ((mouseX >= 100) && (mouseX <= 160) && (mouseY >= 310) && (mouseY <= 390))
            {
                showTargets_1 = 0;
                showTargets_2 = 0;
                showTargets_3 = 0;
                opp_hb1.show = 0;
                opp_hb2.show = 0;
                opp_hb3.show = 0;
                to1.show = 0;
                to2.show = 0;
                to3.show = 0;
                
                if (playerHand_2 !== -1)
                {
                    showFields_1 = 0;
                    showFields_2 = 1;
                    showFields_3 = 0;
                    
                    hl1.show = 0;
                    hl2.show = 1;
                    hl3.show = 0;
                    
                    if (playerField_1 === 0)
                    {
                        pf1.show = 1;
                    }
                    
                    if (playerField_2 === 0)
                    {
                        pf2.show = 1;
                    }
                    
                    if (playerField_3 === 0)
                    {
                        pf3.show = 1;
                    }
                }
            }
            
            // Player interaction with the 3rd hand card
            if ((mouseX >= 180) && (mouseX <= 240) && (mouseY >= 310) && (mouseY <= 390))
            {
                showTargets_1 = 0;
                showTargets_2 = 0;
                showTargets_3 = 0;
                opp_hb1.show = 0;
                opp_hb2.show = 0;
                opp_hb3.show = 0;
                to1.show = 0;
                to2.show = 0;
                to3.show = 0;
                
                if (playerHand_3 !== -1)
                {
                    showFields_1 = 0;
                    showFields_2 = 0;
                    showFields_3 = 1;
                    
                    hl1.show = 0;
                    hl2.show = 0;
                    hl3.show = 1;
                    
                    if (playerField_1 === 0)
                    {
                        pf1.show = 1;
                    }
                    
                    if (playerField_2 === 0)
                    {
                        pf2.show = 1;
                    }
                    
                    if (playerField_3 === 0)
                    {
                        pf3.show = 1;
                    }
                }
            }
            
            // 1st hand card field placement
            if (showFields_1 === 1)
            {
                if ((mouseX >= 20) && (mouseX <= 80) && (mouseY >= 190) && (mouseY <= 270) && (playerField_1 === 0))
                {
                    playerDeck[playerHand_1].field_1 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_1 = 0;
                    hl1.show = 0;
                    
                    lockout = 1;
                }
                else if ((mouseX >= 100) && (mouseX <= 160) && (mouseY >= 190) && (mouseY <= 270) && (playerField_2 === 0))
                {
                    playerDeck[playerHand_1].field_2 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_1 = 0;
                    hl1.show = 0;
                    
                    lockout = 1;
                }
                else if ((mouseX >= 180) && (mouseX <= 240) && (mouseY >= 190) && (mouseY <= 270) && (playerField_3 === 0))
                {
                    playerDeck[playerHand_1].field_3 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_1 = 0;
                    hl1.show = 0;
                    
                    lockout = 1;
                }
            }
            
            // 2nd hand card field placement
            if (showFields_2 === 1)
            {
                if ((mouseX >= 20) && (mouseX <= 80) && (mouseY >= 190) && (mouseY <= 270) && (playerField_1 === 0))
                {
                    playerDeck[playerHand_2].field_1 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_2 = 0;
                    hl2.show = 0;
                    
                    lockout = 1;
                }
                else if ((mouseX >= 100) && (mouseX <= 160) && (mouseY >= 190) && (mouseY <= 270) && (playerField_2 === 0))
                {
                    playerDeck[playerHand_2].field_2 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_2 = 0;
                    hl2.show = 0;
                    
                    lockout = 1;
                }
                else if ((mouseX >= 180) && (mouseX <= 240) && (mouseY >= 190) && (mouseY <= 270) && (playerField_3 === 0))
                {
                    playerDeck[playerHand_2].field_3 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_2 = 0;
                    hl2.show = 0;
                    
                    lockout = 1;
                }
            }
            
            // 3rd hand card field placement
            if (showFields_3 === 1)
            {
                if ((mouseX >= 20) && (mouseX <= 80) && (mouseY >= 190) && (mouseY <= 270) && (playerField_1 === 0))
                {
                    playerDeck[playerHand_3].field_1 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_3 = 0;
                    hl3.show = 0;
                    
                    lockout = 1;
                }
                else if ((mouseX >= 100) && (mouseX <= 160) && (mouseY >= 190) && (mouseY <= 270) && (playerField_2 === 0))
                {
                    playerDeck[playerHand_3].field_2 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_3 = 0;
                    hl3.show = 0;
                    
                    lockout = 1;
                }
                else if ((mouseX >= 180) && (mouseX <= 240) && (mouseY >= 190) && (mouseY <= 270) && (playerField_3 === 0))
                {
                    playerDeck[playerHand_3].field_3 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    showFields_3 = 0;
                    hl3.show = 0;
                    
                    lockout = 1;
                }
            }
            
            // Player interaction with the 1st field card
            if (playerField_1 === 1)
            {
                if ((mouseX >= 20) && (mouseX <= 80) && (mouseY >= 190) && (mouseY <= 270))
                {
                    showTargets_1 = 1;
                    showTargets_2 = 0;
                    showTargets_3 = 0;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    hl1.show = 0;
                    hl2.show = 0;
                    hl3.show = 0;
                    to2.show = 0;
                    to3.show = 0;
                    opp_hb2.show = 0;
                    opp_hb3.show = 0;
                    
                    if (oppField_1 === 1)
                    {
                        to1.show = 1;
                    }
                    else
                    {
                        opp_hb1.show = 1;
                    }
                }
                
                if ((showTargets_1 === 1) && (oppField_1 === 0))
                {
                    if ((mouseX >= 20) && (mouseX <= 80) && (mouseY >= 80) && (mouseY <= 160))
                    {
                        showTargets_1 = 0;
                        opp_hb1.show = 0;
                        anim_pstr1 = 1;
                        opponentHP = opponentHP - pf1_atk;
                        
                        // Player victory condition
                        if (opponentHP <= 0)
                        {
                            playerWin = 1;
                        }
                        
                        lockout = 1;
                    }
                }
                else if ((showTargets_1 === 1) && (oppField_1 === 1))
                {
                    if ((mouseX >= 20) && (mouseX <= 80) && (mouseY >= 80) && (mouseY <= 160))
                    {
                        showTargets_1 = 0;
                        to1.show = 0;
                        sum_1 = of1_hp - pf1_atk;
                        
                        if (sum_1 <= 0)
                        {
                            delayAnim1 = 1;
                            anim_patk1 = 1;
                            opponentDeck[of1_index].dead = 1;
                            opponentDeck[of1_index].hp = sum_1;
                            opponentDeck[of1_index].oppField_1 = 0;
                            oppField_1 = 0;
                            of1_index = -1;
                            sum_1 = 0;
                            of1_hp = 0;
                            of1_atk = 0;
                            delayAI = 1;
                            opponentGraveSize++;
                        }
                        else
                        {
                            delayAnim1 = 1;
                            anim_patk1 = 1;
                            opponentDeck[of1_index].hp = sum_1;
                            of1_hp = sum_1;
                            sum_1 = 0;
                        }
                        
                        lockout = 1;
                    }
                }
            }
            
            // Player interaction with the 2nd field card
            if (playerField_2 === 1)
            {
                if ((mouseX >= 100) && (mouseX <= 160) && (mouseY >= 190) && (mouseY <= 270))
                {
                    showTargets_1 = 0;
                    showTargets_2 = 1;
                    showTargets_3 = 0;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    hl1.show = 0;
                    hl2.show = 0;
                    hl3.show = 0;
                    to1.show = 0;
                    to3.show = 0;
                    opp_hb1.show = 0;
                    opp_hb3.show = 0;
                    
                    if (oppField_2 === 1)
                    {
                        to2.show = 1;
                    }
                    else
                    {
                        opp_hb2.show = 1;
                    }
                }
                
                if ((showTargets_2 === 1) && (oppField_2 === 0))
                {
                    if ((mouseX >= 100) && (mouseX <= 160) && (mouseY >= 80) && (mouseY <= 160))
                    {
                        showTargets_2 = 0;
                        opp_hb2.show = 0;
                        anim_pstr2 = 1;
                        opponentHP = opponentHP - pf2_atk;
                        
                        // Player victory condition
                        if (opponentHP <= 0)
                        {
                            playerWin = 1;
                        }
                        
                        lockout = 1;
                    }
                }
                else if ((showTargets_2 === 1) && (oppField_2 === 1))
                {
                    if ((mouseX >= 100) && (mouseX <= 160) && (mouseY >= 80) && (mouseY <= 160))
                    {
                        showTargets_2 = 0;
                        to2.show = 0;
                        
                        sum_2 = of2_hp - pf2_atk;
                        
                        if (sum_2 <= 0)
                        {
                            delayAnim2 = 1;
                            anim_patk2 = 1;
                            opponentDeck[of2_index].dead = 1;
                            opponentDeck[of2_index].hp = sum_2;
                            opponentDeck[of2_index].oppField_2 = 0;
                            oppField_2 = 0;
                            of2_index = -1;
                            sum_2 = 0;
                            of2_hp = 0;
                            of2_atk = 0;
                            delayAI = 1;
                            opponentGraveSize++;
                        }
                        else
                        {
                            delayAnim2 = 1;
                            anim_patk2 = 1;
                            opponentDeck[of2_index].hp = sum_2;
                            of2_hp = sum_2;
                            sum_2 = 0;
                        }
                        
                        lockout = 1;
                    }
                }
            }
            
            // Player interaction with the 3rd field card
            if (playerField_3 === 1)
            {
                if ((mouseX >= 180) && (mouseX <= 240) && (mouseY >= 190) && (mouseY <= 270))
                {
                    showTargets_1 = 0;
                    showTargets_2 = 0;
                    showTargets_3 = 1;
                    pf1.show = 0;
                    pf2.show = 0;
                    pf3.show = 0;
                    hl1.show = 0;
                    hl2.show = 0;
                    hl3.show = 0;
                    to1.show = 0;
                    to2.show = 0;
                    opp_hb1.show = 0;
                    opp_hb2.show = 0;
                    
                    if (oppField_3 === 1)
                    {
                        to3.show = 1;
                    }
                    else
                    {
                        opp_hb3.show = 1;
                    }
                }
                
                if ((showTargets_3 === 1) && (oppField_3 === 0))
                {
                    if ((mouseX >= 180) && (mouseX <= 240) && (mouseY >= 80) && (mouseY <= 160))
                    {
                        showTargets_3 = 0;
                        opp_hb3.show = 0;
                        anim_pstr3 = 1;
                        opponentHP = opponentHP - pf3_atk;
                        
                        // Player victory condition
                        if (opponentHP <= 0)
                        {
                            playerWin = 1;
                        }
                        
                        lockout = 1;
                    }
                }
                else if ((showTargets_3 === 1) && (oppField_3 === 1))
                {
                    if ((mouseX >= 180) && (mouseX <= 240) && (mouseY >= 80) && (mouseY <= 160))
                    {
                        showTargets_3 = 0;
                        to3.show = 0;
                        
                        sum_3 = of3_hp - pf3_atk;
                        
                        if (sum_3 <= 0)
                        {
                            delayAnim3 = 1;
                            anim_patk3 = 1;
                            opponentDeck[of3_index].dead = 1;
                            opponentDeck[of3_index].hp = sum_3;
                            opponentDeck[of3_index].oppField_3 = 0;
                            oppField_3 = 0;
                            of3_index = -1;
                            sum_3 = 0;
                            of3_hp = 0;
                            of3_atk = 0;
                            delayAI = 1;
                            opponentGraveSize++;
                        }
                        else
                        {
                            delayAnim3 = 1;
                            anim_patk3 = 1;
                            opponentDeck[of3_index].hp = sum_3;
                            of3_hp = sum_3;
                            sum_3 = 0;
                        }
                        
                        lockout = 1;
                    }
                }
            }
        }
    }
};

// Draws and updates all game objects
var draw = function()
{
    // Display the main menu after the opening screen finishes playing
    if ((start === 1) && (newGame === 0) && (instructions === 0) && (options === 0))
    {
        // Run background animation
        background(0, 0, 0);
        for (var i = 0; i < menuStars.length; i++) 
        {
            menuStars[i].draw();
        }
        
        // Draw the menu items and the menu arrow
        menu_top.draw();
        menu_mid.draw();
        menu_bot.draw();
        menu_arrow.draw();
    }
    
    // Display the "New Game" screen
    else if (newGame === 1)
    {
        // Background color
        background(0, 0, 0);
        noStroke();
        fill(255, 255, 255, 55);
        rect(19, 0, 1, 400);
        rect(80, 0, 1, 400);
        rect(99, 0, 1, 400);
        rect(160, 0, 1, 400);
        rect(179, 0, 1, 400);
        rect(240, 0, 1, 400);
        rect(0, 175, 400, 1);
       
        // Game info bar
        fill(0, 150, 255);
        rect(0, 0, 400, 50);
        
        // Player's hand
        fill(0, 150, 255);
        rect(0, 300, 400, 100);
        fill(255, 255, 255, 100);
        rect(19, 300, 1, 400);
        rect(80, 300, 1, 400);
        rect(99, 300, 1, 400);
        rect(160, 300, 1, 400);
        rect(179, 300, 1, 400);
        rect(240, 300, 1, 400);
       
        // Player's status bar
        if ((anim_ostr1 === 1) || (anim_ostr2 === 1) || (anim_ostr3 === 1))
        {
            // Flash when attacked directly
            fill(255, 0, 0, 200);
            rect(0, 280, 400, 20);
        }
        else if (playerHP <= 0)
        {
            fill(255, 0, 0, 200);
            rect(0, 280, 400, 20);
        }
        else
        {
            fill(0, 125, 255);
            rect(0, 280, 400, 20);
        }
        fill(255, 255, 255, 155);
        rect(0, 280, 400, 1);
        rect(0, 300, 400, 1);
       
        // Opponent's status bar
        if ((anim_pstr1 === 1) || (anim_pstr2 === 1) || (anim_pstr3 === 1))
        {
            // Flash when attacked directly
            fill(255, 0, 0, 200);
            rect(0, 50, 400, 20);
        }
        else if (opponentHP <= 0)
        {
            fill(255, 0, 0, 200);
            rect(0, 50, 400, 20);
        }
        else
        {
            fill(0, 125, 255);
            rect(0, 50, 400, 20);
        }
        fill(255, 255, 255, 155);
        rect(0, 50, 400, 1);
        rect(0, 70, 400, 1);
        
        // Opponent status information
        fill(255, 255, 255);
        textSize(14);
        text("Opponent's HP: ", 10, 65);
        text(opponentHP, 110, 65);
        text("Cards Left: ", 290, 65);
        text(opponentCardsLeft, 365, 65);
        
        // Player status information
        textSize(14);
        text("Player's HP: ", 10, 295);
        text(playerHP, 90, 295);
        if (noCardsError === 0)
        {
            text("Cards Left: ", 290, 295);
            text(playerCardsLeft, 365, 295);
        }
        else
        {
            text("Deck Empty", 300, 295);
        }
        
        // Draws the player's cards
        for (var i = 0; i < playerDeck.length; i++) 
        {
            playerDeck[i].move();
            playerDeck[i].draw();
        }
        
        // Draws the opponents's cards
        for (var i = 0; i < playerDeck.length; i++) 
        {
            opponentDeck[i].move();
            opponentDeck[i].draw();
        }
        
        // Draws the placement fields
        pf1.draw();
        pf2.draw();
        pf3.draw();
        
        // Draws the target objects
        to1.draw();
        to2.draw();
        to3.draw();
        
        // Draws the hitbox objects
        opp_hb1.draw();
        opp_hb2.draw();
        opp_hb3.draw();
        
        // Draws the highlight objects
        hl1.draw();
        hl2.draw();
        hl3.draw();
        
        // Player's graveyard
        if (playerGraveSize > 0)
        {
            fill(100, 100, 100);
            rect(320, 190, 60, 80);
            fill(255, 255, 255);
            rect(322, 192, 56, 76);
            fill(100, 100, 100);
            rect(324, 194, 52, 72);
            fill(255, 255, 255);
            textSize(18);
            text(playerGraveSize, 343, 230);
        }
        else
        {
            fill(100, 100, 100);
            rect(320, 190, 60, 80);
            fill(255, 255, 255);
            rect(322, 192, 56, 76);
            fill(100, 100, 100);
            rect(324, 194, 52, 72);
            fill(255, 255, 255);
            textSize(18);
            text("Grave", 325, 230);
        }
        fill(255, 255, 255);
        textSize(18);
        text(playerCardsLeft, 343, 350);
        
        // Opponent's graveyard
        if (opponentGraveSize > 0)
        {
            fill(100, 100, 100);
            rect(320, 80, 60, 80);
            fill(255, 255, 255);
            rect(322, 82, 56, 76);
            fill(100, 100, 100);
            rect(324, 84, 52, 72);
            fill(255, 255, 255);
            textSize(18);
            text(opponentGraveSize, 343, 120);
        }
        else
        {
            fill(100, 100, 100);
            rect(320, 80, 60, 80);
            fill(255, 255, 255);
            rect(322, 82, 56, 76);
            fill(100, 100, 100);
            rect(324, 84, 52, 72);
            fill(255, 255, 255);
            textSize(18);
            text("Grave", 325, 120);
        }
        
        // Opponent AI
        if (lockout === 1)
        {
            // Begin lock timer
            lockTimer.start = 1;
            
            // AI card placement AI
            if (opponentCardsLeft > 0)
            {
                if ((oppField_1 === 0) || (oppField_2 === 0) || (oppField_3 === 0))
                {
                    if ((oppField_1 === 0) && (playerField_1 === 0) && (lockout === 1) && (opponentDeckIndex < opponentDeckSize))
                    {
                        oppAI_place1 = 1;
                        oppField_1 = 1;
                        lockout = 0;
                    }
                    
                    if ((oppField_2 === 0) && (playerField_2 === 0) && (lockout === 1) && (opponentDeckIndex < opponentDeckSize))
                    {
                        oppAI_place2 = 1;
                        oppField_2 = 1;
                        lockout = 0;
                    }
                    
                    if ((oppField_3 === 0) && (playerField_3 === 0) && (lockout === 1) && (opponentDeckIndex < opponentDeckSize))
                    {
                        oppAI_place3 = 1;
                        oppField_3 = 1;
                        lockout = 0;
                    }
                    
                    if ((oppField_1 === 0) && (lockout === 1) && (opponentDeckIndex < opponentDeckSize))
                    {
                        oppAI_place1 = 1;
                        oppField_1 = 1;
                        lockout = 0;
                    }
                    
                    if ((oppField_2 === 0) && (lockout === 1) && (opponentDeckIndex < opponentDeckSize))
                    {
                        oppAI_place2 = 1;
                        oppField_2 = 1;
                        lockout = 0;
                    }
                    
                    if ((oppField_3 === 0) && (lockout === 1) && (opponentDeckIndex < opponentDeckSize))
                    {
                        oppAI_place3 = 1;
                        oppField_3 = 1;
                        lockout = 0;
                    }
                    
                    lockout = 0;
                }
                
                // Opponent attack AI
                else
                {
                    if ((playerField_1 === 1) && (oppField_1 === 1) && (lockout === 1) && (delayAnim1 === 0))
                    {
                        anim_oatk1 = 1;
                        oppAI_atk1 = 1;
                        lockout = 0;
                    }
                    
                    if ((playerField_2 === 1) && (oppField_2 === 1) && (lockout === 1) && (delayAnim2 === 0))
                    {
                        anim_oatk2 = 1;
                        oppAI_atk2 = 1;
                        lockout = 0;
                    }
                    
                    if ((playerField_3 === 1) && (oppField_3 === 1) && (lockout === 1) && (delayAnim3 === 0))
                    {
                        anim_oatk3 = 1;
                        oppAI_atk3 = 1;
                        lockout = 0;
                    }
                    
                    if ((playerField_1 === 0) && (oppField_1 === 1) && (lockout === 1) && (delayAnim1 === 0))
                    {
                        anim_ostr1 = 1;
                        playerHP = playerHP - of1_atk;
                        lockout = 0;
                    }
                    
                    if ((playerField_2 === 0) && (oppField_2 === 1) && (lockout === 1) && (delayAnim2 === 0))
                    {
                        anim_ostr2 = 1;
                        playerHP = playerHP - of2_atk;
                        lockout = 0;
                    }
                    
                    if ((playerField_3 === 0) && (oppField_3 === 1) && (lockout === 1) && (delayAnim3 === 0))
                    {
                        anim_ostr3 = 1;
                        playerHP = playerHP - of3_atk;
                        lockout = 0;
                    }
                    
                    lockout = 0;
                }
            }
            // Opponent attack AI
            else
            {
                if ((playerField_1 === 1) && (oppField_1 === 1) && (lockout === 1) && (delayAnim1 === 0))
                {
                    anim_oatk1 = 1;
                    oppAI_atk1 = 1;
                    lockout = 0;
                }
                
                if ((playerField_2 === 1) && (oppField_2 === 1) && (lockout === 1) && (delayAnim2 === 0))
                {
                    anim_oatk2 = 1;
                    oppAI_atk2 = 1;
                    lockout = 0;
                }
                
                if ((playerField_3 === 1) && (oppField_3 === 1) && (lockout === 1) && (delayAnim3 === 0))
                {
                    anim_oatk3 = 1;
                    oppAI_atk3 = 1;
                    lockout = 0;
                }
                
                if ((playerField_1 === 0) && (oppField_1 === 1) && (lockout === 1) && (delayAnim1 === 0))
                {
                    anim_ostr1 = 1;
                    playerHP = playerHP - of1_atk;
                    lockout = 0;
                }
                
                if ((playerField_2 === 0) && (oppField_2 === 1) && (lockout === 1) && (delayAnim2 === 0))
                {
                    anim_ostr2 = 1;
                    playerHP = playerHP - of2_atk;
                    lockout = 0;
                }
                
                if ((playerField_3 === 0) && (oppField_3 === 1) && (lockout === 1) && (delayAnim3 === 0))
                {
                    anim_ostr3 = 1;
                    playerHP = playerHP - of3_atk;
                    lockout = 0;
                }
                
                lockout = 0;
            }
        }
        
        // Increment timer
        lockTimer.move();
        
        // Player victory condition
        if ((playerWin === 1) || (opponentHP <= 0))
        {
            fill(255, 255, 255);
            textSize(20);
            text("Game Over: Player Wins!", 10, 30);
            fill(0, 150, 255);
            rect(46, 96, 308, 158);
            fill(255, 255, 255);
            rect(48, 98, 304, 154);
            fill(0, 150, 255);
            rect(50, 100, 300, 150);
            fill(255, 255, 255);
            textSize(30);
            text("You Win!", 140, 140);
            textSize(22);
            text("Click anywhere to return", 80, 180);
            text("to the main menu.", 110, 205);
            newGameInit = 0;
        }
        // Player loss condition
        else if (playerHP <= 0)
        {
            playerLose = 1;
            fill(255, 255, 255);
            textSize(20);
            text("Game Over: Opponent Wins", 10, 30);
            fill(0, 150, 255);
            rect(46, 96, 308, 158);
            fill(255, 255, 255);
            rect(48, 98, 304, 154);
            fill(0, 150, 255);
            rect(50, 100, 300, 150);
            fill(255, 255, 255);
            textSize(30);
            text("Game Over", 120, 140);
            textSize(22);
            text("Click anywhere to return", 80, 180);
            text("to the main menu.", 110, 205);
            newGameInit = 0;
        }
        
        // Turn indicator
        else
        {
            if (lockTimer.start === 0)
            {
                fill(255, 255, 255);
                textSize(20);
                text("Your Turn", 10, 30);
            }
            else
            {
                fill(255, 255, 255);
                textSize(20);
                text("Opponent's Turn", 10, 30);
            }
        }
    }
    
    // Display the "Instructions" screen
    else if (instructions === 1)
    {
        background(0, 0, 0);
        textSize(40);
        text("Instructions", 100, 70);
        textSize(15);
        text("You begin the game with a handful of 3 cards.", 35, 110);
        text("Click a card in your hand to send it to the field by", 35, 130);
        text("clicking on the green boxes that appear. You can", 35, 150);
        text("receive more cards by clicking on your deck in the", 35, 170);
        text("bottom-right corner. Clicking a card in the field will", 35, 190);
        text("display targets to attack in red boxes. Click these", 35, 210);
        text("red boxes to attack the opponent's cards or his", 35, 230);
        text("health points. Both players have a set amount of", 35, 250);
        text("health points. The first player to reduce the other's", 35, 270);
        text("health points to zero will win the game.", 35, 290);
        textSize(50);
        return_mid.draw();
    }
    
    // Display the "Options" screen
    else if (options === 1)
    {
        background(0, 0, 0);
        textSize(40);
        text("Options", 130, 70);
        textSize(30);
        text("Starting Health:", 95, 130);
        textSize(35);
        text("40", 180, 180);
        text("30", 180, 230);
        text("20", 180, 280);
        textSize(50);
        return_bot.draw();
    }
    
    // Plays the opening screen
    else
    {
        // The background color
        background(apogee, 200, 255);
        
        // The sun's color
        fill(255, 255, 0);
        
        // Animates the sun's ascent
        if (apogee > 50)
        {
            apogee -= 2.5;
        }
        else
        {
            // Display studio logo
            textSize(40);
            text("Sunrise Studios", 60, 150);
            textSize(20);
            text("An Alex Mun Production", 100, 180);
            textSize(18);
            text("Click anywhere to begin", 110, 230);
            
            // Transition to the main menu
            if (menuDelay > 0)
            {
                menuDelay -= 1;
            }
            else
            {
                // start = 1;
            }
        }
        ellipse(198, apogee, 50, 50);
        
        // Draw mountains and animate waterfall
        drawRange(120);
        drawRange(60);
        animateWaterFall();
    }
};
