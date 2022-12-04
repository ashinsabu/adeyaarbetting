import { getDatabase,ref,set,onValue,get,child } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'

let qFinalTeams = [
    {
        team: "netherlands",
        color: "#B22732",
        teamNameColor: "white",
        accHead: "panelsStayOpen-headingOne",
        accColl: "panelsStayOpen-collapseOne",
        
    },
    {
        team: "argentina",
        color: "#7EB2E1",
        teamNameColor: "white",
        accHead: "panelsStayOpen-headingTwo",
        accColl: "panelsStayOpen-collapseTwo",
    },
    {
        team: "france",
        color: "#15359E",
        teamNameColor: "white",
        accHead: "panelsStayOpen-headingThree",
        accColl: "panelsStayOpen-collapseThree",
    },
    {
        team: "england",
        color: "white",
        teamNameColor: "black",
        accHead: "panelsStayOpen-headingFour",
        accColl: "panelsStayOpen-collapseFour",
    },
]



// UTILITY AND USEFUL FUNCTIONS 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


class Counter {
    constructor(startDelay, endDelay) {
        this.startDelay = startDelay || 50;
        this.endDelay = endDelay || this.startDelay;
    }
    runCounter(objID, start, finish) {
        if (isNaN(start) || isNaN(finish)) {
            console.error("One of the count parameters was not a number. Please check the method call.");
            return;
        }
        if (finish - start === 0) {
            console.error("Finish count is the same as start count. Please use different numbers.");
            return;
        }
        const obj = document.getElementById(objID);
        let num = start;
        let delay = this.startDelay;
        let delayOffset = Math.floor((this.endDelay - this.startDelay) / (finish - start));
        let timerStep = function() {
            if (num <= finish) {
                obj.innerHTML = num;
                delay += delayOffset;
                num += 1;
                setTimeout(timerStep, delay);
            }
        }
        timerStep();
    }
}

// SUBMIT BET FUNCTION
const submitTournamentBet = (user, team, amount) => {
    const db = getDatabase();
    
    set(ref(db,'tournamentBets/'+user),{
        team: team,
        betAmt: amount
    })
    
}


// GLOBAL EVENT LISTENERS
document.querySelector('.tournament-winner-submit').addEventListener('click',() => {
    document.querySelector('.other-bet-message').innerHTML = '';
    document.querySelector('.other-bet-message').style.color = 'grey';

    let username = document.querySelector('.other-bet-username').value;
    let password = document.querySelector('.other-bet-password').value;

    if(userToPassword[username] == password){
        document.querySelector('.other-bet-message').innerHTML = 'Submitting Bet...';
        submitTournamentBet(username,document.querySelector('.tournament-winner-selector').value,document.querySelector('.tournament-winner-amount').value);
        setTimeout(()=>{
            location.reload();
        },1000)
    }
    else{
        document.querySelector('.other-bet-message').innerHTML = 'Wrong Credentials';
        document.querySelector('.other-bet-message').style.color = 'red';
    }
})


// UPDATE DOM FUNCTIONS
const updateBar = (qFinalTeams) => {
    for(let i =0;i<qFinalTeams.length;i++){
        document.querySelector('.progress').innerHTML +=
        `<div class="progress-bar ${qFinalTeams[i].team}" role="progressbar" style="width: ${100/qFinalTeams.length}%; background-color: ${qFinalTeams[i].color};" aria-valuenow="${100/qFinalTeams.length}" aria-valuemin="0" aria-valuemax="100"></div>
        `
    }
}

const updateAccordion = () => {

}
// submitTournamentBet("ashin","netherlands",50);


const updateAccordions = (qFinalTeams) => {
    
    let qFinalTeamsComponents =  qFinalTeams.map((item,index)=>{
        return `<div class="accordion-item">
        <h2 class="accordion-header" id="${item.accHead}">
          <button style="background-color: ${item.color}; color: ${item.teamNameColor};" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${item.accColl}" aria-expanded="false" aria-controls="${item.accColl}">
            ${capitalizeFirstLetter(item.team)}
          </button>
        </h2>
        <div id="${item.accColl}" class="accordion-collapse collapse" aria-labelledby="${item.accHead}">
          <div class="accordion-body ${item.team}-info">
              <p>Total Bet on ${capitalizeFirstLetter(item.team)}</p>
              <h5 style="margin-bottom: 8px;" class="total-bet-on-team ${item.team}-total">₹150</h5>
              <table class="${item.team}-table other-bet-team-table">
                  <tr>
                      <th>User</th>
                      <th>Bet Amt.</th>
                      <th>Possible Win</th>
                  </tr>
                  <tr>
                      <td>Ashin</th>
                      <td>50</th>
                      <td>250</th>
                  </tr>
                  </tr>
              </table>
          </div>
        </div>
        </div>
        `;
    });
    for(let i=0;i<qFinalTeamsComponents.length;i++){
        document.querySelector('.accordion').innerHTML += qFinalTeamsComponents[i];
    }
}
//
const userToPassword = {
    "ashin":"messifan",
    "aryan":"bitchmallu69",
    "pratyush":"betxyz",
    "manan":"ilovemallus",
    "ankur":"mallu123",
    "boidushya":"password1234",
    "dev":"sexymallu69",
    "drumil":"xyz",
    "jayesh":"ashinmom12",
    "rahul":"ankurlodu",
    "rohan":"ashin69",
    "kartik":"ashinbabyanalsex",
    "ayush" : "ashinsabu",
    "rishikesh" : "rishikesh",
}


let MyCounter1 = new Counter(5,150);
MyCounter1.runCounter("myObj1", 825, 875);
updateAccordions(qFinalTeams);
updateBar(qFinalTeams);