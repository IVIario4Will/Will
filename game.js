//Project name
//Author
//version 1.0.0

//html elements
var text;
var moneyText;
var stockText;
var aclipText;
var TimeSText;
var TimePText;
var TimeGText;
var sChestText;
var mChestText;
var lChestText;
var dChestText;
var goldText;

//global game variables
var lockpicks = 0; //How many you've made in total
var aClips = 0;
var money = 0; //The currency you have left
var inventory = 0; //How many you currently have left
var chance = 1;  //The chance of selling a pick
var price =1; //How much it sells for
var TimeP = 1;
var TimeS = 1;
var TimeG = 1;
var sChest = 0; //Small Chest count
var mChest = 0; //Medium Chest count
var lChest = 0; //Large Chest count 
var dChest = 0; //Dark Chest count
var gold = 0; //Gold count
var random = 0; //Random number
var counter = 0;


window.addEventListener('load', startGame);


function startGame(){

    text = document.getElementById('lockpicks');
    moneyText = document.getElementById('money');
    stockText = document.getElementById('stock');
    aclipText = document.getElementById('aclip');
    TimePText = document.getElementById('TimeP');
    TimeSText = document.getElementById('TimeS');
    TimeGText = document.getElementById('TimeG');
    sChestText = document.getElementById('sChest');
    mChestText = document.getElementById('mChest');
    lChestText = document.getElementById('lChest');
    dChestText = document.getElementById('dChest');
    goldText = document.getElementById('gold');


    window.setInterval(function(){ update(); }, 1000/10);
}

if(lockpicks < 0){
    console.log("You have gone below zero")
    lockpicks = 0
}

function makeClip(){
    inventory+=1;
    lockpicks+=1;
}

/**
 * This function requires £10 to activate
 * 
 * Once the fuction has been activated
 * £10 will be taken away however it will generate 
 * picks automatically.
 * 
 */
function autoClip(){
    if(money>=10){
        money-=10;
        aClips+=0.5;
    }
}

function sell(){
    var num = Math.floor(Math.random()* 50) +1;

    if(num>chance){return;}

    if(inventory>=1){
        inventory-=1;
        money+=price;
    }   
}

function UpgradeS(){
    if(money>=25 * TimeS){
        money-=25 * TimeS;
        chance+=1;
        TimeS = TimeS * 2;
    }
}

function UpgradeP(){
    if(money >= 50 * TimeP){
        money -= 50 * TimeP;
        price += 1;
        TimeP = TimeP * 2;
    }
}

function RankUp(){
    if(gold >= 5000 * TimeG){
        gold -= 5000 * TimeG;

    }
}

function Chest1(){
    if(money>=500){
        money -= 500;
        sChest += 1;
    }
}

/**
 * This function opens small chests it uses a random amount of lockpicks 
 * between 1 and 50
 * 
 * The random variable is the number of lockpicks
 * that are needed to open the chest
 * 
 * If you have the lockpicks necessery to open the chest, the chest
 * opens and you get a random amount of gold
 * 
 * If you dont have the lockpicks necessary to open the chest,
 * the chest is destroyed and you dont get any gold
 */
function OpenS(){                                                               
    if((random = Math.floor((Math.random()* 50) + 1)) <= lockpicks){
        if(sChest > 0){
            sChest -= 1;
            lockpicks = lockpicks - random;
            gold = gold + Math.floor((Math.random()* 10) + 1);
        }                                                                      
    }
    else{
        if(sChest > 0){
            sChest -= 1
            lockpicks = lockpicks - random;
            if(lockpicks < 0){
                lockpicks = 0;
            }
        }
    }
}

/**
 * This function costs the player £5000 
 * to activate upon be activated £5000 is taken away 
 * but the player will gain a meduim chest.
 */
function Chest2(){
    if(money >= 5000){
        money -= 5000;
        mChest += 1;
        
    }
}

/**
 * This function opens meduim chests it uses a random amount of lockpicks 
 * between 1 and 2500
 * 
 * The random variable is the number of lockpicks
 * that are needed to open the chest
 * 
 * If you have the lockpicks necessery to open the chest, the chest
 * opens and you get a random amount of gold
 * 
 * If you dont have the lockpicks necessary to open the chest,
 * the chest is destroyed and you dont get any gold
 */
function OpenM(){
    if((random = Math.floor((Math.random()* 2500) + 1)) <= lockpicks){   // if random is higher than lockpicks do this if statement
        if(mChest > 0){                                                  // if chest value is higher than 0 do this statement 
            mChest -= 1;                                                 // take away chest
            lockpicks = lockpicks - random;                              // take the random value away from the lockpicks
            gold = gold + Math.floor((Math.random()* 500) + 1);          // get the gold
        }
    }
    else{                                   // if random is lower than lockpick value do this else statement 
        if(mChest > 0){                     // if chest value is higher than 0 do this statement 
            mChest -= 1;                    // take away the chest
            lockpicks = lockpicks - random; // take away the random value from the lockpicks 
            if(lockpicks < 0){              // if lockpicks goes below 0 
                lockpicks = 0;              // make lockpick value 0 so you cant go below 0 
            }                               // this else statement destroys the chest so they cant cheat getting the gold
        }
        }

    
    
}



function update(){ 
    lockpicks+=aClips; 
    inventory+=aClips; 
 
    text.innerHTML = 'Available Lockpicks: ' + Math.floor(lockpicks);
    moneyText.innerHTML = "Money: £" + Math.floor(money);
    stockText.innerHTML = "Stock: " + Math.floor(inventory);
    aclipText.innerHTML = 'Autopicks: ' + Math.floor(aClips*2);
    TimeSText.innerHTML = 'Sell Rate Upgrade: £' + Math.floor(TimeS*25);
    TimePText.innerHTML = 'Price Upgrade: £' + Math.floor(TimeP*50);
    //TimeGText.innerHTML = 'Rank Up: ' + Math.floor(TimeG*5000);
    sChestText.innerHTML = 'Small Chest Count: ' +Math.floor(sChest);
    mChestText.innerHTML = 'Medium Chest Count: ' +Math.floor(mChest);
    //lChestText.innerHTML = 'Large Chest Count: ' +Math.floor(lChest);
    //dChestText.innerHTML = 'Dark Chest Count: ' +Math.floor(dChest);
    goldText.innerHTML = 'Gold: ' +Math.floor(gold);

    var x = document.getElementById("auto").style;
        if(money<10){
            x.display = "";

        }else{
            x.display = "block";
          }

        sell();

}


var Rank = [
    "Novice",
    "Apprentice",
    "Rogue",
    "Thief",
    "Lone Wolf",
    "Master Mind",
]




/**
 * This function returns an int, adding to numbers
 * @param {*} x   your first number
 * @param {*} y   your second number
 * @returns  result of addition
 */
function add(x,y){

    return x + y;
}
