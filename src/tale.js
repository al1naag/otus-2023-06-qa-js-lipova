let result;

const kolobok = (name) => {
switch (name){
    case 'дедушка':
        result = 'Я от дедушки ушёл';
        console.log(result);
        return result;
    case 'заяц':
        result = 'Я от зайца ушёл';
        console.log(result);
        return result;
    case 'лиса':
        result = 'Меня съели';
        console.log(result);
        return result;
}
}

kolobok('дедушка');
kolobok('заяц');
kolobok('лиса');

const newYear = (name) => {
    result = `${name}! ${name}! ${name}!`
    console.log(result);
    return result;
}

newYear('Дед Мороз')
newYear('Снегурочка')
