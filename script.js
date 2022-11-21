import { getDatabase,ref,set } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'


const placebet = (user,betAmt,team) => {
    const db = getDatabase();
    set(ref(db,'bets/'+user),{
        team: team,
        betAmt: betAmt
    })
}   
