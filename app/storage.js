function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const getNickname = () => {
    if (!localStorage.getItem('nickname')) {
        const newString = generateRandomString(6);
        localStorage.setItem('nickname', newString);
    }
    return localStorage.getItem('nickname');
};

export const getGameId = () => {
    if (!localStorage.getItem('game_id')) {
        return null;
    }
    return localStorage.getItem('game_id');
};

export const setGameId = (value) => {
    localStorage.setItem("game_id", value)
};

export const deleteGameId = () => {
    if (!localStorage.getItem('game_id')) {
       return
    }
    return localStorage.removeItem('game_id');
};