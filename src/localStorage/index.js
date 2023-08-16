export function saveLocalStorage({board, turn,winner}){
    window.localStorage.setItem('turn', turn);
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('winner', winner);
}

export function resetLocalStorage(){
    window.localStorage.removeItem('turn');
    window.localStorage.removeItem('board');
}