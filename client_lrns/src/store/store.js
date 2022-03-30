let renderEntireTree = () => {
//   console.log("жеееесть, меня через обсервер вызвали"); //или не вызвали ¯\_(ツ)_/¯
};

window.renderEntireTree = renderEntireTree

let old_data;

let state_fetch = async () => {
  const response = await fetch("http://localhost:3001/state");
  const state = await response.json();
  return state;
};

//проверяем есть ли изменения данных 
setInterval(async () => {
    const response = await fetch("http://localhost:3001/change");
    const data = await response.text();
    if (old_data != data) {
      old_data = data
      renderEntireTree(state_fetch());
    }//чистить кеш не будем, мы ещё маленькие
  }, 500);

  //вау это что паттерн обсервер???
export const subscribe = (observer) => {//даааа!
    renderEntireTree = observer;//вау, он записывает функцию которая к нему пришла в renderEntireTree???
};//и вправду записывает, вон в консоле даже пишется
//не зря трое суток на это потратил. но зато теперь красиво
//жаль только что сверху интервал стоит. надеюсь он не взорвет комп
